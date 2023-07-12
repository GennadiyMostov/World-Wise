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
import { AuthProvider } from './context/FakeAuthContext';
/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path='product' element={<Product />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='login' element={<Login />} />
            <Route path='app' element={<AppLayout />}>
              <Route index element={<Navigate replace to='cities' />} />
              <Route path='cities' element={<CityList />} />
              <Route path='cities/:id' element={<City />} />
              <Route path='countries' element={<CountryList />} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path='*' element={<FourOhFour />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
