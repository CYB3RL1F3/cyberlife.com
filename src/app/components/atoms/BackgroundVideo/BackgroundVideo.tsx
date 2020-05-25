import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { Video, VideoHandler } from './BackgroundVideo.styled';
const bg_mp4 = "https://res.cloudinary.com/hiilqldcr/video/upload/v1590399039/bg.mp4";
const bg_webm = "https://res.cloudinary.com/hiilqldcr/video/upload/v1590399050/bg_webm.webm";

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

export default BackgroundVideo;