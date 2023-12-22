import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import { useContext, useState } from 'react';
import { CartContext } from '../../CartContext/CartContext';
import { addOrderToDB } from "../Order/Order";

export const Cart = () => {
  const { clearCartProducts, cartProducts, removeProduct, totalCartProducts, updateProductStock } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({ name: '', lastName: '', phone: '', email: '', confirmEmail: '' });
  const [orderId, setOrderId] = useState('');
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
  const [orderReady, setOrderReady] = useState(false); // Estado para indicar si la orden está lista para enviar

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const id = await addOrderToDB(cartProducts, userData, totalCartProducts);
      setIsLoading(false);
      setOrderReady(true);
      setOrderId(id);
      setShowForm(false);
      clearCartProducts();

      // Descuenta el stock al completar la orden
      cartProducts.forEach(async (product) => {
        await discountStock(product.id, product.stock, product.quantity);
      });
    } catch (error) {
      console.error('Error al enviar la orden:', error);
      setIsLoading(false);
    }
  };

  const discountStock = async (id, stock, quantity) => {
    try {
      const newStock = stock - quantity;
      if (newStock >= 0) {
        await updateProductStock(id, newStock); // Actualizar el stock utilizando la función del contexto del carrito
      }
    } catch (error) {
      console.error("Error al descontar el stock:", error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Verifica que los campos de email y confirmación sean iguales
    if (userData.email !== userData.confirmEmail) {
      return;
    }

    // Realiza otras validaciones necesarias antes de enviar el formulario si las hay

    // Si todo está correcto, procede a enviar la orden
    handleSubmit();
  };

  return (
    <Box marginTop={4}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: 'Arial, sans-serif' }}>
        Carrito
      </Typography>

      {isLoading ? (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      ) : (
        <>
          {cartProducts.map((product) => (
            <Grid item key={product.id} xs={6}>
              <Box
                margin={1}
                border={1}
                borderColor={"gray"}
                borderRadius={2}
                padding={3}
                boxShadow={3}
              >
                <img src={product.img} alt={product.name} style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Nombre: {product.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Precio Unitario: ${product.price}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Cantidad: {product.quantity}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Sub total: ${product.subTotal}
                    </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => removeProduct(product.id)}
                >
                  Eliminar
                </Button>
              </Box>
            </Grid>
          ))}
          {cartProducts.length > 0 && (
            <Box display="flex" justifyContent="center" marginTop={2}>
              <Typography variant="h6" sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                Suma total del carrito: ${totalCartProducts}
              </Typography>
            </Box>
          )}

          {showForm && (
            <form onSubmit={handleFormSubmit}>
              <Box display="flex" flexDirection="column" alignItems="center" marginTop={2}>
                <TextField
                  type="text"
                  name="name"
                  value={userData.name}
                  label="Nombre"
                  onChange={handleInput}
                  className="form-control mt-3"
                />
                <TextField
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  label="Apellido"
                  onChange={handleInput}
                  className="form-control mt-3"
                />
                <TextField
                  type="number"
                  name="phone"
                  value={userData.phone}
                  label="Teléfono"
                  onChange={handleInput}
                  className="form-control mt-3"
                />
                <TextField
                  type="email"
                  name="email"
                  value={userData.email}
                  label="Email"
                  onChange={handleInput}
                  className="form-control mt-3"
                />
                <TextField
                  type="email"
                  name="confirmEmail"
                  value={userData.confirmEmail}
                  label="Confirmar Email"
                  onChange={handleInput}
                  className="form-control mt-3"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit" // Enviar el formulario al hacer clic
                  className="mt-3"
                  disabled={
                    !userData.name ||
                    !userData.lastName ||
                    !userData.phone ||
                    !userData.email ||
                    !userData.confirmEmail ||
                    userData.email !== userData.confirmEmail
                  }
                >
                  Enviar
                </Button>
              </Box>
            </form>
          )}

          {!showForm && !orderReady && (
            <Box display="flex" justifyContent="center" marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(true)} // Mostrar el formulario al hacer clic
                className="mt-3"
              >
                Finalizar compra
              </Button>
            </Box>
          )}

          {orderReady && (
            <Box textAlign="center" mt={10}>
              <Typography variant="h4" mt={2} color="success">
                Compra Exitosa
              </Typography>
              <Typography variant="body1" mt={2}>
                ID de la Orden: {orderId}
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
