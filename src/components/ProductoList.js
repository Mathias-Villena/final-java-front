import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductoList() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const res = await axios.get("http://localhost:8086/api/v1/productos");
    setProductos(res.data);
  };

  const eliminarProducto = async (id) => {
    await axios.delete(`http://localhost:8086/api/v1/productos/${id}`);
    cargarProductos();
  };

  return (
    <div>
      <h2>Productos</h2>
      <button
        className="btn btn-success mb-2"
        onClick={() => navigate("/add-producto")}
      >
        Nuevo Producto
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.nombre}</td>
              <td>{prod.precio}</td>
              <td>{prod.stock}</td>
              <td>{prod.categoria?.nombre}</td>
              <td>
                <button
                  onClick={() => navigate(`/edit-producto/${prod.id}`)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarProducto(prod.id)}
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductoList;
