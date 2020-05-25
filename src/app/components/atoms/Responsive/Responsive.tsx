import React, { memo } from 'react';
import MediaQuery from 'react-responsive';
import { sizes } from 'app/theme';

export const MobileMediaQuery = memo((props) => (
  <MediaQuery query={`(max-width: ${sizes.mobile / 16 - 1}em)`} {...props} />
));

export const TabletMediaQuery = memo((props) => (
  <MediaQuery
    query={`(min-width: ${sizes.mobile / 16 -
      1}em) and (max-width: ${sizes.tablet / 16 - 1}em)`}
    {...props}
  />
));

export const DesktopAndTabletsMediaQuery = memo((props) => (
  <MediaQuery query={`(min-width: ${sizes.mobile / 16 - 1}em)`} {...props} />
));

export const DesktopMediaQuery = memo((props) => (
  <MediaQuery query={`(min-width: ${sizes.tablet / 16 - 1}em)`} {...props} />
));
