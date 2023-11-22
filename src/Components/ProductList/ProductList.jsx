import { Product } from "../Product/Product"

export const ProductList = ( {products} ) => {
  return (
    <div className="d-flex flex-sm-wrap align-items-center">
       {products.map( product => <Product key={product.id} {... product}/>)}
    </div>
  )
}
