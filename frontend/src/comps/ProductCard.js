import React from 'react'
import {Link} from 'react-router-dom'


function ProductCard(props) {
    return (
        <>
            <div className='product-card'>
                <p id='p-id'>{props.id}</p>

                <p id='p-name'>{props.name}</p>
                <div className="p-">
                    <div className="p-detail">
                        <p >Company: {props.company}</p>
                        <p >Category: {props.category}</p>
                    </div>
                    <p id='p-price'>Rs {props.price}</p>
                </div>
                <div className="btns">
                <button id='dlt-btn' onClick={props.deleteFun}>Delete Item</button>
                <button><Link to={`/updateproduct/${props.id}`}>Update Item</Link></button>
                
                </div>
            </div>

        </>
    )
}

export default ProductCard