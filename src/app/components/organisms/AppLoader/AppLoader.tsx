import React, { FC, useCallback, useEffect, MouseEvent } from 'react';
import { captureException, withScope } from '@sentry/browser';
import { useAppStore, useInfosStore } from "app/hooks/stores";
import { getMessagesAccordingToLoadingState } from 'app/utils/messageManager';
import {
  Output,
  Console,
  Container,
  A,
  LottieHandler,
  LoadingSpinner,
} from './AppLoader.styled';
import { paths } from 'app/paths';
import { observer } from 'mobx-react';
import { isIe, isAndroid } from 'app/utils/browsers';
import { IE } from './IE';
import { Background } from 'app/components/SharedStyled';

export interface AppLoaderProps {}

let stateMessages: string[] = [];
export const AppLoader: FC = observer(() => {
  const infosStore = useInfosStore();
  const appStore = useAppStore();

  stateMessages = getMessagesAccordingToLoadingState(appStore, stateMessages);
  const { error } = appStore;
  if (error) {
    withScope((scope) => {
      scope.setExtra('loading', error);
      captureException(error);
    });
  }

  const refresh = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
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
        <Console>
          <Output>
            <strong>
              <u>cyberlife-music.com</u> app loading process
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
});

export default AppLoader;