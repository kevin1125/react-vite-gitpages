import { useEffect, useState } from "react";
import { getAllPagos } from "../api/generarPago.api";
import { useNavigate } from "react-router-dom";

export const PagosList = () => {
  const [pagos, setPagos] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage] = useState(8); 


  useEffect(() => {
    async function loadPagos() {
      try {
        const res = await getAllPagos();
        setPagos(res.data);
      } catch (error) {
        console.error("Error al cargar los pagos:", error);
      }
    }
    loadPagos();
  }, []);
  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  const currentPagos = pagos.slice(indexOfFirstElement, indexOfLastElement);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Cedula</th>
            <th scope="col">Fecha Pago</th>
            <th scope="col">Monto Pagado</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {currentPagos.map((pago) => (
            <tr key={pago.id}>
              <td>{pago.id}</td>
              <td>{pago.cedula}</td>
              <td>{pago.fecha_pago}</td>
              <td>{pago.cantidad_pagada}</td>
              <td>
                <button className="btn btn-warning"
                  onClick={() => {
                    navigate(`/pagos/${pago.id}`);
                  }}
                >
                  <i className="bi bi-pencil"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(pagos.length / elementsPerPage) },
            (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};
