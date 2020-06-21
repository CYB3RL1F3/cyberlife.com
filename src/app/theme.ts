import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';
import { isAndroid, isFirefox } from './utils/browsers';

export interface Theme {
  color: string;
  picturePlaceholder: string;
  isAndroid: boolean;
  isFirefox: boolean;
  fonts: {
    primary: string;
  };
  fontSizes: {
    small: string;
    average: string;
    big: string;
    menu: string;
  };
  background: {
    fromColor: string;
    toColor: string;
    color: string;
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
    acc[label] = (...args) =>
      label === 'desktop'
        ? css`
            @media screen and (min-width: ${sizes[label] / 16 - 1}em) {
              ${css(...args)}
            }
          `
        : css`
            @media screen and (max-width: ${sizes[label] / 16 - 1}em) {
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
  fontSizes: { small: '8pt', average: '10pt', big: '12pt', menu: '16pt' },
  isAndroid: isAndroid(),
  isFirefox: isFirefox(),
  picturePlaceholder: 'rgba(42, 43, 65, 0.5)',
  fonts: { 
    primary: 'myriad pro' 
  },
  background: { 
    fromColor: '#1B292C', 
    toColor: '#273e40',
    color: '#1D3D46'
  },
  player: { backgroundColor: '#1c2d2f', backgroundColorMini: '#457076' },
  slider: {
    color: 'rgba(108,161,166, 0.5)',
    focus: 'rgba(108,161,166, 0.6)',
    thumbBorder: '#324648',
    thumbShadow: 'rgba(0, 0, 0, 0.4)',
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
