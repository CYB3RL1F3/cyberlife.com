import * as React from 'react';
import { Container, Console, Output } from '../AppLoader.styled';
import { WebbrowserList } from './WebBrowsersList';

export const IE = () => (
  <Container>
    <Console>
      <Output>
        <strong>
          <u>Cyberlife.com</u> loading process
        </strong>
      </Output>
      <br />
      <Output>
        This website is not compatible with your #!@$ browser. Sorry, please use
        a real one, like one of the followings : <br />
        <br />
      </Output>
      <Output>
        <WebbrowserList />
      </Output>
      <Output>
        <br />
        It's for your comfort, sure you'll be grateful !! :)
      </Output>
      <Output>
        <br />
        Have a nice day !!
      </Output>
    </Console>
  </Container>
);
