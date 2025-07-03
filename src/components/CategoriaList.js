import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    const res = await axios.get("http://localhost:8086/api/v1/categorias");
    setCategorias(res.data);
  };

  const eliminarCategoria = async (id) => {
    await axios.delete(`http://localhost:8086/api/v1/categorias/${id}`);
    cargarCategorias();
  };

  return (
    <div>
      <h2>Categorías</h2>
      <button
        className="btn btn-success mb-2"
        onClick={() => navigate("/add-categoria")}
      >
        Nueva Categoría
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.nombre}</td>
              <td>
                <button
                  onClick={() => navigate(`/edit-categoria/${cat.id}`)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarCategoria(cat.id)}
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

export default CategoriaList;
