import React from 'react';
import { Layout, Footer, MiniPlayerMobileWrapper } from 'app/components';
import { Header, Infos } from 'app/components/organisms';
import { AppContainer, Container, Handler } from './App.styled';
import { MobileMediaQuery } from 'app/components/atoms/Responsive';
import { Content } from './Content';

console.log(
  '%cYou look \nlike being \na curious nerd!',
  'background: #120000; color: #bada55; font-size: 35px; text-transform: uppercase; margin: 1px'
);

require('assets/main.css');

export class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <Layout>
          <Header />
          <Container>
            <Infos />
            <Content>
              <Handler>{this.props.children}</Handler>
            </Content>
          </Container>
          <Footer />
        </Layout>
        <MobileMediaQuery>
          <MiniPlayerMobileWrapper />
        </MobileMediaQuery>
      </AppContainer>
    );
  }
}
