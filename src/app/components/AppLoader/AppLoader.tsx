import React, { FC, useCallback, useEffect } from 'react';
import { captureException, withScope } from '@sentry/browser';
import { useAppStore, useInfosStore } from "app/hooks/stores";
import { getMessagesAccordingToLoadingState } from 'app/utils/messageManager';
import { PixelTracker } from 'app/components/atoms';
import {
  PixelTrackersWrapper,
  Output,
  Console,
  Container,
  A,
  LottieHandler,
  LoadingSpinner
} from './AppLoader.styled';
import { paths } from "app/paths";
import { observer } from 'mobx-react';
import { isIe, isAndroid } from 'app/utils/browsers';
import { IE } from './atoms/IE';
import { Background } from '../Layout/Layout.styled';

const video = require('assets/videos/bg.mp4').default;

export interface AppLoaderProps {}

let stateMessages: string[] = [];
export const AppLoader: FC = observer(() => {
  const infosStore = useInfosStore();
  const appStore = useAppStore();
  const startLoadingBackgroundAsset = useCallback((): void => {
    appStore.startFetchingAsset("Background");
  }, []);

  stateMessages = getMessagesAccordingToLoadingState(
    appStore,
    stateMessages
  );
  const { error } = appStore;
  if (error) {
    withScope((scope) => {
      scope.setExtra('loading', error);
      captureException(error);
    });
  }

  const onBackgroundAssetLoaded = useCallback((): void => {
    appStore.validAsset("Background");
  }, []);

  const refresh = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.reload();
  }, []);

  useEffect(() => {
    infosStore.loadInfos();
    if (isAndroid()) {
      const className = 'android';
      const root = document.getElementsByTagName('html')[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add(className);
      document.body.classList.add(className);
    }
  }, []);

  return isIe() ? (
    <IE />
  ) : (
    <Background>
      <Container>
        <PixelTrackersWrapper>
          <PixelTracker
            src={video}
            onStartLoading={startLoadingBackgroundAsset}
            onLoad={onBackgroundAssetLoaded}
          />
        </PixelTrackersWrapper>
        <Console>
          <Output>
            <strong>
              <u>Cyberlife.com</u> loading process
            </strong>
          </Output>
          <br />
          {stateMessages.map((message: string) => (
            <Output key={message}>
              {message !== 'EMPTY' ? message : <span>&nbsp;</span>}
            </Output>
          ))}
          {appStore.error && (
            <Output>
              please retry by{' '}
              <A href={paths.podcasts} onClick={refresh}>
                reloading this page
              </A>
            </Output>
          )}
          <LottieHandler>
            <LoadingSpinner />
          </LottieHandler>

        </Console>
      </Container>
    </Background>
  );
})

export default AppLoader;