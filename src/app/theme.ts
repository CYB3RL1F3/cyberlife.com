import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

export interface Theme {
  color: string;
  picturePlaceholder: string;
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
}

export const theme: Theme = {
  color: '#6ca1a6',
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
  }
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
