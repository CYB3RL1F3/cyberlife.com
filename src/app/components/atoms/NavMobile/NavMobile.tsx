import React, { FC, useState, useCallback, useMemo, lazy, Suspense } from 'react';
import routes, { RouteType, getRouteByKey } from 'app/routes';

import { observer } from 'mobx-react';
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
} from './NavMobile.styled';
import { useRouterStore } from 'app/hooks/stores';

const BackdropFilter = lazy(() => import(/* webpackPrefetch: true */ 'react-backdrop-filter'));

const closeButton = require('assets/images/close-button.svg').default;
interface NavMobileProps {
  onClose: () => void;
  opened: boolean;
}

const NavMobile: FC<NavMobileProps> = observer(({ opened, onClose }) => {
  const router = useRouterStore();
  const [blurred, blur] = useState<boolean>(false);
  const onBlurred = useCallback(() => blur(true), [blur]);
  const menuItems = useMemo(() => {
    const arr: RouteType[] = routes.filter(
      (route: RouteType) => route.menu === true
    );
    const biography = { ...getRouteByKey('bio'), menu: true };
    arr.splice(1, 0, biography);
    return arr;
  }, []);

  const isCurrent = useCallback((path: string) => {
    if (path === '/')
      return (
        router.location.pathname === path ||
        router.location.pathname.indexOf('podcasts') > -1
      );
    return router.location.pathname.indexOf(path) > -1 && path !== '/';
  }, [router.location.pathname]);

  return (
      <Menu opened={opened}>
        <Suspense fallback={<div />}>
          <BackdropFilter
            filter={'blur(7px)'}
            shouldDraw={!blurred}
            onDraw={onBlurred}
          >
            <Container>
              <TitleHandler>
                <Title>Menu</Title>
                <A onClick={onClose}>
                  <Img
                    src={closeButton}
                    alt="Close"
                  />
                </A>
              </TitleHandler>
              <MenuHandler>
                {menuItems.map(
                  (route: RouteType): JSX.Element =>
                    route.menu && (
                      <MenuItem
                        key={`route__${route.key}`}
                        isActive={isCurrent(route.path)}
                      >
                        <Link onClick={onClose} path={route.path}>
                          {route.label}
                        </Link>
                      </MenuItem>
                    )
                )}
              </MenuHandler>
            </Container>
          </BackdropFilter>
        </Suspense>
      </Menu>
    );
});

export default NavMobile;