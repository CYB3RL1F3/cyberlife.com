import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Container, Text, Link, CenterText } from './Bio.styled';
import { useInfosStore } from 'app/hooks/stores';
import { paths } from "app/paths";
import { Loading } from 'app/components/atoms';
import { SocialLinks } from 'app/components/organisms/SocialLinks';
import Button from 'app/components/atoms/Button';

export const Bio: FC = observer(() => {
  const infosStore = useInfosStore();

  return (
    <Container>
      {infosStore.data && infosStore.data.bio && infosStore.data.bio.intro ? (
        <>
          <Text>{infosStore.data.bio.intro}</Text>
          <Text>{infosStore.data.bio.content}</Text>
          <br />
          <CenterText>
            <SocialLinks data={infosStore.data} />
          </CenterText>
          <Text>
            <br />
            <Button href="/presskit" target="_blank">
              Download Press kit
            </Button>
          </Text>
        </>
      ) : (
        <Loading />
      )}
      <br />
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