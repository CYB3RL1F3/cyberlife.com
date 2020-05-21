import React from 'react';

import { inject, observer } from 'mobx-react';
import { STORE_ROUTER } from 'app/constants/stores';
import { RouterStore } from 'app/stores';
import { A } from './Link.styled';

interface LinkProps {
  path: string;
  router?: RouterStore;
  className?: string;
  underlineCurrent?: boolean;
  children: React.ReactChild;
  onClick?: () => any;
}

@inject(STORE_ROUTER)
@observer
export class Link extends React.Component<LinkProps> {
  onClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.router.push(path);
    this.props.onClick && this.props.onClick();
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
  render() {
    const { className, path, children, underlineCurrent } = this.props;
    return (
      <A
        active={underlineCurrent && this.isCurrent(path)}
        className={className}
        href={path}
        onClick={this.onClick(path)}
      >
        {children}
      </A>
    );
  }
}
