import styles from './CityList.module.css';
import Spinner from '../Spinner/Spinner';
import CityItem from '../CityItem/CityItem';

const CityList = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
};

export default CityList;

CityList.propTypes = {};
