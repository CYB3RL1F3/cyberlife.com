import styled from "app/theme";
import { Spinner } from '../Loading/Loading.styled';

export interface Sizable {
  width: string;
  height: string;
}

export const Placeholder = styled.div<Sizable>`
  ${({ width, height }) => `
    width: ${width};
    height: ${height};
  `}
  position: relative;
  margin: auto;
`;

export const Loader = styled(Spinner)`
  width: 10px;
  height: 10px;
  position: absolute;
  top: calc(50% - 5px);
  left: calc(50% - 5px);
`
