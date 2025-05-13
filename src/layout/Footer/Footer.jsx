// src/layout/Footer/Footer.jsx
import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import "./Footer.scss";

function Footer() {
  return (
    <footer>
      {" "}
      {/* className="footer" qo'shish shart emas, chunki SCSS da `footer` tegi ishlatilgan */}
      {/* Newsletter Section */}
      <div className="top-footer">
        <h3>
          STAY UPTO DATE ABOUT <br className="hide-on-mobile" />
          OUR LATEST OFFERS
        </h3>
        <div className="top-footer-items">
          <div className="input-wrapper">
            <TfiEmail className="input-icon" />{" "}
            {/* JSX da TfiEmail ishlatilgan */}
            <input type="email" placeholder="Enter your email address" />
          </div>
          <button type="button">Subscribe to Newsletter</button>{" "}
          {/* type="button" qo'shildi */}
        </div>
      </div>
      {/* Main Footer Content Area */}
      <div className="hero-footer">
        {" "}
        {/* Bu class nomini `footer__content-area` ga o'zgartirsa bo'ladi */}
        <div className="container">
          {" "}
          {/* Container qo'shildi */}
          <div className="paragrif-wrapper">
            {" "}
            {/* Bu class nomi `footer__columns-wrapper` bo'lishi mumkin */}
            {/* Footer Left Section */}
            <div className="footer-left">
              {" "}
              {/* JSX da bu guruh avval yo'q edi */}
              <span>SHOP.CO</span>
              <p>
                We have clothes that suits your style and{" "}
                <br className="hide-on-mobile" /> which you're proud to wear.
                From <br className="hide-on-mobile" /> women to men.
              </p>
              <div className="footer-icons">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <BsTwitter />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <BsFacebook />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <BsInstagram />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Github"
                >
                  <BsGithub />
                </a>
              </div>
            </div>
            {/* Footer Right Section (Link Columns) */}
            <div className="footer-right">
              {" "}
              {/* JSX da bu guruh avval yo'q edi */}
              <div className="footer-paragrif">
                {" "}
                {/* Yoki .link-column */}
                <p className="column-title">COMPANY</p>
                <a href="/about">About</a> {/* p o'rniga a */}
                <a href="/features">Features</a>
                <a href="/works">Works</a>
                <a href="/careers">Career</a>
              </div>
              <div className="footer-paragrif">
                <p className="column-title">HELP</p>
                <a href="/customer-support">Customer Support</a>
                <a href="/delivery-details">Delivery Details</a>
                <a href="/terms-conditions">Terms & Conditions</a>
                <a href="/privacy-policy">Privacy Policy</a>
              </div>
              <div className="footer-paragrif">
                <p className="column-title">FAQ</p>
                <a href="/faq/account">Account</a>
                <a href="/faq/deliveries">Manage Deliveries</a>
                <a href="/faq/orders">Orders</a>
                <a href="/faq/payments">Payments</a>
              </div>
              <div className="footer-paragrif">
                <p className="column-title">RESOURCES</p>
                <a href="/resources/ebooks">Free eBooks</a>
                <a href="/resources/tutorials">Development Tutorial</a>
                <a href="/resources/blog">How to - Blog</a>
                <a href="/resources/youtube">YouTube Playlist</a>
              </div>
            </div>
          </div>
          <hr />{" "}
          {/* Bu hr ni .footer__divider klassi bilan almashtirish mumkin */}
          <div className="footer-finish">
            <p className="copyright-text">
              Shop.co © 2000-2023, All Rights Reserved
            </p>{" "}
            {/* Klass qo'shildi */}
            <div className="payment-cards">
              <img src="/src/assets/visa.png" alt="Visa" />{" "}
              {/* Yo'llarni tekshiring */}
              <img src="/src/assets/mastercard.png" alt="Mastercard" />
              <img src="/src/assets/paypal.png" alt="PayPal" />
              <img src="/src/assets/pay.png" alt="Apple Pay" />{" "}
              {/* Alt textni to'g'riladim */}
              <img src="/src/assets/googlePay.png" alt="Google Pay" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
