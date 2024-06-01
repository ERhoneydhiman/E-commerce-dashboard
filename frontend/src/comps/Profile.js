import React, { useEffect, useState } from "react";
import AddedItem from "./AddedItem";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [products, setProducts] = useState([]);
  const auth = localStorage.getItem("user");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

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
  }, []);

  return (
    <div className="profile">
      <div className="user-info">
        <table>
          <tr>
            <th>User ID</th>
            <td>{JSON.parse(auth)._id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{JSON.parse(auth).name}</td>
          </tr>
          <tr>
            <th>E.Mail</th>
            <td>{JSON.parse(auth).email}</td>
          </tr>
          <tr>
            <td id="logout" colSpan="2">
              <Link onClick={logout} to="/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="rgb(37, 40, 45)"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                </svg>
                LogOut ({JSON.parse(auth).name})
              </Link>
            </td>
          </tr>
        </table>
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
