import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import City from './components/City/City';
import CityList from './components/CityList/CityList';
import CountryList from './components/CountryList/CountryList';
import Form from './components/Form/Form';
import AppLayout from './pages/AppLayout/AppLayout';
import FourOhFour from './pages/FourOhFour/FourOhFour';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import Pricing from './pages/Pricing/Pricing';
import Product from './pages/Product/Product';
import { CitiesProvider } from './context/CitiesContext';

const App = () => {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='login' element={<Login />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<Navigate to='cities' replace />} />
            <Route path='cities' element={<CityList />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='countries' element={<CountryList />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<FourOhFour />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
};

export default App;
