import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { useMapInstance,  } from '@datapunt/react-maps';
import { Map, BaseLayer, ViewerContainer, Zoom } from '@datapunt/arm-core'
import { Input } from '@datapunt/asc-ui';
// import { getAddress } from './mapActions';


interface IProps { }

const StyledMap = styled(Map)`
  height: 500px;
  margin-bottom: 20px;
`;

const MapComponent: React.FC<IProps> = () => {
  const autosuggestUrl= 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&q=';
  const [url, setUrl] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [mapInstance, setMapInstance] = useState<any>({});
  const [autosuggest, setAutosuggest] = useState([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchAutosuggest = async (url) => {
    const response = await axios.get(url);
    setAutosuggest(response.data?.response?.docs);
    return response.data;
  };

  useEffect(() =>  {
    fetchAutosuggest(url);
  }, [url]);

  useEffect(() =>  {
    if (mapInstance) {

      // mapInstance.on('click', console.log('click'));
    }
    console.log('----------------', mapInstance);
  }, [mapInstance]);

  return (
    <StyledMap setInstance={(instance) => setMapInstance(instance)}>
      <ViewerContainer
        bottomRight={<Zoom />}
        topLeft={
          <Input
            id="some-input"
            onChange={(e) => {
              setQuery(e.target.value);
              setUrl(`${autosuggestUrl}${e.target.value}`);
            }}
          />
        }
        topRight={
          <ul style={{ backgroundColor: 'white', listStyleType: 'none'}}>
            {query.length &&  autosuggest  && autosuggest.length && autosuggest.map((address) =>
              (<li key={address.id}>{address.weergavenaam}</li>)
          )}
        </ul>
    }
      />
      <BaseLayer />
    </StyledMap>
  )
};

export default MapComponent;
