import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Container, Text, Link } from './Bio.styled';
import { useInfosStore } from 'app/hooks/stores';
import { paths } from "app/paths";
import { Loading } from 'app/components/atoms';

export const Bio: FC = observer(() => {
  const infosStore = useInfosStore();

  return (
    <Container>
      {infosStore.data && infosStore.data.bio && infosStore.data.bio.intro ? (
        <>
          <Text>{infosStore.data.bio.intro}</Text>
          <Text>{infosStore.data.bio.content}</Text>
        </>
      ) : (
        <Loading />
      )}
      
      <Text>
        Contact / booking :{' '}
        <Link path={paths.contact}>
          cyberlife<span>@</span>gmail.com
        </Link>
      </Text>
    </Container>
  );
});

export default Bio;