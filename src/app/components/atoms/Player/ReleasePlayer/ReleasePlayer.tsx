import * as React from 'react';
import { TrackModel } from 'app/models';
import { STORE_PLAYER } from 'app/constants/stores';
import { PlayerStore } from 'app/stores/PlayerStore';
import { inject, observer } from 'mobx-react';
import { Track } from '../Track';
import { Container, Handler, Title } from './ReleasePlayer.styled';

import {
  ButtonHandler,
  TrackHandler,
  IconPlay,
  PlayBtn
} from '../MiniPlayer/MiniPlayer.styled';

type ReleasePlayerProps = {
  track: TrackModel;
  title: string;
};

@inject(STORE_PLAYER)
@observer
export class ReleasePlayer extends React.Component<ReleasePlayerProps> {
  toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const store: PlayerStore = this.props[STORE_PLAYER] as PlayerStore;
    if (store.playing) {
      store.pause();
    } else {
      store.play(this.props.track);
    }
  };

  render() {
    const { track, title } = this.props;
    const store: PlayerStore = this.props[STORE_PLAYER];
    const opacity = track.playing ? 1 : 0.5;
    return (
      <Handler>
        <Title>{title}</Title>
        <Container opacity={opacity}>
          <ButtonHandler>
            <PlayBtn onClick={this.toggle}>
              <IconPlay playing={track.playing} />
            </PlayBtn>
          </ButtonHandler>
          <TrackHandler>
            <Track isMini={false} {...track} onSeek={store.onSeek} />
          </TrackHandler>
        </Container>
      </Handler>
    );
  }
}
