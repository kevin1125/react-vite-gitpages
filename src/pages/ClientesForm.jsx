// En el archivo ClientesForm.jsx
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  createCliente,
  deleteCliente,
  updateCliente,
  getCliente,
} from "../api/clientes.api";
import { getAllProductos } from "../api/productos.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export const ClientesForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const [productos, setProductos] = useState([]);
  const [precioSeleccionado, setPrecioSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(0);
  const [pagosMensuales, setPagosMensuales] = useState(0);
  const [mesesDiferidos, setMesesDiferidos] = useState(8);

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    const total = cantidad * precioSeleccionado;
    const pagosMensuales = total / mesesDiferidos;

    data.total_pagar = total;
    data.pagos_mensuales = pagosMensuales;

    if (params.cedula) {
      await updateCliente(params.cedula, data);
      toast.success('Actualizado correctamente', {
        position: 'top-center',
        style:{
          background: '#101010',
          color:"#fff",
          marginTop: '60px',
        }
      })
    } else {
      await createCliente(data);
      toast.success('Cliente creado correctamente', {
        position: 'top-center',
        style:{
          background: '#101010',
          color:"#fff",
          marginTop: '60px',
        }
      })
    }
    navigate("/clientes");
  });

  const obtenerFechaActual = () => {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaActual.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  };

  useEffect(() => {
    async function loadCliente() {
      if (params.cedula) {
        const { data } = await getCliente(params.cedula);
        setValue("cedula", data.cedula);
        setValue("nombre_completo", data.nombre_completo);
        setValue("email", data.email);
        setValue("direccion", data.direccion);
        setValue("fecha_inicio", data.fecha_inicio);
        setValue("nombre_producto", data.nombre_producto);
        setValue("cantidad_producto", data.cantidad_producto);
        setValue("total_pagar", data.total_pagar);
        setValue("pagos_mensuales", data.pagos_mensuales);
        setValue("vencimiento", data.vencimiento);
        setValue("estado", data.estado);

        setPrecioSeleccionado(data.precio_producto);
        setCantidad(data.cantidad_producto);
      }
    }
    loadCliente();
  }, [params.cedula, setValue]);

  useEffect(() => {
    async function loadProductos() {
      try {
        const res = await getAllProductos();
        setProductos(res.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    }

    loadProductos();
  }, []);

  const handleProductoChange = (event) => {
    const productoSeleccionado = event.target.value;
    const producto = productos.find(
      (p) => p.nombre_producto === productoSeleccionado
    );

    setPrecioSeleccionado(producto ? producto.precio : null);
    setCantidad(1); // Restablecer la cantidad a 1 cuando se cambia el producto
    setValue("precio_producto", producto ? producto.precio : null);
  };

  const handleCantidadChange = (event) => {
    const nuevaCantidad = event.target.value;
    setCantidad(Number(nuevaCantidad));
  };

  useEffect(() => {
    const total = cantidad * precioSeleccionado;
    const pagosMensuales = total / mesesDiferidos;
    setPagosMensuales(isNaN(pagosMensuales) ? 0 : pagosMensuales);

    setValue("total_pagar", total || "");
    setValue(
      "pagos_mensuales",
      isNaN(pagosMensuales) ? "" : pagosMensuales.toFixed(2)
    );
  }, [cantidad, precioSeleccionado, setValue, mesesDiferidos]);
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Cedula
          </label>
          <Controller
            name="cedula"
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su cedula"
                  maxLength={10}
                  pattern="[0-9]*"
                  {...register("cedula", { required: true })}
                />
              </>
            )}
            rules={{
              required: "La cédula es requerida",
              pattern: {
                value: /^[0-9]*$/,
                message: "La cédula debe contener solo números",
              },
              maxLength: {
                value: 10,
                message: "La cédula debe tener máximo 10 dígitos",
              },
            }}
          />

          {errors.cedula && <span>La cedula es requerida</span>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Precio del Producto</label>
          <input
            className="form-control"
            type="number"
            {...register("precio_producto", { required: true })}
            readOnly
            value={precioSeleccionado || ""}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Nombre Completo
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre Completo"
            maxLength={30}
            {...register("nombre_completo", { required: true })}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Meses Diferidos:</label>
          <select
            className="form-select"
            {...register("meses_diferidos", { required: true })}
            value={mesesDiferidos}
            onChange={(e) => setMesesDiferidos(parseInt(e.target.value, 10))}
          >
            {[8, 12, 24, 32].map((meses) => (
              <option key={meses} value={meses}>
                {`${meses} meses`}
              </option>
            ))}
          </select>
        </div>
        {errors.meses_diferidos && <span>Este campo es requerido</span>}
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Correo Electronico
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Correo Electronico"
            maxLength={50}
            {...register("email", { required: true })}
          />
          {errors.email && <span>Este campo es requerido</span>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Total a pagar</label>
          <input
            className="form-control"
            type="number"
            {...register("total_pagar", { required: true })}
            readOnly
            value={cantidad * precioSeleccionado || ""}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Direccion
          </label>
          <input
            className="form-control"
            placeholder="Ingrese su dirección"
            maxLength={100}
            {...register("direccion", { required: true })}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Pagos Mensuales:</label>
          <input
            className="form-control"
            type="number"
            placeholder="Pagos Mensuales"
            {...register("pagos_mensuales", { required: true })}
            value={pagosMensuales.toFixed(2)}
            readOnly
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Producto:</label>
          <select
            className="form-select"
            {...register("nombre_producto", { required: true })}
            onChange={handleProductoChange}
          >
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option
                key={producto.nombre_producto}
                value={producto.nombre_producto}
              >
                {producto.nombre_producto}
              </option>
            ))}
          </select>
          {errors.nombre_producto && <span>Este campo es requerido</span>}
        </div>

        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Fecha de Inicio:
          </label>
          <input
            type="date"
            className="form-control"
            placeholder="Fecha de Inicio:"
            {...register("fecha_inicio", { required: true })}
            defaultValue={obtenerFechaActual()}
            readOnly
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Cantidad del Producto:</label>
          <input
            className="form-control"
            type="number"
            {...register("cantidad_producto", { required: true })}
            onChange={handleCantidadChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Vencimiento</label>
          <input
            className="form-control"
            type="date"
            placeholder="Vencimiento"
            {...register("vencimiento", { required: true })}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Estado del Pago:</label>
          <select
            className="form-select"
            {...register("estado", { required: true })}
          >
            <option value="">Selecciona el Estado del Pago</option>
            <option value="pagado">Por pagar</option>
            <option value="cancelado">Cancelado</option>
          </select>
          {errors.estado && <span>Este campo es requerido</span>}
          <button
            className="btn btn-success float-end"
            style={{ position: "absolute", right: "175px" }}
          >
            Guardar Cliente
          </button>
          {params.cedula && (
            <button
              className="btn btn-danger"
              style={{ position: "absolute", right: "320px" }}
              onClick={async () => {
                const aceptar = window.confirm("Esta seguro de eliminar");
                if (aceptar) {
                  await deleteCliente(params.cedula);
                  toast.success('Eliminado Correctamente', {
                    position: 'top-center',
                    style:{
                      background: '#101010',
                      color:"#fff",
                      marginTop: '60px',
                    }
                  })
                  navigate("/clientes");
                }
              }}
            >
              <i className="bi bi-trash"></i>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
