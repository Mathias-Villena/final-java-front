import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function FormProducto() {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: { id: "" },
  });

  const [categorias, setCategorias] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8086/api/v1/categorias").then((res) => {
      setCategorias(res.data);
    });

    if (id) {
      axios.get(`http://localhost:8086/api/v1/productos/${id}`).then((res) => {
        setProducto({
          ...res.data,
          categoria: { id: res.data.categoria.id }
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoriaChange = (e) => {
    setProducto({
      ...producto,
      categoria: { id: e.target.value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:8086/api/v1/productos/${id}`, producto);
    } else {
      await axios.post(`http://localhost:8086/api/v1/productos`, producto);
    }
    navigate("/productos");
  };

  return (
    <div>
      <h2>{id ? "Editar Producto" : "Nuevo Producto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Precio</label>
          <input
            name="precio"
            type="number"
            value={producto.precio}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Stock</label>
          <input
            name="stock"
            type="number"
            value={producto.stock}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Categoría</label>
          <select
            name="categoria"
            value={producto.categoria.id}
            onChange={handleCategoriaChange}
            className="form-select"
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Guardar
        </button>
        <button
          type="button"
          onClick={() => navigate("/productos")}
          className="btn btn-secondary ms-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default FormProducto;
