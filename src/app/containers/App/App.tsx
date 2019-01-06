import * as React from 'react';
import { Layout, Footer, MiniPlayerMobileWrapper } from 'app/components';
import { Header } from 'app/components/organisms';
import { Content, Container, Handler } from './App.styled';
import { Infos } from 'app/containers';
import { sizes } from 'app/theme';
import MediaQuery from 'react-responsive';
import { STORE_PLAYER } from 'app/constants/stores';
import { inject, observer } from 'mobx-react';

require('assets/main.css');

@inject(STORE_PLAYER)
@observer
export class App extends React.Component {
  render() {
    const { currentTrack } = this.props[STORE_PLAYER];
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
        <MediaQuery query={`(max-width: ${sizes.mobile / 16}em)`}>
          <MiniPlayerMobileWrapper />
        </MediaQuery>
      </Layout>
    );
  }
}
