import styled from 'app/theme';
import { TextStyle } from 'app/components/atoms/SharedStyled';

export interface Failable {
  asFail: boolean;
}

export const Container = styled.div`
  margin: ${({ asFail }) => (asFail ? '1rem' : '0')};
  ${({ theme }) => theme.media.mobile`
    margin: 0;
    display: flex;
    flex-direction: column;
  `}
`;

export const NoPast = styled.p`
  ${TextStyle}
  font-size: ${({ theme }) => theme.fontSizes.big};
  color: #bb1211;
`;
