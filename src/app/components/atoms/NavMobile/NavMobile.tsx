import * as React from 'react';
import routes, { RouteType, getRouteByKey } from 'app/routes';
import BackdropFilter from 'react-backdrop-filter';

import { inject, observer } from 'mobx-react';
import { STORE_ROUTER } from 'app/constants/stores';
import {
  Container,
  Menu,
  Title,
  MenuHandler,
  MenuItem,
  Link,
  TitleHandler,
  A,
  Img,
  NavMobileState
} from './NavMobile.styled';
import { RouterStore } from 'app/stores';

export interface NavMobileProps {}

@inject(STORE_ROUTER)
@observer
export class NavMobile extends React.Component<NavMobileProps, NavMobileState> {
  state = {
    opened: false,
    blurred: false
  };
  routes: RouteType[];

  constructor(props, context) {
    super(props, context);
    this.routes = this.getRoutes();
  }

  onBlurred = () => {
    this.setState({
      blurred: true
    });
  };

  toggle = () => {
    this.setState({
      opened: !this.state.opened
    });
  };

  isCurrent = (pathname: string): boolean => {
    const store: RouterStore = this.props[STORE_ROUTER];
    if (pathname === '/')
      return (
        store.location.pathname === pathname ||
        store.location.pathname.indexOf('podcasts') > -1
      );
    return store.location.pathname.indexOf(pathname) > -1 && pathname !== '/';
  };

  getRoutes = () => {
    const arr: RouteType[] = routes.filter(
      (route: RouteType) => route.menu === true
    );
    const biography = { ...getRouteByKey('bio'), menu: true };
    arr.splice(1, 0, biography);
    return arr;
  };

  render() {
    const { opened } = this.state;
    return (
      <Menu opened={opened}>
        <BackdropFilter
          filter={'blur(8px)'}
          shouldDraw={!this.state.blurred}
          onDraw={this.onBlurred}
        >
          <Container>
            <TitleHandler>
              <Title>Menu</Title>
              <A onClick={this.toggle}>
                <Img
                  src={require('assets/images/close-button.svg')}
                  alt="Close"
                />
              </A>
            </TitleHandler>
            <MenuHandler>
              {this.routes.map(
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
        </BackdropFilter>
      </Menu>
    );
  }
}
