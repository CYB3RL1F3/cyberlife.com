import React from 'react';
import { ChildrenHandler as Container } from './Layout.styled';
import { inject, observer } from 'mobx-react';
import { STORE_ROUTER } from 'app/constants';
import { sizes } from 'app/theme';

@inject(STORE_ROUTER)
@observer
export class ChildrenHandler extends React.Component {
  contentHandler: React.RefObject<HTMLDivElement> = React.createRef<any>();
  componentDidUpdate() {
    if (this.isMobile()) this.contentHandler.current.scrollTop = 0;
  }

  isMobile = (): boolean =>
    window && window.document.body.clientWidth <= sizes.mobile;

  render() {
    if (this.isMobile())
      console.log('navigate to ', this.props[STORE_ROUTER].location.pathname);
    return (
      <Container ref={this.contentHandler}>{this.props.children}</Container>
    );
  }
}
