import { TextStyle } from 'app/components/SharedStyled';
import styled from 'app/theme';

export const AutoCompleteHandler = styled.div`
  position: relative;
  width: 100%;
`;

export const AutoCompleteItemGroup = styled.div`
  position: absolute;
  z-index: 10;
  cursor: pointer;
  width: 100%;
  min-height: 2rem;
  background: black;
  top: 2.6rem;
  display: flex;
  flex-direction: column;
  max-height: 20rem;
  overflow-y: scroll;
`;

export const AutoCompleteItemStyled = styled.p`
  ${TextStyle};
  height: 2.5rem;
  min-height: 2.5rem;
  line-height: 2.5rem;
  padding-left: 1rem;
  width: 100%;
  display: inline-flex;
  font-size: ${({ theme }) => theme.fontSizes.big};
  color: ${({ theme }) => theme.color};
  box-sizing: border-box;
  ${({ theme }) => theme.media.mobile`
    margin: 0.25rem 0;
    height: 2.5rem;
    line-height: 2rem;
    padding-left: 1rem;
    font-size: ${({ theme }) => theme.fontSizes.big};
  `}
  &:hover {
    background: ${({ theme }) => theme.background.fromColor};
  }
`;
