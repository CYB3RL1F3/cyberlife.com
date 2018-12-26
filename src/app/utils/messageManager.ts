import { messages } from './messages';
import AppStore from '../stores/AppStore';

export const pushMessageState = (messages: string[], message: string) => {
  if (
    !messages.find((msg: string) => {
      return msg === message;
    })
  ) {
    messages.push(message);
  }
  return messages;
};

export const getMessagesAccordingToLoadingState = (
  appStore: AppStore,
  stateMessages: string[]
) => {
  pushMessageState(stateMessages, messages.init);
  if (appStore) {
    pushMessageState(stateMessages, messages.storeReady);
    if (appStore.fetchingInfos)
      pushMessageState(stateMessages, messages.fetchingInfos);
    if (appStore.isAssetsLoading())
      pushMessageState(stateMessages, messages.assets);
    if (appStore.isAssetsReady())
      pushMessageState(stateMessages, messages.assetsCompleted);
    if (appStore.isDataReady())
      pushMessageState(stateMessages, messages.fetchCompleted);
    if (appStore.isDataReady() && appStore.isAssetsReady()) {
      pushMessageState(stateMessages, ' ');
      pushMessageState(stateMessages, messages.appReady);
    }
  }
  return stateMessages;
};
