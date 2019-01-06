import * as React from 'react';
import MediaQuery from 'react-responsive';
import { sizes } from 'app/theme';

export const MobileMediaQuery = (props) => (
  <MediaQuery query={`(max-width: ${sizes.mobile / 16 - 1}em)`} {...props} />
);

export const TabletMediaQuery = (props) => (
  <MediaQuery
    query={`(min-width: ${sizes.mobile / 16 -
      1}em) and (max-width: ${sizes.tablet / 16 - 1}em)`}
    {...props}
  />
);

export const DesktopAndTabletsMediaQuery = (props) => (
  <MediaQuery query={`(min-width: ${sizes.mobile / 16 - 1}em)`} {...props} />
);

export const DesktopMediaQuery = (props) => (
  <MediaQuery query={`(min-width: ${sizes.tablet / 16 - 1}em)`} {...props} />
);
