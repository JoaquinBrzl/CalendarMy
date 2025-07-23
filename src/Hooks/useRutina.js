import { useEffect, useState } from "react"; //react config
import { db } from "../firebase/config"; //firebase config
import { doc, getDoc, setDoc } from "firebase/firestore"; //funciones de escritura y lectura
import dayjs from "dayjs"; //libreria para manejar mejor las fechas

export const useRutina = () => {
  const [actividades, setActividades] = useState([]); //lista de tareas del dia
  const [isLoading, setIsLoading] = useState(true); //saber si esta cargando

  const hoy = dayjs().format("YYYY-MM-DD"); //EJM: 2025-07-23
  const ayer = dayjs().subtract(1, "day").format("YYYY-MM-DD"); //ayer en mismo formato

  useEffect(() => {
    const cargarRutina = async () => {
      //doc() crea / "rutinas" name collecion / hoy nombre del documento (fecha)
      const docRef = doc(db, "rutinas", hoy);
      // trae el contenido de ese documento
      const docSnap = await getDoc(docRef);

      // Si el documento de hoy existe
      if (docSnap.exists()) {
        setActividades(docSnap.data().actividades); //Usaremos esas actividades

        // Si no existe, tratamos de usar el de ayer
      } else {
        // Si docAyer.exists() es verdadero → usa docAyer.data().actividades
        // Si docAyer.exists() es falso → usa [] (array vacío)
        const docAyer = await getDoc(doc(db, "rutinas", ayer)); //leer rutina de ayer
        const actividadesAyer = docAyer.exists()
          ? docAyer.data().actividades
          : [];

        await setDoc(docRef, {
          actividades: actividadesAyer,
        }); //creacion de la rutina de hoy en firebase
        setActividades(actividadesAyer); //mostramos esas actividades
      }
      setIsLoading(false); //ya terminamos de cargar
    };

    cargarRutina(); //ejecutamos la funcion
  }, [hoy]); //se ejecuta una vez por dia

console.log("Actividades cargadas:", actividades);

  return {
    actividades,
    isLoading,
    setActividades,
  };
};
