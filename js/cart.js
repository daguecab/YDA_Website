// Evento de clic en el botón "Añadir al carrito". Como se llama desde varios html, ChatGPT dice de usar un foreach. Comprobar con console
var addToCartButtons = document.querySelectorAll('.cart-btn');
console.log(addToCartButtons.length);
addToCartButtons.forEach(button => {
    console.log("Entro ");
    button.addEventListener('click', function() {
        console.log("concha");
        var producto = button.dataset.producto;
        console.log(button.parentNode.parentNode.nodeName);
        var selectedOption = button.parentNode.parentNode.querySelector('#quantity').value;

        if (selectedOption === 'Cantidad') {
            alert('Selecciona una cantidad válida para agregar al carrito.');
        } else {
            agregarAlCarrito(producto, parseInt(selectedOption));
            $('#cart-modal').modal('show');
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

// Función para cargar los productos desde el archivo JSON
function loadProducts(category) {
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

function generateProductHTML(product) {
    return `
        <div class="col-lg-4 col-12 mb-3">
            <div class="product-thumb">
                <a href="bulgaro-detail.html">
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
                    <small class="product-price text-muted ms-auto mt-auto mb-5">${product.price}</small>
                </div>
            </div>
        </div>
    `;
}