import * as React from 'react';

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
}

@inject(STORE_ROUTER)
@observer
export class Link extends React.Component<LinkProps> {
  onClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.router.push(path);
  };
  render() {
    const { className, path, router, children, underlineCurrent } = this.props;
    return (
      <A
        active={underlineCurrent && router.location.pathname === path}
        className={className}
        href={path}
        onClick={this.onClick(path)}
      >
        {children}
      </A>
    );
  }
}
