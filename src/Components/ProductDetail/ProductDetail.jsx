import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

export const ProductDetail = ({ id, name, price, description, stock, img , onAddProduct, cartProducts}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false); 

  useEffect(() => {
    const isProductInCart = cartProducts.some(product => product.id === id);
    setAddedToCart(isProductInCart);
  }, [cartProducts, id]);

  const addProductToContext = async (id, name, price, stock, img, quantity) => {
    try {
      const product = { id, name, price, stock, img};
      await onAddProduct(product, quantity);
      setAddedToCart(true);
    } catch (error) {
      console.error("Error adding product:", error);
      return null;
    }
  };
  
  useEffect(() => {
    // Realizar acciones después de que quantity se haya actualizado
    // Por ejemplo, aquí podrías llamar a una función que maneje el cambio de cantidad.
    // Esta función se ejecutará cada vez que quantity cambie.
  }, [quantity]); // Ejecutar el efecto cuando quantity cambie

  const increaseCount = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity < stock) {
        return prevQuantity + 1;
      }
      return prevQuantity;
    });
  };
  
  const decreaseCount = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };
  const handleAddToCart = async () => {
    // Manejar el proceso de agregar al carrito con la cantidad actualizada
    try {
      if (quantity <= stock) {
        await addProductToContext(id, name, price, stock, img, quantity);
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };
  
  return (
    <div className="p-5 border border-3 rounded-4">
      <div className="d-flex flex-column align-items-center">
        <h2 style={{ fontWeight: 'bold' }}>{name}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={img} alt={name} style={{ width: '230px', height: '230px' }} /> {/* Mostrar la imagen del producto */}
        </div>
        <p>Descripción: {description}</p>
        <p>Unidades disponibles: {stock}</p>
        <p>Precio por unidad: ${price}</p>
        <div className="container d-flex flex-column align-items-center">
          <div>
            <button className="btn btn-success mx-2" onClick={decreaseCount} disabled={quantity==1}>-</button>
            <span>{quantity}</span>
            <button className="btn btn-success mx-2" onClick={increaseCount} disabled={quantity==stock}>+</button>
            <h4></h4>
          </div>
          <div>
            <button
              className="btn btn-success mx-2"
              onClick={handleAddToCart}
              disabled={!stock}
            >
              Agregar al carrito
            </button>
            {addedToCart && ( // Mostrar el botón "Finalizar compra" si el producto está en el carrito
              <Link to={"/cart"}>
                <button className="btn btn-success mx-2">
                  Finalizar compra
                </button>
              </Link>
            )}
          </div>
          <Link to={"/product"}>
          <button className="btn btn-dark mt-2">Volver</button>
        </Link>
        </div>
      </div>
    </div>
  );
};
