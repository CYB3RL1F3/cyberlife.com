import * as React from 'react';
import { Layout, Footer, MiniPlayerMobileWrapper } from 'app/components';
import { Header } from 'app/components/organisms';
import { Content, Container, Handler } from './App.styled';
import { Infos } from 'app/components/organisms';
import { MobileMediaQuery } from 'app/components/atoms/Responsive';

require('assets/main.css');

export class App extends React.Component {
  render() {
    console.log(
      '%cYou look \nlike being \na curious nerd!',
      'background: #120000; color: #bada55; font-size: 35px; text-transform: uppercase; margin: 1px'
    );
    return (
      <Layout>
        <Header />
        <Container>
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
