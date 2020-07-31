import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';

export class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }
    render() {

        const center = {
            lat: 52.5323069,
            lng: 13.388355
        }

        const zoom = 18

        const getMapOptions = (maps) => {
            return {
                disableDefaultUI: false,
                mapTypeControl: true,
                streetViewControl: true,
                styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
            };
        };

        const renderMarkers = (map, maps) => {
            let marker = new maps.Marker({
                position: center,
                map,
                title: 'Hello World!'
            });
        }


        return (
            <div style={{ height: '500px', width: '800px' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBT0RpL1Yw7Q5WC4WemS6hyJ_Y3PnSUyfY' }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    options={getMapOptions}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                />

            </div>
        )
    }
}

export default Map
