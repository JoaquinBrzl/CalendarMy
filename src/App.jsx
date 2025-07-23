import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase/config";
import { useRutina } from "./Hooks/useRutina";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import  dayjs  from "dayjs";

function App() {
  const { actividades, isLoading, setActividades } = useRutina(); //llama al hook y obtiene la rutina

  // Mientras cargan los datos muestra un mensaje
  if (isLoading) {
    return (
      <p className="text-center text-lg mt-10">Cargando rutina del dia...</p>
    );
  }

  const completarTarea = async (index) => {
    const nuevasActividades = [...actividades]; //clonamos el array
    nuevasActividades[index].completado = true; //modificamos solo esa
    setActividades(nuevasActividades); //actualizamos el estado en react

    const hoy = dayjs().format("YYYY-MM-DD");
    const docRef = doc(db, "rutinas", hoy);
    await setDoc(docRef, { actividades: nuevasActividades });
  };

  return (
    <>
      <main className="max-w-md mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Mi Rutina de hoy
        </h1>

        <ul className="space-y-4">
          {/* Recorre cada actividad y la muestra como una tarjeta */}
          {actividades.map((actividad, index) => (
            <li
              key={index} //requerido por react, debe ser unica por lo que sera el index
              className={`rounded-lg shadow p-4 border-l-4 ${
                actividad.completado
                  ? "bg-gray-200 border-gray-400 text-gray-600"
                  : "bg-white border-blue-500"
              }`}
            >
              <p className="text-sm text-gray-500">{actividad.hora}</p>
              <p
                className={`text-lg ${
                  actividad.completado ? "line-through" : ""
                }`}
              >
                {actividad.tarea}
              </p>

              {actividad.completado ? (
                <FaCheckCircle
                  className="text-gray-400 text-xl cursor-pointer"
                  onClick={() => completarTarea(index)}
                />
              ) : (
                <FaRegCircle
                  className="text-green-500 text-xl cursor-pointer"
                  onClick={() => completarTarea(index)}
                />
              )}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
