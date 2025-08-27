import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css'; 

// import css and images
import "../assets/style.css"; 
import black from "../assets/images/black.jpg";
import cart from "../assets/images/cart.png";
import logo from "../assets/images/logo.png";
import menu from "../assets/images/menu.png";
import shirt from "../assets/images/shirt.png";
import tumbler from "../assets/images/tumbler.png";
import mug from "../assets/images/whitemug.png";


function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menutoggle = () => {
    setMenuOpen(!menuOpen);
  };

  const changeTShirt = () => {
    navigate("/shirt");
  };

  const changeMug = () => {
    navigate("/mug");
  };

  const changeTumbler = () => {
    navigate("/tumbler");
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div>
      {/* ------ nav bar ------ */}
      <div className="header">
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

          <div className="row">
            <div className="col">
              <h1>Get Your Customizable<br />Gifts Today!</h1>
              <p>
                Don't know what to get for your special someone, or for yourself?
                <br />Why not get something more personal?
              </p>
              <Link to="/products" className="btn">Explore &#8594;</Link>
            </div>
            <div className="col-2">
              <img src={black} alt="Banner" />
            </div>
          </div>
        </div>
      </div>

      {/* ------ categories ------ */}
      <div className="categories">
        <div className="small-container">
          <div className="row">
            <div className="col-3"><img src={black} alt="Category" /></div>
            <div className="col-3"><img src={black} alt="Category" /></div>
            <div className="col-3"><img src={black} alt="Category" /></div>
          </div>
        </div>
      </div>

      {/* ------ featured products ------ */}
      <div className="small-container">
        <h2 className="title">Featured Products</h2>
        <div className="row">
          <div className="col-4" onClick={changeTShirt}>
            <div id="shirt" style={{ cursor: "pointer" }}>
              <img src={shirt} alt="T-Shirt" width="300px" height="300px" style={{ backgroundColor: "pink" }} />
              <h4>T-Shirt</h4>
              <div className="rating">{[...Array(5)].map((_, i) => <i key={i} className="fa fa-star"></i>)}</div>
              <p>$0.00</p>
            </div>
          </div>

          <div className="col-4" onClick={changeMug}>
            <div id="mug" style={{ cursor: "pointer" }}>
              <img src={mug} alt="Mug" width="300px" height="300px" style={{ backgroundColor: "pink" }} />
              <h4>Mug</h4>
              <div className="rating">{[...Array(5)].map((_, i) => <i key={i} className="fa fa-star"></i>)}</div>
              <p>$0.00</p>
            </div>
          </div>

          <div className="col-4" onClick={changeTumbler}>
            <div id="tumbler" style={{ cursor: "pointer" }}>
              <img src={tumbler} alt="Tumbler" width="300px" height="300px" style={{ backgroundColor: "pink" }} />
              <h4>Tumbler</h4>
              <div className="rating">{[...Array(5)].map((_, i) => <i key={i} className="fa fa-star"></i>)}</div>
              <p>$0.00</p>
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

export default Home;