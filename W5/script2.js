const productContainer = document.querySelector('#productContainer');
const products = Array.from(document.querySelectorAll('.product'));
const categories = Array.from(document.querySelectorAll('.category-checkbox'));
const sortSelect = document.querySelector('#sortSelect');


function updateProducts(){
    //no suggestion for the word "checked"
    const selectedCategories = new Set(categories.filter(category => category.checked).map(category => category.value));

    const showAll = selectedCategories.size === 0;

    const visibleProducts = [];

    products.forEach(product => {
        const isVisible = showAll || selectedCategories.has(product.dataset.category);
        //display = 'block' -> Product appears on screen. It behaves like a normal block element
        //display = 'none' -> Product is completely removed from layout. It’s like it doesn’t exist in the DOM visually
        product.style.display = isVisible ? 'block' : 'none';
        if(isVisible) visibleProducts.push(product);
    });

    //sorting part
    if(sortSelect.value === 'price'){
        visibleProducts.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    }
    else if(sortSelect.value === 'rating'){
        visibleProducts.sort((a, b) => Number(b.dataset.rating) - Number(a.dataset.rating));
    }

    
    visibleProducts.forEach(product => productContainer.appendChild(product));


}

categories.forEach(category => category.addEventListener('change', updateProducts));
sortSelect.addEventListener('change', updateProducts);
updateProducts();
