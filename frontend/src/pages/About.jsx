import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style.css";

import logo from "../assets/images/logo.png";
import cart from "../assets/images/cart.png";
import menu from "../assets/images/menu.png";


function About () {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
  
    const menutoggle = () => {
      setMenuOpen(!menuOpen);
    };
  
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

      {/* ------ about ------ */}
      <div className="account-page">
      <div className="small-container" style={{ textAlign: 'center', marginTop: '25px', marginBottom: '25px' }}>
        <div className="container">
          <h1>About Ella Design</h1>
          <p className="tagline">Handcrafted with heart. Delivered with joy.</p>

          <div className="about-content">
            <div className="about-image">
              <img src={logo} alt="Ella Design Logo" />
            </div>
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Ella Design was born out of a passion for creativity, connection, and celebration. What started as a small
                project in a cozy home studio quickly blossomed into a joyful business that brings handcrafted creations to
                customers around the world.
              </p>
              <p>
                Every item is carefully designed and made by hand, with love and purpose in every detail. Whether it's a
                custom charm, a thoughtful gift, or a cheerful ornament, Ella Design pieces are meant to spark happiness —
                for both the giver and the receiver.
              </p>
            </div>
          </div>

          <div className="about-mission">
            <h2>Our Mission</h2>
            <p>
              At Ella Design, our mission is to spread joy through handmade artistry. We believe that small, meaningful
              gifts can make a big impact, and we're committed to crafting pieces that tell a story, celebrate individuality,
              and make people smile.
            </p>
          </div>

          <div className="about-values">
            <h2>What We Value</h2>
            <ul style={{ listStyleType: 'none', color: '#555' }}>
              <li>✨ Thoughtful Design</li>
              <li>👐 Handmade Quality</li>
              <li>📦 Personalized Gifting</li>
              <li>🌱 Sustainability</li>
              <li>💛 Joyful Experiences</li>
            </ul>
          </div>

          <div className="about-cta">
            <p>
              Want to see more? Check out our <a href="/products">latest products</a> or{' '}
              <a href="https://etsy.com/shop/polymerdesignbyella" target="_blank" rel="noopener noreferrer">
                visit us on Etsy
              </a>
              !
            </p>
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

export default About;