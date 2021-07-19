import styled from 'app/theme';
import { AlphaTransitionDelay } from 'app/components/SharedStyled';

export const Container = styled.p`
  width: 10rem;
  display: inline-flex;
  height: inherit;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
  ${AlphaTransitionDelay(60)};
  ${({ theme }) => theme.media.desktop`
    padding-top: 0.3rem;
  `}
  @media(max-width: 360px) {
    width: 7rem;
  }
`;

export const InputHandler = styled.span`
  width: 8rem;
  height: 4.5vh;
  ${({ theme }) => theme.media.tablet`
      height: 2.5rem;
    `}
  display: flex;
  align-items: center;
  ${({ theme }) => theme.media.mobile`
      line-height: 3.1rem;
  `}
  & input {
    margin-bottom: 3px;
  }
`;

export const IconHandler = styled.label`
  width: 2rem;
  ${({ theme }) => theme.media.tablet`
    padding-top: 0;
  `}
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
`;

export const Icon = styled.img.attrs({
  width: "15px",
  height: "20px"
})`
  width: 15px;
  height: auto;
  padding-left: 5px;
  filter: brightness(80%);
  opacity: 0.5;
  ${({ theme }) => theme.media.desktop`
    &:hover {
      opacity: 1;
    }
  `};
`;
