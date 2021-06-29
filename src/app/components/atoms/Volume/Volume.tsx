import React, { FC, useCallback, useEffect, useMemo, ChangeEvent } from 'react';
import { Slider } from 'app/components/atoms/Slider';
import { observer } from 'mobx-react';
import { Container, InputHandler, IconHandler } from './Volume.styled';
import { usePlayerStore } from "app/hooks/stores";
import { getVolumeEmoji } from 'app/utils/icons';
import Icon from 'app/components/atoms/Icon';
import { withTheme } from 'app/theme';

let currentVolume = 0;

export const Volume: FC = withTheme(
  observer(({ theme }) => {
    const store = usePlayerStore();

    const { volume, setVolume } = store;

    useEffect(() => {
      currentVolume = volume || 1;
    }, []);

    const onVolumeChanged = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const newVolume: number = parseFloat(e.currentTarget.value);
        setVolume(newVolume);
      },
      [setVolume]
    );

    const toggleMute = useCallback(() => {
      if (volume > 0) {
        currentVolume = volume;
        setVolume(0);
      } else {
        setVolume(currentVolume || 1);
      }
    }, [volume, setVolume]);

    const volumeEmoji = useMemo(() => getVolumeEmoji(volume), [volume]);

    return (
      <Container>
        <IconHandler htmlFor="volume" onClick={toggleMute}>
          <Icon name={volumeEmoji} size={16} fill={theme.color} />
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
);

export default Volume;