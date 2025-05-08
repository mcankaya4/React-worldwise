import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useCities } from "../contexts/CityContext.jsx";
import { useEffect } from "react";
import { useGeolocation } from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";
import { useUrlPosition } from "../hooks/useUrlPosition.js";

function Map() {
  const { cities } = useCities();
  // URL yönlendirmesi sağlar, mesela map'de herhangi bir yere tıkladıktan sonra
  // url'in app/cities/form'a geçmesi sağlanabilir.
  const navigate = useNavigate();
  // query'deki değerleri yakalamak ve yeni değer göndermek için tanımlanır.
  const [mapPosition, setMapPosition] = useState([59.9139, 10.7522]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  // Değerleri yakalıyoruz.
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={9}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span> {city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {/* Haritada konumun dinamik olarak değişmesi için */}
        <ChangeCenter position={mapPosition} />
        <DetechClick navigate={navigate} />
      </MapContainer>
      {/*<h1>Map</h1>*/}
      {/*<div>*/}
      {/*  position {lat}/{lng}*/}
      {/*</div>*/}
      {/* Query'i nesne göndererek güncelleyebiliriz. basit ve kullanışlı bir özellik */}
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    setSearchParams({ lat: 1234, lng: 4567, status: 1 });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Change position*/}
      {/*</button>*/}
    </div>
  );
}

{
  /* Haritada konumun dinamik olarak değişmesi için */
}

// Tıklanan kısmı harita üzerinde ortalamak için;
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetechClick({ navigate }) {
  useMapEvent({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
