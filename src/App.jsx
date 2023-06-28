import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import CityList from './components/CityList/CityList';
import CountryList from './components/CountryList/CountryList';
import AppLayout from './pages/AppLayout/AppLayout';
import FourOhFour from './pages/FourOhFour/FourOhFour';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import Pricing from './pages/Pricing/Pricing';
import Product from './pages/Product/Product';
import City from './components/City/City';
import Form from './components/Form/Form';

const BASE_URL = 'http://localhost:8000';

const App = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='login' element={<Login />} />
        <Route path='app' element={<AppLayout />}>
          <Route index element={<Navigate to='cities' replace />} />
          <Route
            path='cities'
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path='cities/:id' element={<City />} />
          <Route
            path='countries'
            element={<CountryList isLoading={isLoading} cities={cities} />}
          />
          <Route path='form' element={<Form />} />
        </Route>
        <Route path='*' element={<FourOhFour />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
