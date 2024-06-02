import React from "react";
import { Link } from "react-router-dom";

function AddedItem(props) {
  return (
    <tr className="added-item">
      <td id="a-name">{props.name}</td>
      <td> {props.category}</td>
      <td> {props.company}</td>
      <td id="a-price"> {props.price}</td>
      <td className="btns">
        <button id="dlt-btn" onClick={props.deleteFun}>
          Delete Item
        </button>
        <button>
          <Link to={`/updateproduct/${props.id}`}>Update Item</Link>
        </button>
      </td>
    </tr>
  );
}

export default AddedItem;
