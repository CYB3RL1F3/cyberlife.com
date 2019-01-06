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
