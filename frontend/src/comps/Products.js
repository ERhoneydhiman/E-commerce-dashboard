import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

function Products() {
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    let result = await fetch('http://localhost:5000/products');
    result = await result.json();
    setProducts(result);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleDelete = async (id)=>{
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method:'Delete'
    })
    result =await result.json()
    if(result){
      getProduct();
    }
  }

  return (
    <div className='products-list'>
      {
        products.map((item) => (
          <ProductCard
            key={item._id}  
            id={item._id}
            name={item.name}
            category={item.category}
            company={item.company}
            price={item.price}
            deleteFun={()=>handleDelete(item._id)} 
            />
        ))
      }
    </div>
  );
}

export default Products;
