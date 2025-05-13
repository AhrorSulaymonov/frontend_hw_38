// src/pages/Category/CategoryDetails/FilterSidebar/index.jsx
import React, { useEffect, useState } from "react";
import ReactRangeSliderInput from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./FilterSide.scss";
import ColorPicker from "./ColorPicker";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// Agar FontAwesome ishlatilsa, uni import qilish kerak yoki CSS orqali global ulanishi kerak
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Misol uchun

const FilterSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = useParams();

  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const [togglers, setTogglers] = useState({
    categoriesToggler: true, // Kategoriyalar uchun (agar akkordion bo'lsa)
    priceToggler: true,
    colorToggler: true,
    sizeToggler: true,
    // dressStyleToggler: false, // Bu endi kerak emas
  });

  const handleToggle = (key) => {
    setTogglers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const urlPriceGte = currentParams.get("price_gte");
    const urlPriceLte = currentParams.get("price_lte");
    const urlColors = currentParams.get("colors");
    const urlSizes = currentParams.get("sizes");

    if (urlPriceGte !== null && urlPriceLte !== null) {
      setPriceRange([parseFloat(urlPriceGte), parseFloat(urlPriceLte)]);
    }
    if (urlColors) setSelectedColors(urlColors.split(","));
    if (urlSizes) setSelectedSizes(urlSizes.split(","));
  }, [location.search]);

  useEffect(() => {
    const thumbs = document.querySelectorAll(
      ".filter-side-wrapper .range-slider__thumb"
    );
    if (thumbs.length === 2 && thumbs[0] && thumbs[1]) {
      thumbs[0].innerHTML = `<span class="range-slider-value">$${priceRange[0]}</span>`;
      thumbs[1].innerHTML = `<span class="range-slider-value">$${priceRange[1]}</span>`;
    }
  }, [priceRange]);

  // "Eski" filter kategoriyalari ro'yxati
  const filterByClothsOld = [
    { filterKey: "T-shirt", title: "T-shirts" },
    { filterKey: "Pants", title: "Pants" }, // Bu sizda yo'q edi, lekin misol uchun qoldirdim
    { filterKey: "Socks", title: "Socks" },
    { filterKey: "Men's-shoes", title: "Men's Shoes" },
    { filterKey: "Women's-shoes", title: "Women's Shoes" },
  ];

  const filterBySizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];

  const handleCategoryClick = (categoryKey) => {
    const currentParams = new URLSearchParams(location.search);
    // Agar shu kategoriya tanlangan bo'lsa, uni olib tashlaymiz, aks holda o'rnatamiz (toggle)
    if (currentParams.get("category") === categoryKey) {
      currentParams.delete("category");
    } else {
      currentParams.set("category", categoryKey);
    }
    // Boshqa filterlarni saqlab qolamiz, sahifa raqamini reset qilamiz
    currentParams.delete("page");
    const basePath = categoryId ? `/category/${categoryId}` : "/category";
    navigate(`${basePath}?${currentParams.toString().replace(/%2C/g, ",")}`);
  };

  const handleSizeClick = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleApplyFiltersClick = () => {
    const currentParams = new URLSearchParams(location.search);

    // Narx
    if (priceRange[0] > 0 || priceRange[1] < 500) {
      currentParams.set("price_gte", priceRange[0].toString());
      currentParams.set("price_lte", priceRange[1].toString());
    } else {
      currentParams.delete("price_gte");
      currentParams.delete("price_lte");
    }

    // Ranglar
    if (selectedColors.length > 0) {
      currentParams.set("colors", selectedColors.join(","));
    } else {
      currentParams.delete("colors");
    }

    // O'lchamlar
    if (selectedSizes.length > 0) {
      currentParams.set("sizes", selectedSizes.join(","));
    } else {
      currentParams.delete("sizes");
    }

    // Sahifa raqamini reset qilish
    currentParams.delete("page");

    const basePath = categoryId ? `/category/${categoryId}` : "/category";
    navigate(`${basePath}?${currentParams.toString().replace(/%2C/g, ",")}`);
  };

  return (
    <div className="filter-side-wrapper">
      {/* Kategoriyalar (Eski ro'yxat bilan) */}
      <div className="accordion filter-category-accordion">
        {/* Mobil uchun "Filters" sarlavhasi CategoryDetails.jsx da */}
        {/* Desktop uchun sarlavha (agar kerak bo'lsa) */}
        {/* 
        <div className="accordion-header desktop-only-filter-header" onClick={() => handleToggle("categoriesToggler")}>
          <p className="filter-title">Categories</p>
          <i className={`fas ${togglers.categoriesToggler ? "fa-chevron-up" : "fa-chevron-down"} filter-arrow-toggle`}></i>
        </div>
        */}
        {/* Rasmdagi kabi sarlavhasiz to'g'ridan-to'g'ri linklar */}
        <div className={`accordion-body open`}>
          {" "}
          {/* Har doim ochiq */}
          {filterByClothsOld.map((item) => (
            <div
              key={item.filterKey}
              onClick={() => handleCategoryClick(item.filterKey)}
              className={`filter-item ${
                new URLSearchParams(location.search).get("category") ===
                item.filterKey
                  ? "active"
                  : ""
              }`}
            >
              <span>{item.title}</span>
              {/* FontAwesome yoki boshqa ikonka kutubxonasidan */}
              <i className="fas fa-chevron-right filter-arrow"></i>
            </div>
          ))}
        </div>
      </div>
      <div className="hr-line" />

      {/* Narx */}
      <div className="accordion">
        <div
          className="accordion-header"
          onClick={() => handleToggle("priceToggler")}
        >
          <p className="filter-title">Price</p>
          <i
            className={`fas ${
              togglers.priceToggler ? "fa-chevron-up" : "fa-chevron-down"
            } filter-arrow-toggle`}
          ></i>
        </div>
        <div
          className={`accordion-body price-accordion ${
            togglers.priceToggler ? "open" : "hide"
          }`}
        >
          <ReactRangeSliderInput
            className="price-range-slider"
            min={0}
            max={500}
            step={10}
            value={priceRange}
            onInput={setPriceRange}
          />
        </div>
      </div>
      <div className="hr-line" />

      {/* Ranglar */}
      <div className="accordion">
        <div
          className="accordion-header"
          onClick={() => handleToggle("colorToggler")}
        >
          <p className="filter-title">Colors</p>
          <i
            className={`fas ${
              togglers.colorToggler ? "fa-chevron-up" : "fa-chevron-down"
            } filter-arrow-toggle`}
          ></i>
        </div>
        <div
          className={`accordion-body color-accordion ${
            togglers.colorToggler ? "open" : "hide"
          }`}
        >
          <ColorPicker
            initialSelectedColors={selectedColors}
            handleResult={setSelectedColors}
          />
        </div>
      </div>
      <div className="hr-line" />

      {/* O'lchamlar */}
      <div className="accordion">
        <div
          className="accordion-header"
          onClick={() => handleToggle("sizeToggler")}
        >
          <p className="filter-title">Size</p>
          <i
            className={`fas ${
              togglers.sizeToggler ? "fa-chevron-up" : "fa-chevron-down"
            } filter-arrow-toggle`}
          ></i>
        </div>
        <div
          className={`accordion-body size-accordion ${
            togglers.sizeToggler ? "open" : "hide"
          }`}
        >
          <div className="size-filter-options">
            {filterBySizes.map((size) => (
              <button
                key={size}
                className={`size-option-btn ${
                  selectedSizes.includes(size) ? "selected" : ""
                }`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="hr-line" />

      {/* "Dress Style" bo'limi olib tashlandi */}

      <button className="apply-filter-btn" onClick={handleApplyFiltersClick}>
        Apply Filter
      </button>
    </div>
  );
};

export default FilterSidebar;
