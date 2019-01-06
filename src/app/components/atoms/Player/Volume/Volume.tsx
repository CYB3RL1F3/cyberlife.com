import * as React from 'react';
import { Slider } from 'app/components/atoms/Slider';
import { inject, observer } from 'mobx-react';
import { STORE_PLAYER } from 'app/constants/stores';
import { PlayerStore } from 'app/stores';
import { Container, InputHandler, IconHandler, Icon } from './Volume.styled';

export interface VolumeProps {}

@inject(STORE_PLAYER)
@observer
export class Volume extends React.Component<VolumeProps> {
  volume: number;
  onVolumeChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const store: PlayerStore = this.props[STORE_PLAYER] as PlayerStore;
    const volume: number = parseFloat(e.currentTarget.value);
    this.volume = volume;
    store.setVolume(volume);
  };

  toggleMute = () => {
    const store: PlayerStore = this.props[STORE_PLAYER] as PlayerStore;
    if (store.volume > 0) {
      this.volume = store.volume;
      store.setVolume(0);
    } else {
      store.setVolume(this.volume || 1);
    }
  };

  getEmojiValue = (volume) => {
    switch (volume) {
      case 0:
        return 0;
      case 0.1:
      case 0.2:
        return 1;
      case 0.3:
      case 0.4:
      case 0.5:
      case 0.6:
        return 2;
      case 0.7:
      case 0.8:
      case 0.9:
      case 1:
        return 3;
      default:
        return '';
    }
  };

  getEmoji = (volume) =>
    require(`assets/images/volume/${this.getEmojiValue(volume)}.svg`);

  render() {
    const store: PlayerStore = this.props[STORE_PLAYER] as PlayerStore;
    const { volume } = store;
    return (
      <Container>
        <IconHandler onClick={this.toggleMute}>
          <Icon src={this.getEmoji(volume)} alt={`volume ${volume * 100}%`} />
        </IconHandler>
        <InputHandler>
          <Slider
            value={volume}
            min={0}
            max={1}
            step={0.1}
            onChange={this.onVolumeChanged}
          />
        </InputHandler>
      </Container>
    );
  }
}
