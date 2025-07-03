import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function FormCategoria() {
  const [categoria, setCategoria] = useState({ nombre: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8086/api/v1/categorias/${id}`)
        .then((res) => setCategoria(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:8086/api/v1/categorias/${id}`, categoria);
    } else {
      await axios.post(`http://localhost:8086/api/v1/categorias`, categoria);
    }
    navigate("/categorias");
  };

  return (
    <div>
      <h2>{id ? "Editar Categoría" : "Nueva Categoría"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            name="nombre"
            value={categoria.nombre}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Guardar
        </button>
        <button
          type="button"
          onClick={() => navigate("/categorias")}
          className="btn btn-secondary ms-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default FormCategoria;
