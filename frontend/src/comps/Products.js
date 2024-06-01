import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleSearch = async (e) => {
    console.log(e.target.value);
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProduct();
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <div className="search">
        <input onChange={handleSearch} type="text" placeholder="search..." />
      </div>

      <div className="container">
        <div className="one-item">
          {selectedProduct ? (
            <div className="selected-item">
              <p id="s-name">{selectedProduct.name}</p>
              <p id="s-cate">Category: {selectedProduct.category}</p>
              <p id="s-com">Brand: {selectedProduct.company}</p>
              <p id="s-id"> Product ID: {selectedProduct._id}</p>
              <p id="s-price">Price: ${selectedProduct.price}</p>
            </div>
          ) : (
            <h2>Select a product to see details</h2>
          )}
        </div>

        <div className="products-list">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div key={item._id} onClick={() => handleProductClick(item)}>
                <ProductCard
                  index={index + 1}
                  // id={item._id}
                  name={item.name}
                  category={item.category}
                  // company={item.company}
                  // price={index + 1}
                />
              </div>
            ))
          ) : (
            <h1>No results</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
