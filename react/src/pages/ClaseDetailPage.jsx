// PASO 2 · REEMPLAZAR  ·  PASO 4 · PEGAR HTML (el detalle)
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiFetch } from "../api/client.js";
import { VerDatos } from "../components/VerDatos.jsx";

export function ClaseDetailPage() {
  const { id } = useParams();
  const [clase, setClase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // No se toca: también trae la lista completa, por si el detalle muestra un dato que solo está ahí
  const [lista, setLista] = useState(null);
  useEffect(() => {
    apiFetch("/clases")
      .then(setLista)
      .catch(() => setLista(null));
  }, []);

  useEffect(() => {
    async function cargar() {
      try {
        setLoading(true);
        setError(null);
        const datos = await apiFetch(`/clases/${id}`);
        setClase(datos);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, [id]);

  if (loading) {
    return (
      <article className="container loading">
        <div className="loader"></div>
      </article>
    );
  }

  if (error || !clase) {
    return (
      <article className="container">
        <p className="error">{error ? error.message : "No encontrado"}</p>
        <Link to="/">Volver al inicio</Link>
      </article>
    );
  }

  return (
    <>
    <main className="clase-page-container">
        <a href="/" className="back-btn">⬅ Volver al catálogo</a>
        <div id="clase-details-container">
        </div>
    </main>
    </>
  );
}