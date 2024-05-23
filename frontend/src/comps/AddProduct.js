import React, { useState } from 'react'

function AddProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState('')
  const [company, setCompany] = useState('')
  const [err, setErr] = useState(false)
  const [donemsg, setDonemsg] = useState('')

  const handleAddProduct = async () => {

    if(!name || !price || !category || !company){
      setErr(true)
      return false
    }

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
    setName('')
    setCategory('')
    setCompany('')
    setPrice('')
    setDonemsg("Product Added add new or see list on Products")

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
        />{err && !name && <span>enter valid name</span>}

        <input value={price}
          className='input-box'
          type="text"
          placeholder='Product Price'
          onChange={(e) => {
            setPrice(e.target.value)
          }}
        />{err && !price && <span>enter valid price</span>}

        <input
          value={category}
          className='input-box'
          type="text"
          placeholder='Product Category'
          onChange={(e) => {
            setCategory(e.target.value)
          }}
        />{err && !category && <span>enter valid catagory</span>}

        <input
          t value={company}
          className='input-box'
          type="text"
          placeholder='Product Company'
          onChange={(e) => {
            setCompany(e.target.value)
          }}
        />{err && !company && <span>enter valid company</span>}

        <button onClick={handleAddProduct} id='add-product-btn' >Add Product</button>
      </div>
      <p>{donemsg}</p>
    </div>
  )
}

export default AddProduct