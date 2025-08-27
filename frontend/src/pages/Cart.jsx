import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style.css";

import logo from "../assets/images/logo.png";
import cartimage from "../assets/images/cart.png";
import menu from "../assets/images/menu.png";

function Cart () {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
  
    const menutoggle = () => {
      setMenuOpen(!menuOpen);
    };
  
    useEffect(() => {
      renderCart();
    }, []);
  
    const renderCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
  
      const total = storedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setSubtotal(total);
    };
  
    const removeItem = (index) => {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      renderCart();
    };
  
    const updateQuantity = (index, quantity) => {
      const updatedCart = [...cart];
      updatedCart[index].quantity = parseInt(quantity);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      renderCart();
    };
  
    const tax = subtotal * 0.07;
    const total = subtotal + tax;
  
    const goToCart = () => {
      navigate("/cart");
    };
  
    return (
      <div>
        {/* ------ nav bar ------ */}
          <div className="container">
            <div className="navbar">
              <div className="logo">
                <img src={logo} alt="Logo" width="125px" />
              </div>
              <nav>
                <ul
                  id="MenuItems"
                  style={{ maxHeight: menuOpen ? "200px" : "0px" }}
                >
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/products">Products</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/account">Account</Link></li>
                </ul>
              </nav>
              <img
                src={cartimage}
                alt="Cart"
                width="30px"
                height="30px"
                onClick={goToCart}
                style={{ cursor: "pointer" }}
              />
              <img
                src={menu}
                alt="Menu"
                className="menu-icon"
                onClick={menutoggle}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

      {/* Cart Page */}
      <div className="small-container">
        <div className="cart-page">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                const itemSubtotal = item.price * item.quantity;
                return (
                  <tr key={index}>
                    <td>
                      <div className="cart-info">
                        <img src={item.previewImage} alt="Product" />
                        <div style={{ maxWidth: "150px" }}>
                          <p>{item.name} {item.details.shirtColor} {item.details.shirtSize}</p>
                          <small>Price: ${item.price.toFixed(2)}</small><br />
                          <small style={{ color: "lightgrey" }}>
                            Logo/Image: {item.details.image || 'None'} | Position: {item.details.imagePosition || 'None'}<br />
                            Text: {item.details.customText || 'None'} | Position: {item.details.textPosition || 'None'} | Font: {item.details.font || 'None'}<br />
                            Comments: {item.details.comments || 'None'}
                          </small><br />
                          <a href="#" onClick={(e) => { e.preventDefault(); removeItem(index); }}>Remove</a>
                        </div>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(index, e.target.value)}
                      />
                    </td>
                    <td>${itemSubtotal.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="total-price">
            <table>
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td>${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td>${tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>${total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link to="/checkout" className="btn" style={{ maxWidth: "1080px", width: "100%", textAlign: "center" }}>
            Proceed to Checkout →
          </Link>
        </div>
      </div>

      {/* ------ footer ------ */}
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col-1">
              <h3>Looking for more products?</h3>
              <a href="https://etsy.com/shop/polymerdesignbyella">Visit in Etsy as well!</a>
            </div>
            <div className="footer-col-2">
              <img src={logo} alt="Footer Logo" />
              <p>
                The joy of picking the gift, the excitement of knowing that it will be delivered to a loved one's front door
                as a surprise, and the pleasure of knowing they will have a huge smile when they open the box... all of it
                is why my shop exists!
              </p>
            </div>
            <div className="footer-col-3">
              <h3>Follow for more!</h3>
              <a href="https://www.instagram.com/designsbyellac/?igsh=OG8zaHpscm1zeHZy">Instagram</a>
            </div>
          </div>

          <hr />
          <p className="copyright">Copyright 2025 - CUADROS</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;