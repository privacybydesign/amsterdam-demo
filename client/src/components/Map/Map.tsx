import React from 'react';
import styled from 'styled-components';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { Map, BaseLayer, ViewerContainer, Zoom } from '@datapunt/arm-core'
import { Input } from '@datapunt/asc-ui';

interface IProps {}

const StyledMap = styled(Map)`
  height: 500px;
  margin-bottom: 20px;
`

const MapComponent: React.FC<IProps> = () => (

  <StyledMap>
    <ViewerContainer
      bottomRight={<Zoom />}
      topLeft={
      <Input
        id="some-input"
        onChange={(e) => {console.log('change', e.target.value)}}
      />}
    />
    <BaseLayer />
  </StyledMap>
);

export default MapComponent;