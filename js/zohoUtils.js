export function calcularNotaMedia(json) {
  const reviews = json.reviews;
  
  // Filtrar las reseñas con calificación válida
  const calificaciones = reviews
    .map(review => parseFloat(review.Calificaci_n))
    .filter(calificacion => !isNaN(calificacion));
  
  // Verificar si hay calificaciones
  if (calificaciones.length === 0) {
    return 0;
  }
  
  // Calcular el promedio
  const suma = calificaciones.reduce((total, calificacion) => total + calificacion, 0);
  const promedio = suma / calificaciones.length;
  
  return promedio.toFixed(1); // Redondear a 2 decimales
}