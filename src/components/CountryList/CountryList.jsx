import styles from './CountryList.module.css';

import CountryItem from '../CountryItem/CountryItem';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';

import { CitiesDataConsumer } from '../../context/CitiesContext';

const CountryList = () => {
  const { cities, isLoading } = CitiesDataConsumer();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message='Add your first country by clicking on a city on the map!' />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((element) => element.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem country={country} key={crypto.randomUUID()} />;
      })}
    </ul>
  );
};

export default CountryList;
