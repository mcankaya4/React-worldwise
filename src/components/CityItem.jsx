import { Link } from "react-router-dom";
import { useCities } from "../contexts/CityContext.jsx";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("tr", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "short",
  }).format(new Date(date));

function CityItem({ city }) {
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  // Bunu alma sebebimiz cityItem--active sitilini tanımlamak
  const { currentCity, deleteCity } = useCities();

  async function handleDelete(e) {
    e.preventDefault();

    await deleteCity(id);
  }

  return (
    <li>
      {/* app/cities/id rotasına id değerini aktarıyoruz */}
      {/* üstünede lat ve lng değerini query olarak ekliyoruz. */}
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${currentCity.id === city.id ? styles["cityItem--active"] : ""}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
