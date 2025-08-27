import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../assets/style.css";
import logo from "../assets/images/logo.png";
import cart from "../assets/images/cart.png";
import menu from "../assets/images/menu.png";

function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const containerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const phonenumber = e.target.phonenumber.value;
    const message = e.target.message.value;

    const formData = { firstname, lastname, email, phonenumber, message };

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // "Message stored successfully"
        e.target.reset(); // clear the form
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const menutoggle = () => {
    const menu = document.getElementById("MenuItems");
    const container = containerRef.current;

    if (menu.style.maxHeight === "0px") {
      menu.style.maxHeight = "200px";
      container.style.transform = "translateY(100px)";
    } else {
      menu.style.maxHeight = "0px";
      container.style.transform = "translateY(0px)";
    }

    setMenuOpen(!menuOpen);
  };

  const goToCart = () => navigate("/cart");

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
              ref={menuRef}
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
            src={cart}
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

      {/* Contact Form Section */}
      <div className="account-page">
        <div className="small-container">
          <div className="col-2" ref={containerRef}>
            <div className="contact">
              <div
                className="form-title"
                style={{ maxWidth: "450px", margin: "0 auto", textAlign: "center", width: "100%" }}
              >
                <h4 id="customize">Contact Us</h4>
                <hr id="Contact-Indicator" />
              </div>

              <form
                id="ContactForm"
                style={{ alignItems: "center", maxWidth: "100%", marginTop: "-50px" }}
                onSubmit={handleSubmit}
              >
                <input type="text" placeholder="First Name" style={{ width: "100%" }} name="firstname" required />
                <input type="text" placeholder="Last Name" name="lastname" />
                <input type="email" placeholder="Email" name="email" required />
                <input type="tel" placeholder="Phone Number" name="phonenumber" />
                <h5 style={{ fontWeight: "normal" }}>Message:</h5>
                <textarea
                  id="customText"
                  style={{ textAlign: "left", width: "100%", height: "100px", borderColor: "lightgrey", fontFamily: "arial, helvetica, sans-serif" }}
                  name="message"
                  required
                />
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"} &#8594;
                </button>
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
}

export default Contact;