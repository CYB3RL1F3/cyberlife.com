import styled from "app/theme";
import { TextStyle } from "../SharedStyled";

export const Button = styled.a`
  ${TextStyle};
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.average};
  width: 100%;
  height: 2rem;
  margin-top: 0.5rem;
  font-style: normal;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  line-height: 2.3rem;
  border-radius: 2px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.4);
  &:hover {
    background-color: #182729;
  }
`;