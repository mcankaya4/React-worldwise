import { useParams, useNavigate } from "react-router-dom";

import styles from "./City.module.css";
import Button from "./Button.jsx";
import { useEffect } from "react";
import { useCities } from "../contexts/CityContext.jsx";
import Spinner from "./Spinner.jsx";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// TEMP DATA
// const currentCity = {
//   cityName: "Lisbon",
//   emoji: "🇵🇹",
//   date: "2027-10-31T15:59:59.138Z",
//   notes: "My favorite city so far!",
// };

function City() {
  const navigate = useNavigate();
  // app/cities/12313123 rotasındaki id değerini yakalar.
  const { id } = useParams();
  // query'deki değerleri yakalamak ve yeni değer göndermek için tanımlanır.
  // const [searchParams] = useSearchParams();
  // Değerleri yakalıyoruz.
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  const { getCity, currentCity, isLoading } = useCities();

  useEffect(() => {
    getCity(id);
  }, [getCity, id]);

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default City;
