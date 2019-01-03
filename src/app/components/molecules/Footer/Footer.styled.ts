import styled from 'app/theme';
import {
  TextStyle,
  AlphaTransitionDelay
} from 'app/components/atoms/SharedStyled';

const height = '4vh';

export const Container = styled.footer`
  height: ${height};
  min-height: 1.5rem;
  max-height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Text = styled.p`
  ${TextStyle};
  font-size: 8pt;
  flex: 0.9;
  font-style: normal;
  line-height: ${height};
  padding: 0 1rem;
  box-sizing: border-box;
  margin: 0 auto;
  ${AlphaTransitionDelay(50)}
`;

export const VolumeContainer = styled.div`
  flex: 0.1;
  padding-right: 1rem;
`;
