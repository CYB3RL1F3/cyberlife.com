import styled, { css } from 'app/theme';

export interface Activable {
  active: boolean;
}

const focus = css`
  cursor: pointer;
  text-decoration: underline;
`;

export const A = styled.a<Activable>`
  &:hover {
    ${focus}
  }
  ${({ active }) => (active ? focus : '')}
`;
