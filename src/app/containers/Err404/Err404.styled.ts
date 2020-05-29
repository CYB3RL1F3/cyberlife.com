import styled from 'app/theme';
import { TextStyle } from 'app/components/SharedStyled';
import { Link as BaseLink } from 'app/components/atoms/Link';

export const Container = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  ${({ theme }) => theme.media.mobile`
    margin: 1rem;
  `}
`;

export const ErrorTitle = styled.h3`
  ${TextStyle};
  font-size: 26pt;
  font-style: normal;
  font-weight: 900;
  line-height: 30pt;
  height: 30pt;
`;

export const ErrorMessage = styled.p`
  ${TextStyle};
  font-size: 14pt;
`;

export const GetBack = styled(BaseLink)`
  ${TextStyle};
  text-decoration: underline;
  font-size: 15pt;
`;

export const ErrorHandler = styled(ErrorMessage)`
  margin-top: 2rem;
  position: absolute;
  bottom: 3rem;
  text-align: center;
  width: 100%;
  height: 1rem;
  line-height: 2rem;
`;
