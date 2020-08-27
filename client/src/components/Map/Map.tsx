import React from 'react';
import '../../../node_modules/leaflet/dist/leaflet.css';
import { Map, BaseLayer } from '@datapunt/arm-core'

interface IProps {}

const MapComponent: React.FC<IProps> = () => (
  <Map fullScreen>
    <BaseLayer />
  </Map>
);

export default MapComponent;