import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style.css";
import axios from "axios";

import logo from "../assets/images/logo.png";
import cartImage from "../assets/images/cart.png";
import menu from "../assets/images/menu.png";

function Checkout () {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [stateField, setStateField] = useState("");
    const [phone, setPhone] = useState("");

    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [totals, setTotals] = useState({ subtotal: 0, tax: 0, total: 0 });

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
        setCartItems(savedCart);

        let subtotal = 0;
        savedCart.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        const tax = subtotal * 0.07;
        const total = subtotal + tax;
        setTotals({ subtotal, tax, total });
    }, []);

    const buildVenmoNote = () => {
        if (cart.length === 0) return 'Order from Ella Design';

        const parts = cart.map(item => {
            const bits = [
                `${item.quantity}x`,
                item.name,
                item.details?.shirtColor,
                item.details?.shirtSize
            ].filter(Boolean);
            return bits.join(' ');
        });

        let note = parts.join('; ');

        const extras = cart.map(item => {
            const e = [];
            if (item.details?.customText) e.push(`Text:"${item.details.customText}"`);
            if (item.details?.image) e.push(`Img:${item.details.image}`);
            return e.join(' ');
        }).filter(Boolean).join('; ');

        if (extras && (note.length + extras.length) < 230) {
            note += ` | ${extras}`;
        }

        return note;
    };

    const handleVenmoPay = () => {
        const recipient = '@Ella-cuadros';
        const amount = totals.total.toFixed(2);
        const note = buildVenmoNote();
        const venmoUrl = `https://venmo.com/?txn=pay&recipients=${encodeURIComponent(recipient)}&amount=${encodeURIComponent(amount)}&note=${encodeURIComponent(note)}`;
        window.location.href = venmoUrl;
    };

    const menutoggle = () => {
        const menu = document.getElementById("MenuItems");
        const container = document.getElementById("small-container");

        if (menu.style.maxHeight === "0px") {
            menu.style.maxHeight = "200px";
            container.style.transform = "translateY(100px)";
        } else {
            menu.style.maxHeight = "0px";
            container.style.transform = "translateY(0px)";
        }

        setMenuOpen(!menuOpen);
    };

    const goToCart = () => {
        navigate("/cart");
    };

    const handleCheckout = async () => {
        if (!cartItems || cartItems.length === 0) {
            console.error("Cart is empty. Cannot submit order.");
            return;
        }

        const sanitizedItems = cartItems.map(item => ({
          productId: item.productId || item._id || "placeholder-id",
          name: item.name || "Unnamed Product",
          price: item.price ?? 0,
          quantity: item.quantity ?? 1,
        }));
        
        const orderData = {
          firstName,
          lastName,
          address,
          zip,
          city,
          state: stateField,
          phone,
          items: sanitizedItems,
          totalAmount: totals.total,
        };

        console.log("Sending order data to backend:", orderData);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/orders",
                orderData,
                { headers: { "Content-Type": "application/json" } }
            );
            console.log("Order submitted successfully:", response.data);
        } catch (error) {
            if (error.response) {
                console.error("Server responded with error:", error.response.data);
            } else if (error.request) {
                console.error("No response from server, request was:", error.request);
            } else {
                console.error("Error creating request:", error.message);
            }
        }
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
                src={cartImage}
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

      {/* Checkout Form */} 
      <div className="account-page">
      <div className="small-container">
        <div className="col-2" id="small-container">
          <div className="payment">
            <div className="form-title"
                style={{
                  maxWidth: "450px",
                  margin: "0 auto",
                  textAlign: "center",
                  width: "100%", // so it can scale
                }}>
                <h4 id="customize">Payment</h4>
                <hr id="Contact-Indicator"/>
              </div>

            <form id="PaymentForm" onSubmit={e => e.preventDefault()} style={{ maxWidth: '100%', marginTop: '-50px' }}>
              <input type="text" placeholder="First Name" required value={firstName}
  onChange={(e) => setFirstName(e.target.value)}/>
              <input type="text" placeholder="Last Name" required value={lastName}
  onChange={(e) => setLastName(e.target.value)}/>
              <input type="text" placeholder="Street Address" required value={address}
  onChange={(e) => setAddress(e.target.value)}/>
              <input type="text" placeholder="ZIP/Postal Code (optional)" value={zip}
  onChange={(e) => setZip(e.target.value)}/>
              <input type="text" placeholder="City" required value={city}
  onChange={(e) => setCity(e.target.value)}/>
              <input type="text" placeholder="State" required value={stateField}
  onChange={(e) => setStateField(e.target.value)}/>
              <input type="phone" placeholder="Phone Number" value={phone}
  onChange={(e) => setPhone(e.target.value)}/>

              <div id="orderSummary" className="form-title" style={{ margin: '20px 0' }}>
                <hr id="Contact-Indicator" />
                <h4 id="customize" style={{ paddingTop: '10px' }}>Your Order</h4>
                <div id="orderItems">
                  {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                  ) : (
                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                      {cart.map((item, index) => {
                        const lineTotal = item.price * item.quantity;
                        const labelParts = [
                          item.name,
                          item.details?.shirtColor,
                          item.details?.shirtSize,
                          item.details?.customText ? `Text:"${item.details.customText}"` : null,
                          item.details?.image ? `Img:${item.details.image}` : null
                        ].filter(Boolean);
                        return (
                          <li key={index} style={{ margin: '6px 0' }}>
                            {item.quantity} × {labelParts.join(' ')} — ${lineTotal.toFixed(2)}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <hr id="Contact-Indicator" />
                <div className="subtaxtotal">
                  <table>
                    <tbody>
                      <tr>
                        <td>Subtotal</td>
                        <td><span style={{ fontWeight: 'normal' }}>${totals.subtotal.toFixed(2)}</span></td>
                      </tr>
                      <tr>
                        <td>Tax</td>
                        <td><span style={{ fontWeight: 'normal' }}>${totals.tax.toFixed(2)}</span></td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td><span style={{ fontWeight: 'normal' }}>${totals.total.toFixed(2)}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <button className="btn" type="button" onClick={
                handleCheckout}>Pay with Venmo</button>
            </form>
          </div>
        </div>
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

export default Checkout;