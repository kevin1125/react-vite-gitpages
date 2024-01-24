import axios from 'axios'

const productosApi = axios.create({
    baseURL: 'http://localhost:8000/productos/productos/'
})

export const getAllProductos = () => productosApi.get('/')

export const getAllProducto = (nombre_producto) => productosApi.get(`/${nombre_producto}/`)

export const createProductos = (productos) => productosApi.post('/', productos);

export const deleteProductos = (nombre_producto) => productosApi.delete(`/${nombre_producto}`);

export const updateProductos = (nombre_producto, productos) => productosApi.put(`/${nombre_producto}/`, productos)
