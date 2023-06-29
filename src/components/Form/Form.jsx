import { useEffect, useReducer } from 'react';

import styles from './Form.module.css';
import Button from '../Button/Button';
import BackButton from '../BackButton/BackButton';
import Message from '../Message/Message';

import { useURLPosition } from '../../hooks/useURLPosition.js';
import Spinner from '../Spinner/Spinner';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const initialState = {
  cityName: '',
  country: '',
  date: new Date(),
  notes: '',
  isLoadingGeocode: false,
  emoji: '',
  geocodingError: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setCityName':
      return { ...state, cityName: action.payload };
    case 'setCountry':
      return { ...state, country: action.payload };
    case 'setDate':
      return { ...state, date: action.payload };
    case 'setNotes':
      return { ...state, notes: action.payload };
    case 'setIsLoadingGeocode':
      return { ...state, isLoadingGeocode: action.payload };
    case 'setEmoji':
      return { ...state, emoji: action.payload };
    case 'setGeocodingError':
      return { ...state, geocodingError: '' };
    default:
      return { ...state };
  }
};

function Form() {
  // const [cityName, setCityName] = useState('');
  // const [country, setCountry] = useState('');
  // const [date, setDate] = useState(new Date());
  // const [notes, setNotes] = useState('');
  // const [isLoadingGeocode, setIsLoadingGeocode] = useState(false);
  // const [emoji, setEmoji] = useState('');
  // const [geocodingError, setGeocodingError] = useState('');

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    cityName,
    country,
    date,
    notes,
    isLoadingGeocode,
    emoji,
    geocodingError,
  } = state;

  const [lat, lon] = useURLPosition();

  useEffect(() => {
    const fetchCityData = async () => {
      dispatch({ type: 'setIsLoadingGeocode', payload: true });
      try {
        await dispatch({ type: 'setGeocodingError', payload: '' });

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lon}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            'Location is invalid, click on another position on the map.'
          );

        dispatch({
          type: 'setCityName',
          payload: data.city || data.locality || '',
        });

        dispatch({ type: 'setCountry', payload: data.countryName });

        dispatch({
          type: 'setEmoji',
          payload: convertToEmoji(data.countryCode),
        });
      } catch (error) {
        dispatch({ type: 'setGeocodingError', payload: error.message });
      } finally {
        dispatch({ type: 'setIsLoadingGeocode', payload: false });
      }
    };
    fetchCityData();
  }, [lat, lon]);

  if (isLoadingGeocode) return <Spinner />;
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) =>
            dispatch({ type: 'setCityName', payload: e.target.value })
          }
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <input
          id='date'
          onChange={(e) =>
            dispatch({ type: 'setDate', payload: e.target.value })
          }
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) =>
            dispatch({ type: 'setNotes', payload: e.target.value })
          }
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={'primary'}>Add</Button>
        <BackButton>Back</BackButton>
      </div>
    </form>
  );
}

export default Form;
