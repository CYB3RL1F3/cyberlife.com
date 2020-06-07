import React, { FC } from 'react';
import { Layout, Footer } from 'app/components';
import { Header, Infos, MiniPlayerMobileWrapper } from 'app/components/organisms';
import { AppContainer, Container, Handler } from './App.styled';
import { MobileMediaQuery } from 'app/components/atoms/Responsive';
import { Content } from './Content';
import { ModalContextProvider } from 'app/contexts/ModalContext';
import Modal from 'app/components/atoms/Modal';

console.log(
  '%cYou look \nlike being \na curious nerd!',
  'background: #120000; color: #bada55; font-size: 35px; text-transform: uppercase; margin: 1px'
);

require('assets/main.css');

export const App: FC = ({ children }) => (
  <ModalContextProvider>
    <AppContainer>
      <Modal />
      <Layout>
        <Header />
        <Container>
          <Infos />
          <Content>
            <Handler>{children}</Handler>
          </Content>
        </Container>
        <Footer />
      </Layout>
      <MobileMediaQuery>
        <MiniPlayerMobileWrapper />
      </MobileMediaQuery>
    </AppContainer>
  </ModalContextProvider>
);

export default App;