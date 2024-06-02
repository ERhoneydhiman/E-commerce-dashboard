import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animation from "./Lottie/login-again.json";
import chooseAnime from "./Lottie/choose-anime.json";
import ProductCard from "./ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  const getProduct = async () => {
    let result = await fetch(`${API_URL}/products`, {
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
    console.log(result);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleSearch = async (e) => {
    console.log(e.target.value);
    let key = e.target.value;
    if (key) {
      let result = await fetch(`${API_URL}/search/${key}`, {
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
    if (
      product.image &&
      product.image.contentType &&
      product.image.imageBase64
    ) {
      const imageUrl = `data:${product.image.contentType};base64,${product.image.imageBase64}`;
      product.image = imageUrl;
    }
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
              <div id="img">
                <img src={selectedProduct.image} alt="Selected Product" />
              </div>

              <div className="s-">
                <p id="s-cate">Category: {selectedProduct.category}</p>
                <p id="s-com">Brand: {selectedProduct.company}</p>
                <p id="s-id"> Product ID: {selectedProduct._id}</p>
              </div>
              <p id="s-price">Price: ${selectedProduct.price}</p>
            </div>
          ) : (
            <div className="lottie">
              <Lottie animationData={chooseAnime} />
              <h1>Select Item From List..</h1>
            </div>
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
                />
              </div>
            ))
          ) : (
            <div className="expired">
              <h1>Token Expired || Login Again...</h1>
              <div className="lottie">
                <Lottie animationData={animation} />
              </div>
              <h1>OR List is empty</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
