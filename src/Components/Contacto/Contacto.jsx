const Contacto = () => {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h1 className="text-success">Contacto</h1>
          </div>
          <div className="col-12 col-md-6 text-center mt-4">
            <img src="/img/homeopatia.png" alt="Homeopatía" className="img-fluid" style={{ maxWidth: "590px" }} />
          </div>
          <div className="col-12 col-md-6 mt-4">
            <p><strong>Nombre:</strong> Javier Peirone</p>
            <p><strong>Mail:</strong> peironej@gmail.com</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Contacto;