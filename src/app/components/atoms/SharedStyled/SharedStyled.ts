import { css } from 'app/theme';

export const HeaderTextStyle = css`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 16pt;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color};
`;

export const TextStyle = css`
  font-style: italic;
  color: ${({ theme }) => theme.color};
  font-family: ${({ theme }) => theme.fonts.primary};
`;
