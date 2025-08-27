import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style.css";

import logo from "../assets/images/logo.png";
import cart from "../assets/images/cart.png";
import menu from "../assets/images/menu.png";
import mug from "../assets/images/whitemug.png";

function Products () {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
  
    const menutoggle = () => {
      setMenuOpen(!menuOpen);
    };

    const [fileInput, setFileInput] = useState("");
    const [imagePosition, setImagePosition] = useState("");
    const [customText, setCustomText] = useState("");
    const [textPosition, setTextPosition] = useState("");
    const [fontSelect, setFontSelect] = useState("");
    const [comments, setComments] = useState("");
  
    const goToCart = () => {
      navigate("/cart");
    };

    const handleSubmit = (e) => {
      e.preventDefault();
  
      const price = 25.0;
  
      const cartItem = {
        previewImage: mug,
        name: "Custom Mug",
        price: price,
        quantity: 1,
        details: {
          size: null,
          color: null,
          image: fileInput,
          imagePosition: imagePosition,
          customText: customText,
          textPosition: textPosition,
          font: fontSelect,
          comments: comments,
        },
      };
  
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
  
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

      {/* Customization Form */}
      <div className="customization-page">
        <div className="container">
          <div className="row">
            <div
              id="shirt-container"
              className="shirt-container"
              style={{
                backgroundColor: "white",
                boxShadow: "0 0 20px 0px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={mug}
                width="512px"
                height="512px"
                className="mugimage"
                alt="Custom Mug Preview"
              />
            </div>

            <div className="col-2">
              <div
                className="customizationapplication"
                style={{ height: "700px" }}
              >
                <div className="form-title">
                  <h4 id="customize">Customize</h4>
                  <hr id="Customize-Indicator" />
                </div>

                <form id="CustomizeForm" onSubmit={handleSubmit}>
                  <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center"}}>Enter Logo/Image:</p>
                  <input
                    type="file"
                    accept="image/*"
                    style={{
                      paddingTop: "3px",
                      textAlign: "right",
                      width: "77%",
                      borderColor: "rgb(221, 110, 147)",
                    }}
                    onChange={(e) => setFileInput(e.target.value)}
                  />

                  <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center", paddingBottom: "10px" }}>Logo/Image Position:</p>
                  <select
                    value={imagePosition}
                    onChange={(e) => setImagePosition(e.target.value)}
                    style={{
                      textAlign: "left",
                      width: "77%",
                      borderColor: "rgb(221, 110, 147)",
                    }}
                  >
                    <option>Select Position</option>
                    <option>Handle Left</option>
                    <option>Handle Right</option>
                  </select>

                  <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center", paddingTop: "10px"}}>Enter Your Text:</p>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    style={{
                      textAlign: "center",
                      width: "77%",
                      borderColor: "rgb(221, 110, 147)",
                    }}
                  />

                  <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center", paddingBottom: "10px" }}>Text Position:</p>
                  <select
                    value={textPosition}
                    onChange={(e) => setTextPosition(e.target.value)}
                    style={{
                      textAlign: "left",
                      width: "77%",
                      borderColor: "rgb(221, 110, 147)",
                    }}
                  >
                    <option>Select Position</option>
                    <option>Handle Left</option>
                    <option>Handle Right</option>
                  </select>

                  <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>Text Font:</p>
                  <select
                    value={fontSelect}
                    onChange={(e) => setFontSelect(e.target.value)}
                    style={{
                      textAlign: "left",
                      width: "77%",
                      borderColor: "rgb(221, 110, 147)",
                    }}
                  >
                    <option>Select Font</option>
                    <option style={{ fontFamily: "Arial" }}>Arial</option>
                    <option style={{ fontFamily: "Courier New" }}>Courier</option>
                    <option style={{ fontFamily: "Gill Sans" }}>Gill Sans</option>
                    <option style={{ fontFamily: "Segoe UI" }}>Segoe UI</option>
                    <option style={{ fontFamily: "Times New Roman" }}>
                      Times New Roman
                    </option>
                    <option style={{ fontFamily: "Lucida Sans" }}>Lucida Sans</option>
                    <option style={{ fontFamily: "Trebuchet MS" }}>Trebuchet MS</option>
                    <option style={{ fontFamily: "Impact" }}>Impact</option>
                    <option style={{ fontFamily: "Cambria" }}>Cambria</option>
                    <option style={{ fontFamily: "Verdana" }}>Verdana</option>
                  </select>

                  <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>Extra Requests:</p>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    style={{
                      textAlign: "left",
                      width: "77%",
                      height: "100px",
                      borderColor: "rgb(221, 110, 147)",
                      fontFamily: "arial, helvetica, sans-serif",
                    }}
                  />

                  <button
                    type="submit"
                    className="btn"
                    style={{ marginTop: "20px" }}
                  >
                    Add to Cart
                  </button>
                </form>
              </div>
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

export default Products;