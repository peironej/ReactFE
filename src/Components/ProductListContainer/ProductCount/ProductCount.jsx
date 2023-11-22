// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
export const ProductCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);
  const increaseCount = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseCount = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddToCart = () => {
    if (onAdd) {
      onAdd(quantity);
    }
  };
    return (
    <div className="container d-flex flex-column align-items-center">
      <div>
        <button className="btn btn-success mx-2" onClick={decreaseCount}>-</button>
        <span>{quantity}</span>
        <button className="btn btn-success mx-2" onClick={increaseCount}>+</button>
        <h4></h4>
      </div>
      <div>
      <button className="btn btn-success mx-2" onClick={()=> onAdd(handleAddToCart)} disabled={!stock}>Agregar al carrito</button>
      </div>
    </div>
    )
}
export default ProductCount;