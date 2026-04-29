const products = [
    {img: "img1.jpg", name: "name1", price: "price1", desc: "desc1"},
    {img: "img2.jpg", name: "name2", price: "price2", desc: "desc2"},
    {img: "img3.jpg", name: "name3", price: "price3", desc: "desc3"},
    {img: "img4.jpg", name: "name4", price: "price4", desc: "desc4"},
    {img: "link5", name: "name5", price: "price5", desc: "desc5"},
    {img: "link6", name: "name6", price: "price6", desc: "desc6"},
    {img: "link7", name: "name7", price: "price7", desc: "desc7"},
    {img: "link8", name: "name8", price: "price8", desc: "desc8"},
    {img: "link9", name: "name9", price: "price9", desc: "desc9"},
    {img: "link10", name: "name10", price: "price10", desc: "desc10"},
    {img: "link11", name: "name11", price: "price11", desc: "desc11"},
    {img: "img5.jpg", name: "name12", price: "price12", desc: "desc12"},
];

let currentPage = 1;
const itemsperpage = 10;

function displayProducts(){

    let start = (currentPage - 1) * itemsperpage;
    let end = start + itemsperpage;
    let selectedproducts = products.slice(start, end);

    let tableBody = document.querySelector("#productTable tbody");
    tableBody.innerHTML = "";


    selectedproducts.forEach(p => {
        const row = `
            <tr>
                <td><img src="${p.img}"></td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.desc}</td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });

    document.getElementById("pageInfo").innerText = `Page ${currentPage} of ${Math.ceil(products.length / itemsperpage)}`;


};

function prevPage(){
    if(currentPage > 1){
        currentPage--;
        displayProducts();
    }
}

function nextPage(){
    if(currentPage < (Math.ceil(products.length / itemsperpage))){
        currentPage++;
        displayProducts();
    }
}

displayProducts();