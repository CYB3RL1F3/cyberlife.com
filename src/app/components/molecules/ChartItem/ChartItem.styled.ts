import styled, { css } from 'app/theme';
import { TextStyle } from 'app/components/atoms/SharedStyled';
import { Link as BaseLink } from 'app/components/atoms';

const style = css`
  ${TextStyle};
  font-size: 10pt;
`;

export const Paragraph = styled.p`
  ${style};
`;

export const Link = styled(BaseLink)`
  ${style};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 1rem;
`;
