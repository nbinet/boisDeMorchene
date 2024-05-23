import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapMarker } from '../../../consts/map.js';

const Map = ({ latitude, longitude }) => {
    const center = [Number(latitude), Number(longitude)];
    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom className='w-full h-full'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={center}
                icon={mapMarker}
            >
            </Marker>
        </MapContainer>
    )
}

export default Map;