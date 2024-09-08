import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import './smallMapStyles.css'
import 'leaflet/dist/leaflet.css';


const Map = ({ coords, width, height }) => {

    const revCoords = coords.map(coord => [coord[1], coord[0]]);
    const mapCenter = revCoords[Math.floor(revCoords.length / 2)];


    return (
        <MapContainer
            center={mapCenter}
            zoom={15}
            style={{ height: height, width: width, }}
            zoomControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Polyline
                positions={revCoords}
                color="blue"
                weight={5}
            />
        </MapContainer>

    );
};

export default Map;

// borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' 