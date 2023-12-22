import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebasecfg';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

const Order = () => {
  const { orderId } = useParams();

  return (
    <Box textAlign="center" mt={10}>
      <CircularProgress color="success" />
      <Typography variant="h4" mt={2} color="success">
        Compra Exitosa
      </Typography>
      <Typography variant="body1" mt={2}>
        ID de la Orden: {orderId}
      </Typography>
    </Box>
  );
};

export default Order;


// eslint-disable-next-line react-refresh/only-export-components
export const addOrderToDB = async (cartProducts, userData, total) => {
  const newOrder = {
    buyer: userData,
    items: cartProducts,
    date: serverTimestamp(),
    total,
  };

  try {
    const docRef = await addDoc(collection(db, 'orders'), newOrder);
    // Orden agregada exitosamente a Firestore
    return docRef.id; // Devuelve el ID de la orden generada
  } catch (error) {
    console.error('Error al agregar la orden a Firestore:', error);
    throw new Error('Error al agregar la orden a Firestore');
  }
};
