import React, { FC, useEffect, memo, useCallback, useRef, RefObject } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { observer } from 'mobx-react';
import { PlayerStore } from 'app/stores';
import { debounce } from 'app/utils/debounce';
import { captureException, withScope } from '@sentry/browser';
import { usePlayerStore } from 'app/hooks/stores';

interface AudioElement {
  current: HTMLAudioElement;
}
export interface AudioProps {
  store?: PlayerStore;
}

export const Audio: FC = observer(() => {
  let player: RefObject<any> = useRef<any>(null);
  let element: AudioElement = player.current?.audioEl;
  const store = usePlayerStore();

  useEffect(() => {
    element = player.current?.audioEl;
  }, [player.current]);

  const onListen = useCallback((value: number) => {
    if (element?.current) {
      const { buffered } = element.current;
      if (buffered) {
        const pctLoaded = 100 * buffered.end(0) / store.currentTrack.duration;
        store.onLoaded(pctLoaded);
      }
    }
    if (store.seekPosition > 0) {
      if (element?.current) {
        element.current.currentTime =
          (store.seekPosition / 100) * (store.currentTrack.duration / 1000);
        store.clearSeek();
      }
    } else {
      const pct = (value / (store.currentTrack.duration / 1000)) * 100;
      store.onSeek(pct, false);
    }
  }, [element, store.currentTrack, store.seekPosition, store.onSeek]);

  const fail = useCallback((error, errorInfo) => {
    withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
      captureException(error);
    });
  }, []);
  useEffect(() => {
    return () => {
      player = null;
      element = null;
    }
  }, []);
  try {
    if (store.currentTrack) {
      const {
        currentTrack: { url, playing },
        volume
      } = store;

      if (url && playing) {
        return (
          <ReactAudioPlayer
            ref={player}
            src={url}
            listenInterval={200}
            onListen={debounce(onListen, 200)}
            controls={false}
            autoPlay
            volume={volume}
          />
        );
      }
      return <div />;
    }
    return <div />;
  } catch(e) {
    fail(e, {});
    return <div />
  }
});

export default memo(Audio);
