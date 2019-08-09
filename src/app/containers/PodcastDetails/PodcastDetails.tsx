import * as React from 'react';
import { STORE_SELECTED_PODCAST, STORE_PLAYER } from 'app/constants/stores';
import { TrackModel } from 'app/models/TrackModel';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';
import { SelectedPodcastStore } from 'app/stores/SelectedPodcastStore';
import { format } from 'date-fns';

import {
  Container,
  TitleHandler,
  Title,
  DataContainer,
  TextHandler,
  TrackHandler,
  P,
  A,
  Description,
  GoBack,
  Tag
} from './PodcastDetails.styled';
import { ThumbHandler } from 'app/components/molecules/PodcastItem/PodcastItem.styled';
import { PlayBtn, Track } from 'app/components/atoms/Player';
import { inject, observer } from 'mobx-react';
import { PlayerStore } from 'app/stores';
import {
  DescriptionHandler,
  TagList,
  DownloadBtn
} from './PodcastDetails.styled';
import { parseHtml } from 'app/utils/html';

interface PodcastDetailsProps {
  data: TrackModel;
  [STORE_SELECTED_PODCAST]: SelectedPodcastStore;
  [STORE_PLAYER]: PlayerStore;
}

@inject(STORE_PLAYER)
@observer
export class PodcastDetailsComponent extends React.Component<
  PodcastDetailsProps
> {
  constructor(props, context) {
    super(props, context);
  }

  play = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const store: PlayerStore = this.props[STORE_PLAYER];
    if (
      !store.currentTrack ||
      (store.currentTrack &&
        store.currentTrack.title !== this.props.data.title) ||
      (store.currentTrack && !store.currentTrack.playing)
    ) {
      store.play(this.props.data);
    } else {
      store.pause();
    }
  };

  computeDuration = (duration) => {
    const d = new Date(duration);
    return `0${d.getHours() - 1}:${d.getMinutes()}:${d.getSeconds()}`;
  };

  render() {
    const { data } = this.props;
    if (data) {
      const {
        title,
        artwork,
        playing,
        date,
        waveform,
        loaded,
        seek,
        soundcloud,
        duration,
        taglist,
        genre,
        download,
        license,
        description
      } = data;
      const descriptionHtml = description.replace(/(\n)/g, '<br />');
      const store: PlayerStore = this.props[STORE_PLAYER];
      return (
        <Container>
          <TitleHandler>
            <Title>{title}</Title>
            <GoBack path="/">&lt; Back</GoBack>
          </TitleHandler>
          <DataContainer>
            <ThumbHandler>
              <PlayBtn
                backgroundImage={artwork}
                playing={playing}
                onClick={this.play}
              />
              {download && <DownloadBtn href={download}>Download</DownloadBtn>}
            </ThumbHandler>
            <TextHandler>
              <P>Published on {format(new Date(date), 'DD/MM/YYYY')}</P>
              <P>Duration: {this.computeDuration(duration)}</P>
              <P>Style: {genre}</P>
              <P>© {license.replace(/\-/g, ' ')}</P>
              <br />
              <P>
                <A href={soundcloud} target="_blank">
                  View on Soundcloud
                </A>
              </P>
            </TextHandler>
          </DataContainer>
          <TrackHandler opacity={playing ? 1 : 0.5}>
            <Track
              waveform={waveform}
              loaded={loaded}
              seek={seek}
              onSeek={store.onSeek}
              duration={duration}
              isMini={false}
            />
          </TrackHandler>
          <Description>
            <DescriptionHandler>
              {parseHtml(descriptionHtml)}
            </DescriptionHandler>
            <TagList>
              {taglist.map(
                (tag: string): JSX.Element => (
                  <Tag
                    href={`https://soundcloud.com/tags/${tag}`}
                    target="_blank"
                    key={tag}
                  >
                    #{tag}
                  </Tag>
                )
              )}
            </TagList>
          </Description>
        </Container>
      );
    } else return <div />;
  }
}

export const PodcastDetails = withLoadingStore(STORE_SELECTED_PODCAST)(
  PodcastDetailsComponent
);
