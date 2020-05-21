import React from 'react';
import * as Sentry from '@sentry/browser';

import { getMessagesAccordingToLoadingState } from 'app/utils/messageManager';
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

const video = require('assets/videos/bg.mp4').default;

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
    const infosStore: InfosStore = this.props[STORE_INFOS] as InfosStore;
    infosStore.loadInfos();
    if (isAndroid()) {
      const className = 'android';
      const root = document.getElementsByTagName('html')[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add(className);
      document.body.classList.add(className);
    }
  }

  refresh = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.reload();
  };

  render() {
    const appStore: AppStore = this.props[STORE_APP] as AppStore;
    this.stateMessages = getMessagesAccordingToLoadingState(
      appStore,
      this.stateMessages
    );
    const { error } = appStore;
    if (error) {
      Sentry.withScope((scope) => {
        scope.setExtra('loading', error);
        Sentry.captureException(error);
      });
    }
    return isIe() ? (
      <IE />
    ) : (
      <Container>
        <PixelTrackersWrapper>
          <PixelTracker
            src={video}
            onStartLoading={this.startLoadingAsset('Background')}
            onLoad={this.onLoadAsset('Background')}
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
              please retry by{' '}
              <A href="/" onClick={this.refresh}>
                reloading this page
              </A>
            </Output>
          )}
        </Console>
      </Container>
    );
  }
}
