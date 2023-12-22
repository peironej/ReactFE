import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebasecfg.js"

export const CartContext = createContext(null);

export const CartContextProvider = ({ children }) => {
    
    const [cartProducts, setcartProducts] = useState([]);
    const [totalCartProducts, setTotalCartProducts] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)

    const updateProductStock = async (productId, newStock) => {
        try {
            const docRef = doc(db, "products", productId);
            await updateDoc(docRef, { stock: newStock });
            await getDoc(docRef);
          } catch (error) {
            console.error("Error updating document:", error);
          }
      };


    const addProduct = (product, quantity) => {
        const index = cartProducts.findIndex((prod) => prod.id === product.id);
        if (index !== -1) {
          const cartProductsCopy = [...cartProducts];
          cartProductsCopy[index].quantity += quantity;
          cartProductsCopy[index].subTotal =
            cartProductsCopy[index].quantity * cartProductsCopy[index].price;
          setcartProducts(cartProductsCopy);
        } else {
          const newProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            subTotal: quantity * product.price,
            stock: product.stock, // Agregar el stock al nuevo producto en el carrito
            img: product.img,
          };
          setcartProducts([...cartProducts, newProduct]);
        }
      };
      

    const removeProduct = (id) =>{
        const productsFilter = cartProducts.filter(product => product.id !== id);
        setcartProducts(productsFilter);
    }

    const clearCartProducts = () =>{
        setcartProducts([]);
    }

    const getQuantityInCart = (productId) => {
        const product = cartProducts.find((item) => item.id === productId);
        return product ? product.quantity : 0;
    };

    const handleAddProductWithCheck = (product, quantity) => {
        const currentQuantityInCart = getQuantityInCart(product.id);
        const totalQuantityAfterAddition = currentQuantityInCart + quantity;
        if (totalQuantityAfterAddition <= product.stock) {
            addProduct(product, quantity);
        } else {
            // Aquí mostrar algún mensaje de error o realizar alguna otra acción.
        }
    };

    useEffect(() => {
     handleTotal()
     handleTotalQuantity()

    }, [cartProducts])
    

    const cartValues = {
        cartProducts,
        totalCartProducts,
        totalQuantity,
        addProduct,
        removeProduct,
        clearCartProducts,
        getQuantityInCart,
        handleAddProductWithCheck,
        updateProductStock,
    };
    
    const handleTotal = () => {
        const total = cartProducts.reduce((acum,item) => acum + item.subTotal, 0);
        setTotalCartProducts(total);
    }
    const handleTotalQuantity = () => {
        const total = cartProducts.reduce((acum,item) => acum + item.quantity, 0);
        setTotalQuantity(total);
    }
    return <CartContext.Provider value={cartValues}> {children} </CartContext.Provider>
} 