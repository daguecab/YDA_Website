function loadFooter() {
    // Obtén el elemento donde deseas cargar el footer
    const footerContainer = document.querySelector('.site-footer'); // Cambia 'site-footer' por el id o clase de tu contenedor de footer
    if (footerContainer) {
        // Define el HTML del footer
        const footerHTML = `
        <div class="container">
          <div class="row">
              <div class="col-lg-3 col-10 text-center mb-4" style="margin:auto">
                  <a class="navbar-brand" href="index>
                      <img class="logo" style="margin-top: -5%;" src="images/Logo.png">
                  </a>
                  <p class="copyright-text text-muted mt-lg-3 mb-4 mb-lg-0">Copyright © <span id="current-year"></span>
                  <strong>Yogures de Antaño</strong></p>
                  <p class="copyright-text">Designed by <a href="https://www.letpro.es/" target="_blank">LetPro</a></p>
              </div>

              <div class="col-lg-5 col-8">
                  <h5 class="text-white mb-3">Mapa de Yogures de Antaño</h5>

                  <ul class="footer-menu flex-wrap">
                      <li class="footer-menu-item"><a href="#" class="footer-menu-link">Quién soy</a></li>
                      <li class="footer-menu-item"><a href="#" class="footer-menu-link">Opiniones</a></li>
                      <li class="footer-menu-item"><a href="productos-de-antaño" class="footer-menu-link">Productos</a></li>
                      <li class="footer-menu-item"><a href="#" class="footer-menu-link">FAQs</a></li>
                  </ul>
              </div>

              <div class="col-lg-3 col-4">
                  <h5 class="text-white mb-3">Aviso Legal</h5>
                  <ul class="footer-menu flex-wrap">
                      <li class="footer-menu-item"><a href="terminos-y-condiciones" class="footer-menu-link">Términos y condiciones</a></li>
                      <li class="footer-menu-item"><a href="politica-de-privacidad" class="footer-menu-link">Política de privacidad</a></li>
                      <li class="footer-menu-item"><a href="politica-de-envio-devolulcion" class="footer-menu-link">Política de ventas, envíos y devoluciones</a></li>
                  </ul>
              </div>
          </div>
        </div>
		<div class="whatsapp">
            <a href="https://api.whatsapp.com/send?phone=34620373319&text=Muy buenas yogurtero, cuéntame tus dudas y te contesto nada más pueda." target="_blank">
                <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
                    <g class="layer"> 
                    <title>Layer 1</title>
                    <path d="m57.81072,21.975c-4.48928,-4.5 -10.46786,-6.975 -16.82142,-6.975c-13.11429,0 -23.78571,10.67143 -23.78571,23.78571c0,4.18928 1.09286,8.28215 3.17143,11.89286l-3.375,12.32142l12.61072,-3.31072c3.47143,1.89642 7.38215,2.89286 11.36786,2.89286l0.01072,0c13.10358,0 24.01072,-10.67143 24.01072,-23.78571c0,-6.35357 -2.7,-12.32142 -7.18928,-16.82142l-0.00001,-0.00001l-0.00001,0l-0.00002,0.00001zm-16.82142,36.6c-3.55714,0 -7.03928,-0.95357 -10.07143,-2.75357l-0.71785,-0.42857l-7.47858,1.96072l1.99286,-7.29642l-0.47143,-0.75c-1.98215,-3.15 -3.02142,-6.78215 -3.02142,-10.52142c0,-10.89642 8.87143,-19.76786 19.77858,-19.76786c5.28215,0 10.24286,2.05714 13.97143,5.79642c3.72857,3.73928 6.02142,8.7 6.01072,13.98215c0,10.90714 -9.09642,19.77858 -19.99286,19.77858l0,-0.00002l-0.00001,0l-0.00001,-0.00001zm10.84286,-14.80714c-0.58928,-0.3 -3.51429,-1.73572 -4.06072,-1.92857c-0.54643,-0.20358 -0.94286,-0.3 -1.33928,0.3c-0.39642,0.6 -1.53214,1.92857 -1.88571,2.33572c-0.34286,0.39642 -0.69642,0.45 -1.28571,0.15c-3.49286,-1.74643 -5.78571,-3.11785 -8.08928,-7.07143c-0.61072,-1.05 0.61072,-0.975 1.74643,-3.24643c0.19286,-0.39642 0.09642,-0.73928 -0.05357,-1.03928c-0.15,-0.3 -1.33928,-3.225 -1.83214,-4.41429c-0.48215,-1.15714 -0.975,-0.99642 -1.33928,-1.01785c-0.34286,-0.02142 -0.73928,-0.02142 -1.13572,-0.02142c-0.39642,0 -1.03928,0.15 -1.58571,0.73928c-0.54643,0.6 -2.07858,2.03572 -2.07858,4.96072c0,2.925 2.13214,5.75357 2.42142,6.15c0.3,0.39642 4.18928,6.39642 10.15714,8.97858c3.77143,1.62857 5.25,1.76786 7.13572,1.48928c1.14643,-0.17143 3.51429,-1.43572 4.00714,-2.82857c0.49286,-1.39286 0.49286,-2.58215 0.34286,-2.82857c-0.13928,-0.26786 -0.53572,-0.41785 -1.125,-0.70714l-0.00001,-0.00001l0.00002,-0.00001l-0.00002,-0.00001z"  id="svg_2"/>
                    </g>
                </svg>
            </a>
        </div>
        `;
        
        // Inserta el HTML del footer en el elemento contenedor
        footerContainer.innerHTML = footerHTML;
        
        // Ahora selecciona el elemento y establece el año actual
        document.getElementById("current-year").textContent = new Date().getFullYear();
    }
}

// Función para obtener el parámetro utm_source y propagarlo a todos los enlaces
function propagarUtmSource() {
    // Obtener el valor del parámetro utm_source de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');

    // Si no hay utm_source, no hacemos nada
    if (!utmSource) return;

    // Seleccionar todos los enlaces de la página
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const url = new URL(link.href);

        // Agregar el parámetro utm_source al enlace
        url.searchParams.set('utm_source', utmSource);

        // Actualizar el atributo href del enlace
        link.href = url.toString();
    });
}
//propagarUtmSource();
function mostrarModales(){
	// JavaScript para mostrar el modal al cargar la página
	var descuentoModal = document.getElementById('descuentoModal');
	if(descuentoModal){
		descuentoModal.style.display = 'none';
	}

	if (localStorage.getItem('emailModalFinalizado') != 'true') {
		loadEmailDescuento();
		emailModal.style.display = 'block';
	}	
	
	function loadEmailDescuento(){
		// Obtener el contenedor padre y el otro donde se insertará el formulario
		var emailModal = document.getElementById('emailModal');
		var  emailDescuentoContainer= emailModal.querySelector('#emailDescuento');
		//

		// Definir el contenido HTML que queremos cargar
		const datosPreventaHTML = `
			<div id="datosPreventaDiv" class="divCarroussel" style="width: 100%;height: 100%; display: block; position: relative;">
				<div style="position: absolute; top: -1%; right: -3%; color: black;">
					<a class="cerrar-btn" id="closeModalBtn">✖</a>
				</div>
				<h3>¡Suscríbete y consigue tu -20%!</h3>
				<h6 style="font-weight: var(--font-weight-thin);">Vas a recibir novedades, descuentos y consejos de utilidad para hacer recetas muuuy deliciosas</h6>
				<form id="datosPreventa" action="#" method="post">
					<div class="form-floating my-4">
						<input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" class="form-control" style="text-align: left;" placeholder="Correo Electrónico">
						<label for="email">Correo Electrónico</label>
					</div>
					<button type="submit" style="background-color:var(--primary-color)" class="form-control mt-lg-3">RECOGER CUPÓN</button>
				</form>
				<h6 style="font-weight: var(--font-weight-thin); font-size: 14px;">Al unirte aceptas recibir comunicaciones comerciales de Yogures de Antaño. Puedes retirar el consentimiento cuando quieras mandando un mail <a href="mailto:hola@yogures-de-antaño.com">aquí</a></h6>
			</div>
		`;

		// Insertar el contenido en el contenedor
		if (emailDescuentoContainer) {
			emailDescuentoContainer.innerHTML = datosPreventaHTML;
			var closeModalBtn = document.getElementById('closeModalBtn');
			closeModalBtn.addEventListener('click', function() {
				emailModal.style.display = 'none';
				localStorage.setItem('emailModalFinalizado',true);
			});
			// Validador de datos e integración con Zoho CRM
			const datosPreventa = document.getElementById('datosPreventa');
			datosPreventa.addEventListener('submit', function(event){
				submitDatos(event,emailDescuentoContainer,datosPreventa);
			});
		}
	}
	
	async function submitDatos(event,emailDescuentoContainer,datosPreventa) {
				// Evita que el formulario se envíe automáticamente
				event.preventDefault();

				if (validarDatosPreventa(datosPreventa)) {
					try {
						crearLeadZohoCRM();
						emailDescuentoContainer.innerHTML = `
							<div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
								<h2 style="font-weight: bold;">¡Gracias por registrarte!</h2>
								<h7 style="margin: 10px 0px; font-size: 18px; max-width: 80%;">
									Usa el cupón <strong>BIENVENIDO20</strong> en tu compra y disfruta de un 20% de descuento en tu primer pedido de fermentos para yogur.
								</h7>
								<a id="redirectToShopBtn" class="btn custom-btn cart-btn">IR A LA TIENDA</a>
							</div>
						`;
						document.getElementById('redirectToShopBtn').addEventListener('click', function() {
							window.location.href = "productos-de-antaño"; 
						});
						localStorage.setItem('emailModalFinalizado',true);
						datosPreventa.reset();
						// preguntarProductos();
					} catch (error) {
						console.error('Error en la petición:', error);
						alert('Hubo un error en la petición. Por favor, contáctenos por WhatsApp o teléfono. Gracias por su comprensión.');
					}
					const preloader = document.querySelector('.loading');
					preloader.style.display = 'none';
				}
			}
	
	function validarDatosPreventa(){
		var emailInput = document.getElementById('email');
		var emailValue = emailInput.value.trim();

		// Verificar si al menos uno de los campos está relleno
		if (emailValue === '') {
			alert('Por favor, rellena el campo email');
			return false;
		}
		return true;
	}

	async function crearLeadZohoCRM() {
    try {
        // Mostrar Spinner
        const preloader = document.querySelector('.loading');
        preloader.style.display = 'flex';

        // Obtiene los valores de los campos del formulario
        const email = document.getElementById("email").value;
		const dispositivo = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? "Móvil" : "PC";
		console.log(dispositivo);
        // Estructura los datos en el formato requerido
        const lead = {
            lead: {
                Email: email,
                Last_Name: "-",
                Lead_Source: "Suscripción web",
				Dispositivo: dispositivo 
            }
        };

        // Realiza la solicitud POST para crear el lead en Zoho CRM
        const response = await fetch('https://stripe-integration-n0er.onrender.com/zoho/insertLead', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(lead)
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            console.log(data.leadId);

            // Almacenar el ID del Lead en el localStorage
            const leadId = data.leadId; // Suponiendo que 'id' es el campo donde Zoho devuelve el ID del lead
            localStorage.setItem('leadId', leadId);

            return data;
        } else {
            console.error(data);
            throw new Error(data.message || "Error en la solicitud al servidor");
        }
    } catch (error) {
        console.error(error);
        throw error; // Devuelve el error para que pueda ser manejado por el código que llama a esta función
    }
}

}
function actualizarLead(){
}