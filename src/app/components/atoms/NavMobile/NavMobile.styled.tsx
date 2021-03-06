import styled from 'app/theme';
import { TextStyle } from 'app/components/SharedStyled';
import { Link as BaseLink } from 'app/components/atoms/Link';

export interface NavMobileState {
  opened: boolean;
  blurred: boolean;
}

export const Menu = styled.div<NavMobileState>`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
  width: ${({ opened }) => (opened ? '100vw' : '0')};
  height: 100vh;
  transition: all 0.25s;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  overflow: hidden;
`;

export const Container = styled.nav`
  height: 100vh;
  width: 100vw;
  transition: width 0.25s;
  margin: 0;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  padding: 1rem 2rem;
`;

export const TitleHandler = styled.div`
  width: 100vw;
  height: 7.5vh;
  max-height: 3rem;
  border-bottom: solid 1px #ccc;
  display: flex;
  justify-content: space-between;
`;

export const A = styled.a`
  display: inline-block;
  margin: 0.8rem;
  height: 4rem;
  position: absolute;
  right: 0;
  top: 0.4rem;
`;

export const Img = styled.img`
  width: 1.5rem;
  height: auto;
  opacity: 0.8;
`;

export const Title = styled.h3`
  ${TextStyle};
  font-weight: normal;
  font-size: 20pt;
  text-transform: uppercase;
  letter-spacing: 2px;
  height: 2rem;
  line-height: 2.5rem;
`;

export const Close = styled.a``;

export const MenuHandler = styled.ul`
  list-style: none;
  margin: 2rem 0;
`;

export interface Active {
  isActive: boolean;
}

export const MenuItem = styled.li<Active>`
  color: ${({ isActive }) => (isActive ? 'white' : '#AAA')};
  margin: 0;
  padding: 0;
  width: 100%;
  height: 3rem;
`;

export const Link = styled(BaseLink)`
  ${TextStyle};
  font-size: 16pt;
  display: inline-block;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: left;
  color: inherit;
  text-transform: uppercase;
`;
