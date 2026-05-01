const productContainer = document.querySelector('#productContainer');
const products = Array.from(document.querySelectorAll('.product'));
const categoryCheckboxes = Array.from(document.querySelectorAll('.category-checkbox'));
const sortSelect = document.querySelector('#sortSelect');

function updateProducts() {
    const selected = new Set(
        categoryCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
    );
    const showAll = selected.size === 0;
    const sortValue = sortSelect.value;
    const visibleProducts = [];

    products.forEach(product => {
        const isVisible = showAll || selected.has(product.dataset.category);
        product.style.display = isVisible ? 'block' : 'none';
        if (isVisible) visibleProducts.push(product);
    });

    if (sortValue === 'price') {
        visibleProducts.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    } else if (sortValue === 'rating') {
        visibleProducts.sort((a, b) => Number(b.dataset.rating) - Number(a.dataset.rating));
    }

    visibleProducts.forEach(product => productContainer.appendChild(product));
}

categoryCheckboxes.forEach(checkbox => checkbox.addEventListener('change', updateProducts));
sortSelect.addEventListener('change', updateProducts);
updateProducts();