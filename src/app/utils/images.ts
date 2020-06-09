export const getHomotheticDimensions = (pic: HTMLImageElement, homothetie: number) => {
  let picWidth = pic.naturalWidth;
  let picHeight = pic.naturalHeight;
  const h = homothetie * window.innerHeight;
  const w = homothetie * window.innerWidth;
  if (picHeight > h) {
    const ratio = h / picHeight;
    picHeight *= ratio;
    picWidth *= ratio;
  }
  if (picWidth > w) {
    const ratio = w / picWidth;
    picHeight *= ratio;
    picWidth *= ratio;
  }
  return { picWidth, picHeight };
}

export const toPixel = (px: number) => `${px}px`;