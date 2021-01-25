import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';
import { isAndroid, isFirefox } from './utils/browsers';
import myriadProEot from "../assets/fonts/MyriadPro.eot";
import myriadProOtf from "../assets/fonts/MyriadPro.otf";
import myriadProTtf from "../assets/fonts/MyriadPro.ttf";
import myriadProWoff from "../assets/fonts/MyriadPro.woff";
import myriadProWoff2 from "../assets/fonts/MyriadPro.woff2";
import myriadProSvg from "../assets/fonts/MyriadPro.svg";
import myriadProEotItalic from "../assets/fonts/MyriadProItalic.eot";
import myriadProOtfItalic from "../assets/fonts/MyriadProItalic.otf";
import myriadProTtfItalic from "../assets/fonts/MyriadProItalic.ttf";
import myriadProWoffItalic from "../assets/fonts/MyriadProItalic.woff";
import myriadProWoff2Italic from "../assets/fonts/MyriadProItalic.woff2";
import myriadProSvgItalic from "../assets/fonts/MyriadProItalic.svg";


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
    dark: string;
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
  errors: {
    text: string;
    background: string;
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
  fontSizes: { 
    small: '8pt', 
    average: '10pt', 
    big: '12pt', 
    menu: '16pt'
  },
  isAndroid: isAndroid(),
  isFirefox: isFirefox(),
  picturePlaceholder: 'rgba(42, 43, 65, 0.5)',
  fonts: { 
    primary: 'myriad-pro' 
  },
  background: { 
    fromColor: '#1B292C', 
    toColor: '#273e40',
    color: '#1D3D46',
    dark: 'rgba(6, 11, 11, 0.57)'
  },
  player: { 
    backgroundColor: '#1c2d2f', 
    backgroundColorMini: '#457076' 
  },
  slider: {
    color: 'rgba(108,161,166, 0.5)',
    focus: 'rgba(108,161,166, 0.6)',
    thumbBorder: '#324648',
    thumbShadow: 'rgba(0, 0, 0, 0.4)',
    thumbColor: 'rgba(255, 255, 255, 0.3)'
  },
  errors: {
    text: 'rgba(188, 11, 26, 0.8)',
    background: 'rgba(244, 12, 26, 0.3)'
  },
  media
};


export const GlobalStyle = styledComponents.createGlobalStyle`
@font-face {
  font-family: "myriad-pro";
  src: url(${myriadProEot}); /* IE9 Compat Modes */
  src: url("./fonts/MyriadPro.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
    url(${myriadProOtf}) format("opentype"), /* Open Type Font */
    url(${myriadProSvg}) format("svg"), /* Legacy iOS */
    url(${myriadProTtf}) format("truetype"), /* Safari, Android, iOS */
    url(${myriadProWoff}) format("woff"), /* Modern Browsers */
    url(${myriadProWoff2}) format("woff2"); /* Modern Browsers */
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: "myriad-pro";
  src: url(${myriadProEotItalic});
  src: url("./fonts/MyriadProItalic.eot?#iefix") format("embedded-opentype"),
    url(${myriadProOtfItalic}) format("opentype"), 
    url(${myriadProSvgItalic}) format("svg"), 
    url(${myriadProTtfItalic}) format("truetype"),
    url(${myriadProWoffItalic}) format("woff"),
    url(${myriadProWoff2Italic}) format("woff2");
  font-weight: 600;
  font-style: italic;
}
`;

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
