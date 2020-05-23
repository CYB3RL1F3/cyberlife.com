import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { Video, VideoHandler } from './BackgroundVideo.styled';
const bg_mp4 = require('assets/videos/bg.mp4').default;
const bg_webm = require('assets/videos/bg.webm').default;

export const BackgroundVideo: FC = () => {
  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const onLoad = useCallback(() => setVideoLoading(false), [setVideoLoading]);
  const ref = useRef(null);
  useEffect(() => {
    if (ref && ref.current && !ref.current.oncanplay) {
      ref.current.oncanplay = onLoad;
    }
  }, [ref.current]);
  return (
      <VideoHandler opacity={videoLoading ? 0 : 1}>
        <Video ref={ref} autoPlay loop="loop" muted="muted">
          <source src={bg_webm} type="video/webm" />
          <source src={bg_mp4} type="video/mp4" />
        </Video>
      </VideoHandler>
    );
}
