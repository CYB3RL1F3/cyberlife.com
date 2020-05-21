import React from 'react';
import { Li, A } from '../AppLoader.styled';

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
    id: 'chrome',
    title: 'Google Chrome',
    href: 'https://www.google.com/chrome/'
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

export const WebbrowserList = (): JSX.Element => (
  <ul>
    {browsers.map((browser: Browser) => (
      <Li key={browser.id}>
        <A href={browser.href}>{browser.title}</A>
      </Li>
    ))}
  </ul>
);
