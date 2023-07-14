import { useCallback } from 'react';
import { createContext, useEffect, useContext, useReducer } from 'react';

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:8000';

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'Loaded_Cities':
      return { ...state, isLoading: false, cities: action.payload };
    case 'createCity':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'Loaded_City':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'deleteCity':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Unknown Action Type');
  }
};
const CitiesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, isLoading, currentCity, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'Loaded_Cities', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities..',
        });
      }
    };
    fetchData();
  }, []);

  const getCity = useCallback(
    async (id) => {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: 'Loaded_City', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading the city..',
        });
      }
    },
    [currentCity.id]
  );

  const createCity = async (newCity) => {
    if (cities.some((city) => city.cityName === newCity.cityName)) {
      dispatch({
        type: 'rejected',
        payload: 'That city is already on your list',
      });
      return;
    }

    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      dispatch({ type: 'createCity', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating the city..',
      });
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'deleteCity', payload: id });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the city..',
      });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the cities provider');
  return context;
};

export { CitiesProvider, useCities };
