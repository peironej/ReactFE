import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../../CartContext/CartContext';
import { useContext } from 'react';

export const CartWidget = () => {
    const { totalQuantity } = useContext(CartContext);

    // Si no hay elementos en el carrito, no se renderiza el componente
    if (totalQuantity === 0) {
        return null;
    }

    return (
        <div className='d-flex'>
            <FaShoppingCart color='green' size={30} /> 
            <p className='mx-2' color='green'>+{totalQuantity}</p>
        </div>
    );
};
