import styles from './CountryList.module.css';
import Spinner from '../Spinner/Spinner';

import Message from '../Message/Message';

const CountryList = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message='Add your first city by clicking on a city on the map!' />
    );

  return (
    <ul className={styles.countryList}>
      {cities.map((city) => {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
};

export default CountryList;