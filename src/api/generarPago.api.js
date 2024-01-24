import axios from "axios";

const generarPagoApi = axios.create({
    baseURL: 'http://localhost:8000/generarPago/generarPago/'
})
export const getAllPagos = () => generarPagoApi.get('/')

export const getPago = (id) => generarPagoApi.get(`/${id}/`);


export const createPagos = (pagos) => generarPagoApi.post('/', pagos);

export const deletePagos = (id) => generarPagoApi.delete(`/${id}`)

export const updatePagos= (id, pagos) => generarPagoApi.put(`/${id}/`, pagos)



// export const updateTotalPagar = (clienteId, nuevoTotalPagar) => {
//     const data = { total_pagar: nuevoTotalPagar };
//     return generarPagoApi.patch(`/updateTotalPagar/${clienteId}/`, data);
// };