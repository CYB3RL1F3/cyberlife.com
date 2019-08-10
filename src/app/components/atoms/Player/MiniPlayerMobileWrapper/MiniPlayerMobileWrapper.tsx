import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { STORE_ROUTER, STORE_PLAYER } from 'app/constants/stores';
import { RouterStore } from 'app/stores';
import PlayerStore from 'app/stores/PlayerStore';
import { Container, Handler, Wrapper } from './MiniPlayerMobileWrapper.styled';
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
    if (!currentTrack) return false;
    const { id, source } = currentTrack;
    if (source === 'podcasts') {
      return routerStore.location.pathname.indexOf(`podcasts/${id}`) === -1;
    }
    if (
      source.indexOf('release') > -1 &&
      routerStore.location.pathname.indexOf('/releases/') > -1
    ) {
      const uri = routerStore.location.pathname
        .replace('/releases/', '')
        .split('/');
      const idRelease: string | undefined = uri[0];
      return (
        !idRelease || (idRelease.length && source !== `release_${idRelease}`)
      );
    }
    return true;
  };

  render() {
    const active = this.isActive();
    return (
      <Handler active={active}>
        <Wrapper>
          <Container active={active}>
            <MiniPlayer />
          </Container>
        </Wrapper>
      </Handler>
    );
  }
}
