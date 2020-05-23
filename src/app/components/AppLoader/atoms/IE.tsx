import React from 'react';
import { Container, Console, Output, Li, A } from '../AppLoader.styled';
interface Browser {
  href: string;
  title: string;
  id: string;
}

const browsers: Browser[] = [
  {
    id: 'brave',
    title: 'Brave',
    href: 'https://brave.com'
  },
  {
    id: 'torche',
    title: 'Torche Browser',
    href: 'https://torchbrowser.com/'
  },
  {
    id: 'maxthon',
    title: 'Maxthon',
    href: 'http://www.maxthon.com/'
  },
  {
    id: 'firefox',
    title: 'Firefox',
    href: 'https://www.mozilla.org/fr/firefox/new/'
  },
  {
    id: 'chrome',
    title: 'Google Chrome',
    href: 'https://www.google.com/chrome/'
  },
  {
    id: 'opera',
    title: 'Opera',
    href: 'https://www.opera.com/fr/'
  },
  {
    id: 'lunarscape',
    title: 'LunarScape',
    href: 'https://www.lunascape.tv/'
  }
];

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
        This website is unfortunately not compatible with your #!@$ browser. Sorry, please use
        a real one, like one of those followings : <br />
        <br />
      </Output>
      <Output>
        <ul>
          {browsers.map((browser: Browser) => (
            <Li key={browser.id}>
              <A href={browser.href}>{browser.title}</A>
            </Li>
          ))}
        </ul>
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
