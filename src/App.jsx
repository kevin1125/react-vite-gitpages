import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Clientespage } from "./pages/Clientespage";
import { ClientesForm } from "./pages/ClientesForm";
import { ProductoPage } from "./pages/ProductoPage";
import { ProductoForm } from "./pages/ProductoForm";
import { PagosMensuales } from "./components/PagosMensuales";
import { Navegacion } from "./components/Navegacion";
import { GenerarPago } from "./pages/GenerarPago";
import { PagosList } from "./pages/PagosList";
import { PagosForm } from "./pages/PagosForm";
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <BrowserRouter>
      <Navegacion />
      <Routes>
        <Route path="/" element={<Navigate to="/clientes" />} />
        <Route path="/clientes" element={<Clientespage />} />
        <Route path="/crear-clientes" element={<ClientesForm />} />
        <Route path="/clientes/:cedula" element={<ClientesForm />} />
        <Route
          path="/clientes/:cedula/pagosMensuales"
          element={<PagosMensuales />}
        />
        <Route path="/productos" element={<ProductoPage />} />
        <Route path="/crear-producto" element={<ProductoForm />} />
        <Route path="/productos/:nombre_producto" element={<ProductoForm />} />
        <Route path="/clientes/:cedula/generarPago" element={<GenerarPago />} />
        <Route path="/pagos" element={<PagosList />} />
        <Route path="/crear-pagos" element={<PagosForm />} />
        <Route path="/pagos/:id" element={<PagosForm />} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
};

export default App;
