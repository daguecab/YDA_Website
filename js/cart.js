var subtotal = 0;

// Evento de clic en el botón "Añadir al carrito". Como se llama desde varios html, ChatGPT dice de usar un foreach. Comprobar con console
var addToCartButtons = document.querySelectorAll('.cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        var producto = button.dataset.producto;
        var selectedOption = button.parentNode.parentNode.querySelector('#quantity').value;

        if (selectedOption === 'Cantidad') {
            alert('Selecciona una cantidad válida para agregar al carrito.');
        } else {
            agregarAlCarrito(producto, parseInt(selectedOption));
            alert('Se ha añadido el ' + producto + ' correctamente a la cesta');
            //localStorage.setItem('productoReciente', JSON.stringify({ producto: producto, cantidad: cantidad }));
            //$('#cart-modal').modal('show');
        }
    });
});

// Función para agregar al carrito
function agregarAlCarrito(producto, cantidad) {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    var productoEnCarrito = carrito.find(item => item.producto === producto);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
    } else {
        carrito.push({ producto: producto, cantidad: cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar y mostrar el contenido del carrito desde localStorage
function mostrarCarrito() {
    // Obtén los productos del carrito desde el localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verifica si el carrito está vacío
    if (carrito.length === 0) {
        console.log("El carrito está vacío.");
        return;
    }

    // Carga los productos de manera asíncrona desde products.json utilizando fetch
    fetch("productos.json")
        .then(response => response.json())
        .then(products => {
            //Variable para hacer la suma
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
                        <tbody>
                            ${carrito.map(item => {
                                // Busca el producto correspondiente en products.json por el nombre
                                const product = products.find(p => p.name === item.producto);
                                // Elimina el símbolo € y convierte el precio por unidad a número
                                const precioUnidad = parseFloat(product.price.replace('€', '').trim());
                                const totalProducto = product.price * item.cantidad;
                                subtotal += totalProducto;
                                return `
                                    <tr>
                                        <td class="product-details">
                                            <img width=128px src="${product.imageSrc}" alt="${item.producto}" class="product-image product-thumb">
                                        <div style="margin-left:5%">
                                            <p class="carrito-nombre-producto">${item.producto}</p>
                                            <p class="carrito-precio-unitario">${product.price}</p>
                                        </div>
                                        <td class="carrito-cantidad">
                                            
                                        <div class="number-field">
                                            <button id="decrease">-</button>
                                            <input type="text" id="cantidadCarrito" value="${item.cantidad}" min="1">
                                            <button id="increase">+</button>
                                        </div>
                                        </td>
                                        <td class="carrito-producto-total">
                                            ${totalProducto.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                    <div class="subtotal">
                        <p id="subtotalField"><b>Subtotal:</b> ${subtotal.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</p>
                        <p><b>¡Envío Gratis! </b></p>
                    </div>
                    <p class="total" id="totalField"><b>Total:<b> ${subtotal.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</p>
                    
                    <button class="btn-comprar">Comprar</button>
                </div>
            `;
            // Inserta el contenido del carrito después del div con la clase "carritoCompra"
            const carritoCompraDiv = document.querySelector(".carritoCompra");
            carritoCompraDiv.insertAdjacentHTML("afterend", carritoHTML);
            addCampoCantidadFunc();
        })
        .catch(error => {
            console.error("Error al cargar productos:", error);
        });
}

function addCampoCantidadFunc() {
    const decreaseButtons = document.querySelectorAll('#decrease');
    const increaseButtons = document.querySelectorAll('#increase');
    const numberFields = document.querySelectorAll('#cantidadCarrito');

    // Agregar eventos de clic a los botones de incremento y decremento
    for (let i = 0; i < decreaseButtons.length; i++) {
        const producto = document.querySelectorAll('.carrito-nombre-producto')[i];
        decreaseButtons[i].addEventListener('click', function () {
            let currentValue = parseInt(numberFields[i].value, 10);
            if (currentValue > 1) {
                numberFields[i].value = currentValue - 1;
                recalculateTotalProduct(i,numberFields, -1);
                recalculateTotals();
                updateLocalStorage(i, numberFields[i].value);
            }
        });

        increaseButtons[i].addEventListener('click', function () {
            let currentValue = parseInt(numberFields[i].value, 10);
            numberFields[i].value = currentValue + 1;
            recalculateTotalProduct(i,numberFields,1);
            recalculateTotals();
            updateLocalStorage(i, numberFields[i].value);
        });
    }
}
// Función para recalcular los totales
function recalculateTotals() {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  
    // Actualizar los elementos en el HTML
    document.querySelector('#subtotalField').innerText = 'Subtotal: ' + subtotal.toFixed(2) + '€';
    document.querySelector('#totalField').innerText = 'Total: ' + subtotal.toFixed(2) + '€';
}


function recalculateTotalProduct(index,numberFields,multiploSubtotal) {
    const precioUnitario = parseFloat(document.querySelectorAll('.carrito-precio-unitario')[index].innerText.replace('$', '').trim());
    const totalFields = document.querySelectorAll('.carrito-producto-total');
    const cantidad = parseInt(numberFields[index].value, 10);
    const total = precioUnitario * cantidad;
    totalFields[index].innerText = total.toFixed(2);
    subtotal = subtotal + (precioUnitario * multiploSubtotal);
}

function updateLocalStorage(index, newCantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito[index].cantidad = newCantidad;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function generateProductHTML(product) {
    let priceHTML = `<h6 style="color:black !important;" class="product-price text-muted ms-auto mt-auto mb-5">${product.price}</h6>`;
    
    if (product.oldPrice) {
        priceHTML = `
            <h6 class="product-price text-muted ms-auto mt-auto mb-5"><del>${product.oldPrice}</del></h6>
            <h6 style="color:black !important;margin-left:5px;" class="product-price text-muted mt-auto mb-5"><b>${product.price}</b></h6>
        `;
    }

    return `
        <div class="col-lg-4 col-12 mb-3">
            <div class="product-thumb">
                <a href="${product.productLink}">
                    <img src="${product.imageSrc}" class="img-fluid product-image" alt="">
                </a>

                <div class="product-top d-flex">
                    ${product.isNew ? '<span class="product-alert me-auto">Nuevo</span>' : ''}
                </div>

                <div class="product-info d-flex">
                    <div>
                        <h5 class="product-title mb-0">
                            <a href="product-detail.html" class="product-title-link">${product.name}</a>
                        </h5>
                        <p class="product-p">${product.description}</p>
                    </div>
                    ${priceHTML}
                </div>
            </div>
        </div>
    `;
}

function loadProducts(category) {
    // Carga los productos de manera asíncrona desde products.json utilizando fetch
    fetch("productos.json")
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById("product-container");
            // Filtrar productos por categoría
            const filteredProducts = category
                ? products.filter(product => product.category === category)
                : products;

            filteredProducts.forEach(product => {
                const productHTML = generateProductHTML(product);
                productContainer.insertAdjacentHTML("afterend", productHTML);
            });
        })
        .catch(error => console.error("Error al cargar los productos:", error));
}

// Función para generar el HTML de los detalles del producto
async function generateProductDetailHTML(productName) {
    const product = products.find(p => p.name === productName);

    if (!product) {
        return "<p>Producto no encontrado</p>";
    }

    const oldPriceHTML = product.oldPrice ? `<span style="text-decoration: line-through;color: grey">${product.oldPrice}</span>` : '';
    const productDetailHTML = `
        <section class="product-detail section-padding2">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-12">
                        <div class="product-thumb">
                            <img src="${product.imageSrc}" class="img-fluid product-image" alt="">
                        </div>
                    </div>
                    <div class="col-lg-6 col-12">
                        <div class="product-info d-flex">
                            <div>
                                <h2 class="product-title mb-0">${product.name}</h2>
                                <p class="product-p">${product.description}</p>
                                <h5 style="margin-bottom: 20px;">${product.price}${oldPriceHTML}</h5>
                            </div>
                        </div>
                        <div class="product-description">
                            <p class="lead mb-5">${product.longDescription}</p>
                        </div>
                        <div class="product-cart-thumb row">
                            <div class="col-lg-6 col-12">
                                <select class="form-select cart-form-select" id="quantity">
                                    <option value="Cantidad" disabled selected>Cantidad</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <script>
                                    const dropdown = document.getElementById('quantity');
                                    dropdown.addEventListener('change', function() {
                                      this.style.color = this.value === 'Cantidad' ? 'gray' : 'black';
                                    });
                                </script>
                            </div>
                            <div class="col-lg-6 col-12 mt-4 mt-lg-0">
                                <button type="submit" id="addToCart" class="btn custom-btn cart-btn" data-producto="${product.name}" data-bs-toggle="modal" data-bs-target="">Añadir al carrito</button>
                            </div>
                            <script src="js/cart.js"></script>
                            <p>
                                <a href="#" class="product-additional-link">Details</a>
                                <a href="#" class="product-additional-link">Delivery and Payment</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    return productDetailHTML;
}
