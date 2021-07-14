import React, {
  FC,
  useCallback,
  useMemo,
  MouseEvent,
  Suspense,
  lazy,
} from 'react';
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
  Tag,
} from './PodcastDetails.styled';
import { ThumbHandler } from 'app/components/molecules/PodcastItem/PodcastItem.styled';
import PlayBtn from 'app/components/atoms/PlayBtn';
import Track from 'app/components/atoms/Track';
import Heads from 'app/components/atoms/Heads';
import { observer } from 'mobx-react';
import { usePlayerStore } from 'app/hooks/stores';
import { DescriptionHandler, TagList } from './PodcastDetails.styled';
import { parseHtml } from 'app/utils/html';
import { paths } from 'app/paths';
import { numToZeroString } from 'app/utils/numbers';
import Button from 'app/components/atoms/Button';

const Icon = lazy(() => import('app/components/atoms/Icon'));

interface PodcastDetailsProps {
  data: TrackModel;
}

export const PodcastDetailsComponent: FC<PodcastDetailsProps> = observer(
  ({ data }) => {
    const store = usePlayerStore();
    const { currentTrack, play, pause } = store;
    const onPlay = useCallback(
      (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (
          !currentTrack ||
          (currentTrack && currentTrack.title !== data.title) ||
          (currentTrack && !currentTrack.playing)
        ) {
          play(data);
        } else {
          pause();
        }
      },
      [data, currentTrack, play, pause]
    );

    const computedDuration = useMemo(() => {
      if (!data || (data && !data.duration)) return null;
      const d = new Date(data.duration);
      return `${numToZeroString(d.getHours() - 1)}:${numToZeroString(
        d.getMinutes()
      )}:${numToZeroString(d.getSeconds())}`;
    }, [data]);

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
        description,
        tracklist,
        url,
      } = data;
      const descriptionHtml = description
        .replace(/(\n)/g, '<br />')
        .replace(
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gim,
          '<a target="_blank" href="$1">$1</a>'
        );
      return (
        <Container>
          <Heads
            title={title}
            description={description.replace(/\"/gim, '')}
            image={artwork}
            url={url}
            ogType="music.song"
            twitterCard="player"
          />
          <TitleHandler>
            <Title>{title}</Title>
            <GoBack path={paths.podcasts}>
              <Suspense fallback={<span />}>
                <Icon name="go-back" size={18} />
              </Suspense>
            </GoBack>
          </TitleHandler>
          <DataContainer>
            <ThumbHandler>
              <PlayBtn
                backgroundImage={artwork}
                playing={playing}
                onClick={onPlay}
              />
              {download && <Button href={download}>Download</Button>}
            </ThumbHandler>
            <TextHandler>
              {date && (
                <P>Published on {format(new Date(date), 'dd/MM/yyyy')}</P>
              )}
              {computedDuration && <P>Duration: {computedDuration}</P>}
              {genre && <P>Style: {genre}</P>}
              {license && <P>© {license.replace(/\-/g, ' ')}</P>}
              <br />
              {soundcloud && (
                <P>
                  <A href={soundcloud} target="_blank">
                    View on Soundcloud
                  </A>
                </P>
              )}
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
            {tracklist && (
              <DescriptionHandler>
                {tracklist.map((track, index) => (
                  <P>
                    {index + 1}. {track}
                  </P>
                ))}
              </DescriptionHandler>
            )}
            <TagList>
              {taglist
                .filter((t) => t.trim())
                .map(
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
);

export const PodcastDetails = withLoadingStore(Stores.selected_podcast)(
  PodcastDetailsComponent
);

export default PodcastDetails;
