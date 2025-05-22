import React from "react";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconUrl from "../assets/images/icon-location.svg";
import "./Map.scss";

const customIcon = new L.Icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

function MapUpdater({ lat, lng }) {
    const map = useMap();

    useEffect(() => {
        if (lat && lng) {
            map.flyTo([lat, lng], 13, {
                animate: true,
                duration: 1.5,
            });
        }
    }, [lat, lng]);

    return null;
}

function Map({ lat, lng }) {
    return (
        <MapContainer className="map" center={[lat, lng]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]} icon={customIcon} />
            <MapUpdater lat={lat} lng={lng} />
        </MapContainer>
    );
}

export default Map;
