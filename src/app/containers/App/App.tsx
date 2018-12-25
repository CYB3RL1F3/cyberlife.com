import * as React from 'react';
import { Layout } from 'app/components';
import { Header } from 'app/components/organisms';
import { Content, Container, Handler } from './App.styled';

require('assets/main.css');

export class App extends React.Component {
  render() {
    return (
      <Layout>
        <Header />
        <Container>
          <Content>
            <Handler>{this.props.children}</Handler>
          </Content>
        </Container>
      </Layout>
    );
  }
}
