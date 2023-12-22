import { useContext } from 'react';
import { CartContext } from '../../CartContext/CartContext'; // Importa el CartContext
import { ProductDetail } from '../ProductDetail/ProductDetail'; // Asegúrate de importar el componente ProductDetail
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebasecfg.js"
import { Typography } from '@mui/material';


export const ProductDetailContainer = () => {
  const { id } = useParams();
  const { handleAddProductWithCheck, cartProducts } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  const [product, setProduct] = useState(null);
  const getProductDB = async (id) => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const product = {
          id: docSnap.id,
          ...docSnap.data()
        };
        return product;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return null;
    }
  }

  const updateStock = async (id, newStock) => {
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, { stock: newStock });
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const updatedProduct = {
          id: docSnap.id,
          ...docSnap.data()
        };
        setProduct(updatedProduct);
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  useEffect(() => {
    getProductDB(id)
      .then((product) => {
        if (product) {
          setProduct(product);
        }
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);


  return (
    <div className="container d-flex justify-content-center mt-5">
      {isLoading ? ( 
        <Typography variant="body1" align="center">
        Loading...
      </Typography>
      ) : (
        product && (
          <ProductDetail
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            stock={product.stock}
            img={product.img}
            onStockUpdate={updateStock}
            onAddProduct={handleAddProductWithCheck}
            cartProducts={cartProducts}
          />
        )
      )}
    </div>
  );
};
