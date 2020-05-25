import React, { FC, Suspense, useMemo, lazy } from 'react';
import config from 'app/config';

import { Placeholder, Loader } from "./Map.loading";

const { accessToken, url } = config.mapbox;

interface MapProps {
  coordinates: Coordinates;
  width: string;
  height: string;
}

export type Coordinates = [number, number];

interface MapboxGLLazyComponent {
  default: FC<MapProps>;
}

const mapboxGLPromise = import("react-mapbox-gl");

const MapboxGL = lazy(() => new Promise<MapboxGLLazyComponent>((resolve) => {
  mapboxGLPromise.then(({ default: ReactMapboxGl, Layer, Feature }) => {
    const Mapbox = ReactMapboxGl({
      attributionControl: false,
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