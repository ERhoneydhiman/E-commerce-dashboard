import React from "react";

function ProductCard(props) {
  return (
    <>
      <div className="product-card">
        <p>{props.index}</p>
        <div>
          <p id="p-id">{props.id}</p>

          <p id="p-name">{props.name}</p>

          <p> {props.company}</p>
          <p id="p-category"> {props.category}</p>

          <p id="p-price"> {props.price}</p>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
