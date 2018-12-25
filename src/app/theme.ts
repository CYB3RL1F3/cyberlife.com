import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

export interface Theme {
  color: string;
  fonts: {
    primary: string;
  };
  background: {
    fromColor: string;
    toColor: string;
  };
}

export const theme: Theme = {
  color: '#6ca1a6',
  fonts: {
    primary: 'myriad pro'
  },
  background: {
    fromColor: '#3a5c5f',
    toColor: '#273e40'
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
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<Theme>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
