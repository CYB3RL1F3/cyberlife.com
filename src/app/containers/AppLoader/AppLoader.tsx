import * as React from 'react';
import { getMessagesAccordingToLoadingState } from '../../utils/messageManager';
import { PixelTracker } from 'app/components/atoms';
import {
  PixelTrackersWrapper,
  Output,
  Console,
  Container
} from './AppLoader.styled';
import { observer, inject } from 'mobx-react';
import { STORE_APP, STORE_INFOS } from 'app/constants/stores';
import { AppStore, InfosStore } from 'app/stores';

const waveform = require('assets/images/waveform.png');
const bg1 = require('assets/images/bg1.png');
const bg2 = require('assets/images/bg2.png');

export interface AppLoaderProps {}

@inject(STORE_APP, STORE_INFOS)
@observer
export class AppLoader extends React.Component<AppLoaderProps> {
  stateMessages: string[] = [];

  startLoadingAsset = (name: string) => (): void => {
    const appStore: AppStore = this.props[STORE_APP] as AppStore;
    appStore.startFetchingAsset(name);
  };

  onLoadAsset = (name: string) => (): void => {
    const appStore: AppStore = this.props[STORE_APP] as AppStore;
    appStore.validAsset(name);
  };

  componentDidMount() {
    setTimeout(() => {
      const infosStore: InfosStore = this.props[STORE_INFOS] as InfosStore;
      infosStore.loadInfos();
    }, 1000);
  }

  render() {
    const appStore: AppStore = this.props[STORE_APP] as AppStore;
    this.stateMessages = getMessagesAccordingToLoadingState(
      appStore,
      this.stateMessages
    );
    return (
      <Container>
        <PixelTrackersWrapper>
          <PixelTracker
            src={waveform}
            onStartLoading={this.startLoadingAsset('Waveform')}
            onLoad={this.onLoadAsset('Waveform')}
          />
          <PixelTracker
            src={bg1}
            onStartLoading={this.startLoadingAsset('Bg')}
            onLoad={this.onLoadAsset('Bg')}
          />
          <PixelTracker
            src={bg2}
            onStartLoading={this.startLoadingAsset('Bg2')}
            onLoad={this.onLoadAsset('Bg2')}
          />
        </PixelTrackersWrapper>
        <Console>
          <Output>
            <strong>
              <u>Cyberlife.com</u> loading process
            </strong>
          </Output>
          <br />
          {this.stateMessages.map((message: string) => (
            <Output key={message}>{message}</Output>
          ))}
        </Console>
      </Container>
    );
  }
}
