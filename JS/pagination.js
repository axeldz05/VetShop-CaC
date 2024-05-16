document.addEventListener('DOMContentLoaded', function() {
    const content = document.querySelector('.products');
    const itemsPerPage = 5;
    let currentPage = 0;
    const items = Array.from(content.getElementsByClassName('product'));
    function showPage(page) {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        items.forEach((item, index) => {
            item.classList.toggle('hidden', index < startIndex || index >= endIndex);
        });
    }
    updateActiveButtonStates();
    function createPageButtons() {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        const paginationContainer = document.createElement('div');
        const paginationDiv = document.body.appendChild(paginationContainer);
        paginationContainer.classList.add('pagination');
        for (let i = 0; i < totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i + 1;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                showPage(currentPage);
                updateActiveButtonStates();
            });
            content.appendChild(paginationContainer);
            paginationDiv.appendChild(pageButton);
        }
    }
    function updateActiveButtonStates() {
        const pageButtons = document.querySelectorAll('.pagination button');
        pageButtons.forEach((button, index) => {
            if (index === currentPage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    createPageButtons();
    showPage(currentPage);
})

function filtrarProductos(categoria) {
    var productos = document.querySelectorAll('.product');

    productos.forEach(function(producto) {
        var categoriaProducto = producto.getAttribute('data-categoria');
        if (categoria === 'todos' || categoriaProducto === categoria) {
            producto.classList.remove('hidden');
        } else {
            producto.classList.add('hidden');
        }
    });
}

document.getElementById('categoria').addEventListener('change', function() {
    var categoriaSeleccionada = this.value;
    filtrarProductos(categoriaSeleccionada);
});

filtrarProductos('todos');