import { FaShoppingCart } from 'react-icons/fa';

export const CartWidget = () => {
    return (
        <div className='d-flex'>
            <FaShoppingCart color='green' size={30} /> 
            <p className='mx-2' color='green' >+1</p>
        </div>
    )
}
