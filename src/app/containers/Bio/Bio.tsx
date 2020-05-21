import React from 'react';
import { inject, observer } from 'mobx-react';
import { STORE_INFOS } from 'app/constants/stores';
import InfosStore from 'app/stores/InfosStore';
import { Container, Text, Link } from './Bio.styled';

@inject(STORE_INFOS)
@observer
export class Bio extends React.Component {
  render() {
    const store: InfosStore = this.props[STORE_INFOS];
    const {
      bio: { intro, content }
    } = store.data;

    return (
      <Container>
        <Text>{intro}</Text>
        <Text>{content}</Text>
        <Text>
          Contact / booking :{' '}
          <Link path="/contact">
            cyberlife<span>@</span>gmail.com
          </Link>
        </Text>
      </Container>
    );
  }
}
