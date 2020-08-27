import React from 'react';
import styled from 'styled-components';
import '../../../node_modules/leaflet/dist/leaflet.css';
import { Map, BaseLayer } from '@datapunt/arm-core'

interface IProps {}

const StyledMap = styled(Map)`
  height: 500px;
`

const MapComponent: React.FC<IProps> = () => (
  <StyledMap fullScreen>
    <BaseLayer />
  </StyledMap>
);

export default MapComponent;