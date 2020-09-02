import React, { useEffect, useState, useRef, useReducer } from 'react';
import '../../../node_modules/leaflet/dist/leaflet.css';
import styled from 'styled-components';
import axios from 'axios';

import { initialState, reducer } from './reducer';
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

// todo make styled comp
// todo fix typying
// add use useMemo
// todo fix styling

const MapComponent: React.FC<IProps> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const locationRef = useRef(null);
  const wrapperRef = useRef(null);
  const autosuggestUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&fl=id,weergavenaam,type,score,lat,lon&q=';
  const locationUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/revgeo?type=adres&rows=1&fl=id,weergavenaam,straatnaam,huis_nlt,postcode,woonplaatsnaam,centroide_ll&distance=50&';

  const { mapInstance, url, query, autosuggest, latLng, location, showAutosuggest} = state;

  const fetchAutosuggest = async (url) => {
    const response = await axios.get(url);
    dispatch({
      type: 'setAutosuggest',
      payload: {
        autosuggest: response.data?.response?.docs
      }
    })
  };

  const fetchLocation = async (location: any) => {
    const response = await axios.get(`${locationUrl}&lat=${location.lat}&lon=${location.lng}`);
    dispatch({
      type: 'setLocation',
      payload: {
        location: response.data?.response?.docs
      }
    });
  };

  const onMapclick = (e: any) => {
    dispatch({
      type: 'setLatLng',
      payload: {
        latLng: e.latlng
      }
    });

    fetchLocation(e.latlng);
  }

  const onAutosuggestClick = async (e: any, location: any) => {
    e.preventDefault();
    if (location.weergavenaam) {
      locationRef.current.value = location.weergavenaam;
      dispatch({
        type: 'setShowAutosuggest',
        payload: {
          showAutosuggest: false
        }
      });
    }

    const response = await axios.get(`https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=${location.id}`)
    if (mapInstance && response.data.response.docs[0]) {
      const loc = response.data.response.docs[0].centroide_ll.replace(/POINT\(|\)/, '').split(' ');
      const flyTo = { lat: parseFloat(loc[1]), lng: parseFloat(loc[0]) };
      mapInstance.flyTo(flyTo, 11);
      dispatch({
        type: 'setLatLng',
        payload: {
          latLng: flyTo
        }
      });
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

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      dispatch({
        type: 'setShowAutosuggest',
        payload: {
          showAutosuggest: false
        }
      });

      locationRef.current.value = '';
    }
  };
  useEffect(() => {
    document.body.addEventListener('click', handleClickOutside, false)
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <StyledMap setInstance={(instance) => {
          dispatch({
            type: 'setMapInstance',
            payload: {
              mapInstance: instance
            }
          });
      }}
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
                  dispatch({
                    type: 'onChangeLocation',
                    payload: {
                      query: e.target.value,
                      url: `${autosuggestUrl}${e.target.value}`
                    }
                  });

                  // setQuery(e.target.value);
                  // setUrl(`${autosuggestUrl}${e.target.value}`);
                }}
              />
              {showAutosuggest &&
                <ul ref={wrapperRef} style={{ width: '500px', backgroundColor: 'white', listStyleType: 'none', padding: '0 0 0 12px' }}>
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
