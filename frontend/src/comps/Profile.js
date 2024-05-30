import React, { useEffect, useState } from "react";
import AddedItem from "./AddedItem";

function Profile() {
  const [products, setProducts] = useState([]);
  const auth = localStorage.getItem("user");

  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    const userId = JSON.parse(auth)._id;
    const filteredProducts = result.filter(
      (product) => product.userID === userId
    );

    setProducts(filteredProducts);
  };
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

  useEffect(() => {
    getProduct();
  });

  return (
    <div>
      {products.length > 0 ? (
        products.map((item) => (
          <AddedItem
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
        <h1>No results</h1>
      )}
    </div>
  );
}

export default Profile;
