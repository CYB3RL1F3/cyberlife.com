import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';
import { isAndroid } from './utils/browsers';

export interface Theme {
  color: string;
  picturePlaceholder: string;
  isAndroid: boolean;
  fonts: {
    primary: string;
  };
  background: {
    fromColor: string;
    toColor: string;
  };
  player: {
    backgroundColor: string;
    backgroundColorMini: string;
  };
  slider: {
    color: string;
    thumbBorder: string;
    thumbShadow: string;
    thumbColor: string;
    focus: string;
  };
  media: {
    desktop: () => any;
    tablet: () => any;
    mobile: () => any;
  };
}

export const sizes = {
  desktop: 1024,
  tablet: 960,
  mobile: 768
};

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce(
  (acc, label) => {
    acc[label] = (...args) => css`
      @media screen and (max-width: ${sizes[label] / 16}em) {
        ${css(...args)}
      }
    `;

    return acc;
  },
  {
    desktop: null,
    tablet: null,
    mobile: null
  }
);

export const theme: Theme = {
  color: '#6ca1a6',
  isAndroid: isAndroid(),
  picturePlaceholder: 'rgba(42, 43, 65, 0.5)',
  fonts: {
    primary: 'myriad pro'
  },
  background: {
    fromColor: '#3a5c5f',
    toColor: '#273e40'
  },
  player: {
    backgroundColor: '#1c2d2f',
    backgroundColorMini: '#457076'
  },
  slider: {
    color: '#1c2d2f',
    focus: '#1f3a3a',
    thumbBorder: 'rgba(0, 0, 0, 0.4)',
    thumbShadow: 'rgba(0, 0, 0, 0.2)',
    thumbColor: 'rgba(255, 255, 255, 0.3)'
  },
  media
};

export interface WithThemeProps {
  theme: Theme;
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  withTheme,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<Theme>;

export { css, withTheme, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
