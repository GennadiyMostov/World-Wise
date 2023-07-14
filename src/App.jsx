import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Suspense, lazy } from 'react';
import City from './components/City/City';
import CityList from './components/CityList/CityList';
import CountryList from './components/CountryList/CountryList';
import Form from './components/Form/Form';
import SpinnerFullPage from './components/Spinner/SpinnerFullPage';
import { CitiesProvider } from './context/CitiesContext';
import { AuthProvider } from './context/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';

/* Imports BEFORE lazy loading */

// import AppLayout from './pages/AppLayout/AppLayout';
// import FourOhFour from './pages/FourOhFour/FourOhFour';
// import Homepage from './pages/Homepage/Homepage';
// import Login from './pages/Login/Login';
// import Pricing from './pages/Pricing/Pricing';
// import Product from './pages/Product/Product';
/*


/* 
Bundle size before lazy loading:
dist/assets/index-d4f8cb12.css   30.12 kB │ gzip:   5.09 kB
dist/assets/index-4430a057.js   525.53 kB │ gzip: 149.14 kB
*/

//Lazy Loading Implementation Imports

const Homepage = lazy(() => import('./pages/Homepage/Homepage'));
const Product = lazy(() => import('./pages/Product/Product'));
const Pricing = lazy(() => import('./pages/Pricing/Pricing'));
const Login = lazy(() => import('./pages/Login/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout/AppLayout'));
const FourOhFour = lazy(() => import('./pages/FourOhFour/FourOhFour'));

/* Bundle Size After Lazy Loading Implementation */

// dist/index.html                           0.48 kB │ gzip:   0.32 kB
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/Homepage-f674ec3f.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-6dde6d18.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-c5a06b9e.css           26.45 kB │ gzip:   4.36 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/Logo-15352365.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/FourOhFour-20d0d0bb.js        0.30 kB │ gzip:   0.23 kB
// dist/assets/PageNav-7fcfe2df.js           0.54 kB │ gzip:   0.31 kB
// dist/assets/Pricing-9d35f846.js           0.64 kB │ gzip:   0.41 kB
// dist/assets/Homepage-5d360d21.js          0.65 kB │ gzip:   0.40 kB
// dist/assets/Product-07e84d7d.js           0.85 kB │ gzip:   0.48 kB
// dist/assets/Login-a2df6088.js             1.00 kB │ gzip:   0.53 kB
// dist/assets/AppLayout-1744e32b.js       156.98 kB │ gzip:  46.23 kB
// dist/assets/index-2bf26f57.js           366.88 kB │ gzip: 102.31 kB

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path='product' element={<Product />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />
              <Route
                path='app'
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to='cities' />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='countries' element={<CountryList />} />
                <Route path='form' element={<Form />} />
              </Route>
              <Route path='*' element={<FourOhFour />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;

/* CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
