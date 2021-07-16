import { Input } from 'app/components/atoms/Input';
import { debounce } from 'app/utils/debounce';
import { FieldAttributes, useFormikContext } from 'formik';
import React, { FC, useCallback, useEffect, useState } from 'react';
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
  selected: boolean;
}

const ARROW_UP = 38;
const ARROW_DOWN = 40;
const ENTER = 13;

export const AutoCompleteItem: FC<AutoCompleteItemProps> = ({
  onClick,
  selected,
  children,
}) => {
  const action = useCallback(
    () => onClick(children.toLocaleString()),
    [children]
  );
  return (
    <AutoCompleteItemStyled selected={selected} onClick={action}>
      {children}
    </AutoCompleteItemStyled>
  );
};

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const [completion, setCompletion] = useState<string[]>([]);
  const [currentKeyboardIndex, setCurrentKeyboardIndex] = useState(-1);

  const onEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (currentKeyboardIndex > -1 && completion.length) {
        e.preventDefault();
        setCurrentKeyboardIndex(-1);
        const value = completion[currentKeyboardIndex];
        setFieldValue(props.name, value);
        setCompletion([]);
      }
    },
    [completion, currentKeyboardIndex]
  );

  const onNav = useCallback(
    (e: React.KeyboardEvent) => {
      if (completion.length) {
        if (e.keyCode === ARROW_UP) {
          e.preventDefault();
          const nextValue =
            currentKeyboardIndex <= 0
              ? completion.length - 1
              : currentKeyboardIndex - 1;
          setCurrentKeyboardIndex(nextValue);
        } else if (e.keyCode === ARROW_DOWN) {
          e.preventDefault();
          const nextValue =
            currentKeyboardIndex >= completion.length - 1
              ? 0
              : currentKeyboardIndex + 1;
          setCurrentKeyboardIndex(nextValue);
        } else if (e.keyCode === ENTER) {
          onEnter(e);
        }
      }
    },
    [onEnter]
  );

  useEffect(() => {
    const onKeyDown = debounce(onNav, 200);
    addEventListener('keydown', onKeyDown);
    return () => {
      removeEventListener('keydown', onKeyDown);
    };
  }, [onNav]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange(e);
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
      <Input {...props} autocomplete="off" onChange={onChange} />
      {completion.length ? (
        <AutoCompleteItemGroup>
          {completion.map((item, index) => (
            <AutoCompleteItem
              selected={index === currentKeyboardIndex}
              index={index}
              onClick={selectItem}
            >
              {item}
            </AutoCompleteItem>
          ))}
        </AutoCompleteItemGroup>
      ) : null}
    </AutoCompleteHandler>
  );
};
