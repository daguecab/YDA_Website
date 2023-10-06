function loadFooter() {
    // Obtén el elemento donde deseas cargar el footer (por su id o clase)
    const footerContainer = document.querySelector('.site-footer'); // Reemplaza 'site-footer' con el id o clase de tu contenedor de footer
    if (footerContainer) {
        // Define el HTML del footer
        const footerHTML = `
        <div class="container">
          <div class="row">
              <div class="col-lg-3 col-10 me-auto mb-4">
                  <a class="navbar-brand" href="index.html">
                      <img class="logo" style="margin-top: -5%;" src="images/Logo.png">
                  </a>
                  <p class="copyright-text text-muted mt-lg-5 mb-4 mb-lg-0">Copyright © 2023 <strong>Yogures de Antaño</strong></p>
                  <br>
                  <p class="copyright-text">Designed by <a href="https://www.letpro.es/" target="_blank">LetPro</a></p>
              </div>

              <div class="col-lg-5 col-8">
                  <h5 class="text-white mb-3">Mapa de Yogures de Antaño</h5>

                  <ul class="footer-menu flex-wrap">
                      <li class="footer-menu-item"><a href="about.html" class="footer-menu-link">Quién soy</a></li>

                      <li class="footer-menu-item"><a href="#" class="footer-menu-link">Opiniones</a></li>

                      <li class="footer-menu-item"><a href="productos-de-antaño.html" class="footer-menu-link">Productos</a></li>

                      <li class="footer-menu-item"><a href="#" class="footer-menu-link">FAQs</a></li>
                  </ul>
              </div>

              <div class="col-lg-3 col-4">
                  <!-- <h5 class="text-white mb-3">Social</h5>

                  <ul class="social-icon">

                      <li><a href="#" class="social-icon-link bi-youtube"></a></li>

                      <li><a href="#" class="social-icon-link bi-whatsapp"></a></li>

                      <li><a href="#" class="social-icon-link bi-instagram"></a></li>

                      <li><a href="#" class="social-icon-link bi-skype"></a></li>
                  </ul> -->
                  <h5 class="text-white mb-3">Aviso Legal</h5>

                  <ul class="footer-menu flex-wrap">
                      <li class="footer-menu-item"><a href="terminos-y-condiciones.html" class="footer-menu-link">Términos y condiciones</a></li>

                      <li class="footer-menu-item"><a href="politica-de-privacidad.html" class="footer-menu-link">Política de privacidad</a></li>

                      <li class="footer-menu-item"><a href="#" class="footer-menu-link">Política de ventas y envíos</a></li>
                  </ul>
              </div>
          </div>
        </div>
        `;

        // Inserta el HTML del footer en el elemento contenedor
        footerContainer.innerHTML = footerHTML;
    }
}