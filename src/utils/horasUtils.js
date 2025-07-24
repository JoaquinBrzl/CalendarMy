import dayjs from "dayjs";

/**
 * Dado un array de actividades, devuelve un array de horas como strings
 * ej: ["08:00", "09:00", ..., "12:00"]
 */

export const obtenerRangoDeHoras = (activades) => {
  const horas = activades
    .map((act) => {
      const inicio = act.horaInicio || act.hora; //fallback por compatibilidad
      const fin = act.horaFin || act.hora;
      return [inicio, fin];
    })
    .flat();

  const horasEnMinutos = horas
    .map((hora) => {
      const [h, m] = hora.split(":").map(Number);
      return h * 60 + m;
    })
    .sort((a, b) => a - b);

  const min = Math.floor(horasEnMinutos[0] / 60);
  const max = Math.ceil(horasEnMinutos[horasEnMinutos.length - 1] / 60);

  // Generamos un array de horas completas como '08:00', '09:00' , etc

  const rango = [];
  for (let i = min; i <= max; i++){
    rango.push(`${i.toString().padStart(2,'0')}:00`)
  }

  return rango;
  
};


