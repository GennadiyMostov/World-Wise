import { BrowserRouter, Routes, Route } from 'react-router-dom';

import FourOhFour from './pages/FourOhFour/FourOhFour';
import Product from './pages/Product/Product';
import Pricing from './pages/Pricing/Pricing';
import Homepage from './pages/Homepage/Homepage';
import AppLayout from './pages/AppLayout/AppLayout';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='/login' element={<Login />} />
        <Route path='app' element={<AppLayout />}>
          <Route index element={<p>LIST</p>} />
          <Route path='cities' element={<p>List of cities Here</p>} />
          <Route path='countries' element={<p>List of Coutries Here</p>} />
          <Route path='form' element={<p>Form</p>} />
        </Route>
        <Route path='*' element={<FourOhFour />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
