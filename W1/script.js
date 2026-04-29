// Sample product data (add more than 10 to test pagination)
const products = [
    { name: "Wireless Headphones", price: "7,999", desc: "Noise-cancelling headphones.", img: "https://via.placeholder.com/80" },
    { name: "Smartwatch", price: "12,999", desc: "Fitness tracking smartwatch.", img: "https://via.placeholder.com/80" },
    { name: "Gaming Mouse", price: "2,499", desc: "Ergonomic gaming mouse.", img: "https://via.placeholder.com/80" },
    { name: "Laptop Stand", price: "1,999", desc: "Adjustable stand.", img: "https://via.placeholder.com/80" },
    { name: "Keyboard", price: "3,499", desc: "Mechanical keyboard.", img: "https://via.placeholder.com/80" },
    { name: "Monitor", price: "15,999", desc: "Full HD monitor.", img: "https://via.placeholder.com/80" },
    { name: "Speaker", price: "4,999", desc: "Bluetooth speaker.", img: "https://via.placeholder.com/80" },
    { name: "USB Hub", price: "999", desc: "Multi-port hub.", img: "https://via.placeholder.com/80" },
    { name: "Webcam", price: "2,999", desc: "HD webcam.", img: "https://via.placeholder.com/80" },
    { name: "Power Bank", price: "1,499", desc: "10000mAh battery.", img: "https://via.placeholder.com/80" },
    { name: "Tablet", price: "18,999", desc: "Android tablet.", img: "https://via.placeholder.com/80" },
    { name: "Charger", price: "799", desc: "Fast charger.", img: "https://via.placeholder.com/80" }
];

let currentPage = 1;
const itemsPerPage = 10;

function displayProducts() {
    const tableBody = document.querySelector("#productTable tbody");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = products.slice(start, end);

    pageItems.forEach(p => {
        const row = `
            <tr>
                <td><img src="${p.img}"></td>
                <td>${p.name}</td>
                <td>₹${p.price}</td>
                <td>${p.desc}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    document.getElementById("pageInfo").innerText =
        `Page ${currentPage} of ${Math.ceil(products.length / itemsPerPage)}`;
}

function nextPage() {
    if (currentPage < Math.ceil(products.length / itemsPerPage)) {
        currentPage++;
        displayProducts();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
}

// Initial load
displayProducts();