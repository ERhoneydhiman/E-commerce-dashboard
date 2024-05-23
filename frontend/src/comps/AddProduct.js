import React, { useState } from 'react'

function AddProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState('')
  const [company, setCompany] = useState('')

  const handleAddProduct = async () => {
    console.log(name, price, company, category)
    const userID = JSON.parse(localStorage.getItem('user'))._id
    console.log(userID)
    let result = await fetch('http://localhost:5000/add-product', {
      method: 'post',
      body: JSON.stringify({ name, price, category, company, userID }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await result.json()
    console.log(result)

  }

  return (
    <div className='add-product'>
      <h1>Add Product</h1>
      <div className="form">
        <input
          value={name}
          className='input-box'
          type="text"
          placeholder='Product Name'
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <input value={price}
          className='input-box'
          type="text"
          placeholder='Product Price'
          onChange={(e) => {
            setPrice(e.target.value)
          }}
        />
        <input
          value={category}
          className='input-box'
          type="text"
          placeholder='Product Category'
          onChange={(e) => {
            setCategory(e.target.value)
          }}
        />
        <input
          t value={company}
          className='input-box'
          type="text"
          placeholder='Product Company'
          onChange={(e) => {
            setCompany(e.target.value)
          }}
        />
        <button onClick={handleAddProduct} id='add-product-btn' >Add Product</button>
      </div>
    </div>
  )
}

export default AddProduct