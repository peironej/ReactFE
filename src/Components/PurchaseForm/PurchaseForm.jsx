import { useState } from "react";

export const PurchaseForm = () => {
  const handleInputDni = (e) => {
    if(e.key =="."){
        e.preventDefault();
    }

 }
 const [name, setName] = useState("");
 const [productQuantity, setproductQuantity] = useState("");
 const [products, setProducts] = useState([]);
 
 const handleProducts = () => {
    const newProduct = {
        name,
        productQuantity
    }

    setProducts([...products, newProduct])
 }

  return (
    <div className="container mt-3">
        <label>Ingresar DNI:</label>
        <input className="form-control mt-3" type="number" onKeyDown={handleInputDni} />
        <hr className="mt-4 mb-4" />
        <form onSubmit={handleProducts}>
            <label>Ingresar Nombre:</label>
            <input className="form-control mt-3" type="text" onChange={(e) => setName(e.target.value)} />
            <label>Ingresar Apellido:</label>
            <input className="form-control mt-3" type="text" onChange={(e) => setproductQuantity(e.target.value)}/>
            <input className="btn btn-primary mt-3 " type="submit" value="Confirmar"></input>
        </form>
    </div>
  )
}
