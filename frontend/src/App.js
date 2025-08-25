import './App.css';
// import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen.js';
import CartScreen from './screens/CartScreen.js';
import OrdersScreen from './screens/OrdersScreen.js';
import LandingScreen from './screens/LandingScreen.js';
import AdminScreen from './screens/AdminScreen.js';
import Cancellation from './components/info/cancellation.js';
import Contact from './components/info/contact.js';
import Privacy from './components/info/privacy.js';
import Shipping from './components/info/shipping.js';
import Tc from './components/info/tc.js';

//4691310348044446

function AppContent() {
  const location = useLocation();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Force re-render and trigger animation on route change
    setKey(prevKey => prevKey + 1);
  }, [location.pathname]);

  // Only apply animation to landing page and shop page
  const shouldAnimate = location.pathname === '/' || location.pathname === '/shop';
  const animationClass = shouldAnimate ? 'route-fade-in' : '';

  return (
    <div key={key} className={`App ${animationClass}`}>
      <Routes>
        <Route path="/" exact element={<LandingScreen />} />
        <Route path="/shop" exact element={<HomeScreen />} />
        <Route path="/shop/cart" exact element={<CartScreen />} />
        <Route path="/shop/orders" exact element={<OrdersScreen />} />
        <Route path="/shop/admin" exact element={<AdminScreen />} />
        <Route path="/cancellation" exact element={<Cancellation />} />
        <Route path="/contact" exact element={<Contact />} />
        <Route path="/privacy" exact element={<Privacy />} />
        <Route path="/shipping" exact element={<Shipping />} />
        <Route path="/tc" exact element={<Tc />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
