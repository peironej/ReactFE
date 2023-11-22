export const Cart = () => {
  const handleCheckout = () => {
    // Lógica para procesar el pago / finalizar la compra
    // ...
    console.log("Checkout realizado");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-success mb-4">Carrito de Compras</h1>
      <button className="btn btn-success" onClick={handleCheckout}>Finalizar Compra</button>
    </div>
  );
};
