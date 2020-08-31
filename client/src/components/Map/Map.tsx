import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { useMapInstance,  } from '@datapunt/react-maps';
import { Map, BaseLayer, ViewerContainer, Zoom, useGetAddressFromLatLng, Marker } from '@datapunt/arm-core'
import { Input } from '@datapunt/asc-ui';


interface IProps { }

const StyledMap = styled(Map)`
  height: 500px;
  width: 500px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const MapComponent: React.FC<IProps> = () => {
  const { addresses, setLatLng, loading, latLng } = useGetAddressFromLatLng()
  const addressRef = useRef(null);
  const autosuggestUrl= 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&q=';
  const [url, setUrl] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [mapInstance, setMapInstance] = useState<any>({});
  const [autosuggest, setAutosuggest] = useState([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isError, setIsError] = useState<boolean>(false);

  const fetchAutosuggest = async (url) => {
    const response = await axios.get(url);
    setAutosuggest(response.data?.response?.docs);
    return response.data;
  };

  const clickHandler = (e: any) => {
    setLatLng(e.latlng);
  }

  useEffect(() =>  {
    fetchAutosuggest(url);
  }, [url]);

  useEffect(() =>  {
    if (addresses &&  addresses.results &&  addresses.results.length) {
      addressRef.current.value = addresses.results[0]._display;
    } else if (addresses &&  addresses.results && addresses.results.length === 0) {
      addressRef.current.value = 'locatie gepind';
    }
  }, [addresses]);

  // useEffect(() =>  {
    // if (mapInstance) {
    // }
  // }, [mapInstance]);

  return (
    <StyledMap setInstance={(instance) => setMapInstance(instance)}
      events={{
        click: (e) => {
          clickHandler(e);
        },
      }}
    >
      {latLng && <Marker latLng={latLng} />}
      <ViewerContainer
        bottomRight={<Zoom />}
        topLeft={
          <Input
            id="address"
            ref={addressRef}
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
