// src/App.jsx
import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import ProductDetails from "./pages/ProductDetails"; // To'g'ri yo'l
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // CSS ni import qilish!

import HomePage from "./pages/Home"; // To'g'ri yo'l
import CategoryDetails from "./pages/Category/CategoryDetails"; // To'g'ri yo'l
import CartPage from "./pages/CartPage/CartPage"; // To'g'ri yo'l

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* CategoryDetails uchun ikkita yo'l: ID bilan va ID siz */}
          <Route path="/category/:categoryId" element={<CategoryDetails />} />
          <Route path="/category" element={<CategoryDetails />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<CartPage />} />
          {/* Boshqa route'laringiz bo'lsa shu yerga qo'shasiz */}
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
