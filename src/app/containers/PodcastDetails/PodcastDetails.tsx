import React, { FC, useCallback, useMemo, MouseEvent } from 'react';
import { Stores } from 'app/constants/stores';
import { TrackModel } from 'app/models/TrackModel';
import { withLoadingStore } from 'app/hoc/LoadingStore/WithLoadingStore';
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
import { observer } from 'mobx-react';
import { usePlayerStore } from 'app/hooks/stores';
import {
  DescriptionHandler,
  TagList,
  DownloadBtn
} from './PodcastDetails.styled';
import { parseHtml } from 'app/utils/html';
import { paths } from "app/paths";

interface PodcastDetailsProps {
  data: TrackModel;
}

export const PodcastDetailsComponent: FC<PodcastDetailsProps> = observer(({ data }) => {
  const store = usePlayerStore();
  const { currentTrack, play, pause } = store;
  const onPlay = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      !currentTrack ||
      (currentTrack &&
        currentTrack.title !== data.title) ||
      (currentTrack && !currentTrack.playing)
    ) {
      play(data);
    } else {
      pause();
    }
  }, [data, currentTrack, play, pause]);

  const computedDuration = useMemo(() => {
    if (!data.duration) return null;
    const d = new Date(data.duration);
    return `0${d.getHours() - 1}:${d.getMinutes()}:${d.getSeconds()}`;
  }, [data.duration]);

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
    return (
      <Container>
        <TitleHandler>
          <Title>{title}</Title>
          <GoBack path={paths.podcasts}>&lt; Back</GoBack>
        </TitleHandler>
        <DataContainer>
          <ThumbHandler>
            <PlayBtn
              backgroundImage={artwork}
              playing={playing}
              onClick={onPlay}
            />
            {download && <DownloadBtn href={download}>Download</DownloadBtn>}
          </ThumbHandler>
          <TextHandler>
            <P>Published on {format(new Date(date), 'dd/MM/yyyy')}</P>
            <P>Duration: {computedDuration}</P>
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
});

export const PodcastDetails = withLoadingStore(Stores.selected_podcast)(
  PodcastDetailsComponent
);
