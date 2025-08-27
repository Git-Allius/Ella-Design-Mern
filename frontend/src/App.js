import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout"
import Shirt from "./pages/Shirt";
import ShirtCustomization from "./pages/ShirtCustomization"
import Mug from "./pages/Mug";
import MugCustomization from "./pages/MugCustomization"
import Tumbler from "./pages/Tumbler";
import TumblerCustomization from "./pages/TumblerCustomization"


import '@fontsource/poppins'; // Defaults to weight 400
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shirt" element={<Shirt />} />
        <Route path="/shirtcustomization" element={<ShirtCustomization />} />
        <Route path="/mug" element={<Mug />} />
        <Route path="/mugcustomization" element={<MugCustomization />} />
        <Route path="/tumbler" element={<Tumbler />} />
        <Route path="/tumblercustomization" element={<TumblerCustomization />} />
      </Routes>
    </Router>
  );
}

export default App;