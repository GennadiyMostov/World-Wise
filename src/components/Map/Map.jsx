import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";

import { useState, useEffect } from "react";
import { useCities } from "../../context/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button/Button";
import { useURLPosition } from "../../hooks/useURLPosition.js";

const Map = () => {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([
    50.44990787536339, 30.523796081542972,
  ]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getCoordinates,
  } = useGeolocation();

  const [mapLat, mapLon] = useURLPosition();

  useEffect(() => {
    if (mapLat && mapLon) {
      setMapPosition([mapLat, mapLon]);
    }
  }, [mapLat, mapLon]);

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type='position' onClick={getCoordinates}>
          {isLoadingPosition ? "Loading" : "Use Your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setZoom(14);
  map.panTo(position);
  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (event) => {
      navigate(`form?lat=${event.latlng.lat}&lon=${event.latlng.lng}`);
    },
  });
  return null;
};

export default Map;
