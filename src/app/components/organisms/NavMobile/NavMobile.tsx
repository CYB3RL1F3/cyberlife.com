import * as React from 'react';
import routes, { RouteType, getRouteByKey } from 'app/routes';

import { inject, observer } from 'mobx-react';
import { STORE_ROUTER } from '../../../constants/stores';
import {
  Container,
  Menu,
  Title,
  MenuHandler,
  MenuItem,
  Link,
  TitleHandler,
  A,
  Img
} from './NavMobile.styled';
import { RouterStore } from 'app/stores';

export interface NavMobileState {
  opened: boolean;
}

export interface NavMobileProps {}

@inject(STORE_ROUTER)
@observer
export class NavMobile extends React.Component<NavMobileProps, NavMobileState> {
  state = {
    opened: false
  };

  toggle = () => {
    this.setState({
      opened: !this.state.opened
    });
  };

  isCurrent = (pathname: string): boolean => {
    const store: RouterStore = this.props[STORE_ROUTER];
    return store.location.pathname === pathname;
  };

  render() {
    const { opened } = this.state;
    const biography = getRouteByKey('bio');
    return (
      <Menu opened={opened}>
        <Container>
          <TitleHandler>
            <Title>Menu</Title>
            <A onClick={this.toggle}>
              <Img src={require('assets/images/close-button.svg')} />
            </A>
          </TitleHandler>
          <MenuHandler>
            <MenuItem
              key={`route__${biography.key}`}
              isActive={this.isCurrent(biography.path)}
            >
              <Link onClick={this.toggle} path={biography.path}>
                {biography.label}
              </Link>
            </MenuItem>
            {routes.map(
              (route: RouteType): JSX.Element =>
                route.menu && (
                  <MenuItem
                    key={`route__${route.key}`}
                    isActive={this.isCurrent(route.path)}
                  >
                    <Link onClick={this.toggle} path={route.path}>
                      {route.label}
                    </Link>
                  </MenuItem>
                )
            )}
          </MenuHandler>
        </Container>
      </Menu>
    );
  }
}
