import { useEffect, useState } from "react"
import { searchProductById } from "../../productsServiceSimulation";
import { ProductDetail } from "../ProductDetail/ProductDetail";
import { useParams } from "react-router-dom";

export const ProductDetailContainer = () => {
  const { id } = useParams()

  const [product, setproduct] = useState(null)

  const getProducts = async (id) => {
        try {
            const resp = await searchProductById(`${id}`)
            setproduct(resp);
        } catch (error) {
            console.log(error)
        }
  }

  useEffect(() => {
    getProducts(id)
  }, [])
  

  return (
    <div className="container d-flex justify-content-center mt-5">
        {product && <ProductDetail { ...product} />}

    </div>
  )
}
