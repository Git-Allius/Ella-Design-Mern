import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style.css";

import logo from "../assets/images/logo.png";
import cart from "../assets/images/cart.png";
import menu from "../assets/images/menu.png";
import black from "../assets/images/black.jpg"

function Account () {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [deleteEmail, setDeleteEmail] = useState(""); // NEW for delete

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const res = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            if (res.ok) {
                setMessage("submitted correctly");
                e.target.reset();
            } else {
                const data = await res.json();
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            setError("Error submitting form");
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const email = e.target.email?.value; // optional chaining in case not present
            const password = e.target.password.value;
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            if (res.ok) {
                const data = await res.json();
                if (data && data._id) {
                    setMessage("account found!");
                    if (email) {
                        localStorage.setItem("userEmail", email); // store email for delete
                        setDeleteEmail(email); // prefill delete field
                    }
                } else {
                    setError("Account not found");
                }
            } else {
                const data = await res.json();
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Error logging in");
        }
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const loginFormRef = useRef(null);
    const regFormRef = useRef(null);
    const indicatorRef = useRef(null);

    const [activeForm, setActiveForm] = useState('login');
  
    const menutoggle = () => {
      setMenuOpen(!menuOpen);
    };
  
    const goToCart = () => {
      navigate("/cart");
    };

    const handleLoginClick = () => {
      if (loginFormRef.current && regFormRef.current && indicatorRef.current) {
        regFormRef.current.style.transform = 'translateX(300px)';
        loginFormRef.current.style.transform = 'translateX(300px)';
        indicatorRef.current.style.transform = 'translateX(0px)';
      }
      setActiveForm('login');
    };
  
    const handleRegisterClick = () => {
      if (loginFormRef.current && regFormRef.current && indicatorRef.current) {
        regFormRef.current.style.transform = 'translateX(0px)';
        loginFormRef.current.style.transform = 'translateX(0px)';
        indicatorRef.current.style.transform = 'translateX(100px)';
      }
      setActiveForm('register');
    };
  
    const preventEnter = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
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

      {/* Account/Login/Register Section */}
      <div className="account-page">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <img src={black} alt="Product" width="100%" />
            </div>
            <div className="col-2">
              <div className="form-container">
                <div className="form-btn">
                  <span onClick={handleLoginClick}>Login</span>
                  <span onClick={handleRegisterClick}>Register</span>
                  <hr id="Indicator" ref={indicatorRef} />
                </div>

                {/* Login Form */}
                <form id="LoginForm" ref={loginFormRef} onKeyDown={preventEnter} onSubmit={handleLoginSubmit}>
                  <input type="email" placeholder="Email" name="email"/>
                  <input type="password" placeholder="Password" name="password"/>
                  <button type="submit" className="btn">Login</button>

                  {message && <p style={{ color: "green" }}>{message}</p>}
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </form>

                {/* Register Form */}
                <form id="RegForm" ref={regFormRef} onKeyDown={preventEnter} onSubmit={handleRegisterSubmit}>
                  <input type="text" placeholder="Username" name="name"/>
                  <input type="email" placeholder="Email" name="email" />
                  <input type="password" placeholder="Password" name="password"/>
                  <button type="submit" className="btn">Register</button>
                  {message && <p style={{ color: "green" }}>{message}</p>}
                  {error && <p style={{ color: "red" }}>{error}</p>}
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

export default Account;