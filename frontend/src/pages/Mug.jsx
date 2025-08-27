import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style.css";

import logo from "../assets/images/logo.png";
import cart from "../assets/images/cart.png";
import menu from "../assets/images/menu.png";
import shirt from "../assets/images/shirt.png";
import mug from "../assets/images/whitemug.png";
import tumbler from "../assets/images/tumbler.png";

function Mug () {
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

       {/* Single Product */}
       <div className="small-container">
        <div className="single-product">
          <div className="row">
            <div className="col-2">
              <img src={mug} className="singleImage" alt="T-Shirt" />
              <canvas id="canvas" width="100%"></canvas>
            </div>
            <div className="col-2">
              <p>Home / Mug</p>
              <h1>Customize Your Mug!</h1>
              <h4>$0.00</h4>
              <input type="number" defaultValue={1} />
              <Link to="/mugcustomization" className="btn">Start Customizing</Link>
              <h3>Product Details <i className="fa fa-indent"></i></h3>
              <br />
              <p style={{ width: '300px' }}>
              Need a Best Parent mug for your favorite parent?
              Now you can come here and get one!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ------ products ------ */}
                  <div className="small-container">
                    <h2 className="title">Want To Customize Something Else?</h2>
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
};

export default Mug;