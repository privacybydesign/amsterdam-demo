import React, { useEffect, useCallback, useRef, useReducer } from 'react';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';

import { initialState, reducer, Location } from './reducer';
import { Map, BaseLayer, ViewerContainer, Zoom, Marker } from '@datapunt/arm-core';
import { Input } from '@datapunt/asc-ui';
import { Link, ListItem, Icon, themeColor, themeSpacing } from '@datapunt/asc-ui';
import { ChevronRight } from '@datapunt/asc-assets';
import { LeafletMouseEvent } from 'leaflet';

interface IProps {
    updateLocationCallback: (location: Location | null) => void;
}

const MapComponent: React.FC<IProps> = ({ updateLocationCallback }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const locationRef = useRef(null);
    const wrapperRef = useRef(null);
    const mapRef = useRef(null);
    const autosuggestUrl =
        'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&fl=id,weergavenaam,type,score,lat,lon&q=';
    const locationUrl =
        'https://geodata.nationaalgeoregister.nl/locatieserver/revgeo?type=adres&rows=1&fl=id,weergavenaam,straatnaam,huis_nlt,postcode,woonplaatsnaam,centroide_ll&distance=50&';
    const lookupUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=';

    const { mapInstance, url, query, autosuggest, location, showAutosuggest } = state;

    const fetchAutosuggest = useCallback(
        async url => {
            const response: AxiosResponse = await axios.get(url);
            dispatch({
                type: 'setAutosuggest',
                payload: {
                    autosuggest: response.data?.response?.docs.map(doc => ({
                        id: doc.id,
                        weergavenaam: doc.weergavenaam
                    }))
                }
            });
        },
        [dispatch]
    );

    const onMapClick = useCallback(
        async (e: LeafletMouseEvent) => {
            const response = await axios.get(`${locationUrl}&lat=${e.latlng.lat}&lon=${e.latlng.lng}`);
            const foundLocation = response.data?.response?.docs[0];
            let location: Location = null;

            if (foundLocation) {
                location = {
                    id: foundLocation.id,
                    weergavenaam: foundLocation.weergavenaam,
                    latLng: e.latlng
                };

                dispatch({
                    type: 'setLocation',
                    payload: {
                        location
                    }
                });
            }

            if (updateLocationCallback) {
                updateLocationCallback(location || null);
            }
        },
        [dispatch, updateLocationCallback]
    );

    const onAutosuggestClick = useCallback(
        async (e: React.SyntheticEvent<LeafletMouseEvent>, autoSuggestLocation: Location) => {
            if (e) {
                e.preventDefault();
            }

            if (autoSuggestLocation.weergavenaam) {
                locationRef.current.value = autoSuggestLocation.weergavenaam;
                dispatch({
                    type: 'hideAutosuggest'
                });
            }

            const response = await axios.get(`${lookupUrl}${autoSuggestLocation.id}`);
            if (mapInstance && response.data.response.docs[0]) {
                const parsedCoordinates = response.data.response.docs[0].centroide_ll
                    .replace(/POINT\(|\)/, '')
                    .split(' ');
                const latLng = { lat: parseFloat(parsedCoordinates[1]), lng: parseFloat(parsedCoordinates[0]) };
                mapInstance.flyTo(latLng, 11);

                const location: Location = { ...autoSuggestLocation, latLng };

                dispatch({
                    type: 'setLocation',
                    payload: {
                        location
                    }
                });

                if (updateLocationCallback) {
                    updateLocationCallback(location);
                }
            }
        },
        [mapInstance, lookupUrl, dispatch, updateLocationCallback]
    );

    useEffect(() => {
        if (url.length) {
            fetchAutosuggest(url);
        }
    }, [url, fetchAutosuggest]);

    useEffect(() => {
        locationRef.current.value = location?.weergavenaam || '';
    }, [location]);

    const useFirstSuggestionOnEnter = useCallback(
        event => {
            if (event.key === 'Enter' && state.autosuggest?.length) {
                onAutosuggestClick(null, state.autosuggest[0]);
            }
        },
        [state, onAutosuggestClick]
    );

    return (
        <MapParent ref={mapRef}>
            <StyledMap
                data-testid="map"
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
                        onMapClick(e);
                    }
                }}
            >
                {location?.latLng && <Marker latLng={location.latLng} />}
                <StyledViewerContainer
                    bottomRight={<Zoom />}
                    topLeft={
                        <>
                            <StyledInput
                                id="location"
                                data-testid="input"
                                ref={locationRef}
                                onChange={e => {
                                    if (e.target.value.length < 3) return;
                                    const value = encodeURIComponent(e.target.value);
                                    dispatch({
                                        type: 'onChangeLocation',
                                        payload: {
                                            query: e.target.value,
                                            url: `${autosuggestUrl}${value}`
                                        }
                                    });
                                }}
                                onKeyPress={useFirstSuggestionOnEnter}
                                onBlur={() => {
                                    setTimeout(() => {
                                        dispatch({
                                            type: 'hideAutosuggest'
                                        });
                                    }, 150);
                                }}
                            />
                            {showAutosuggest && query.length && autosuggest && autosuggest.length ? (
                                <StyledAutosuggest data-testid="autosuggest" ref={wrapperRef}>
                                    {autosuggest.map(item => (
                                        <StyledListItem key={item.id}>
                                            <StyledIcon size={14}>
                                                <ChevronRight />
                                            </StyledIcon>
                                            <Link href="#" variant="inline" onClick={e => onAutosuggestClick(e, item)}>
                                                {item.weergavenaam}
                                            </Link>
                                        </StyledListItem>
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
    z-index: 0;
`;

const StyledViewerContainer = styled(ViewerContainer)`
    > div {
        width: calc(100% - ${themeSpacing(8)});
    }
    z-index: 1;
`;

const StyledInput = styled(Input)`
    width: 100%;
    margin-bottom: -17px;
`;

const StyledAutosuggest = styled.ul`
    width: 100%;
    background-color: ${themeColor('tint', 'level1')};
    list-style-type: none;
    padding: 6px 0 0 ${themeSpacing(3)};
    border: 1px solid ${themeColor('tint', 'level5')};
`;

const StyledListItem = styled(ListItem)`
    display: flex;
    align-items: flex-start;

    a {
        display: inline;
        color: ${themeColor('tint', 'level7')};
        position: relative;
        top: -4px;
    }
`;

const StyledIcon = styled(Icon)`
    display: inline;
    margin-right: 8px;
`;

export default MapComponent;
