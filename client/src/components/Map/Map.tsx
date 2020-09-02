import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { useMapInstance, } from '@datapunt/react-maps';
import { Map, BaseLayer, ViewerContainer, Zoom, Marker } from '@datapunt/arm-core'
import { Input } from '@datapunt/asc-ui';
import { map } from 'leaflet';

interface IProps { }

const StyledMap = styled(Map)`
  height: 500px;
  width: 100%;
  cursor: pointer;
  margin-bottom: 20px;
`;

// todo fix typying
// add use useMemo
// todo make styled comp
// todo fix styling

const MapComponent: React.FC<IProps> = () => {
  const locationRef = useRef(null);
  const autosuggestUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&fl=id,weergavenaam,type,score,lat,lon&q=';
  const locationUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/revgeo?type=adres&rows=1&fl=id,weergavenaam,straatnaam,huis_nlt,postcode,woonplaatsnaam,centroide_ll&distance=50&';
  const [mapInstance, setMapInstance] = useState<any>({});
  const [url, setUrl] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [autosuggest, setAutosuggest] = useState([]);
  const [latLng, setLatLng] = useState<any>();
  const [location, setLocation] = useState<any>();
  const [showAutosuggest, setShowAutosuggest] = useState<boolean>(false);

  const fetchAutosuggest = async (url) => {
    const response = await axios.get(url);
    setAutosuggest(response.data?.response?.docs);
    setShowAutosuggest(true);
  };

  const fetchLocation = async (location: any) => {
    const response = await axios.get(`${locationUrl}&lat=${location.lat}&lon=${location.lng}`);
    setLocation(response.data?.response?.docs);
  };

  const onMapclick = (e: any) => {
    setLatLng(e.latlng);
    fetchLocation(e.latlng);
  }

  const onAutosuggestClick = async (e: any, location: any) => {
    e.preventDefault();
    if (location.weergavenaam) {
      locationRef.current.value = location.weergavenaam;
      setShowAutosuggest(false);
    }

    const response = await axios.get(`https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=${location.id}`)
    if (mapInstance && response.data.response.docs[0]) {
      const loc = response.data.response.docs[0].centroide_ll.replace(/POINT\(|\)/, '').split(' ');
      const flyTo = { lat: parseFloat(loc[1]), lng: parseFloat(loc[0]) };
      mapInstance.flyTo(flyTo, 11);
      setLatLng(flyTo);
    }
  }

  useEffect(() => {
    fetchAutosuggest(url);
  }, [url]);

  useEffect(() => {
    if (location && location.length) {
      locationRef.current.value = location[0].weergavenaam;
    } else if (location && location.length === 0) {
      locationRef.current.value = '';
    }
  }, [location, locationRef]);


  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <StyledMap setInstance={(instance) => setMapInstance(instance)}
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
                id="location"
                ref={locationRef}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setUrl(`${autosuggestUrl}${e.target.value}`);
                }}
              />
              {showAutosuggest &&
                <ul style={{ width: '500px', backgroundColor: 'white', listStyleType: 'none', padding: '0 0 0 12px' }}>
                  {query.length && autosuggest && autosuggest.length ? autosuggest.map((location) =>
                    (<li key={location.id}><a href="#" onClick={(e) => onAutosuggestClick(e, location)}>{location.weergavenaam}</a></li>)
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
