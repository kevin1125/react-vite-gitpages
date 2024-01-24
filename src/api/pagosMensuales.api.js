import axios from 'axios'

const pagosMensualesApi = axios.create({
    baseURL: 'http://localhost:8000/pagosMensuales/pagosMensuales/'
})

export const getAllPagos = () => pagosMensualesApi.get('/');