import React, { useEffect, useCallback, useRef, useReducer } from 'react';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { initialState, reducer, ILocation } from './reducer';
import { Map, BaseLayer, ViewerContainer, Zoom, Marker } from '@amsterdam/arm-core';
import { Input } from '@amsterdam/asc-ui';
import { ListItem, Icon, themeColor, themeSpacing } from '@amsterdam/asc-ui';
import { ChevronRight } from '@amsterdam/asc-assets';
import { LeafletMouseEvent } from 'leaflet';
import { UnderlinedLink } from '@components/LocalAsc/LocalAsc';
import content from '@services/content';

interface IProps {
    updateLocationCallback: (location: ILocation | null) => void;
}

const MapComponent: React.FC<IProps> = ({ updateLocationCallback }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const locationInputRef = useRef(null);
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
                    autosuggest: response.data?.response?.docs.map((doc: any) => ({
                        id: doc.id,
                        displayName: doc.weergavenaam
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
            let location: ILocation | null = null;
            if (foundLocation) {
                location = {
                    id: foundLocation.id,
                    displayName: foundLocation.weergavenaam,
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
        async (e: React.SyntheticEvent<LeafletMouseEvent> | null, autoSuggestLocation: ILocation) => {
            if (e) {
                e.preventDefault();
            }

            if (locationInputRef.current && autoSuggestLocation.displayName) {
                (locationInputRef.current as any).value = autoSuggestLocation.displayName;
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

                const location: ILocation = { ...autoSuggestLocation, latLng };

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
        if (url && url.length) {
            fetchAutosuggest(url);
        }
    }, [url, fetchAutosuggest]);

    useEffect(() => {
        if (locationInputRef.current) {
            (locationInputRef.current as any).value = location?.displayName || '';
        }
    }, [location]);

    const changeAutoSuggestActiveItem = useCallback(
        (direction: string) => {
            let autosuggestActiveItem;
            if (autosuggest?.length && state.autosuggestActiveItem) {
                autosuggestActiveItem = selectNextorPreviousFromList(
                    autosuggest,
                    state.autosuggestActiveItem,
                    direction
                );
            }
            if (autosuggest?.length && !state.autosuggestActiveItem) {
                autosuggestActiveItem = autosuggest[0];
            }
            if (autosuggestActiveItem) {
                dispatch({
                    type: 'setAutosuggestActiveItem',
                    payload: {
                        autosuggestActiveItem
                    }
                });
            }
        },
        [autosuggest, state.autosuggestActiveItem]
    );

    const onInputKeyPress = useCallback(
        event => {
            /*
                keyCode is deprecated but key is not supported by all browsers.
                Then, a fallback to keyCode is still the best solution.
            */
            const { autosuggest } = state;
            const key = event.key || event.keyCode;

            if ((key === 'Enter' || key === 13) && autosuggest?.length) {
                onAutosuggestClick(null, state.autosuggestActiveItem || autosuggest[0]);
            }

            // Hide autosuggest on ESC
            if (key === 'Escape' || key === 'Esc' || key === 27) {
                dispatch({
                    type: 'hideAutosuggest'
                });
            }

            if (key === 38 || key === 'ArrowUp') {
                changeAutoSuggestActiveItem('up');
            }
            if (key === 40 || key === 'ArrowDown') {
                changeAutoSuggestActiveItem('down');
            }
        },
        [state, onAutosuggestClick, changeAutoSuggestActiveItem]
    );

    const selectNextorPreviousFromList = (list: any[], currentItem: unknown, direction: string) => {
        let returnItem;
        if (direction === 'down') {
            returnItem = list[list.indexOf(currentItem) + 1];
        }
        if (direction === 'up') {
            returnItem = list[list.indexOf(currentItem) - 1];
        }
        return returnItem;
    };

    const onInputChange = useCallback(e => {
        if (e.target.value.length < 3) return;
        const value = encodeURIComponent(e.target.value);
        dispatch({
            type: 'onChangeLocation',
            payload: {
                query: e.target.value,
                url: `${autosuggestUrl}${value}`
            }
        });
    }, []);

    return (
        <MapParent
            ref={mapRef}
            onBlur={e => {
                // Hide autosuggest if focus is outside map
                if (mapRef.current && !(mapRef.current as any).contains(e.relatedTarget)) {
                    dispatch({
                        type: 'hideAutosuggest'
                    });
                }
            }}
        >
            <StyledMap
                data-testid="map"
                aria-label={content.demo5.form.location.mapLabel}
                setInstance={(instance: any) => {
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
                                ref={locationInputRef}
                                onChange={onInputChange}
                                onKeyUp={onInputKeyPress}
                                aria-label={content.demo5.form.location.locationInputLabel}
                                autoComplete="street-address"
                            />
                            {showAutosuggest && query && query.length && autosuggest && autosuggest.length ? (
                                <StyledAutosuggest data-testid="autosuggest" ref={wrapperRef}>
                                    {autosuggest.map(item => (
                                        <StyledListItem key={item.id} selected={item === state.autosuggestActiveItem}>
                                            <StyledIcon size={14}>
                                                <ChevronRight />
                                            </StyledIcon>
                                            <UnderlinedLink
                                                href="#"
                                                variant="inline"
                                                tabIndex={-1}
                                                // Use both onMouseDown and onClick in order to retain both focus and keyboard control
                                                onMouseDown={(e: React.SyntheticEvent<LeafletMouseEvent>) =>
                                                    onAutosuggestClick(e, item)
                                                }
                                                onClick={(e: React.SyntheticEvent<LeafletMouseEvent>) => {
                                                    onAutosuggestClick(e, item);
                                                }}
                                            >
                                                {item.displayName}
                                            </UnderlinedLink>
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

    .leaflet-control-attribution {
        display: none;
    }
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

const StyledListItem = styled(ListItem)<{ selected: boolean }>`
    display: flex;
    align-items: flex-start;

    a {
        display: inline;
        color: ${props => (props.selected ? '#ec0000' : themeColor('tint', 'level7'))};
        position: relative;
        top: -4px;
    }
`;

const StyledIcon = styled(Icon)`
    display: inline;
    margin-right: 8px;
`;

export default MapComponent;
