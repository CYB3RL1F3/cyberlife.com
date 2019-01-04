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
  Description,
  Hashtag,
  Tag
} from './PodcastDetails.styled';
import {
  ThumbHandler,
  A
} from 'app/components/molecules/PodcastItem/PodcastItem.styled';
import { PlayBtn, Track } from 'app/components/atoms/Player';
import { inject, observer } from 'mobx-react';
import { PlayerStore } from 'app/stores';
import { DescriptionHandler, TagList } from './PodcastDetails.styled';
import { parseHtml } from 'app/utils/html';

interface PodcastDetailsProps {
  data: TrackModel;
  [STORE_SELECTED_PODCAST]: SelectedPodcastStore;
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

  render() {
    const { data } = this.props;
    if (data) {
      const {
        title,
        artwork,
        playing,
        date,
        genre,
        waveform,
        loaded,
        seek,
        duration,
        taglist,
        download,
        description
      } = data;
      const descriptionHtml = description.replace(/(\n)/g, '<br />');
      return (
        <Container>
          <TitleHandler>
            <Title>{title}</Title>
            <Hashtag>#{genre}</Hashtag>
          </TitleHandler>
          <DataContainer>
            <ThumbHandler>
              <PlayBtn
                backgroundImage={artwork}
                playing={playing}
                onClick={this.play}
              />
            </ThumbHandler>
            <TextHandler>
              <P>Released on {format(new Date(date), 'DD/MM/YYYY')}</P>
              <TagList>
                {taglist.map(
                  (tag: string): JSX.Element => (
                    <Tag>#{tag}</Tag>
                  )
                )}
              </TagList>
              {download && <A href={download}>Download</A>}
            </TextHandler>
          </DataContainer>
          <TrackHandler opacity={playing ? 1 : 0.5}>
            <Track
              waveform={waveform}
              loaded={loaded}
              seek={seek}
              duration={duration}
              isMini={false}
            />
          </TrackHandler>
          <Description>
            <DescriptionHandler>
              {parseHtml(descriptionHtml)}
            </DescriptionHandler>
          </Description>
        </Container>
      );
    } else return <div />;
  }
}

export const PodcastDetails = withLoadingStore(STORE_SELECTED_PODCAST)(
  PodcastDetailsComponent
);