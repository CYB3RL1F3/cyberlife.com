import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Container, Text, Link } from './Bio.styled';
import { useInfosStore } from 'app/hooks/stores';
import { paths } from "app/paths";

export const Bio: FC = observer(() => {
  const infosStore = useInfosStore();
  const {
    bio: { intro, content }
  } = infosStore.data;

  return (
    <Container>
      <Text>{intro}</Text>
      <Text>{content}</Text>
      <Text>
        Contact / booking :{' '}
        <Link path={paths.contact}>
          cyberlife<span>@</span>gmail.com
        </Link>
      </Text>
    </Container>
  );
});