export async function extraerReviewsInfo(productCrmId, mapear = true) {
    try {
        const json = await obtenerReviewsDesdeCrm(productCrmId);

        // Si el flag `mapear` es verdadero, mapeamos las reseñas
        const reviews = mapear ? mapearReviews(json.reviews) : json.reviews;

        // Calcular nota media
        const notaMedia = calcularNotaMedia(json);

        // Número de reseñas
        const numeroDeReviews = json.reviews.length;

        return {
            reviews, // Devolver las reseñas mapeadas o sin mapear según el flag
            notaMedia,
            numeroDeReviews,
        };
    } catch (error) {
        throw new Error(`Error al procesar las reviews: ${error.message}`);
    }
}