
import { Spinner } from 'app/components/atoms/Loading/Loading.styled';
import {
  TextStyle
} from 'app/components/SharedStyled';
import styled from 'app/theme';

export const Container = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;


export const LoadingSpinner = styled(Spinner)`
  width: 1rem;
  height: 1rem;
  margin: 0;
  position: absolute;
  left: 1rem;
  top: 1px;
`;

export const SpinnerHandler = styled.span`
  height: 1rem;
  width: 1rem;
  position: relative;
`;

export const A = styled.a`
  ${TextStyle};
  font-size: ${({ theme }) => theme.fontSizes.average};
  margin-left: 1rem;
  line-height: 4rem;
`;