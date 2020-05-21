import React from 'react';
import { Content as Container } from './App.styled';
import { inject, observer } from 'mobx-react';
import { STORE_ROUTER } from 'app/constants';
import { sizes } from 'app/theme';

@inject(STORE_ROUTER)
@observer
export class Content extends React.Component {
  contentHandler: React.RefObject<HTMLDivElement> = React.createRef<any>();
  componentDidUpdate() {
    if (this.isTabletOrDesktop()) this.contentHandler.current.scrollTop = 0;
  }
  isTabletOrDesktop = () =>
    window && window.document.body.clientWidth > sizes.mobile;
  render() {
    if (this.isTabletOrDesktop())
      console.log('navigate to ', this.props[STORE_ROUTER].location.pathname);
    return (
      <Container ref={this.contentHandler}>{this.props.children}</Container>
    );
  }
}
