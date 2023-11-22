
import { Link } from "react-router-dom"

export const Product = ({id, name}) => {
  return (
    <div className="border border-1 border-dark rounded-3 col-5 p-3 m-2">
        <h5>{name}</h5>
        <Link to={`${id}`}>
          <button className="btn btn-dark mt-2"> Detalle</button>
        </Link>
    </div>
  )
}