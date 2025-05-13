// src/layout/Header/Header.jsx
import React, { useState } from "react";
import "./Header.scss";
import { MdClear, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiCart, BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // Yo'lni tekshiring

function Header() {
  const [isFragmentVisible, setIsFragmentVisible] = useState(true);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const { totalCartItems, newItemAdded, setNewItemAdded } = useCart();
  const navigate = useNavigate();

  const handleClearClick = () => {
    setIsFragmentVisible(false);
  };

  const toggleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const handleCartIconClick = () => {
    setNewItemAdded(false);
    navigate("/cart");
  };

  const closeBurgerMenu = () => {
    setIsBurgerOpen(false);
  };

  return (
    <header className="site-header">
      {isFragmentVisible && (
        <div className="header-top">
          <p>
            Sign up and get 20% off to your first order.{" "}
            <Link
              to="/signup"
              className="header-top__link"
              onClick={closeBurgerMenu}
            >
              Sign Up Now
            </Link>
          </p>
          <MdClear className="clear-btn" onClick={handleClearClick} />
        </div>
      )}
      <div className="container">
        <div className="navbar-wrapper">
          {/* Chap taraf: Burger (mobil) va Logo */}
          <div className="navbar-brand-group">
            <div className="burger-icon" onClick={toggleBurger}>
              <FiMenu />
            </div>
            <Link to="/" className="logo-link" onClick={closeBurgerMenu}>
              <h3 className="logo-text">SHOP.CO</h3>
            </Link>
          </div>

          {/* O'rta qism: Asosiy menyu (DESKTOP UCHUN) */}
          <nav className="content-ul desktop-nav">
            {" "}
            {/* desktop-nav klassi muhim */}
            <ul>
              <li className="nav-item dropdown-item">
                <Link to="/category" className="nav-link">
                  Shop
                  <MdOutlineKeyboardArrowDown className="dropdown-icon" />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shop?filter=on-sale" className="nav-link">
                  On Sale
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shop?filter=new-arrivals" className="nav-link">
                  New Arrivals
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/brands" className="nav-link">
                  Brands
                </Link>
              </li>
            </ul>
          </nav>

          {/* O'ng taraf: Qidiruv (desktop) va Ikonkalar */}
          <div className="navbar-actions-group">
            <div className="search-input desktop-search">
              {" "}
              {/* desktop-search klassi muhim */}
              <BiSearch className="search-icon" />
              <input type="text" placeholder="Search for products..." />
            </div>
            <div className="card-and-profile-icons">
              <BiSearch className="mobile-search-icon action-icon" />
              <div
                className="cart-icon-wrapper action-icon"
                onClick={() => {
                  handleCartIconClick();
                  closeBurgerMenu();
                }}
              >
                <BiCart />
                {totalCartItems > 0 && (
                  <span
                    className={`cart-badge ${newItemAdded ? "new-item" : ""}`}
                  >
                    {totalCartItems}
                  </span>
                )}
              </div>
              <Link
                to="/profile"
                className="action-icon"
                onClick={closeBurgerMenu}
              >
                <CgProfile />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MOBIL UCHUN OCHILADIGAN MENYU */}
      {isBurgerOpen && (
        <nav className="mobile-menu-overlay" onClick={closeBurgerMenu}>
          {" "}
          {/* Overlay uchun */}
          <div
            className="mobile-menu-content"
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            {/* Kontent overlayni yopmasligi uchun */}
            {/* Bu yerga mobil menyu elementlarini qo'yamiz, rasmdagi kabi */}
            <ul className="mobile-menu-list">
              <li className="mobile-menu-item dropdown-item">
                <Link
                  to="/category"
                  className="mobile-menu-link"
                  onClick={closeBurgerMenu}
                >
                  Shop
                  <MdOutlineKeyboardArrowDown className="dropdown-icon" />
                </Link>
              </li>
              <li className="mobile-menu-item">
                <Link
                  to="/shop?filter=on-sale"
                  className="mobile-menu-link"
                  onClick={closeBurgerMenu}
                >
                  On Sale
                </Link>
              </li>
              <li className="mobile-menu-item">
                <Link
                  to="/shop?filter=new-arrivals"
                  className="mobile-menu-link"
                  onClick={closeBurgerMenu}
                >
                  New Arrivals
                </Link>
              </li>
              <li className="mobile-menu-item">
                <Link
                  to="/brands"
                  className="mobile-menu-link"
                  onClick={closeBurgerMenu}
                >
                  Brands
                </Link>
              </li>
              {/* Agar boshqa linklar bo'lsa, shu yerga qo'shiladi */}
            </ul>
            {/* Mobil menyu ichida qidiruv yoki boshqa elementlar qo'shish mumkin */}
            {/* Masalan:
            <div className="mobile-menu-search">
              <BiSearch className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>
            */}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
