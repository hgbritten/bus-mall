'use strict'

// Model the idea of a Product

// const allProducts = []; replaced by Product.all = [];

function Product(name, imgUrl) {
    this.name = name;
    this.imgUrl = imgUrl;
    this.likes = 0; // incrementing this.likes
    Product.all.push(this);
}

Product.all = [];

let leftProduct = null;
let middleProduct = null;
let rightProduct = null;

function pickNewProduct() {
    roundCtr += 1;
    // TODO pick randomly
    leftProduct = Product.all[1];
    middleProduct = Product.all[9];
    rightProduct = Product.all[0];
    renderProducts();
}

function renderProducts() {

    const leftProductImgElem = document.getElementById('left-product-img');

    leftProductImgElem.src = leftProduct.imgUrl;
    leftProductImgElem.alt = leftProduct.name;

    const leftProductNameElem = document.getElementById('left-product-h2');

    leftProductNameElem.textContent = leftProduct.name;

    const rightProductImgElem = document.getElementById('right-product-img');

    rightProductImgElem.src = rightProduct.imgUrl;
    rightProductImgElem.alt = rightProduct.name;

    const rightProductNameElem = document.getElementById('right-product-h2');

    rightProductNameElem.textContent = rightProduct.name;

    const middleProductImgElem = document.getElementById('middle-product-img');

    middleProductImgElem.src = middleProduct.imgUrl;
    middleProductImgElem.alt = middleProduct.name;

    const middleProductNameElem = document.getElementById('middle-product-h2');

    middleProductNameElem.textContent = middleProduct.name;
}


const ROUND_LIMIT = 25;
let roundCtr = 0;

//Create the Products
new Product('R2D2 Bag', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
new Product('Bathroom', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast', 'img/breakfast.jpg');
new Product('Bubblegum', 'img/bubblegum.jpg');
new Product('Chair', 'img/chair.jpg');
new Product('Cthulhu', 'img/cthulhu.jpg');
new Product('Dog-duck', 'img/dog-duck.jpg');
new Product('Dragon', 'img/dragon.jpg');
new Product('Pen', 'img/pen.jpg');
new Product('Pet-sweep', 'img/chair.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Sweep', 'img/sweep.jpg');
new Product('Tauntuan', 'img/tauntuan.jpg');
new Product('Unicorn', 'img/unicorn.jpg');
new Product('USB', 'img/usb.gif');
new Product('Water-can', 'img/water-can.jpg');
new Product('Wine-glass', 'img/wine-glass.jpg');


const productPicsElem = document.getElementById('product-pics');
productPicsElem.addEventListener('click', handleClickOnProduct);

function handleClickOnProduct(event) {
    // alert(event.target.id);
    if (event.target.id === 'left-product-img') {
        leftProduct.likes += 1;
    } else if (event.target.id === 'right-product-img') {
        rightProduct.likes += 1;
    } else if (event.target.id === 'middle-product-img') {
        middleProduct.likes += 1;
    }
    if (roundCtr === ROUND_LIMIT) {
        alert('done');
        productPicsElem.removeEventListener('click', handleClickOnProduct);
    } else {
        pickNewProduct();
    }
}

pickNewProduct();
