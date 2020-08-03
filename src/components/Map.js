import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'

export class Map extends Component {

    constructor(props) {
        super(props)
        this.state={
            search: '',
            lat: 0,
            lng: 0,
            direccion: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // buscar la direccion y mostrar un PIN en el mapa con la dirección
        axios.get("http://localhost:5000/api/maps?search=" + this.state.search)
        .then(response => {
            console.log(response.data)
            // volver a renderizar el mapa con CENTER = lat, lng y un PIN =  lat, lng
            this.setState({
                lat: response.data.candidates[0].geometry.location.lat,
                lng: response.data.candidates[0].geometry.location.lng,
                direccion: response.data.candidates[0].formatted_address
            })

        })

    }

    render() {

        console.log("Render")

        const center = {
            lat: this.state.lat,
            lng: this.state.lng
        }

        const zoom = 15

        const getMapOptions = (maps) => {
            return {
                disableDefaultUI: false,
                mapTypeControl: true,
                streetViewControl: true,
                styles: [{ featureType: 'poi', 
                    elementType: 'labels', 
                    stylers: [{ visibility: 'on' }] }],
                }
        }

        const renderMarkers = (map, maps) => {

            const position = {
                lat: this.state.lat,
                lng: this.state.lng
            }

            let marker = new maps.Marker({
                position: position,
                map,
                title: this.state.direccion})
        }



        return (
            <div className="mapa" >
                <GoogleMapReact 
                    key={this.state.direccion}
                    bootstrapURLKeys={ { key: 'AIzaSyBT0RpL1Yw7Q5WC4WemS6hyJ_Y3PnSUyfY'} }
                    defaultCenter={center}
                    defaultZoom={zoom}
                    options={getMapOptions}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}

                />
                <form onSubmit={this.handleSubmit}>
                    <label>Direccion</label>
                    <input type="text" 
                        name="search"
                        value={this.state.search}
                        onChange={this.handleChange}
                        placeholder="informar la direccion" />
                    <input type="submit" value="buscar" />
                </form>
            </div>
        )
    }
}

export default Map
