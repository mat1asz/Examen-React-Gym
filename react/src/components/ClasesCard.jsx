// PASO 2 · REEMPLAZAR (ya anda con lo provisorio)  ·  PASO 4 · PEGAR HTML (la tarjeta)
import { Link } from "react-router-dom";
import { VerDatos } from "./VerDatos.jsx";

export function ClaseCard({ clase, grupo }) {
  return (
    <>
       <div className="card">
                    <Link to={`/clases/${clase.id}`}>
                        <div className="card-picture">
                            <img src="{clase.imagen}" alt="{clase.nombre}" title="{clase.nombre}" />
                            <div className="card-badge">{clase.categoria}</div>
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">{clase.nombre}</h3>
                            <p className="card-instructor">👨‍🏫 {clase.instructor}</p>
                            <div className="card-info">
                                <span className="card-duration">⏱️ {clase.duracion} min</span>
                                <span className="card-level">📈 {clase.nivel}</span>
                            </div>
                            <div className="card-beer">
                                <p className="card-beer-title">🍺 Cerveza Incluida</p>
                                <p className="card-beer-name">{clase.birra_incluida.nombre}</p>
                                <p className="card-beer-type">{clase.birra_incluida.tipo}</p>
                            </div>
                        </div>
                    </Link>
                </div>
    </>
  );
}