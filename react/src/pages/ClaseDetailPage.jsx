// PASO 2 · REEMPLAZAR  ·  PASO 4 · PEGAR HTML (el detalle)
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiFetch } from "../api/client.js";

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
    <div className="clase-page-container">
        <Link to="/" className="back-btn">⬅ Volver al catálogo</Link>
        <div id="clase-details-container">
          <div className="clase-details">
            <div className="clase-header">
                <h2>{clase.nombre}</h2>
                <p className="instructor">👨‍🏫 Instructor: {clase.instructor}</p>
            </div>

            <div className  ="clase-body">
                <div>
                    <img src={clase.imagen} alt={clase.nombre} className="clase-image" />

                    <div className="clase-meta">
                        <div className="meta-item">
                            <strong>⏱️ Duración</strong>
                            <span>{clase.duracion} min</span>
                        </div>
                        <div className="meta-item">
                            <strong>📈 Nivel</strong>
                            <span>{clase.nivel}</span>
                        </div>
                        <div className="meta-item">
                            <strong>🔥 Calorías</strong>
                            <span>{clase.calorias_quemadas}</span>
                        </div>
                    </div>

                    <div className="beer-section">
                        <h3>🍺 CERVEZA INCLUIDA</h3>
                        <div className="beer-details">
                            <div className="beer-detail-item">
                                <strong>Nombre:</strong>
                                <span>{clase.birra_incluida.nombre}</span>
                            </div>
                            <div className="beer-detail-item">
                                <strong>Tipo:</strong>
                                <span>{clase.birra_incluida.tipo}</span>
                            </div>
                            <div className="beer-detail-item">
                                <strong>Graduación:</strong>
                                <span>{clase.birra_incluida.graduacion}</span>
                            </div>
                            <div className="beer-detail-item">
                                <strong>Origen:</strong>
                                <span>{clase.birra_incluida.origen}</span>
                            </div>
                        </div>
                        <div className="beer-description">
                            {clase.birra_incluida.descripcion}
                        </div>
                    </div>
                </div>

                <div className="clase-info">
                    <h3>📄 Descripción</h3>
                    <p>{clase.resumen}</p>

                    <h3>🕒 Horarios Disponibles</h3>
                    <ul className="horarios-list">
                        ${horariosHtml}
                    </ul>

                    <h3>🏋️ Equipamiento Necesario</h3>
                    <ul className="equipamiento-list">
                        {equipamientoHtml}
                    </ul>

                    <h3>🌟 Beneficios</h3>
                    <ul className="beneficios-list">
                        {beneficiosHtml}
                    </ul>
                </div>
            </div>
        </div>
        </div>
    </div>
    </>
  );
}