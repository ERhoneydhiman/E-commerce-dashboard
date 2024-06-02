import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [err, setErr] = useState(false);
  const [image, setImage] = useState(null);
  const [donemsg, setDonemsg] = useState("");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleAddProduct = async () => {
    if (!name || !price || !category || !company || !image) {
      setErr(true);
      return false;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("company", company);
    formData.append("userID", JSON.parse(localStorage.getItem("user"))._id);
    formData.append("image", image);

    console.log(name, price, company, category, image);
    const userID = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userID);
    let result = await fetch(`${API_URL}/add-product`, {
      method: "post",
      body: formData,
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
    setName("");
    setCategory("");
    setCompany("");
    setPrice("");
    setImage(null);
    setDonemsg("Product Added add new or see list on Products");
  };

  return (
    <div className="add-product">
      <h1>Add Product</h1>
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
        {err && !name && <span>enter valid name</span>}

        <input
          value={price}
          className="input-box"
          type="text"
          placeholder="Product Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        {err && !price && <span>enter valid price</span>}

        <input
          value={category}
          className="input-box"
          type="text"
          placeholder="Product Category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        {err && !category && <span>enter valid catagory</span>}

        <input
          t
          value={company}
          className="input-box"
          type="text"
          placeholder="Product Company"
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
        {err && !company && <span>enter valid company</span>}
        <input
          type="file"
          className="input-box"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {err && !image && <span>Upload an image</span>}

        <button onClick={handleAddProduct} id="add-product-btn">
          Add Product
        </button>
      </div>
      <p>{donemsg}</p>
    </div>
  );
}

export default AddProduct;
