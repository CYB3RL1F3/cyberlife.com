import styled from 'app/theme';
import { TextStyle } from 'app/components/atoms/SharedStyled';
import { Link as BaseLink } from 'app/components/atoms/Link';

export const Container = styled.div`
  margin: 1rem;
`;

export const Text = styled.p`
  ${TextStyle};
  font-size: ${({ theme }) => theme.fontSizes.big};
  margin: 1rem 0;
  line-height: 12pt;
`;

export const Link = styled(BaseLink)`
  ${TextStyle};
  font-size: ${({ theme }) => theme.fontSizes.big};
  line-height: 12pt;
  text-decoration: underline;
`;
