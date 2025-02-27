//import { extraerReviewsInfo } from './zohoUtils.js';

// Función privada para obtener las reseñas desde el CRM
async function obtenerReviewsDesdeCrm(productCrmId) {
    const url = `https://stripe-integration-n0er.onrender.com/zoho/productReviews?product=${productCrmId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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

// Función privada para calcular la nota media
function calcularNotaMedia(json) {
    const reviews = json.reviews;

    // Filtrar las reseñas con calificación válida
    const calificaciones = reviews
        .map((review) => parseFloat(review.Calificaci_n))
        .filter((calificacion) => !isNaN(calificacion));

    // Verificar si hay calificaciones
    if (calificaciones.length === 0) {
        return 0;
    }

    // Calcular el promedio
    const suma = calificaciones.reduce((total, calificacion) => total + calificacion, 0);
    const promedio = suma / calificaciones.length;

    return promedio.toFixed(1); // Redondear a 1 decimal
}

// Función privada para mapear las reseñas
function mapearReviews(reviews) {
    if (!Array.isArray(reviews)) {
        throw new Error('El parámetro reviews debe ser un array');
    }

    // Mapeamos los datos necesarios de cada reseña
    return reviews.map((review) => ({
        nombre: review.Nombre_a_mostrar || 'Anónimo',
        comentario: review.Comentario || 'Sin comentario',
        calificacion: review.Calificaci_n || 'Sin calificación',
        fechaCreacion: review.Created_Time || 'Fecha no disponible',
    }));
}

 async function extraerReviewsInfo(productCrmId, mapear = true) {
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

async function obtenerReviewsDesdeCrm(productCrmId) {
    const url = `https://stripe-integration-n0er.onrender.com/zoho/productReviews?product=${productCrmId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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

// Función privada para calcular la nota media
function calcularNotaMedia(json) {
    const reviews = json.reviews;

    // Filtrar las reseñas con calificación válida
    const calificaciones = reviews
        .map((review) => parseFloat(review.Calificaci_n))
        .filter((calificacion) => !isNaN(calificacion));

    // Verificar si hay calificaciones
    if (calificaciones.length === 0) {
        return 0;
    }

    // Calcular el promedio
    const suma = calificaciones.reduce((total, calificacion) => total + calificacion, 0);
    const promedio = suma / calificaciones.length;

    return promedio.toFixed(1); // Redondear a 1 decimal
}

// Función privada para mapear las reseñas
function mapearReviews(reviews) {
    if (!Array.isArray(reviews)) {
        throw new Error('El parámetro reviews debe ser un array');
    }

    // Mapeamos los datos necesarios de cada reseña
    return reviews.map((review) => ({
        nombre: review.Nombre_a_mostrar || 'Anónimo',
        comentario: review.Comentario || 'Sin comentario',
        calificacion: review.Calificaci_n || 'Sin calificación',
        fechaCreacion: review.Created_Time || 'Fecha no disponible',
    }));
}

 async function extraerReviewsInfo(productCrmId, mapear = true) {
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

//Codigo normal

//Subtotal de la cesta
var subtotal = 0;

// Evento de clic en el botón "Añadir al carrito". Como se llama desde varios html, ChatGPT dice de usar un foreach. Comprobar con console
function addClickEventToCartButtons() {
    var addToCartButtons = document.querySelectorAll('.cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            var producto = button.dataset.producto;
            var precio = button.dataset.precio;
            var idPrecio = button.dataset.idprecio;
            var cantidad = button.dataset.cantidad;
            var cantidadSeleccionada = cantidad != null ? cantidad : button.parentNode.parentNode.querySelector('#cantidadCarrito').value;

            if (cantidadSeleccionada === 'Cantidad') {
                alert('Selecciona una cantidad válida para agregar al carrito.');
            } else {
                textoDescuento = "";
                if(cantidadSeleccionada>1){
                    textoDescuento =  "\nPuedes usar el cupón DESCUENTO2A para tener un descuento por comprar más de una unidad.";
                }
				if(precio != "?"){
	                agregarAlCarrito(producto, parseInt(cantidadSeleccionada), precio, idPrecio);
    	            alert('Se ha añadido el ' + producto + ' correctamente a la cesta.' + textoDescuento);
					actualizarCarritoEnLead();
				}
				else{
					alert('No seas impaciente, el ' + producto + ' aún no está disponible, pero lo estará próximamente. Aquí tienes un 20% de descuento para su salida😊 PREVENTA20' );
				}
                //localStorage.setItem('productoReciente', JSON.stringify({ producto: producto, cantidad: cantidad }));
                 //$('#cart-modal').modal('show');
            }
        });
    });
}

async function actualizarCarritoEnLead() {
  try {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const leadId = localStorage.getItem("leadId");

    if (!leadId) {
      console.error("No hay leadId en el localStorage");
      return { message: "Error: No hay leadId almacenado" };
    }

    if (!Array.isArray(carrito) || carrito.length === 0) {
      console.error("El carrito está vacío o no es válido");
      return { message: "Error: El carrito está vacío" };
    }

    const productosFormateados = carrito
      .map(item => `${item.cantidad} ${item.producto}`)
      .join(", ");
	console.log('Actualizando el lead');
    const response = await fetch('https://stripe-integration-n0er.onrender.com/zoho/updateLead', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leadId: leadId,
        camposActualizar: {
          Productos_Carrito: productosFormateados
        }
      })
    });

    const data = await response.json();
    console.log("Respuesta del backend:", data);
    return data;
  } catch (error) {
    console.error("Error al actualizar el carrito en el lead", error);
    return { message: "Error interno", error };
  }
}



function vaciarCarrito(){
    localStorage.setItem('carrito', null);
}

// Función para agregar al carrito
function agregarAlCarrito(producto, cantidad,precio, idPrecio) {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    var productoEnCarrito = carrito.find(item => item.producto === producto);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad = parseInt(productoEnCarrito.cantidad) + cantidad;
    } else {
        carrito.push({ producto: producto, cantidad: cantidad, precio: precio, price_id: idPrecio });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarNav() {
    // Calcula el total de productos en el carrito
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);

    // Código HTML del nav
    const navHTML = `
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand" href="/">
                    <img class="logo" src="images/Logo.png" alt="Logo">
                </a>
                <div class="d-lg-none">
                    <a href="carrito" class="bi-bag custom-icon position-relative" style="color:black">
                        <span 
                            class="position-absolute top-0 start-100 translate-middle badge rounded-circle" 
                            style="
                                background-color: black; 
                                color: white; 
                                font-size: 0.8rem; 
                                font-weight: bold; 
                                width: 1rem; 
                                height: 1rem; 
                                display: ${totalProductos > 0 ? 'flex' : 'none'}; 
                                align-items: center; 
                                justify-content: center;"
                        >
                            ${totalProductos}
                        </span>
                    </a>
                </div>
                <div class="collapse navbar-collapse" id="navbarNav" style="display: block !important;">
                    <div class="d-none d-lg-block" style="text-align: right;">
                        <a href="carrito" class="bi-bag custom-icon position-relative" style="color:black">
                            <span 
                                class="position-absolute top-0 start-100 translate-middle badge rounded-circle" 
                                style="
                                    background-color: black; 
                                    color: white; 
                                    font-size: 0.8rem; 
                                    font-weight: bold; 
                                    width: 1rem; 
                                    height: 1rem; 
                                    display: ${totalProductos > 0 ? 'flex' : 'none'}; 
                                    align-items: center; 
                                    justify-content: center;"
                            >
                                ${totalProductos}
                            </span>
                        </a>
                    </div>
                </div> 
            </div>
        </nav>
    `;

    // Inserta el nav después del div con id="main-container"
    const mainDiv = document.getElementById('main-container');
    if (mainDiv) {
        mainDiv.insertAdjacentHTML('afterend', navHTML);
    }
}
                                
//Cargar al finalizar
//document.addEventListener('DOMContentLoaded', cargarNav);

// Función para cargar y mostrar el contenido del carrito desde localStorage
function mostrarCarrito() {
    // Obtén los productos del carrito desde el localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoCompraDiv = document.querySelector(".carritoCompra");
    // Verifica si el cesta está vacía
    if (carrito.length === 0) {
        const carritoHTML = `
            <div style="text-align:center;">
                <h2>Tu cesta está vacía<h2>
                <a href="productos-de-antaño class="custom-btn">Seguir comprando</a>
            </div>
        `;
        carritoCompraDiv.innerHTML = carritoHTML;
        return;
    }
    // Carga los productos de manera asíncrona desde products.json utilizando fetch
    fetch("productos.json")
        .then(response => response.json())
        .then(products => {
            // Genera el HTML para mostrar los productos en el carrito
            const carritoHTML = `
                <div class="carrito">
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody id="bodyProductos">
                            ${carrito.map(item => {
                                // Busca el producto correspondiente en products.json por el nombre
                                const product = products.find(p => p.name === item.producto);
                                // Elimina el símbolo € y convierte el precio por unidad a número
                                const precioUnidad = parseFloat(product.price.replace('€', '').trim());
                                const totalProducto = product.price * item.cantidad;
                                subtotal += totalProducto;
		// Solo muestra las opciones si la categoría del producto es "pack"
                /*                const opcionesHTML = product.category === "pack" 
                                    ? Object.keys(item)
                                        .filter(key => key.startsWith('opcion') && item[key]) // Filtra las opciones válidas
                                        .map(key => {
                                            const nombreOpcion = key.charAt(0).toUpperCase() + key.slice(1); // Primera letra mayúscula
                                            return `<p class="opcion-pack" style="margin-left: 20px;"><b>${nombreOpcion}:</b> ${item[key]}</p>`;
                                        })
                                        .join('')
                                    : '';		*/
 return `
                                    <tr>
                                        <td class="product-details">
                                            <a href="${product.productLink}" ><img src="${product.imageSrc}" alt="${item.producto}" class="product-image product-thumb"/></a>
                                            <div style="margin-left:5%">
                                                <p class="carrito-nombre-producto">${item.producto}</p>
                                                <p class="precio carrito-precio-unitario">${product.price}</p>
                                                <div class="number-field medio mt-1">
                                                    <button id="decreaseMedio">-</button>
                                                    <input type="text" id="cantidadCarritoMedio" value="${item.cantidad}" min="1">
                                                    <button id="increaseMedio">+</button>
                                                </div>
                                                <button id="delete" class="medio">
                                                    <i class="material-icons" style="vertical-align:middle;padding-left:5px;">delete</i>
                                                </button>
                                            </div>
                                        <td class="carrito-cantidad">
                                            <div class="number-field">
                                                <button id="decrease">-</button>
                                                <input type="text" id="cantidadCarrito" value="${item.cantidad}" min="1">
                                                <button id="increase">+</button>
                                            </div>
                                            <button id="deleteMedio">
                                                <i class="material-icons" style="vertical-align:middle;padding-left:5px;">delete</i>
                                            </button>
                                        </td>
                                        <td class="carrito-producto-total">
                                            <p class="precio">${totalProducto.toFixed(2)}</p>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                    <div class="subtotal">
                        <p style="float:left" >Comentarios del Pedido:</p>
                        <textarea id="comentariosPedido" placeholder="Deja tus comentarios aquí"></textarea>
                        <div class="subtotal-envio">
                            <table>
                                <tr style="border:none;">
                                    <td class="izquierda" >Subtotal:</td>
                                    <td class="derecha precio" id="subtotalField">${subtotal.toFixed(2)}</td>
                                </tr>
                                <tr >
                                    <td class="izquierda">Envío gratuito:</td>
                                    <td class="derecha precio">0.0</td>
                                </tr>
                            </table>
                            <button id="checkout" class="btn-comprar btn custom-btn cart-btn">Comprar</button>
                        </div>
                    </div>
                    <!--p class="total" id="totalField"><b>Total:<b> ${subtotal.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</p-->
                    

                </div>
            `;
            // Inserta el contenido del carrito después del div con la clase "carritoCompra"
            carritoCompraDiv.innerHTML = carritoHTML;
            funcionalidadComprar();
            funcionalidadCampoCantidad(true);
        })
        .catch(error => {
            console.error("Error al cargar productos:", error);
        });
}

function funcionalidadComprar() {
    const checkout = document.getElementById('checkout');
    const preloader = document.querySelector('.loading');
    checkout.addEventListener('click', async () => {
        //Mostrar Spinner
        preloader.style.display = 'flex';
        // Recupera los productos del localStorage
        const productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        //Base url
        const protocol = window.location.protocol;
        const host = window.location.host;
        const base_url = `${protocol}//${host}`;

        // Convierte los productos en el formato necesario para la solicitud
        const productsForCheckout = productosEnCarrito.map((producto) => ({
            name: producto.producto,
            price: Math.round(producto.precio * 100), // Convierte el precio a centavos (si es necesario)
            price_id: producto.price_id,
            quantity: producto.cantidad || 1 // Establece una cantidad predeterminada si no está definida
        }));
        const comentarios = document.querySelector('#comentariosPedido').value;

        // Realiza la solicitud al servidor
        const res = await fetch('https://stripe-integration-n0er.onrender.com/stripe/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                products: productsForCheckout,
                returnUrl: window.location.href,
                comentarios: comentarios,
                successUrl: base_url + '/success.html'

            })
        });

        const data = await res.json();
        console.log(data);
        preloader.style.display = 'none';
        window.location.href = data.url;
    });
}

function restarUnoProducto(){
    cantidadActualizada(camposCantidad, index, camposCantidad[index].value - 1,funcionalidadCarrito,false);
}


//Añadimos funcionalidad al campo de cantidad. Si funcionalidadCarrito == true, hay que calcular totales y localStorage
function funcionalidadCampoCantidad(funcionalidadCarrito) {
    const decreaseButtons = document.querySelectorAll('#decrease');
    const increaseButtons = document.querySelectorAll('#increase');
    const deleteButtons = document.querySelectorAll('#delete');
    const camposCantidad = document.querySelectorAll('#cantidadCarrito');
    //Para los botones del medio
    const decreaseButtonsMedio = document.querySelectorAll('#decreaseMedio');
    const increaseButtonsMedio = document.querySelectorAll('#increaseMedio');
    const deleteButtonsMedio = document.querySelectorAll('#deleteMedio');
    const camposCantidadMedio = document.querySelectorAll('#cantidadCarritoMedio');

    // Agregar eventos de clic a los botones de incremento y decremento
    decreaseButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            cantidadActualizada(camposCantidad, camposCantidadMedio, index, camposCantidad[index].value - 1,funcionalidadCarrito,false);
        });
    });
    increaseButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            cantidadActualizada(camposCantidad, camposCantidadMedio, index, parseInt(camposCantidad[index].value, 10)  + 1,funcionalidadCarrito,false);
        });
    });
    deleteButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            cantidadActualizada(camposCantidad, camposCantidadMedio, index, 0, funcionalidadCarrito,true);
        });
    });
    camposCantidad.forEach((input, index) => {
        input.removeEventListener('click', null);
        input.addEventListener('input', function(event) {
            cantidadActualizada(camposCantidad, camposCantidadMedio, index, camposCantidad[index].value,funcionalidadCarrito,false);
        });
    });
    // Agregar eventos de clic a los botones de incremento y decremento del campo del medio
    decreaseButtonsMedio.forEach((button, index) => {
        button.addEventListener('click', function() {
            cantidadActualizada(camposCantidad, camposCantidadMedio, index, camposCantidad[index].value - 1,funcionalidadCarrito,false);
        });
    });
    increaseButtonsMedio.forEach((button, index) => {
        button.addEventListener('click', function() {
            cantidadActualizada(camposCantidad, camposCantidadMedio, index, parseInt(camposCantidad[index].value, 10)  + 1,funcionalidadCarrito,false);
        });
    });
    deleteButtonsMedio.forEach((button, index) => {
        button.addEventListener('click', function() {
            cantidadActualizada(camposCantidad, camposCantidadMedio, index, 0, funcionalidadCarrito,true);
        });
    });
    camposCantidadMedio.forEach((input, index) => {
        input.removeEventListener('click', null);
        input.addEventListener('input', function(event) {
            cantidadActualizada(camposCantidad, camposCantidadMedio, index, camposCantidad[index].value,funcionalidadCarrito,false);
        });
    });
}

function cantidadActualizada(camposCantidad,camposCantidadMedio,index,nuevaCantidad,funcionalidadCarrito,botonDelete){
    if (!isNaN(nuevaCantidad)) {
        if(nuevaCantidad>0 || botonDelete){
            console.log(nuevaCantidad,botonDelete);
            camposCantidad[index].value = nuevaCantidad;
            camposCantidadMedio[index].value = nuevaCantidad;
            if(funcionalidadCarrito){
                recalcularTotalProductos(index,nuevaCantidad);
            }
            var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            actualizarLocalStorage(carrito, index, nuevaCantidad);
        }
    }
}

function recalcularTotalProductos(index,nuevaCantidad) {
    const precioUnitario = parseFloat(document.querySelectorAll('.carrito-precio-unitario')[index].innerText.replace('$', '').trim());
    const totalFields = document.querySelectorAll('.carrito-producto-total');
    const total = precioUnitario * nuevaCantidad;
    totalFields[index].innerHTML = `<p class="precio">${total.toFixed(2)}</p>`;
    recalcularTotal(totalFields,index, nuevaCantidad);
}

// Función para recalcular los totales
function recalcularTotal(totalFields, index, nuevaCantidad) {
    //Reseteamos el subtotal y lo calculamos sumando todos los totales
    subtotal = 0;
    totalFields.forEach((totalField) => {
        const totalProducto = parseFloat(totalField.innerText.replace('$', '').trim());
        subtotal += totalProducto;
    });
    // Actualizar los elementos en el HTML
    document.querySelector('#subtotalField').innerHTML = subtotal.toFixed(2);
    //document.querySelector('#totalField').innerText = 'Total: ' + subtotal.toFixed(2) + '€';
}

function actualizarLocalStorage(carrito, index, newCantidad) {
    console.log("llego");
    const tbody = document.getElementById('bodyProductos');
    if (newCantidad === 0) {
        console.log(index);
        const decreaseButton = document.querySelectorAll('#decrease')[index];
        decreaseButton.parentNode.removeChild(decreaseButton);
        tbody.deleteRow(index);
        carrito.splice(index, 1);
        console.log(carrito);
        //funcionalidadCampoCantidad(true); 
    } else {
        carrito[index].cantidad = newCantidad;
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (tbody.rows.length === 0) {
        window.location.href = 'carrito.html';
    }
}

function generateProductHTML(product) {
    let priceHTML = `<div class="d-inline-flex" style="width:100%">
                        <h6 style="width:100%;color:black !important;" class="product-price precio text-muted ms-auto mt-auto mb-1 price">${product.price}</h6>
                    </div>`;
	const totalReviews = product.totalReviews;
    
    if (product.oldPrice) {
        priceHTML = `
        <div class="d-inline-flex">
            <h5 style="color:black !important;" class="product-price text-muted mt-auto mb-1 precio"><b>${product.price}</b></h5>
            <h5 class="product-price text-muted mt-auto mb-1 precio" style="margin-left:5px;"><del>${product.oldPrice}</del></h5>
        </div>
        `;
    }

    return `
        <div class="col-lg-4 col-12 mb-5">
            <div class="product-thumb">
                <div style="text-align: center;">
                    <a href="${product.productLink}">
                        <img src="${product.imageSrc}" class="img-fluid product-image" alt="">
                    </a>
                </div>
                <div class="product-top d-flex">
                    ${product.isNew ? '<span class="product-alert me-auto">Nuevo</span>' : ''}
                    ${product.isRecommended ? '<span class="product-alert me-auto">Recomendado</span>' : ''}
					${product.isOferta ? '<span class="product-alert me-auto">Oferta</span>' : ''}
					${product.isSopresa ? '<span class="product-alert me-auto">Próximamente</span>' : ''}
                </div>

                <div class="product-info text-center">
                    <div>
                        <h5 class="product-title mb-0">
                            <a href="${product.productLink}" class="product-title-link">${product.name}</a>
                        </h5>
                        <p class="product-p">${product.description}</p>
						<div class="rating-stars-container d-flex" style="justify-content: center;">
                        	<div class="rating-stars" id="ratingStars-${product.name}" ></div>
                            <span>(${totalReviews})</span>
                        </div>
                        ${priceHTML}</div>
                        <button type="submit" id="addToCart" style="width:60%" class="btn custom-btn cart-btn" data-precio="${product.price}" data-cantidad="1" data-idprecio="${product.priceId}" data-producto="${product.name}" data-bs-toggle="modal" data-bs-target="">Añadir al carrito</button>
                    </div>
                    <div class="d-flex ms-auto">
                        
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadProducts(category, name) {
    // Carga los productos de manera asíncrona desde products.json utilizando fetch
    fetch("productos.json")
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById("product-container");
            // Filtrar productos por categoría
            const filteredProducts = category
                ? products.filter(product => product.category === category && product.name != name)
                : products.filter(product => product.name != name);
            console.log(filteredProducts);
            filteredProducts.forEach(product => {
                const productHTML = generateProductHTML(product);
                productContainer.insertAdjacentHTML("afterend", productHTML);
				//Meter estrellas
				const starsContainer = document.getElementById(`ratingStars-${product.name}`);
				const notaMedia = product.notaMedia;
    			createStars(notaMedia, starsContainer);
            });
            addClickEventToCartButtons();
        })
        .catch(error => console.error("Error al cargar los productos:", error));
}

// Crear un SVG para la estrella
function createStar(type) {
	const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	star.setAttribute('class', 'star');
	star.setAttribute('viewBox', '0 0 24 24');
	const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
	polygon.setAttribute('points', '12 2 15 9 22 9 17 14 18 21 12 17 6 21 7 14 2 9 9 9');

	if (type === 'full') {
		star.setAttribute('class', 'star star-full');
	} else if (type === 'empty') {
		star.setAttribute('class', 'star star-empty');
	} else if (type === 'half') {
		star.setAttribute('class', 'star star-half');
		polygon.setAttribute('clip-path', 'inset(0 50% 0 0)');
	}

	star.appendChild(polygon);
	return star;
}

// Función para crear estrellas según la puntuación
function createStars(rating, container) {
	container.innerHTML = ''; // Limpiar el contenido

	const fullStars = Math.floor(rating); // Estrellas completas
	const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Estrella media
	const emptyStars = 5 - fullStars - halfStar; // Estrellas vacías

	const fragment = document.createDocumentFragment(); // Crear un fragmento para añadir todos los elementos

	// Crear estrellas completas
	for (let i = 0; i < fullStars; i++) {
		fragment.appendChild(createStar('full'));
	}

	// Crear estrella media
	if (halfStar) {
		fragment.appendChild(createStar('half'));
	}

	// Crear estrellas vacías
	for (let i = 0; i < emptyStars; i++) {
		fragment.appendChild(createStar('empty'));
	}

	container.appendChild(fragment); // Añadir todo el fragmento al contenedor
}

// Función para generar el HTML de los detalles del producto
async function generateProductDetailHTML(productName) {
    const productHeader = document.getElementById('productHeader');
    const response = await fetch("productos.json");
    const products = await response.json();
	
    const product = products.find(p => p.name === productName);	
	//const { reviews, notaMedia, totalReviews } = await extraerReviewsInfo(product.idCrm);	
	//console.log(`Nota media: ${notaMedia}\nNúmero de reseñas: ${totalReviews}`);

	const notaMedia = product.notaMedia;
	const totalReviews = product.totalReviews;

    if (!product) {
        return "<p>Producto no encontrado</p>";
    }

    const oldPriceHTML = product.oldPrice ? `<span style="text-decoration: line-through;color: grey">${product.oldPrice}</span>` : '';
    const productDetailHTML = `
    <section class="product-detail section-padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-12">
                    <div class="product-thumb" style="text-align:center">
                        <img src="${product.imageSrc}" class="img-fluid product-image" alt="">
                    </div>
                </div>
            
                <div class="col-lg-6 col-12">
                    <div class="product-description mt-5 d-flex">
                        <div>
                            <h2 class="product-title mb-0">${product.name}</h2>
                            <p class="product-p">${product.productPageDescription}</p>
							<div class="rating-stars-container d-flex">
                                <div class="rating-stars" id="ratingStars"></div>
                                <span>(${totalReviews})</span>
                            </div>
                            <h5 style="margin-bottom: 20px;"><span class="precio">${product.price}</span><span class="precio" style="text-decoration: line-through;color: grey"> ${oldPriceHTML}</span></h5>
                        </div>
                    </div>
                    <div class="product-description">
                        <p class="lead mb-5">${product.longDescription}</p>
                    </div>
                    <div class="product-cart-thumb row">
                        <div class="col-lg-6 col-12">
                            <div class="number-field">
                                <button id="decrease">-</button>
                                <input type="text" id="cantidadCarrito" value="1" min="1">
                                <button id="increase">+</button>
                            </div>
                        </div>
                        <div class="col-lg-6 col-12 mt-4 mt-lg-0">
                            <button type="submit" id="addToCart" class="btn custom-btn cart-btn" data-precio="${product.price}" data-idprecio="${product.priceId}" data-producto="${product.name}" data-bs-toggle="modal" data-bs-target="">Añadir al carrito</button>
                        </div>
                        <script src="js/cart.js"></script>
                        <div style="border-bottom: 1px solid #ccc; padding-bottom: 10px; ">
                            <h6>
                                <a href="#" id="botonIncluye" class="product-additional-link">
                                    <i id="arrowBotonIncluye" class="material-icons">keyboard_arrow_down</i>
                                    Qué incluye
                                </a>

                            </h6>
                            <div id="incluye" style="display: none;">
                                <p>${product.incluye}</p>
                            </div>
                        </div>
                        <div style="border-bottom: 1px solid #ccc; padding-bottom: 10px; ">
                            <h6>
                                <a href="#" id="botonGastos" class="product-additional-link">
                                    <i id="arrowBotonGastos" class="material-icons">keyboard_arrow_down</i>
                                    Gastos de Envío
                                </a>
                            </h6>
                            <div id="gastos" style="display: none;">
                                <p>Los gastos de envío son GRATIS, aunque damos la opción de un envío express.</p>
                            </div>
                        </div>
                        <div style="border-bottom: 1px solid #ccc; padding-bottom: 10px; ">
                            <h6>
                                <a href="#" id="botonDevolver" class="product-additional-link">
                                    <i id="arrowBotonDevolver" class="material-icons">keyboard_arrow_down</i>
                                    Devoluciones
                                </a>
                            </h6>
                            <div id="devolver" style="display: none;">
                                <p>Si el yogur no te parece de calidad, te devuelvo el dinero, sin preguntas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;

    productHeader.insertAdjacentHTML('afterend', productDetailHTML);
	// Añadir las estrellas
    const starsContainer = document.getElementById('ratingStars');
    createStars(notaMedia, starsContainer);
	
    funcionalidadCampoCantidad(false);
    funcionalidadDetalles();
}
function funcionalidadDetalles() {
    const botonIncluye = document.getElementById('botonIncluye');
    const incluye = document.getElementById('incluye');
    botonIncluye.addEventListener('click', function () {
        const arrow = document.getElementById('arrowBotonIncluye');
        event.preventDefault();
        if (incluye.style.display === 'none' || incluye.style.display === '') {
            incluye.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)';
        } else {
            incluye.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)';
        }
    });
    const botonGastos = document.getElementById('botonGastos');
    const gastos = document.getElementById('gastos');
    botonGastos.addEventListener('click', function () {
        const arrow = document.getElementById('arrowBotonIncluye');
        event.preventDefault();
        if (gastos.style.display === 'none' || gastos.style.display === '') {
            gastos.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)';
        } else {
            gastos.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)';
        }
    });
    const botonDevolver = document.getElementById('botonDevolver');
    const devolver = document.getElementById('devolver');
    botonDevolver.addEventListener('click', function () {
        const arrow = document.getElementById('arrowBotonIncluye');
        event.preventDefault();
        if (devolver.style.display === 'none' || devolver.style.display === '') {
            devolver.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)';
        } else {
            devolver.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)';
        }
    });
}