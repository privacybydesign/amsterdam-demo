import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { Map, BaseLayer, ViewerContainer, Zoom, useGetAddressFromLatLng, Marker } from '@datapunt/arm-core'
import { Input } from '@datapunt/asc-ui';

interface IProps { }

const StyledMap = styled(Map)`
  height: 500px;
  width: 100%;
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
  const [showAutosuggest, setShowAutosuggest] = useState<boolean>(false);
  // const [isError, setIsError] = useState<boolean>(false);

  const fetchAutosuggest = async (url) => {
    const response = await axios.get(url);
    setAutosuggest(response.data?.response?.docs);
    setShowAutosuggest(true);
    return response.data;
  };

  const onMapclick = (e: any) => {
    setLatLng(e.latlng);
  }

  const onAutosuggestClick = (e: any, address: string) => {
    e.preventDefault();
    if (address) {
      addressRef.current.value = address;
      setShowAutosuggest(false);
    }
  }

  useEffect(() =>  {
    fetchAutosuggest(url);
  }, [url]);

  useEffect(() =>  {
    if (addresses &&  addresses.results &&  addresses.results.length) {
      addressRef.current.value = addresses.results[0]._display;

    } else if (addresses &&  addresses.results && addresses.results.length === 0) {
      addressRef.current.value = '';
    }
  }, [addresses, addressRef]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px'}}>
      <StyledMap
        events={{
          click: (e) => {
            onMapclick(e);
          },
        }}
      >
        {latLng && <Marker latLng={latLng} />}
        <ViewerContainer
          bottomRight={<Zoom />}
          topLeft={
            <>
              <Input
                style={{ width: '500px' }}
                id="address"
                ref={addressRef}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setUrl(`${autosuggestUrl}${e.target.value}`);
                }}
              />
              {showAutosuggest &&
                <ul style={{ width: '500px', backgroundColor: 'white', listStyleType: 'none', padding: '0 0 0 12px'}}>
                  {query.length &&  autosuggest  && autosuggest.length ? autosuggest.map((address) =>
                    (<li key={address.id}><a href="#" onClick={(e) => onAutosuggestClick(e, address.weergavenaam)}>{address.weergavenaam}</a></li>)
                  ) : null}
                </ul>
              }

            </>
          }
        />
        <BaseLayer />
      </StyledMap>
    </div>
  )
};

export default MapComponent;
