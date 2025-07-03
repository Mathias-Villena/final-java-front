import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriaList from "./components/CategoriaList";
import FormCategoria from "./components/FormCategoria";
import ProductoList from "./components/ProductoList";
import FormProducto from "./components/FormProducto";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<CategoriaList />} />
          <Route path="/categorias" element={<CategoriaList />} />
          <Route path="/add-categoria" element={<FormCategoria />} />
          <Route path="/edit-categoria/:id" element={<FormCategoria />} />
          <Route path="/productos" element={<ProductoList />} />
          <Route path="/add-producto" element={<FormProducto />} />
          <Route path="/edit-producto/:id" element={<FormProducto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
