import React, { useEffect, useState } from "react";
import AddedItem from "./AddedItem";

function Profile() {
  const [products, setProducts] = useState([]);
  const auth = localStorage.getItem("user");

  const getProduct = async () => {
    try {
      // Added
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
    } catch (error) {
      // Added
      console.error("Error fetching products:", error); // Added
    }
  };

  const handleDelete = async (id) => {
    try {
      // Added
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        getProduct();
      }
    } catch (error) {
      // Added
      console.error("Error deleting product:", error); // Added
    }
  };

  useEffect(() => {
    getProduct();
  }, []); // Changed

  return (
    <div className="profile">
      <div className="user-info">
        <p className="u-id">User ID: {JSON.parse(auth)._id}</p>
        <p className="u-name">Name: {JSON.parse(auth).name}</p>
        <p className="u-mail">Email: {JSON.parse(auth).email}</p>
      </div>
      <div className="product-info">
        <h1>Your Products</h1>
        <table className="added-products-table">
          <thead>
            <tr className="a-table">
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price (Rupees)</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item) => (
                <AddedItem
                  key={item._id}
                  id={item._id} // Added
                  name={item.name}
                  category={item.category}
                  company={item.company}
                  price={item.price}
                  deleteFun={() => handleDelete(item._id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5">No results</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;
