import React, { FC, useCallback, useMemo, ReactChild, MouseEvent } from 'react';

import { observer } from 'mobx-react';
import { A } from './Link.styled';
import { useRouterStore } from 'app/hooks/stores';
import { paths } from "app/paths";

interface LinkProps {
  path: string;
  className?: string;
  underlineCurrent?: boolean;
  children: ReactChild;
  onClick?: () => any;
}

export const Link: FC<LinkProps> = observer(({ className, underlineCurrent, children, path, onClick }) => {
  const router = useRouterStore();
  const click = useCallback((e: MouseEvent) => {
    e.preventDefault();
    router.push(path);
    onClick && onClick();
  }, [path, router, onClick]);
  const isCurrent = useMemo((): boolean => {
    if (path === paths.podcasts)
      return (
        router.location.pathname === path ||
        router.location.pathname.indexOf('podcasts') > -1
      );
    return router.location.pathname.indexOf(path) > -1 && path !== '/';
  }, [router.location.pathname, path]);
  return (
    <A
      active={underlineCurrent && isCurrent}
      className={className}
      href={path}
      onClick={click}
    >
      {children}
    </A>
  );
});
