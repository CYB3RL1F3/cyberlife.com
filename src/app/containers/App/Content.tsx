import * as React from 'react';
import { Content as Container } from './App.styled';
import { inject, observer } from 'mobx-react';
import { STORE_ROUTER } from 'app/constants';

@inject(STORE_ROUTER)
@observer
export class Content extends React.Component {
  contentHandler: React.RefObject<HTMLDivElement> = React.createRef<any>();

  componentDidUpdate() {
    this.contentHandler.current.scrollTop = 0;
  }

  render() {
    console.log(this.props[STORE_ROUTER]);
    return (
      <Container ref={this.contentHandler}>{this.props.children}</Container>
    );
  }
}
