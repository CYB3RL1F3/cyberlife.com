import { Input } from 'app/components/atoms/Input';
import { FieldAttributes, useFormikContext } from 'formik';
import React, { FC, useCallback, useState } from 'react';
import {
  AutoCompleteHandler,
  AutoCompleteItemGroup,
  AutoCompleteItemStyled,
} from './AutoComplete.styled';

export interface AutoCompleteProps extends FieldAttributes<any> {
  propositions: string[];
}

export interface AutoCompleteItemProps {
  onClick: (content: string) => void;
  index: number;
}

export const AutoCompleteItem: FC<AutoCompleteItemProps> = ({
  onClick,
  children,
}) => {
  const action = useCallback(
    () => onClick(children.toLocaleString()),
    [children]
  );
  return (
    <AutoCompleteItemStyled onClick={action}>{children}</AutoCompleteItemStyled>
  );
};

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const [completion, setCompletion] = useState<string[]>([]);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange(e);
      console.log(e);
      const { value } = e.currentTarget;
      setFieldValue(props.name, value);
      if (!value) {
        setCompletion([]);
      } else
        setCompletion(
          props.propositions?.filter(
            (proposition) =>
              proposition
                .toLocaleLowerCase()
                .indexOf(value.toLocaleLowerCase()) >= 0
          )
        );
    },
    [props.propositions, props.onChange]
  );
  const { setFieldValue } = useFormikContext();
  const selectItem = useCallback((value: string) => {
    setFieldValue(props.name, value);
    setCompletion([]);
    props.onChange({
      currentTarget: {
        value,
      },
    });
  }, []);
  return (
    <AutoCompleteHandler>
      <Input {...props} onChange={onChange} />
      {completion.length ? (
        <AutoCompleteItemGroup>
          {completion.map((item, index) => (
            <AutoCompleteItem index={index} onClick={selectItem}>
              {item}
            </AutoCompleteItem>
          ))}
        </AutoCompleteItemGroup>
      ) : null}
    </AutoCompleteHandler>
  );
};
