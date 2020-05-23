import React from 'react';
import PlaylistModel from 'app/models/PodcastModel';
import { Stores } from 'app/constants/stores';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';
import { PodcastItem } from 'app/components/molecules/PodcastItem';
import { Container } from './Podcasts.styled';
import { TrackModel } from 'app/models';
import { inject, observer } from 'mobx-react';
import { PlayerStore } from 'app/stores';

export interface PlaylistProps {
  data: PlaylistModel;
  [Stores.player]: PlayerStore;
}

@inject(Stores.player)
@observer
export class PodcastsComponent extends React.Component<PlaylistProps, {}> {
  constructor(props: PlaylistProps, context: any) {
    super(props, context);
  }

  play = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const store: PlayerStore = this.props[Stores.player];
    const track = this.props.data.tracks[index];
    if (
      !store.currentTrack ||
      (store.currentTrack && store.currentTrack.title !== track.title) ||
      (store.currentTrack && !store.currentTrack.playing)
    ) {
      store.play(track);
    } else {
      store.pause();
    }
  };

  render() {
    const { data } = this.props;
    const { onSeek } = this.props[Stores.player] as PlayerStore;
    if (data) {
      return (
        <Container>
          {data.tracks.map(
            (track: TrackModel, index: number): JSX.Element => {
              return (
                <PodcastItem
                  onPlay={this.play(index)}
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
      return <div />;
    }
  }
}
export const Podcasts = withLoadingStore(Stores.podcasts)(PodcastsComponent);
