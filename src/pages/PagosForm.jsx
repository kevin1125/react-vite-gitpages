import { useForm } from "react-hook-form";
import {
  createPagos,
  deletePagos,
  updatePagos,
  getPago,
} from "../api/generarPago.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";


export const PagosForm = () => {
  const { register, handleSubmit, setValue } = useForm();

  const params = useParams();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updatePagos(params.id, data);
      toast.success("Actualizado correctamente", {
        position: "top-center",
        style: {
          background: "#101010",
          color: "#fff",
          marginTop: "60px",
        },
      });
    } else {
      await createPagos(data);
      toast.success("Pago creado correctamente", {
        position: "top-center",
        style: {
          background: "#101010",
          color: "#fff",
          marginTop: "60px",
        },
      });
    }
    navigate("/clientes");
  });
  useEffect(() => {
    async function loadPago() {
      if (params.id) {
        const res = await getPago(params.id);
        setValue("cedula", res.data.cedula);
        setValue("fecha_pago", res.data.fecha_pago);
        setValue("cantidad_pagada", res.data.cantidad_pagada);
      }
    }
    loadPago();
  }, []);

  return (

    <div className="container">
      <h2>CREAR PAGO</h2>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col">
            <label className="form-label">Cedula</label>
            <input
              type="text"
              className="form-control"
              placeholder="Cedula"
              {...register("cedula", { register: true })}
            />
          </div>
          <div className="col">
            <label className="form-label">Fecha de Pago</label>
            <input
              type="date"
              className="form-control"
              {...register("fecha_pago", { register: true })}
            />
          </div>
          <div className="col">
            <label className="form-label">Monto a Pagar</label>
            <input
              type="number"
              className="form-control"
              placeholder="Monto a Pagar"
              {...register("cantidad_pagada", { register: true })}
            />
          </div>
        </div>
        <button className="btn btn-success float-end" style={{ position: 'absolute', right: '180px', backgroundColor: '#3c6d79', top: '300px' }}>  Guardar Pago
        </button>
        {params.id && (
          <button className="btn btn-danger" style={{ position: 'absolute', right: '130px', top: '300px' }}
            onClick={async () => {
              const aceptar = window.confirm("Esta seguro de eliminar");
              if (aceptar) {
                await deletePagos(params.id);
                toast.success("Eliminado Correctamente", {
                  position: "top-center",
                  style: {
                    background: "#101010",
                    color: "#fff",
                    marginTop: "60px",
                  },
                });
                navigate("/clientes");
              }
            }}
          >
            <i className="bi bi-trash"></i>
          </button>
        )}
      </form>
    </div>
  );
};
