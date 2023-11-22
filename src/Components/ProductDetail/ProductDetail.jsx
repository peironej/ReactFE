import { Link } from "react-router-dom"
import { ProductCount } from "../ProductListContainer/ProductCount/ProductCount"
export const ProductDetail = ({name, description, stock}) => {
  return (
    <div className="p-5 border border-3 rounded-4">
    <div className="d-flex flex-column">
            <p>Nombe: {name}</p>
            <p>Descripción: {description}</p>
            <p>Unidades disponibles: {stock}</p>
            <Link to={"/product"}>
                <button className="btn btn-dark mt-2">Volver</button>
            </Link>
            <div>
                <ProductCount initial={1} stock={stock} onAdd={quantity => console.log('Cantidad Agregada: ', quantity)}/>
            </div>
        </div>        
    </div>
  )
}
