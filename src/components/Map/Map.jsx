import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { Map, TileLayer, Marker } from 'react-leaflet';
// import L, { LatLngExpression } from 'leaflet';

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "./Map.css";
import L from 'leaflet';

L.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/';

const GeoMap = ({ lat, lng, setLat, setLng}) => {
  const [positionOnTheMap] = useState([lat,lng])
  const [position, setPosition] = useState(positionOnTheMap);

  const handleSetGeoLocation = (longitude, latitude) => {
    setLat(latitude);
    setLng(longitude);
  };

  const DraggableMarker = () => {
    const [draggable] = useState(true);
    const markerRef = useRef(null);
    const updatePosition = () => {
      const marker = markerRef.current;
      if (marker != null) {
        const newPos = {...marker.leafletElement.getLatLng()};
        setPosition([newPos.lat.toString(), newPos.lng.toString()]);
        handleSetGeoLocation(newPos.lng, newPos.lat)
      }
    }

    return (
      <Marker draggable={draggable} onDragend={updatePosition} position={position} ref={markerRef} />
    );
  };

  return(
    <Map center={positionOnTheMap} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <DraggableMarker />
    </Map>
  );
}

export default GeoMap;