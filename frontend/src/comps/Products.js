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

  console.log(products);

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
            price={item.price} />
        ))
      }
    </div>
  );
}

export default Products;
