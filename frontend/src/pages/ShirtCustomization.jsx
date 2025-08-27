import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style.css";

import logo from "../assets/images/logo.png";
import cart from "../assets/images/cart.png";
import menu from "../assets/images/menu.png";
import shirt from "../assets/images/shirt.png";

function ShirtCustomization () {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
  
    const menutoggle = () => {
      setMenuOpen(!menuOpen);
    };
  
    const goToCart = () => {
      navigate("/cart");
    };

    const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const [shirtColor, setShirtColor] = useState("#ffffff");
  const [form, setForm] = useState({
    shirtSize: "",
    image: "",
    imagePosition: "",
    customText: "",
    textPosition: "",
    fontSelect: "",
    comments: ""
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = shirt;

    img.onload = () => drawShirt(ctx, img, shirtColor);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = shirt;
    img.onload = () => drawShirt(ctx, img, shirtColor);
  }, [shirtColor]);

  const drawShirt = (ctx, img, color) => {
    ctx.clearRect(0, 0, 512, 512);
    ctx.drawImage(img, 0, 0, 512, 512);

    const imageData = ctx.getImageData(0, 0, 512, 512);
    const data = imageData.data;

    const rNew = parseInt(color.substr(1, 2), 16);
    const gNew = parseInt(color.substr(3, 2), 16);
    const bNew = parseInt(color.substr(5, 2), 16);

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 0) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 765;
        data[i] = rNew * brightness;
        data[i + 1] = gNew * brightness;
        data[i + 2] = bNew * brightness;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "fileInput") {
      setForm({ ...form, image: files[0]?.name || "" });
    } else if (id === "shirtColor") {
      setShirtColor(value);
    } else {
      setForm({ ...form, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cartItem = {
      previewImage: shirt,
      name: "Custom Shirt",
      price: 25.0,
      quantity: 1,
      details: {
        ...form,
        color: shirtColor
      }
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    window.location.href = "/cart";
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
            className="shirt-container"
            style={{
              backgroundColor: "white",
              boxShadow: "0 0 20px 0px rgba(0,0,0,0.1)",
            }}
          >
            <canvas ref={canvasRef} width="512" height="512"></canvas>
            <img ref={imgRef} className="design-overlay"/>
            <br />
          </div>

          <div className="col-2">
            <div className="customizationapplication">
              <div className="form-title">
                <h4 id="customize">Customize</h4>
                <hr id="Customize-Indicator" />
              </div>

              <form id="CustomizeForm" onSubmit={handleSubmit}>
                <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>Pick Size:</p>
                <select
                  id="shirtSize"
                  value={form.shirtSize}
                  onChange={handleChange}
                  style={{ width: "77%", borderColor: "rgb(221, 110, 147)" }}
                >
                  <option value="">Select Size</option>
                  <option>XXL</option>
                  <option>XL</option>
                  <option>L</option>
                  <option>M</option>
                  <option>S</option>
                </select>

                <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>Pick Color:</p>
                <select
                  id="shirtColor"
                  value={shirtColor}
                  onChange={handleChange}
                  style={{ width: "77%", borderColor: "rgb(221,110,147)" }}
                >
                  <option value="#ffffff">White</option>
                  <option value="#000000">Black</option>
                  <option value="#ff0000">Red</option>
                  <option value="#12237e">Blue</option>
                  <option value="#808080">Grey</option>
                </select>

                <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>Enter Logo/Image:</p>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleChange}
                  style={{
                    paddingTop: "3px",
                    textAlign: "right",
                    width: "77%",
                    borderColor: "rgb(221, 110, 147)",
                  }}
                />

                <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>Logo/Image Position:</p>
                <select
                  id="imagePosition"
                  value={form.imagePosition}
                  onChange={handleChange}
                  style={{ width: "77%", borderColor: "rgb(221, 110, 147)" }}
                >
                  <option value="">Select Position</option>
                  <option>Front</option>
                  <option>Front - Right</option>
                  <option>Front - Left</option>
                  <option>Back</option>
                  <option>Right Sleeve</option>
                  <option>Left Sleeve</option>
                </select>

                <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center", paddingTop: "10px"}}>Enter Your Text:</p>
                <input
                  id="customText"
                  value={form.customText}
                  onChange={handleChange}
                  style={{
                    textAlign: "center",
                    width: "77%",
                    borderColor: "rgb(221, 110, 147)",
                  }}
                  type="text"
                />

                <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center", paddingBottom: "10px" }}>Text Position:</p>
                <select
                  id="textPosition"
                  value={form.textPosition}
                  onChange={handleChange}
                  style={{ width: "77%", borderColor: "rgb(221, 110, 147)" }}
                >
                  <option value="">Select Position</option>
                  <option>Front</option>
                  <option>Front - Right</option>
                  <option>Front - Left</option>
                  <option>Back</option>
                  <option>Right Sleeve</option>
                  <option>Left Sleeve</option>
                </select>

                <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>Text Font:</p>
                <select
                  id="fontSelect"
                  value={form.fontSelect}
                  onChange={handleChange}
                  style={{ width: "77%", borderColor: "rgb(221, 110, 147)" }}
                >
                  <option>Select Font</option>
                  <option style={{ fontFamily: "Arial, Helvetica, sans-serif"}}>Arial</option>
                  <option style={{ fontFamily: "'Courier New', Courier, monospace"}}>Courier</option>
                  <option style={{ fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}>Gill Sans</option>
                  <option style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>Segoe UI</option>
                  <option style={{ fontFamily: "'Times New Roman', Times, serif"}}>Times New Roman</option>
                  <option style={{ fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"}}>Lucida Sans</option>
                  <option style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"}}>Trebuchet MS</option>
                  <option style={{ fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"}}>Impact</option>
                  <option style={{ fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Cambria</option>
                  <option style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif"}}>Verdana</option>
                </select>

                <p className="form-label" style={{ fontWeight: "bold", color: "#555", textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>Extra Requests:</p>
                <textarea
                  id="comments"
                  value={form.comments}
                  onChange={handleChange}
                  style={{
                    width: "77%",
                    height: "100px",
                    borderColor: "rgb(221, 110, 147)",
                    fontFamily: "arial, helvetica, sans-serif",
                  }}
                ></textarea>

                <button type="submit" className="btn" style={{ marginTop: "20px" }}>
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

export default ShirtCustomization;