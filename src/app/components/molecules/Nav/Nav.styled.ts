import styled from 'app/theme';
import { Link as BaseLink } from 'app/components/atoms/Link';
import {
  HeaderTextStyle,
  DownTransitionDelay
} from 'app/components/SharedStyled';

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 1rem;
  ${DownTransitionDelay(0.5)}
`;

export const Link = styled(BaseLink)`
  margin: 0 0.25rem;
  ${HeaderTextStyle};
`;

export const Dash = styled.span`
  &:before {
    ${HeaderTextStyle};
    content: '-';
  }
`;
