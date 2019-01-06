import * as React from 'react';
import { getMessagesAccordingToLoadingState } from '../../utils/messageManager';
import { PixelTracker } from 'app/components/atoms';
import {
  PixelTrackersWrapper,
  Output,
  Console,
  Container,
  A
} from './AppLoader.styled';
import { observer, inject } from 'mobx-react';
import { STORE_APP, STORE_INFOS } from 'app/constants/stores';
import { AppStore, InfosStore } from 'app/stores';
import { isIe, isAndroid } from 'app/utils/browsers';
import { IE } from './atoms/IE';

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
    }, 400);
    if (isAndroid()) {
      const className = 'android';
      const root = document.getElementsByTagName('html')[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add(className);
      document.body.classList.add(className);
    }
  }

  render() {
    const appStore: AppStore = this.props[STORE_APP] as AppStore;
    this.stateMessages = getMessagesAccordingToLoadingState(
      appStore,
      this.stateMessages
    );
    return isIe() ? (
      <IE />
    ) : (
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
            <Output key={message}>
              {message !== 'EMPTY' ? message : <span>&nbsp;</span>}
            </Output>
          ))}
          {appStore.error && (
            <Output>
              please retry by <A href="/">reloading this page</A>
            </Output>
          )}
        </Console>
      </Container>
    );
  }
}
