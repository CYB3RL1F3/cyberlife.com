import styled from 'app/theme';
import {
  TextStyle,
  AlphaTransitionDelay
} from 'app/components/atoms/SharedStyled';

const height = '4vh';

export const Container = styled.footer`
  height: ${height};
  min-height: 1.5rem;
`;

export const Text = styled.p`
  ${TextStyle};
  font-size: 8pt;
  font-style: normal;
  line-height: ${height};
  padding: 0 1rem;
  box-sizing: border-box;
  margin: 0 auto;
  ${AlphaTransitionDelay(50)}
`;
