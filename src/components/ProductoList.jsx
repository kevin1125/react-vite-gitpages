import { useEffect, useState } from "react"; 
import { getAllProductos } from "../api/productos.api"; 
import { useNavigate } from "react-router-dom"; 
 
export const ProductoList = () => { 
  const [productos, setProductos] = useState([]); 
  const [filtroNombre, setFiltroNombre] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [elementsPerPage] = useState(5); 
  const navigate = useNavigate(); 
 
  useEffect(() => { 
    async function loadProductos() { 
      const res = await getAllProductos(); 
      setProductos(res.data); 
    } 
    loadProductos(); 
  }, []); 
 
  const indexOfLastElement = currentPage * elementsPerPage; 
  const indexOfFirstElement = indexOfLastElement - elementsPerPage; 
  const currentProductos = productos 
    .filter(producto => 
      producto.nombre_producto.toLowerCase().includes(filtroNombre.toLowerCase()) 
    ) 
    .slice(indexOfFirstElement, indexOfLastElement); 
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber); 
  const linkStyle = { 
    backgroundColor: '#3c6d79', 
  }  
 
  return ( 
    <div className="container"> 
     <div className="row"> 
      <div className="col"> 
      <label htmlFor="filtroNombre" className="form-label">Buscar Producto:</label> 
      <input 
              type="text" 
              className="form-control" 
              id="filtroNombre" 
              value={filtroNombre} 
              onChange={(e) => setFiltroNombre(e.target.value)} 
            /> 
      </div> 
     </div> 
      <h2>Productos</h2> 
      <table className="table table-striped table-hover" style={{ 
        borderCollapse: 'separate', 
        borderSpacing: '1px', 
        border: '1px solid white', 
        borderRadius: '15px', 
        MozBorderRadius: '20px', 
        padding: '2px', 
      }}> 
        <thead> 
          <tr> 
            <th scope="col">Nombre del producto</th> 
            <th scope="col">Precio</th> 
            <th scope="col">Accion</th> 
          </tr> 
        </thead> 
        <tbody className="table-group-divider"> 
          {currentProductos.map((producto) => ( 
            <tr key={producto.nombre_producto}> 
              <td>{producto.nombre_producto}</td> 
              <td>{producto.precio}</td> 
              <td> 
                <button 
                 className="btn" role="button" style={linkStyle} 
                  onClick={() => { 
                    navigate(`/productos/${producto.nombre_producto}`); 
                  }} 
                > 
                   <i className="bi bi-pencil" style={{ color: '#f9ae65' }}></i> 
                </button> 
              </td> 
            </tr> 
          ))} 
        </tbody> 
      </table> 
      <nav> 
        <ul className="pagination"> 
          {Array.from({ length: Math.ceil(productos.length / elementsPerPage) }, (_, i) => ( 
            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}> 
              <button className="page-link" onClick={() => paginate(i + 1)}> 
                {i + 1} 
              </button> 
            </li> 
          ))} 
        </ul> 
      </nav> 
    </div> 
  ); 
};