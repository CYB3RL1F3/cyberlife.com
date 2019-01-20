import * as React from 'react';
import { Layout, Footer, MiniPlayerMobileWrapper } from 'app/components';
import { Header } from 'app/components/organisms';
import { Content, Container, Handler } from './App.styled';
import { Infos } from 'app/components/organisms';
import { STORE_PLAYER } from 'app/constants/stores';
import { inject, observer } from 'mobx-react';
import { MobileMediaQuery } from 'app/components/atoms/Responsive';
import PlayerStore from 'app/stores/PlayerStore';

require('assets/main.css');

@inject(STORE_PLAYER)
@observer
export class App extends React.Component {
  render() {
    console.log(
      '%cYou look \nlike being \na curious nerd!',
      'background: #120000; color: #bada55; font-size: 35px; text-transform: uppercase; margin: 1px'
    );
    const { currentTrack } = this.props[STORE_PLAYER] as PlayerStore;
    return (
      <Layout>
        <Header />
        <Container toBeReduced={currentTrack}>
          <Infos />
          <Content>
            <Handler>{this.props.children}</Handler>
          </Content>
        </Container>
        <Footer />
        <MobileMediaQuery>
          <MiniPlayerMobileWrapper />
        </MobileMediaQuery>
      </Layout>
    );
  }
}
