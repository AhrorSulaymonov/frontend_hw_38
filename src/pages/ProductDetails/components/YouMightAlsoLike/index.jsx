import React from "react";
import { ProductCard } from "../../../../components";
import "./YouMightAlsoLike.scss";
// props obyektini qabul qilamiz va undan relatedProducts ni olamiz
const YouMightAlsoLike = ({ relatedProducts }) => {
  return (
    <>
      {/* Endi relatedProducts to'g'ridan-to'g'ri massiv bo'ladi */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2>YOU MIGHT ALSO LIKE</h2>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              // ProductCard import qilinganiga ishonch hosil qiling
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default YouMightAlsoLike;
