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
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    setName(result.name);
    setCategory(result.category);
    setPrice(result.price);
    setCompany(result.company);
  };
  useEffect(() => {
    console.log(params);
    getProduct();
  }, []);

  const handleUpdateProduct = async () => {
    console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
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
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          value={price}
          className="input-box"
          type="text"
          placeholder="Product Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <input
          value={category}
          className="input-box"
          type="text"
          placeholder="Product Category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />

        <input
          value={company}
          className="input-box"
          type="text"
          placeholder="Product Company"
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />

        <button onClick={handleUpdateProduct} id="add-product-btn">
          update Product
        </button>
      </div>
      <p>{}</p>
    </div>
  );
}

export default UpdateProduct;
