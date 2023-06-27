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
        <Route path='/' element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='/login' element={<Login />} />
        <Route path='app' element={<AppLayout />} />
        <Route path='*' element={<FourOhFour />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
