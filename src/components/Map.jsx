import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./Map.module.css";

function Map() {
  // URL yönlendirmesi sağlar, mesela map'de herhangi bir yere tıkladıktan sonra
  // url'in app/cities/form'a geçmesi sağlanabilir.
  const navigate = useNavigate();
  // query'deki değerleri yakalamak ve yeni değer göndermek için tanımlanır.
  const [searchParams, setSearchParams] = useSearchParams();

  // Değerleri yakalıyoruz.
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Map</h1>
      <div>
        position {lat}/{lng}
      </div>
      {/* Query'i nesne göndererek güncelleyebiliriz. basit ve kullanışlı bir özellik */}
      <button
        onClick={() => {
          setSearchParams({ lat: 1234, lng: 4567, status: 1 });
        }}
      >
        Change position
      </button>
    </div>
  );
}

export default Map;
