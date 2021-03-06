
export const getVolumeEmojiValue = (volume: number | null) => {
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
      return 0;
  }
};

export const volumeEmojis = Array(4).fill(null).map((v, volume) => `/volume/${volume}`)

export const getVolumeEmoji = (volume = 0) => volumeEmojis[getVolumeEmojiValue(volume)]

