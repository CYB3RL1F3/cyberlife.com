import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Container, Handler, Wrapper } from './MiniPlayerMobileWrapper.styled';
import { MiniPlayer } from 'app/components/atoms/Player/MiniPlayer';
import { useRouterStore, usePlayerStore } from 'app/hooks/stores';

export const MiniPlayerMobileWrapper: FC = observer(() => {
  const routerStore = useRouterStore();
  const playerStore = usePlayerStore();
  const { currentTrack } = playerStore;
  const { location } = routerStore;
  const active = useMemo(() => {
    if (!currentTrack) return false;
    const { id, source } = currentTrack;
    if (source === 'podcasts') {
      return location.pathname.indexOf(`podcasts/${id}`) === -1;
    }
    if (
      source.indexOf('release') > -1 &&
      location.pathname.indexOf('/releases/') > -1
    ) {
      const uri = location.pathname
        .replace('/releases/', '')
        .split('/');
      const idRelease: string | undefined = uri[0];
      return (
        !idRelease || (idRelease.length && source !== `release_${idRelease}`)
      );
    }
    return true;
  }, [currentTrack, location.pathname]);
  return (
    <Handler active={active}>
      <Wrapper>
        <Container active={active}>
          <MiniPlayer />
        </Container>
      </Wrapper>
    </Handler>
  );
});

/*
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
      return location.pathname.indexOf(`podcasts/${id}`) === -1;
    }
    if (
      source.indexOf('release') > -1 &&
      location.pathname.indexOf('/releases/') > -1
    ) {
      const uri = location.pathname
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
*/