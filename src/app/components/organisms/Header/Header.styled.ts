import styled from 'app/theme';
import { Link as BaseLink } from 'app/components/atoms';
import {
  HeaderTextStyle,
  DownTransitionDelay
} from 'app/components/atoms/SharedStyled';

export const Link = styled(BaseLink)`
  ${HeaderTextStyle};
  ${({ theme }) => theme.media.mobile`
    font-size: 20pt;
    line-height: 4rem;
    height: 4rem;
    display: inline-block;
  `}
`;

export const Container = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 3rem;
`;

export const Cyberlife = styled.h1`
  padding: 1rem;
  text-align: left;
  font-weight: normal;
  line-height: 1.1rem;
  ${DownTransitionDelay(0.5)}
  ${({ theme }) => theme.media.mobile`
    font-size: 20pt;
    line-height: 4rem;
    height: 4rem;
    display: inline-block;
  `}
`;
