import styled, { css } from 'app/theme';

export const HeaderTextStyle = css`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 16pt;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color};
`;

export const Paragraph = styled.p`
  font-size: 24pt;
  font-style: italic;
`;
