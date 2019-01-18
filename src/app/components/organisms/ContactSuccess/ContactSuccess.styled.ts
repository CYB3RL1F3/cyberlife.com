import styled from 'app/theme';
import { TextStyle } from 'app/components/atoms/SharedStyled';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 2rem;
  ${({ theme }) => theme.media.mobile`
    margin: 1rem;
  `}
`;

export const H3 = styled.h3`
  ${TextStyle};
  font-size: 16pt;
  text-align: center;
  font-style: normal;
  line-height: 4rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const P = styled.p`
  ${TextStyle};
  font-size: 12pt;
  text-align: center;
  font-style: normal;
  letter-spacing: 0.5px;
  ${({ theme }) => theme.media.mobile`
    font-size: 10pt;
  `}
`;

export const A = styled.a`
  ${TextStyle};
  font-size: 8pt;
  text-align: center;
  font-style: normal;
  text-transform: uppercase;
  text-decoration: underline;
  cursor: pointer;
`;

export const LottieHandler = styled.div`
  margin: auto;
  width: 100%;
`;
