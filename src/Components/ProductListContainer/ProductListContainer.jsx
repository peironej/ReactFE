import { useEffect, useState } from "react";
import { getProducts } from "../../productsServiceSimulation";
import { ProductList } from "../ProductList/ProductList";

export const ProductListContainer = ({ greeting }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    getProducts(`${page}`)
      .then(response => {
        setIsLoading(false);
        setProducts(response);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <div>{greeting}</div>
      {isLoading ? (
        <h2>Cargando productos.. </h2>
      ) : (
          <ProductList products={products} />
      )}
      <div>
        <button
          className='btn btn-success mx-2'
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Anterior
        </button>
        <strong>Página {page}</strong>
        <button
          className='btn btn-success mx-2'
          onClick={handleNextPage}
          disabled={page >= 2}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
