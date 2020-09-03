import React, { useEffect, useState, useRef, useReducer } from 'react';
import '../../../node_modules/leaflet/dist/leaflet.css';
import styled from 'styled-components';
import axios from 'axios';

import { initialState, reducer } from './reducer';
import { Map, BaseLayer, ViewerContainer, Zoom, Marker } from '@datapunt/arm-core'
import { Input } from '@datapunt/asc-ui';
import { Link, ListItem, Icon } from '@datapunt/asc-ui';
import { ChevronRight } from '@datapunt/asc-assets';


interface IProps { }

// style autosuggest
// todo fix typying
// add use useMemo
// todo fix styling

const MapComponent: React.FC<IProps> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const locationRef = useRef(null);
  const wrapperRef = useRef(null);
  const autosuggestUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&fl=id,weergavenaam,type,score,lat,lon&q=';
  const locationUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/revgeo?type=adres&rows=1&fl=id,weergavenaam,straatnaam,huis_nlt,postcode,woonplaatsnaam,centroide_ll&distance=50&';
  const lookupUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=';

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

    const response = await axios.get(`${lookupUrl}${location.id}`)
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
    <MapParent>
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
              <StyledInput
                id="location"
                ref={locationRef}
                onChange={(e) => {
                  if (e.target.value.length < 3) return;

                  dispatch({
                    type: 'onChangeLocation',
                    payload: {
                      query: e.target.value,
                      url: `${autosuggestUrl}${e.target.value}`
                    }
                  });
                }}
              />
              {showAutosuggest && query.length && autosuggest && autosuggest.length &&
                <StyledAutosuggest ref={wrapperRef}>
                  {autosuggest.map((item) =>
                    (<ListItem key={item.id}>
                      <StyledIcon size={14}><ChevronRight /></StyledIcon>
                      <Link href="#" variant="inline" onClick={(e) => onAutosuggestClick(e, item)}>{item.weergavenaam}</Link>
                    </ListItem>)
                  )}
                </StyledAutosuggest>
              }

            </>
          }
        />
        <BaseLayer />
      </StyledMap>
    </MapParent>
  )
};

const MapParent = styled.div`
  position: relative;
  height: 500px;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledMap = styled(Map)`
  height: 500px;
  width: 100%;
  cursor: pointer;
`;

const StyledInput = styled(Input)`
  width: 500px;
  margin-bottom: -17px;
`;

const StyledAutosuggest = styled.ul`
  width: 500px;
  background-color: white;
  list-style-type: none;
  padding: 6px 0 0 12px;
  border: 1px solid #767676;
  a {
    color: black;
  }
`;

const StyledIcon = styled(Icon)`
  display: inline;
  margin-right: 8px;
`;

export default MapComponent;
