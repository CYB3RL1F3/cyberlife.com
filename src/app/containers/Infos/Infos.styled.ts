import styled from 'app/theme';
import { TextStyle } from 'app/components/atoms/SharedStyled';

export const InfosBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  margin: 1rem;
`;

export const InfosContainer = styled.div`
  width: 46vw;
  height: 100%;
`;

export const Paragraph = styled.p`
  font-size: 8pt;
  ${TextStyle};
`;
