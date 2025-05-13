import React, { useState } from "react";
import { ReviewCard } from "../../../../components"; // ReviewCard importi
import "./ProductTabs.scss";

// --- Mock Data (Bu yerga ko'chirilishi yoki prop orqali kelishi mumkin) ---
const mockReviews = [
  // ... (avvalgi koddagi mockReviews massivi) ...
  {
    id: "r1",
    rating: 4.5,
    reviewerName: "Samantha D.",
    isVerified: true,
    reviewText:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt!",
    datePosted: "August 14, 2023",
  },
  {
    id: "r2",
    rating: 5,
    reviewerName: "Alex M.",
    isVerified: true,
    reviewText:
      "This t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    datePosted: "August 15, 2023",
  },
  {
    id: "r3",
    rating: 4,
    reviewerName: "Ethan R.",
    isVerified: true,
    reviewText:
      "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    datePosted: "August 16, 2023",
  },
  {
    id: "r4",
    rating: 5,
    reviewerName: "Olivia P.",
    isVerified: false,
    reviewText:
      "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. Its evident that the designer poured their creativity into making this t-shirt stand out.",
    datePosted: "August 17, 2023",
  },
  {
    id: "r5",
    rating: 4.5,
    reviewerName: "Liam K.",
    isVerified: true,
    reviewText:
      "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    datePosted: "August 18, 2023",
  },
  {
    id: "r6",
    rating: 5,
    reviewerName: "Ava H.",
    isVerified: true,
    reviewText:
      "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    datePosted: "August 19, 2023",
  },
];
// --- End Mock Data ---

// Komponent props sifatida product ni qabul qiladi (Details uchun)
// va reviews ma'lumotlarini ham (agar API dan kelsa)
const ProductTabs = ({
  product,
  reviews = mockReviews /* API dan kelsa, prop orqali keladi */,
}) => {
  const [activeTab, setActiveTab] = useState("reviews"); // Boshlang'ich aktiv tab
  const [reviewsToShow, setReviewsToShow] = useState(4); // Boshida ko'rsatiladigan sharhlar

  const currentReviews = reviews.slice(0, reviewsToShow);

  const handleLoadMoreReviews = () => {
    setReviewsToShow((prev) => prev + 4);
  };

  return (
    <div className="product-additional-info">
      {/* Tab Navigatsiyasi */}
      <div className="product-tabs">
        <button
          className={`tab-button ${activeTab === "details" ? "active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Product Details
        </button>
        <button
          className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Rating & Reviews
        </button>
        <button
          className={`tab-button ${activeTab === "faqs" ? "active" : ""}`}
          onClick={() => setActiveTab("faqs")}
        >
          FAQs
        </button>
      </div>
      {/* <hr className="tabs-divider" /> */}{" "}
      {/* Agar tablarda border-bottom bo'lsa, bu shart emas */}
      {/* Tab Kontenti */}
      <div className="tab-content">
        {activeTab === "details" && (
          <div className="tab-pane">
            <h4>Product Specifications</h4>
            <p>{product?.description || "No details available."}</p>
            {/* Boshqa detallar */}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="tab-pane reviews-section">
            <div className="reviews-header">
              <h3>
                All Reviews{" "}
                <span className="review-count">({reviews.length})</span>
              </h3>
              <div className="reviews-actions">
                <select className="sort-select">
                  <option value="latest">Latest</option>
                  {/* Boshqa sortlash turlari */}
                </select>
                <button className="write-review-btn">Write a Review</button>
              </div>
            </div>
            <div className="reviews-list">
              {currentReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {reviewsToShow < reviews.length && (
              <div className="load-more-container">
                <button
                  className="load-more-btn"
                  onClick={handleLoadMoreReviews}
                >
                  Load More Reviews
                </button>
              </div>
            )}
            {!reviews ||
              (reviews.length === 0 && <p>No reviews yet for this product.</p>)}
          </div>
        )}

        {activeTab === "faqs" && (
          <div className="tab-pane">
            <h4>Frequently Asked Questions</h4>
            <p>Q: What is the return policy?</p>
            <p>A: You can return the product within 30 days...</p>
            {/* Boshqa savol-javoblar */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
