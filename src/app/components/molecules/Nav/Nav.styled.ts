import styled from 'app/theme';
import { Link as BaseLink } from 'app/components/atoms';
import { HeaderTextStyle } from 'app/components/atoms/SharedStyled';

export const NavContainer = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 1rem;
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
