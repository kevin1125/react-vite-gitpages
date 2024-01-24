import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createProductos,
  deleteProductos,
  updateProductos,
  getAllProducto,
} from "../api/productos.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export const ProductoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.nombre_producto) {
      await updateProductos(params.nombre_producto, data);
      toast.success("Actualizado correctamente", {
        position: "top-center",
        style: {
          background: "#101010",
          color: "#fff",
          marginTop: "60px",
        },
      });
    } else {
      await createProductos(data);
      toast.success("Producto creado correctamente", {
        position: "top-center",
        style: {
          background: "#101010",
          color: "#fff",
          marginTop: "60px",
        },
      });
    }
    navigate("/productos");
  });

  useEffect(() => {
    async function loadProducto() {
      if (params.nombre_producto) {
        const { data } = await getAllProducto(params.nombre_producto);
        setValue("nombre_producto", data.nombre_producto);
        setValue("precio", data.precio);
      }
    }
    loadProducto();
  }, []);

  return (
    <div className="container">
      <h2>Crear Producto</h2>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col">
            <label className="form-label">Producto</label>
            <input
              type="text"
              className="form-control"
              placeholder="Producto"
              maxLength={30}
              {...register("nombre_producto", { required: true })}
            />
            {errors.nombre_producto && <span>Este campo es requerido</span>}
          </div>
          <div className="col">
            <label className="form-label">Precio</label>
            <input
              type="number"
              className="form-control"
              placeholder="Precio"
              {...register("precio", { required: true })}
            />
          </div>
          {errors.precio && <span>Este campo es requerido</span>}
        </div>
        <button
          className="btn btn-success float-end"
          style={{
            position: "absolute",
            right: "230px",
            backgroundColor: "#17494d",
            top: "300px",
          }}
        >
          {" "}
          Guardar Producto
        </button>
      </form>
      {params.nombre_producto && (
        <button
          className="btn btn-danger"
          style={{ position: "absolute", right: "180px", top: "300px" }}
          onClick={async () => {
            const aceptar = window.confirm("Seguro de eliminar el producto");
            if (aceptar) {
              await deleteProductos(params.nombre_producto);
              toast.success("Eliminado Correctamente", {
                position: "top-center",
                style: {
                  background: "#101010",
                  color: "#fff",
                  marginTop: "60px",
                },
              });
              navigate("/productos");
            }
          }}
        >
          <i className="bi bi-trash"></i>
        </button>
      )}
    </div>
  );
};
