import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { STORE_INFOS } from 'app/constants';
import { InfosBox, InfosContainer, Paragraph } from './Infos.styled';
import InfosStore from '../../stores/InfosStore';

@inject(STORE_INFOS)
@observer
export class Infos extends React.Component {
  render() {
    const infosStore: InfosStore = this.props[STORE_INFOS] as InfosStore;
    console.log(infosStore.data.bio);
    return (
      <InfosBox>
        <InfosContainer>
          <Paragraph>{infosStore.data.bio.content}</Paragraph>
        </InfosContainer>
      </InfosBox>
    );
  }
}
