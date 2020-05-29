import React, { FC, useMemo, useCallback, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import {
  Container,
  ButtonHandler
} from './MiniPlayer.styled';
import { TrackHandler } from 'app/components/molecules/PodcastItem/PodcastItem.styled';
import { useRouterStore, usePlayerStore } from 'app/hooks/stores';
import { PlayBtn, Track } from 'app/components/atoms';

export const MiniPlayer: FC = observer(() => {
  const routerStore = useRouterStore();
  const playerStore = usePlayerStore();
  const { currentTrack, onSeek, playing, pause, play } = playerStore;
  const { location } = routerStore;
  const isActive = useMemo(() => {
    const source = currentTrack && currentTrack.source;
    if (!source) return false;
    if (source === 'podcasts') {
      const isSubrouteOfPodcast = /(\/podcast)/g.test(location.pathname);
      const isRoot = location.pathname === '/';
      return !isRoot && !isSubrouteOfPodcast;
    }
    if (
      source.indexOf('release') > -1 &&
      location.pathname.indexOf('/releases/') > -1
    ) {
      const uri = location.pathname.replace('/releases/', '').split('/');
      const id: string | undefined = uri[0];
      return !id || (id.length && source !== `release_${id}`);
    }
    return true;
  }, [currentTrack, location.pathname]);

  const toggle = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (playing) {
      pause();
    } else {
      play(currentTrack);
    }
  }, [playerStore, playing, pause, play]);

  const opacity = useMemo(() => isActive ? 1 : 0, [isActive]);

  if (!currentTrack) return <div />;
  return (
    <Container opacity={opacity}>
      <ButtonHandler>
        <PlayBtn playing={currentTrack.playing} mini onClick={toggle} />
      </ButtonHandler>
      <TrackHandler>
        <Track isMini {...currentTrack} onSeek={onSeek} />
      </TrackHandler>
    </Container>
  );
});

export default MiniPlayer;