export const range = 40;

export const getNbSeconds = (): number => {
  const d = new Date();

  return d.getHours() * 60 * 60 + 60 * d.getMinutes() + d.getSeconds();
};

export const interpolateSecondsToRange = (): number => {
  const s = getNbSeconds();
  const t = 86400 / 2;
  const pct = (s / t) * 100;
  let p;
  if (pct > 100) {
    const df = 100 - (pct - 100);
    p = range * 2 * (df / 100);
  } else {
    p = range * 2 * (pct / 100);
  }
  return p;
};

export const getInterpolationHue = () => {
  const p = interpolateSecondsToRange();
  return -(p - range);
};

export const getHue = (): string => `${getInterpolationHue()}deg`;
