// src/pages/Home/components/ByDressSection/ByDress.jsx
import React from "react";
import "./ByDress.scss";
import { MainTitle } from "../../../../components"; // MainTitle yo'lini tekshiring
import { Link } from "react-router-dom"; // react-router-dom dan Link

// Sharhlar uchun ikonka importlari (agar alohida komponentda bo'lmasa)
import { BiSolidStar } from "react-icons/bi";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FcApproval } from "react-icons/fc";

// Kategoriyalar uchun ma'lumotlar massivi
const dressStylesData = [
  {
    name: "T-Shirt",
    // Linkni o'zingizning routingizga moslang
    // Masalan, agar category sahifasi "style" query parametri bilan ishlasa:
    link: "/category/casual?category=T-shirt",
    // Yoki dinamik segment bilan: /category/style/casual
    imgSrc: "/src/assets/Tshirt.png", // <<-- BU YERGA HAQIQIY RASM YO'LINI QO'YING
    alt: "T-shirt fashion style",
  },
  {
    name: "Socks",
    link: "/category/casual?category=Socks",
    imgSrc: "/src/assets/socks.png", // <<-- BU YERGA HAQIQIY RASM YO'LINI QO'YING
    alt: "Socks fashion style",
  },
  {
    name: "Men's Shoes",
    link: "/category/casual?category=Men%27s-shoes",
    imgSrc: "/src/assets/menshoes.png", // <<-- BU YERGA HAQIQIY RASM YO'LINI QO'YING
    alt: "Men's Shoes fashion style",
  },
  {
    name: "Women's Shoes",
    link: "/category/casual?category=Women%27s-shoes",
    imgSrc: "/src/assets/womenshoes.png", // <<-- BU YERGA HAQIQIY RASM YO'LINI QO'YING
    alt: "Women's Shoes fashion style",
  },
];

// Mockup sharh ma'lumotlari (keyinchalik API dan kelishi mumkin)
const customerReviewsData = [
  {
    id: "review1",
    name: "Sarah M.",
    stars: 5,
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: "review2",
    name: "Alex K.",
    stars: 5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    id: "review3",
    name: "James L.",
    stars: 4, // Misol uchun boshqa reyting
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
];

function ByDressSection() {
  return (
    <div className="container by-dress-section-container">
      {/* ----- BROWSE BY DRESS STYLE ----- */}
      <div className="dress-style-wrapper">
        <MainTitle title="BROWSE BY DRESS STYLE" />
        <div className="dress-style-grid">
          {/* Desktop uchun alohida struktura (sizning avvalgi kodingizga moslab) */}
          <div className="dress-style-grid__desktop">
            <div className="img-row">
              <Link
                to={dressStylesData[0]?.link || "#"}
                className="desktop-card-link desktop-card-link--rect"
              >
                <img
                  src={
                    dressStylesData[0]?.imgSrc ||
                    "https://via.placeholder.com/408x289?text=Casual"
                  }
                  alt={dressStylesData[0]?.alt}
                />
                <span className="desktop-card-link__name">
                  {dressStylesData[0]?.name}
                </span>
              </Link>
              <Link
                to={dressStylesData[1]?.link || "#"}
                className="desktop-card-link desktop-card-link--wide"
              >
                <img
                  src={
                    dressStylesData[1]?.imgSrc ||
                    "https://via.placeholder.com/684x289?text=Formal"
                  }
                  alt={dressStylesData[1]?.alt}
                />
                <span className="desktop-card-link__name">
                  {dressStylesData[1]?.name}
                </span>
              </Link>
            </div>
            <div className="img-row">
              <Link
                to={dressStylesData[2]?.link || "#"}
                className="desktop-card-link desktop-card-link--wide"
              >
                <img
                  src={
                    dressStylesData[2]?.imgSrc ||
                    "https://via.placeholder.com/684x289?text=Party"
                  }
                  alt={dressStylesData[2]?.alt}
                />
                <span className="desktop-card-link__name">
                  {dressStylesData[2]?.name}
                </span>
              </Link>
              <Link
                to={dressStylesData[3]?.link || "#"}
                className="desktop-card-link desktop-card-link--rect"
              >
                <img
                  src={
                    dressStylesData[3]?.imgSrc ||
                    "https://via.placeholder.com/408x289?text=Gym"
                  }
                  alt={dressStylesData[3]?.alt}
                />
                <span className="desktop-card-link__name">
                  {dressStylesData[3]?.name}
                </span>
              </Link>
            </div>
          </div>

          {/* Mobil uchun alohida struktura */}
          <div className="dress-style-grid__mobile">
            {dressStylesData.map((style) => (
              <Link
                to={style.link}
                key={style.name}
                className="dress-style-card-mobile"
              >
                <div className="dress-style-card-mobile__image-container">
                  <img
                    src={style.imgSrc}
                    alt={style.alt}
                    className="dress-style-card-mobile__image"
                  />
                </div>
                <span className="dress-style-card-mobile__name">
                  {style.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ----- OUR HAPPY CUSTOMERS ----- */}
      <div className="customer-reviews-section">
        {" "}
        {/* class nomini o'zgartirdim */}
        <div className="customer-reviews__header">
          <h3 className="customer-reviews__title">OUR HAPPY CUSTOMERS</h3>
          <div className="customer-reviews__navigation">
            <GoArrowLeft className="nav-arrow" />
            <GoArrowRight className="nav-arrow" />
          </div>
        </div>
        <div className="customer-reviews__list">
          {customerReviewsData.map((review) => (
            <div key={review.id} className="review-card-item">
              {" "}
              {/* class nomini o'zgartirdim */}
              <div className="review-card-item__stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <BiSolidStar
                    key={index}
                    className={`star-icon ${
                      index < review.stars ? "filled" : ""
                    }`}
                  />
                ))}
              </div>
              <p className="review-card-item__author">
                {review.name}
                <FcApproval className="verified-icon" />
              </p>
              <span className="review-card-item__text">"{review.text}"</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ByDressSection;
