import * as React from 'react';
import { A, Img } from './MenuBtn.styled';
import { NavMobile } from 'app/components/organisms/NavMobile';

export class MenuBtn extends React.Component<{}, {}> {
  nav: React.RefObject<any> = React.createRef();
  toggle = () => {
    this.nav && this.nav.current.wrappedInstance.toggle();
  };
  render() {
    return (
      <>
        <A onClick={this.toggle}>
          <Img src={require('assets/images/menu.svg')} alt="MENU" />
        </A>
        <NavMobile ref={this.nav} />
      </>
    );
  }
}
