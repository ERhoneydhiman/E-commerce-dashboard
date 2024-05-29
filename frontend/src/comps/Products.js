import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function Products() {
  const [products, setProducts] = useState([]);

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

  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProduct();
    }
  };

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

  return (
    <>
      <div className="search">
        <input onChange={handleSearch} type="text" placeholder="search..." />
      </div>
      <div className="products-list">
        {products.length > 0 ? (
          products.map((item) => (
            <ProductCard
              key={item._id}
              id={item._id}
              name={item.name}
              category={item.category}
              company={item.company}
              price={item.price}
              deleteFun={() => handleDelete(item._id)}
            />
          ))
        ) : (
          <h1>no result </h1>
        )}
      </div>
    </>
  );
}

export default Products;
