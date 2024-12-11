async function obtenerReviewsDesdeCrm(productCrmId) {
    const url = `https://stripe-integration-n0er.onrender.com/zoho/productReviews?product=${productCrmId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const reviews = await response.json();
        return reviews; // Devuelve las reseñas
    } catch (error) {
        throw new Error(`Error al obtener las reseñas: ${error.message}`);
    }
}

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

export const extraerReviews = (reviews) => {
  if (!Array.isArray(reviews)) {
    throw new Error("El parámetro reviews debe ser un array");
  }

  // Mapeamos los datos necesarios de cada reseña
  return reviews.map((review) => ({
    nombre: review.Nombre_a_mostrar || "Anónimo",
    comentario: review.Comentario || "Sin comentario",
    calificacion: review.Calificaci_n || "Sin calificación",
    fechaCreacion: review.Created_Time || "Fecha no disponible",
  }));
};
