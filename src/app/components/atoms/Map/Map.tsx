import * as React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

export type Coordinates = [number, number];

interface MapProps {
  coordinates: Coordinates;
}

const accessToken =
  'pk.eyJ1IjoiY3liZXJsaWZlIiwiYSI6ImNqbHh3aXI4bTFjd2UzcGxpb2NyZmN2cHgifQ.SlBnqRlqv0oeUGoX1T3U3w';
const url = 'mapbox://styles/cyberlife/cjq9kpl33b01d2smvny3ciast';
const Mapbox = ReactMapboxGl({
  attributionControl: false,
  accessToken
});

export const Map: React.StatelessComponent<MapProps> = ({ coordinates }) => {
  return (
    <Mapbox
      style={url}
      zoom={[14]}
      center={coordinates}
      containerStyle={{
        height: '50vh',
        width: '20vw'
      }}
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={coordinates} />
      </Layer>
    </Mapbox>
  );
};