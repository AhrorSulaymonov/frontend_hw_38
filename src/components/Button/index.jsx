// src/components/Button/index.jsx
import React from "react";
import "./Button.scss";
// Agar btnTypes va btnSizes konstantalaringiz bo'lsa, ularni import qiling
// import { btnTypes, btnSizes } from "./constants";

// Agar konstantalar bo'lmasa, default qiymatlarni to'g'ridan-to'g'ri ishlatamiz
const btnTypes = { primary: "primary", secondary: "secondary", white: "white" };
const btnSizes = { lg: "large", md: "medium", sm: "small" };

const Button = (props) => {
  const {
    children,
    onClick,
    type = btnTypes.primary, // default type
    size = btnSizes.md, // default size
    px, // px endi ixtiyoriy, agar berilsa ishlatiladi
    fullWidth = false,
    disabled = false,
    className = "", // Tashqaridan qo'shimcha klasslar berish uchun
    // ... other props if any, e.g., 'to' for Link-like behavior
  } = props;

  // Dinamik padding uchun style obyekti
  const style = {};
  if (px !== undefined) {
    style.paddingLeft = `${px}px`;
    style.paddingRight = `${px}px`;
  }

  const buttonClasses = [
    "button", // Asosiy klass
    `btn-${type}`, // Tip bo'yicha klass (masalan, btn-primary)
    `btn-${size}`, // O'lcham bo'yicha klass (masalan, btn-large)
    fullWidth ? "btn-full" : "", // Agar fullWidth true bo'lsa
    className, // Tashqaridan berilgan klasslar
  ]
    .join(" ")
    .trim(); // Bo'sh joylarni olib tashlash

  return (
    <button
      className={buttonClasses}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
