import axios from 'axios'

const clienteApi = axios.create({
    baseURL: 'http://localhost:8000/clientes/clientes/'
})

export const getAllClientes = () => clienteApi.get('/');

export const getCliente = (cedula) => clienteApi.get(`/${cedula}/`);

export const createCliente = (clientes) => clienteApi.post('/', clientes);

export const deleteCliente = (cedula) => clienteApi.delete(`/${cedula}`)

export const updateCliente= (cedula, clientes) => clienteApi.put(`/${cedula}/`, clientes)

export const cancelarPagoCliente = (cedula, tipoPago) => clienteApi.post('/cancelar-pago', { cedula, tipoPago });
