import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { STORE_ROUTER, STORE_PLAYER } from 'app/constants/stores';
import { RouterStore } from 'app/stores';
import PlayerStore from 'app/stores/PlayerStore';
import { Sustain, Container } from './MiniPlayerMobileWrapper.styled';
import { MiniPlayer } from 'app/components/atoms/Player/MiniPlayer';

export interface MiniPlayerMobileWrapperProps {}

export interface MiniPlayerMobileWrapperState {}

@inject(STORE_ROUTER, STORE_PLAYER)
@observer
export class MiniPlayerMobileWrapper extends React.Component<
  MiniPlayerMobileWrapperProps,
  MiniPlayerMobileWrapperState
> {
  isActive = () => {
    const routerStore: RouterStore = this.props[STORE_ROUTER];
    const playerStore: PlayerStore = this.props[STORE_PLAYER];
    const { currentTrack } = playerStore;
    const isEligibleRoute: boolean = !/(\/podcast)/g.test(
      routerStore.location.pathname
    );
    return currentTrack && isEligibleRoute;
  };

  render() {
    const active = this.isActive();
    console.log(active);
    return (
      <>
        <Sustain active={active} />
        <Container active={active}>
          <MiniPlayer />
        </Container>
      </>
    );
  }
}
