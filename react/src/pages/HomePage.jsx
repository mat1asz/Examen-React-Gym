// PASO 2 · REEMPLAZAR + ELEGIR UNA OPCIÓN  ·  PASO 4 · PEGAR HTML (un grupo)
import { Fragment } from "react";
import { useClases } from "../hooks/useClases.js";
import { ClaseCard } from "../components/ClaseCard.jsx";

// No se toca: arma los grupos cuando el servidor manda una lista sin agrupar
function agrupar(lista, campo) {
  const nombres = [...new Set(lista.map((x) => x[campo]))].sort();
  return nombres.map((nombre) => [nombre, lista.filter((x) => x[campo] === nombre)]);
}

export function HomePage() {
  const { datos, loading, error } = useClases();

  if (loading) {
    return (
      <article className="container loading">
        <div className="loader"></div>
      </article>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h1>Error al cargar los datos</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  const grupos = agrupar(datos || [], "categoria"); // ← OPCIÓN B: empieza con [ y el JS viejo agrupa con .filter

  const conDatos = grupos.filter(([, items]) => items.length > 0);

  if (conDatos.length === 0) {
    return (
      <div className="error">
        <p>No hay datos para mostrar.</p>
      </div>
    );
  }

  return (
    <>
      <div className="">
        {conDatos.map(([grupo, items]) => {
          const tarjetas = items.map((x) => (
            <ClaseCard key={x.id} clase={x} grupo={grupo} />
          ));
          return (
            <Fragment key={grupo}>

            </Fragment>
          );
        })}
      </div>
    </>
  );
}