import React, { useEffect } from 'react';
import styled from 'styled-components';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { useMapInstance } from '@datapunt/react-maps';
import { Map, BaseLayer, ViewerContainer, Zoom } from '@datapunt/arm-core'
import { Input } from '@datapunt/asc-ui';

interface IProps { }

const StyledMap = styled(Map)`
  height: 500px;
  margin-bottom: 20px;
`

const MapComponent: React.FC<IProps> = () => {
  const mapInstance = useMapInstance();
  console.log('--------------', mapInstance);

  useEffect(() => {
    console.log('-------------- loaded', 42);
    // mapInstance = useMapInstance();
  }, []);



  return (
    <StyledMap>
      <ViewerContainer
        bottomRight={<Zoom />}
        topLeft={
          <Input
            id="some-input"
            onChange={(e) => { console.log('change', e.target.value) }}
          />}
      />
      <BaseLayer />
    </StyledMap>
  )
};

export default MapComponent;