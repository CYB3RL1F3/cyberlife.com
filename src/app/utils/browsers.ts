import config from "app/config";
import { withScope, captureException } from "@sentry/browser";

export const isIe = (): boolean => {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf('MSIE');

  // If IE, return version number.
  if (Idx > 0) return true;
  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./)) return true;
  else return false;
};

export const isAndroid = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('android') > -1;
};

export const isFirefox = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('firefox') > -1;
};

export const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const unsubscribe = async (registration) => {
  const currentSubscription = await registration.pushManager.getSubscription();
  if (currentSubscription) await currentSubscription.unsubscribe();
}

export const subscribe = async (registration, alreadyTried = false) => {
  const applicationServerKey = urlB64ToUint8Array(config.notifications.applicationServerPublicKey);
  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey
    });
    return subscription;
  } catch(e) {
    await unsubscribe(registration);
    if (!alreadyTried) subscribe(registration, true);
    if (alreadyTried) {
      withScope((scope) => {
        scope.setExtra("An error occured while trying to subscribe to notifications", e);
        captureException(e);
      });
    }
  }
}

export const getKey = (subscription, key: 'auth' | 'p256dh') => {
  if (!subscription.getKey) return '';
  const rawKey = subscription.getKey(key);
  return btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey)));
}
