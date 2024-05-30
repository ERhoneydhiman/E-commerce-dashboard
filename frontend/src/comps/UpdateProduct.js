import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      // Added
      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setName(result.name);
      setCategory(result.category);
      setPrice(result.price);
      setCompany(result.company);
    } catch (error) {
      // Added
      console.error("Error fetching product data:", error); // Added
    }
  };

  useEffect(() => {
    getProduct();
  }, [params.id]); // Changed

  const handleUpdateProduct = async () => {
    try {
      // Added
      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      navigate("/");
    } catch (error) {
      // Added
      console.error("Error updating product:", error); // Added
    }
  };

  return (
    <div className="add-product">
      <h1>Update Product</h1>
      <div className="form">
        <input
          value={name}
          className="input-box"
          type="text"
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={price}
          className="input-box"
          type="text"
          placeholder="Product Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          value={category}
          className="input-box"
          type="text"
          placeholder="Product Category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          value={company}
          className="input-box"
          type="text"
          placeholder="Product Company"
          onChange={(e) => setCompany(e.target.value)}
        />
        <button onClick={handleUpdateProduct} id="add-product-btn">
          Update Product
        </button>
      </div>
    </div>
  );
}

export default UpdateProduct;
