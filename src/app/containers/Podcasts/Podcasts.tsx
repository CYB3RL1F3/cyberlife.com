import React, { FC, useCallback, MouseEvent } from 'react';
import PlaylistModel from 'app/models/PodcastModel';
import { Stores } from 'app/constants/stores';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';
import { PodcastItem } from 'app/components/molecules/PodcastItem';
import { Container, Unavailable } from './Podcasts.styled';
import { TrackModel } from 'app/models';
import { observer } from 'mobx-react';
import { usePlayerStore } from 'app/hooks/stores';

export interface PlaylistProps {
  data: PlaylistModel;
}

export const PodcastsComponent: FC<PlaylistProps> = observer(({ data }) => {
  const store = usePlayerStore();
  const { currentTrack, play, pause, onSeek } = store;
  const onPlay = useCallback((e: MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    const track = data.tracks[index];
    if (
      !currentTrack ||
      (currentTrack && currentTrack.title !== track.title) ||
      (currentTrack && !currentTrack.playing)
    ) {
      play(track);
    } else {
      pause();
    }
  }, [currentTrack, data, play, pause]);
  if (data && data.tracks && data.tracks.length) {
    return (
      <Container>
        {data.tracks.map(
          (track: TrackModel, index: number): JSX.Element => {
            return (
              <PodcastItem
                onPlay={onPlay}
                onSeek={onSeek}
                index={index}
                key={track.id}
                {...track}
              />
            );
          }
        )}
      </Container>
    );
  } else {
    return (
      <Container>
        <Unavailable>There is no Cyberlife's podcasts available right now... :(</Unavailable>
      </Container>
    )
  }
});

export const Podcasts = withLoadingStore(Stores.podcasts)(PodcastsComponent);

export default Podcasts;