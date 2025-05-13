// src/pages/ProductDetails/index.jsx
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProductById, useProductsByCategory } from "../../hooks";
import MainDetails from "./components/MainDetails";
import ProductTabs from "./components/ProductTabs";
import YouMightAlsoLike from "./components/YouMightAlsoLike";
import { Breadcrumbs } from "../../components";
import "./ProductDetails.scss";

const formatCategoryName = (name) => {
  /* ... avvalgidek ... */
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const {
    data: productDataFromHook,
    isLoading,
    isError,
    error,
  } = useProductById(id);

  console.log(
    "%cProductDetailPage rendered. Product ID from hook (before memo):",
    "color: red; font-weight: bold;",
    productDataFromHook?.id
  );
  console.log(
    "Product object from hook in ProductDetailPage (before memo):",
    productDataFromHook
  );

  // product propini MainDetails uchun barqarorlashtirish
  const productForMainDetails = useMemo(() => {
    if (!productDataFromHook) return null; // Agar productDataFromHook undefined bo'lsa, null qaytaramiz
    console.log(
      "%cuseMemo for productForMainDetails is re-calculating. ID:",
      "color: orange;",
      productDataFromHook.id
    );
    // Bu yerda productDataFromHook dan kerakli qismlarni olib, yangi obyekt yaratishimiz mumkin,
    // lekin avval to'g'ridan-to'g'ri o'zini berib ko'ramiz, react-query odatda buni o'zi hal qiladi.
    // Agar muammo davom etsa, faqat kerakli fieldlarni (masalan, images, sizes, colors referenslarini) alohida useMemo qilish kerak bo'lishi mumkin.
    return productDataFromHook;
  }, [productDataFromHook]); // Dependency faqat productDataFromHook

  console.log("Memoized product for MainDetails:", productForMainDetails);

  const { data: relatedProductsData } = useProductsByCategory(
    { category: productForMainDetails?.category },
    {
      enabled: !!productForMainDetails?.category && !!productForMainDetails?.id,
    }
  );

  const relatedProducts = useMemo(() => {
    if (!relatedProductsData || !productForMainDetails) return [];
    return relatedProductsData
      .filter((p) => p.id !== productForMainDetails.id)
      .slice(0, 4);
  }, [relatedProductsData, productForMainDetails]);

  if (isLoading) {
    return (
      <div className="page-container product-detail-loading">
        Loading product details...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="page-container product-detail-error">
        Error: {error?.message || "Failed to load product."}
      </div>
    );
  }
  // Endi productForMainDetails ni tekshiramiz
  if (!productForMainDetails) {
    return (
      <div className="page-container product-detail-error">
        Product not found or still loading.
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/category" },
    {
      label: formatCategoryName(productForMainDetails.category),
      path: `/category?category=${encodeURIComponent(
        productForMainDetails.category || ""
      )}`,
    },
    {
      label: productForMainDetails.title || "Product",
      path: `/products/${productForMainDetails.id}`,
    },
  ];

  return (
    <div className="container product-detail-page">
      <Breadcrumbs items={breadcrumbItems} />
      {/* productForMainDetails ni uzatamiz */}
      <MainDetails product={productForMainDetails} />
      <ProductTabs product={productForMainDetails} />
      <YouMightAlsoLike relatedProducts={relatedProducts} />
    </div>
  );
};

export default ProductDetailPage;
