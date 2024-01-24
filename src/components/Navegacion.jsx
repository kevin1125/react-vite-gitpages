import { Link } from 'react-router-dom';

export const Navegacion = () => {

  const linkStyle = {
    backgroundColor: '#f9ae65', // Cambia el color de fondo del botón
    position: 'absolute',
    right: '35px', // Alinea el enlace a la derecha
    color: '#fff', // Color del texto en los enlaces
    textDecoration: 'none', // Quitamos la decoración predeterminada del enlace
  };
  const linkStyles = {
    backgroundColor: '#f9ae65', // Cambia el color de fondo del botón
    position: 'absolute',
    right: '190px', // Alinea el enlace a la derecha
    color: '#fff', // Color del texto en los enlaces
    textDecoration: 'none', // Quitamos la decoración predeterminada del enlace
  };

  
// estilos links 
const linkStyle1 = {
  
  position: 'absolute',
  right: '35px', // Alinea el enlace a la derecha
  color: '#f9ae65', // Color del texto en los enlaces
 
};
const linkStyle3 = {
  
  position: 'absolute',
  right: '250px', // Alinea el enlace a la derecha
  color: '#3c6d79', // Color del texto en los enlaces
  textDecoration: 'none', // Quitamos la decoración predeterminada del enlace
};

const linkStyle2 = {
 
  color: '#3c6d79', // Cambia el color del texto del botón
  position: 'absolute',
  right: '150px', // Alinea el enlace a la derecha
  textDecoration: 'none', // Quitamos la decoración predeterminada del enlace
};

//
  const contenedorStyle = {
    padding: '35px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#linear-gradient(90deg, rgba(224,226,238,1) 100%, rgba(224,226,238,1) 100%)',
    padding: '10px 20px', // Añadimos relleno para los enlaces
  };
  const backPage = {
    marginRight: '10px',
    padding: '5px',
    color: '#fff',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '5px',
  };

  const iconStyle = {
    fontSize: '1.5rem', // Tamaño del ícono
    color: '#f9ae65'
  }

  return (
    <div>
      <nav style={navStyle}>
        <Link to="/" style={backPage}><i className="bi bi-arrow-left" style={iconStyle}></i></Link>
        <h1 style={{ margin: '30', color: '#3c6d79' }}>Aplicación de Pagos</h1>
        <div>
          <Link to="/productos" style={linkStyle2}>
            Productos
          </Link>
          <Link to="/clientes" style={linkStyle3}>
            Clientes
          </Link >
          <a style={linkStyle1} href="http://127.0.0.1:8000/" >
            Cerrar Sesión
          </a>
        </div>
      </nav>
      <div style={contenedorStyle}>
        {/* Subtítulo debajo del título */}
        <Link to="/crear-clientes" className="btn" role="button" style={linkStyles}>
          Crear Cliente
        </Link>
        <Link to="/crear-producto" className="btn " role="button" style={linkStyle}>
          Crear Producto
        </Link>

      </div>
    </div>
  );
};
