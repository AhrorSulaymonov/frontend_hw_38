// src/pages/Category/CategoryDetails.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterSidebar from "./FilterSidebar"; // To'g'ri yo'l ekanligiga ishonch hosil qiling
import { Breadcrumbs, ProductCard } from "../../../components"; // To'g'ri yo'l ekanligiga ishonch hosil qiling
import { useProductsByCategory } from "../../../hooks"; // To'g'ri yo'l ekanligiga ishonch hosil qiling
import { parseQueryParams } from "../../../utils"; // To'g'ri yo'l ekanligiga ishonch hosil qiling
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiFilter, FiX } from "react-icons/fi"; // Filter va X ikonkalari

import "./CategoryDetails.scss"; // Stil faylini import qilish

const PRODUCTS_PER_PAGE = 9; // Yoki boshqa qiymat

const formatCategoryName = (name) => {
  if (!name) return "All Products"; // Default nomni o'zgartirdim
  return name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const CategoryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = parseQueryParams(location.search);

  const currentCategory = queryParams?.category;
  const priceGte = queryParams?.price_gte;
  const priceLte = queryParams?.price_lte;
  const colorsParam = queryParams?.colors;
  // Boshqa filter parametrlarini ham shu yerda olishingiz mumkin (masalan, size, dressStyle)
  const currentPageFromUrl = parseInt(queryParams?.page || "1", 10);

  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

  // Mobil filter uchun state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const filtersForHook = {
    category: currentCategory,
    price_gte: priceGte !== undefined ? parseFloat(priceGte) : undefined,
    price_lte: priceLte !== undefined ? parseFloat(priceLte) : undefined,
    colors: colorsParam ? colorsParam.split(",") : undefined,
    // Boshqa filterlarni ham hookga uzatish
  };

  const {
    data: allFilteredProducts,
    isLoading,
    isError,
    error,
  } = useProductsByCategory(filtersForHook);

  // Filterlar o'zgarganda birinchi sahifaga qaytish
  useEffect(() => {
    setCurrentPage(1);
    // URL dagi 'page' parametrini ham olib tashlash yoki 1 ga o'rnatish kerak bo'lishi mumkin
    // const params = new URLSearchParams(location.search);
    // if (params.get('page') && params.get('page') !== '1') {
    //   params.set('page', '1');
    //   navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, priceGte, priceLte, colorsParam /* boshqa filterlar */]);

  // URL dagi 'page' o'zgarganda currentPage ni yangilash
  useEffect(() => {
    setCurrentPage(currentPageFromUrl);
  }, [currentPageFromUrl]);

  // Paginatsiya hisob-kitoblari
  const totalProducts = allFilteredProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, totalProducts);
  const currentProducts = allFilteredProducts
    ? allFilteredProducts.slice(startIndex, endIndex)
    : [];

  const handlePageChange = (pageNumber) => {
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      const currentParams = new URLSearchParams(location.search);
      currentParams.set("page", newPage.toString());
      navigate(`${location.pathname}?${currentParams.toString()}`, {
        replace: true,
      });
    }
  };

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    {
      label: formatCategoryName(currentCategory || "Shop"), // Agar kategoriya bo'lmasa "Shop"
      path: currentCategory
        ? `/category?category=${encodeURIComponent(currentCategory)}`
        : "/category",
    },
    // Agar sub-kategoriya bo'lsa, uni ham qo'shish mumkin
  ];

  const generatePageNumbers = () => {
    if (totalPages <= 1) return [];
    const delta = 1; // Joriy sahifadan oldin va keyin ko'rsatiladigan raqamlar soni
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1); // Birinchi sahifa har doim

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      if (!range.includes(i)) {
        range.push(i);
      }
    }

    if (totalPages > 1 && !range.includes(totalPages)) {
      // Oxirgi sahifa har doim
      range.push(totalPages);
    }

    range.sort((a, b) => a - b); // Raqamlarni tartiblash

    range.forEach((i) => {
      if (l !== undefined) {
        if (i - l === 2) {
          // Oraliqda bitta raqam qolib ketgan bo'lsa
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          // Oraliqda bir nechta raqam qolib ketgan bo'lsa
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });
    return rangeWithDots;
  };

  const pageNumbers = generatePageNumbers();

  // Mobil filter ochiq bo'lganda body scrollini o'chirish (ixtiyoriy)
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Komponent unmount bo'lganda stilni olib tashlash
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileFilterOpen]);

  return (
    <div className="container category-details-page">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="category-header-mobile">
        {" "}
        {/* Mobil uchun sarlavha va filter tugmasi */}
        <h2>{formatCategoryName(currentCategory || "All Products")}</h2>
        <button
          className="mobile-filter-toggle-btn"
          onClick={toggleMobileFilter}
          aria-label="Open filters"
        >
          <FiFilter />
          {/* <span>Filters</span>  Agar matn kerak bo'lmasa, olib tashlang */}
        </button>
      </div>

      <div className="category-details-content">
        {isMobileFilterOpen && (
          <div
            className="mobile-filter-overlay"
            onClick={toggleMobileFilter}
          ></div>
        )}

        <div
          className={`category-details-content__sidebar ${
            isMobileFilterOpen ? "open" : ""
          }`}
        >
          {/* Mobil uchun "Filters" sarlavhasi va yopish tugmasi */}
          <div className="mobile-filter-header">
            <h3>Filters</h3>
            <button
              className="mobile-filter-close-btn"
              onClick={toggleMobileFilter}
              aria-label="Close filters"
            >
              <FiX />
            </button>
          </div>
          <FilterSidebar />{" "}
          {/* FilterSidebar ichida o'zining "Apply Filter" tugmasi bo'ladi */}
        </div>

        <div className="category-details-content__products">
          <div className="products-header desktop-only-header">
            {" "}
            {/* Desktop uchun sarlavha */}
            <h2>{formatCategoryName(currentCategory || "All Products")}</h2>
            <div className="products-header__right">
              <div className="products-header__info">
                {!isLoading && !isError && allFilteredProducts && (
                  <span>
                    Showing {totalProducts > 0 ? startIndex + 1 : 0}-{endIndex}{" "}
                    of {totalProducts} Products
                  </span>
                )}
              </div>
              {/* Desktop uchun filter ikonkasini bu yerga qo'yish mumkin (agar dizaynda bo'lsa) */}
              {/* <button className="desktop-filter-toggle-btn"> <FiFilter /> Filters </button> */}
            </div>
          </div>

          {isLoading && <p className="loading-text">Loading products...</p>}
          {isError && (
            <p className="error-text">
              Error loading products:{" "}
              {error?.message || "An unknown error occurred."}
            </p>
          )}
          {!isLoading &&
            !isError &&
            (!allFilteredProducts || allFilteredProducts.length === 0) && (
              <p className="no-products-text">
                No products found matching your criteria. Try adjusting the
                filters.
              </p>
            )}

          <div className="products-grid">
            {!isLoading &&
              !isError &&
              currentProducts &&
              currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-button prev-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft /> Previous
              </button>
              <div className="page-numbers">
                {pageNumbers.map((page, index) =>
                  page === "..." ? (
                    <span key={`dots-${index}`} className="dots">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      className={`page-number ${
                        page === currentPage ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
              <button
                className="pagination-button next-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalProducts === 0}
              >
                Next <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
