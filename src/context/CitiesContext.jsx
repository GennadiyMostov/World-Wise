import { createContext, useState, useEffect, useContext } from 'react';

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:8000';

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert('Error Fetching Data, Check Your Connect And Try Again');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert('Error Fetching Data, Check Your Connect And Try Again');
    } finally {
      setIsLoading(false);
    }
  };

  const createCity = async (newCity) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      console.log(data);
      setCities([...cities, data]);
      setCurrentCity(data);
    } catch {
      alert('Error Creating City');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = async (id) => {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert('Error Deleting That City');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setIsLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}>
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
