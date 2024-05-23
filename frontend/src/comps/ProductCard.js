import React from 'react'

function ProductCard(props) {
    return (
        <>
            <div className='product-card'>
                <p id='p-id'>{props.id}</p>

                <p id='p-name'>{props.name}</p>
                <div className="p-">
                    <div className="p-detail">
                        <p >Company: {props.company}</p>
                        <p >Category: {props.catagory}</p>
                    </div>
                    <p id='p-price'>Rs {props.price}</p>
                </div>
            </div>
            
        </>
    )
}

export default ProductCard