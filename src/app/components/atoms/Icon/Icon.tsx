import React, { FC, useCallback, useMemo, useState, useEffect } from 'react';

export type ImgDimension = number | 'auto';

export interface IconProps {
  name: string;
  size?: ImgDimension;
  fill?: string;
  className?: string;
}

export const cache: Record<string, string> = {};

export const getIcon = (name: string) =>
  name.indexOf('https://') === -1 ? `/images/${name}.svg` : name;

export const Icon: FC<IconProps> = ({
  name,
  fill = 'currentcolor',
  size = 'auto',
  className = '',
}) => {
  const [svg, setSvg] = useState<string | undefined>(undefined);
  const [currentSource, setCurrentSource] = useState(name);

  const getFill = (fill: string) => {
    if (fill.indexOf('#') === 0) return fill;
    return 'currentcolor';
  };

  const applySvgTransformations = useCallback(
    (data: string, fill: string | undefined, size: ImgDimension) => {
      let transformedSvg = data;
      if (transformedSvg.indexOf('width') > 0) {
        transformedSvg = transformedSvg.replace(
          /width="[a-zA-Z0-9.]{1,}"/gim,
          `width="${size}"`
        );
      } else {
        transformedSvg = transformedSvg.replace(
          '<svg ',
          `<svg width="${size}" `
        );
      }
      if (transformedSvg.indexOf('height') > 0) {
        transformedSvg = transformedSvg.replace(
          /height="[a-zA-Z0-9.]{1,}"/gim,
          `height="100%"`
        );
      } else {
        transformedSvg = transformedSvg.replace('<svg ', `<svg height="100%" `);
      }
      if (fill)
        transformedSvg = transformedSvg.replace(
          /fill="[#a-zA-Z0-9]{1,}"/gim,
          `fill="${getFill(fill)}"`
        );
      return transformedSvg;
    },
    []
  );

  useEffect(() => {
    const asyncEffect = async () => {
      setCurrentSource(name);
      const url = getIcon(name);
      try {
        let data: string;
        if (cache[url]) {
          data = cache[url];
        } else {
          const res = await fetch(url);
          data = await res.text();
          cache[url] = data;
        }
        const svgString = applySvgTransformations(data, fill, size);
        setSvg(svgString);
      } catch (e) {
        if (
          !navigator.userAgent.includes('Node.js') &&
          !navigator.userAgent.includes('jsdom')
        ) {
          // eslint-disable-next-line no-console
          console.log('impossible to load source');
        }
      }
    };
    if (!svg || name !== currentSource) {
      asyncEffect();
    } else {
      const svgString = applySvgTransformations(svg, fill, size);
      setSvg(svgString);
    }
  }, [applySvgTransformations, currentSource, fill, name, svg, size]);
  const svgHtml = useMemo(
    () => ({
      __html: svg || '',
    }),
    [svg]
  );
  if (!svg) return null;
  return <span className={className} dangerouslySetInnerHTML={svgHtml} />;
};

export default Icon;
