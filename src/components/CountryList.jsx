import styles from "./CountryList.module.css";
import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";
import Message from "./Message.jsx";
import { useCities } from "../contexts/CityContext.jsx";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message={"Country is zero found."} />;

  // Ülke isimlerini ve emojilerini grup olarak döndürür.
  const countries = Array.from(
    cities
      .reduce((map, city) => {
        if (!map.has(city.country)) {
          map.set(city.country, { country: city.country, emoji: city.emoji });
        }
        return map;
      }, new Map())
      .values(),
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountryList;
