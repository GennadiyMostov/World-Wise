import { BrowserRouter, Routes, Route } from 'react-router-dom';

import FourOhFour from './pages/FourOhFour';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Home from './pages/Home';
import AppLayout from './pages/AppLayout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='app' element={<AppLayout />} />
        <Route path='*' element={<FourOhFour />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
