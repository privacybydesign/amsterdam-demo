import React, { useEffect, useCallback, useRef, useReducer } from 'react';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import axios from 'axios';

import { initialState, reducer, Location } from './reducer';
import { Map, BaseLayer, ViewerContainer, Zoom, Marker } from '@datapunt/arm-core';
import { Input } from '@datapunt/asc-ui';
import { Link, ListItem, Icon, themeColor, themeSpacing } from '@datapunt/asc-ui';
import { ChevronRight } from '@datapunt/asc-assets';
import { LatLng, LeafletMouseEvent } from 'leaflet';

interface IProps {}

const MapComponent: React.FC<IProps> = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const locationRef = useRef(null);
    const wrapperRef = useRef(null);
    const autosuggestUrl =
        'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&fl=id,weergavenaam,type,score,lat,lon&q=';
    const locationUrl =
        'https://geodata.nationaalgeoregister.nl/locatieserver/revgeo?type=adres&rows=1&fl=id,weergavenaam,straatnaam,huis_nlt,postcode,woonplaatsnaam,centroide_ll&distance=50&';
    const lookupUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=';

    const { mapInstance, url, query, autosuggest, latLng, location, showAutosuggest } = state;

    const fetchAutosuggest = useCallback(
        async url => {
            const response = await axios.get(url);
            dispatch({
                type: 'setAutosuggest',
                payload: {
                    autosuggest: response.data?.response?.docs
                }
            });
        },
        [dispatch]
    );

    const fetchLocation = useCallback(
        async (loc: LatLng) => {
            const response = await axios.get(`${locationUrl}&lat=${loc.lat}&lon=${loc.lng}`);
            dispatch({
                type: 'setLocation',
                payload: {
                    location: response.data?.response?.docs
                }
            });
        },
        [locationUrl, dispatch]
    );

    const onAutosuggestClick = useCallback(
        async (e: React.SyntheticEvent<LeafletMouseEvent>, location: Location) => {
            e.preventDefault();
            if (location.weergavenaam) {
                locationRef.current.value = location.weergavenaam;
                dispatch({
                    type: 'hideAutosuggest'
                });
            }

            const response = await axios.get(`${lookupUrl}${location.id}`);
            if (mapInstance && response.data.response.docs[0]) {
                const loc = response.data.response.docs[0].centroide_ll.replace(/POINT\(|\)/, '').split(' ');
                const targetLatlng = { lat: parseFloat(loc[1]), lng: parseFloat(loc[0]) };
                mapInstance.flyTo(targetLatlng, 11);
                dispatch({
                    type: 'setLatLng',
                    payload: {
                        latLng: targetLatlng
                    }
                });
            }
        },
        [mapInstance, lookupUrl, dispatch]
    );

    useEffect(() => {
        fetchAutosuggest(url);
    }, [url, fetchAutosuggest]);

    useEffect(() => {
        locationRef.current.value = location && location.length ? location[0].weergavenaam : '';
    }, [location, locationRef]);

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            dispatch({
                type: 'hideAutosuggest'
            });

            locationRef.current.value = '';
        }
    };

    useEffect(() => {
        document.body.addEventListener('click', handleClickOutside, false);
        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        };
    }, []);

    return (
        <MapParent>
            <StyledMap
                setInstance={instance => {
                    dispatch({
                        type: 'setMapInstance',
                        payload: {
                            mapInstance: instance
                        }
                    });
                }}
                events={{
                    click: (e: LeafletMouseEvent) => {
                        dispatch({
                            type: 'setLatLng',
                            payload: {
                                latLng: e.latlng
                            }
                        });

                        fetchLocation(e.latlng);
                    }
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
                                onChange={e => {
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
                            {showAutosuggest && query.length && autosuggest && autosuggest.length ? (
                                <StyledAutosuggest ref={wrapperRef}>
                                    {autosuggest.map(item => (
                                        <ListItem key={item.id}>
                                            <StyledIcon size={14}>
                                                <ChevronRight />
                                            </StyledIcon>
                                            <Link href="#" variant="inline" onClick={e => onAutosuggestClick(e, item)}>
                                                {item.weergavenaam}
                                            </Link>
                                        </ListItem>
                                    ))}
                                </StyledAutosuggest>
                            ) : null}
                        </>
                    }
                />
                <BaseLayer />
            </StyledMap>
        </MapParent>
    );
};

const MapParent = styled.div`
    position: relative;
    height: 500px;
    width: 100%;
    margin-bottom: ${themeSpacing(5)};
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
    background-color: ${themeColor('tint', 'level1')};
    list-style-type: none;
    padding: 6px 0 0 ${themeSpacing(3)};
    border: 1px solid ${themeColor('tint', 'level5')};
    a {
        color: ${themeColor('tint', 'level7')};
    }
`;

const StyledIcon = styled(Icon)`
    display: inline;
    margin-right: 8px;
`;

export default MapComponent;
