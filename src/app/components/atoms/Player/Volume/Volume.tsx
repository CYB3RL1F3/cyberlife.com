import React, { FC, useCallback, useEffect } from 'react';
import { Slider } from 'app/components/atoms/Slider';
import { observer } from 'mobx-react';
import { Container, InputHandler, IconHandler, Icon } from './Volume.styled';
import { usePlayerStore } from "app/hooks/stores";
import { getVolumeEmoji } from 'app/utils/icons';

let currentVolume = 0;

export const Volume: FC = observer(() => {
  const store = usePlayerStore();

  const { volume, setVolume } = store;

  useEffect(() => {
    currentVolume = volume || 1;
  }, []);
  
  const onVolumeChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newVolume: number = parseFloat(e.currentTarget.value);
    setVolume(newVolume);
  }, [setVolume]);

  const toggleMute = useCallback(() => {
    if (volume > 0) {
      currentVolume = volume;
      setVolume(0);
    } else {
      setVolume(currentVolume || 1);
    }
  }, [volume, setVolume]);

  return (
    <Container>
      <IconHandler htmlFor="volume" onClick={toggleMute}>
        <Icon src={getVolumeEmoji(volume)} alt={`volume ${volume * 100}%`} />
      </IconHandler>
      <InputHandler>
        <Slider
          id="volume"
          value={volume}
          min={0}
          max={1}
          step={0.1}
          onChange={onVolumeChanged}
        />
      </InputHandler>
    </Container>
  );

})
