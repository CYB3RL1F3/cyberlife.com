import React from 'react';
import { inject, observer } from 'mobx-react';
import { STORE_PLAYER, STORE_ROUTER } from 'app/constants/stores';
import RouterStore from 'app/stores/RouterStore';
import { PlayerStore } from 'app/stores';
import {
  Container,
  ButtonHandler,
  IconPlay,
  PlayBtn
} from './MiniPlayer.styled';
import { TrackHandler } from 'app/components/molecules/PodcastItem/PodcastItem.styled';
import { Track } from '../Track';

@inject(STORE_PLAYER, STORE_ROUTER)
@observer
export class MiniPlayer extends React.Component {
  isActive = () => {
    const store: RouterStore = this.props[STORE_ROUTER];
    const playerStore: PlayerStore = this.props[STORE_PLAYER];
    const source =
      playerStore &&
      playerStore.currentTrack &&
      playerStore.currentTrack.source;
    if (!source) return false;
    if (source === 'podcasts') {
      const isSubrouteOfPodcast = /(\/podcast)/g.test(store.location.pathname);
      const isRoot = store.location.pathname === '/';
      return !isRoot && !isSubrouteOfPodcast;
    }
    if (
      source.indexOf('release') > -1 &&
      store.location.pathname.indexOf('/releases/') > -1
    ) {
      const uri = store.location.pathname.replace('/releases/', '').split('/');
      const id: string | undefined = uri[0];
      return !id || (id.length && source !== `release_${id}`);
    }
    return true;
  };

  toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const store: PlayerStore = this.props[STORE_PLAYER] as PlayerStore;
    if (store.playing) {
      store.pause();
    } else {
      store.play(store.currentTrack);
    }
  };

  render() {
    const store: PlayerStore = this.props[STORE_PLAYER] as PlayerStore;
    const { currentTrack, onSeek } = store;
    const opacity = this.isActive() ? 1 : 0;
    if (!currentTrack) return <div />;
    return (
      <Container opacity={opacity}>
        <ButtonHandler>
          <PlayBtn onClick={this.toggle}>
            <IconPlay playing={store.playing} />
          </PlayBtn>
        </ButtonHandler>
        <TrackHandler>
          <Track isMini {...currentTrack} onSeek={onSeek} />
        </TrackHandler>
      </Container>
    );
  }
}
