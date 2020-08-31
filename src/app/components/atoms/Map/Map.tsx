import React, { FC, Suspense, useMemo, lazy } from 'react';
import config from 'app/config';

import { Placeholder, Loader } from "./Map.loading";

interface MapProps {
  coordinates: Coordinates;
  width: string;
  height: string;
}

export type Coordinates = [number, number];

interface MapboxGLLazyComponent {
  default: FC<MapProps>;
}

const { accessToken, url } = config.mapbox;

const loadMapbox = () => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true;
  script.src = 'https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.js';
  const el = document.getElementsByTagName('script')[0]
  el.parentNode.insertBefore(script, el)

  // Resolve the promise once the script is loaded
  script.addEventListener('load', () => {
    resolve(script)
  })

  // Catch any errors while loading the script
  script.addEventListener('error', () => {
    reject(new Error(`mapbox failed to load.`))
  })
});

const MapboxGL = lazy(() => new Promise<MapboxGLLazyComponent>(async (resolve) => {
  try {
    await loadMapbox();
      
    import("react-mapbox-gl").then(({ default: ReactMapboxGl, Layer, Feature }) => {

      const Mapbox = ReactMapboxGl({
        attributionControl: false,
        injectCSS: false,
        accessToken
      });
      const Component: FC<MapProps> = (({ coordinates, height, width }) => (
        <Mapbox
          style={url}
          zoom={[14]}
          center={coordinates}
          containerStyle={{
            height,
            width
          }}
        >
          <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
            <Feature coordinates={coordinates} />
          </Layer>
        </Mapbox>
      ));
      resolve({
        default: Component
      });
    });
  } catch(e) {
    resolve({
      default: () => <p>Impossible to load map...</p>
    });
  }
}));


export const Map: FC<MapProps> = ({
  coordinates,
  width,
  height
}) => {
  const placeholder = useMemo(() => (
    <Placeholder width={width} height={height}>
      <Loader />
    </Placeholder>
  ), [width, height]);
  return (
    <Suspense fallback={placeholder}>
      <MapboxGL
        coordinates={coordinates}
        width={width}
        height={height}
      />
    </Suspense>
  );
};

export default Map;