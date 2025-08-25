import './App.css';
// import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, Switch} from 'react-router-dom';
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

function App() {
  return (
    <div>
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
