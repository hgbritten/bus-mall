'use strict'

// with help from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array and https://javascript.info/task/shuffle and https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp 

// Also with help from the demo class 12

// Model the idea of a Product

// const allProducts = []; replaced by Product.all = [];

function showResults() {
    let x = document.getElementById("product-clicks");
    if (x.style.display === 'block') {
        x.style.display = 'none';
    } else {
        x.style.display = 'block';
    }
}

function Product(name, imgUrl) {
    this.name = name;
    this.imgUrl = imgUrl;
    this.likes = 0; // incrementing this.likes
    this.timesSeen = 0;
    // this.lastSeen = false;
    Product.all.push(this);
}

function renderLikes() {
    const likesListElem = document.getElementById('product-clicks');
    likesListElem.innerHTML = '';
    for (let i = 0; i < Product.all.length; i++) {
        const productPicture = Product.all[i];
        const productItemElem = document.createElement('li');
        likesListElem.appendChild(productItemElem);
        productItemElem.textContent = productPicture.name + ' : ' + productPicture.likes + ', times seen :' + productPicture.timesSeen;
    }
}



// object is a container of properties (variables). They can contain strings, numbers, arrays, other objects, etc.

Product.all = [];

let leftProduct = null;
let middleProduct = null;
let rightProduct = null;

function pickNewProduct() {

    const prevLeft = leftProduct;
    const prevRight = rightProduct;
    const prevMiddle = middleProduct;

    shuffle(Product.all);

    for (let product of Product.all) {
        if (product !== prevLeft && product !== prevRight && product !== prevMiddle) {
            leftProduct = product;
            break;
        }
    }

    for (let product of Product.all) {
        if (product !== prevLeft && product !== prevRight && product !== prevMiddle && product !== leftProduct) {
            rightProduct = product;
            break;
        }
    }

    for (let product of Product.all) {
        if (product !== prevLeft && product !== prevRight && product !== prevMiddle && product !== leftProduct && product !== rightProduct) {
            middleProduct = product;
            break;
        }
    }

    renderProducts();
}

// function pickNewProduct() {
//     roundCtr += 1;
//     // TODO pick randomly

//     let arrayShuffle = shuffle(Product.all);
//     console.log(arrayShuffle);
//     leftProduct = arrayShuffle[0];

//     // while (thing[0] === leftProduct)

//     middleProduct = arrayShuffle[1];
//     rightProduct = arrayShuffle[2];
//     renderProducts();
// }

// let totalLikes = shuffle();

// let R2D2 = new Product();

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
new Product('Pet-sweep', 'img/pet-sweep.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Sweep', 'img/sweep.png');
new Product('Tauntaun', 'img/tauntaun.jpg');
new Product('Unicorn', 'img/unicorn.jpg');
new Product('USB', 'img/usb.gif');
new Product('Water-can', 'img/water-can.jpg');
new Product('Wine-glass', 'img/wine-glass.jpg');

const handleClickOnProduct = function (event) {
    // alert(event.target.id); - target is what triggered the event - not always what the event listener is listening to - current target 

    if (roundCtr < ROUND_LIMIT) {
        const thingWeLiked = event.target;
        const id = thingWeLiked.id;


        if (id === 'left-product-img' || id === 'middle-product-img' || id === 'right-product-img') {

            if (id === 'left-product-img') {
                leftProduct.likes += 1;
            } else if (id === 'right-product-img') {
                rightProduct.likes += 1;
            } else {
                middleProduct.likes += 1;
            }

            leftProduct.timesSeen += 1;
            rightProduct.timesSeen += 1;
            middleProduct.timesSeen += 1;

        }
    }

    roundCtr += 1;

    if (roundCtr < ROUND_LIMIT) {


        pickNewProduct();
    } else {
        productPicsElem.removeEventListener('click', handleClickOnProduct);
        alert('Thank you for clicking so fast.');
        renderLikes();
        makeAProductChart();
        makeAProductChart2();
    }
}

const productPicsElem = document.getElementById('product-pics');
productPicsElem.addEventListener('click', handleClickOnProduct);




function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

// console.log(Chart);
function makeAProductChart() {

    const productNamesArray = [];
    const productLikesArray = [];

    // refactoring opportunity?
    for (let product of Product.all) {
        productNamesArray.push(product.name);
        productLikesArray.push(product.likes);
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    const productChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: productNamesArray,
            datasets: [{
                label: 'Product Likes',
                backgroundColor: 'rgb(0, 0, 500)',
                borderColor: 'rgb(0, 0, 132)',
                data: productLikesArray
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function makeAProductChart2() {

    const productNamesArray = [];
    const productLikesArray = [];

    // refactoring opportunity?
    for (let product of Product.all) {
        productNamesArray.push(product.name);
        productLikesArray.push(product.likes);
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    const productChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',

        // The data for our dataset
        data: {
            labels: productNamesArray,
            datasets: [{
                label: 'Product Likes',
                backgroundColor: 'rgb(0, 0, 500)',
                borderColor: 'rgb(0, 0, 132)',
                data: productLikesArray
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


// shuffle(Product.all);

// function shuffle(array) {
//     let currentIndex = array.length, temporaryValue, randomIndex;
//     console.log(currentIndex);
//     while (0 !== currentIndex) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;

//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     let tempArray = [];
//     for (let i = 0; i < array.length && tempArray.length < 3; i++) {
//         console.log(array[i]);
//         if (array[i].lastSeen === false) {
//             tempArray.push(array[i]);
//         }
//     }

//     for (let j = 0; j < array.length; j++) {
//         array[j].lastSeen = false;
//     }
//     console.log(array);
//     for (let k = 0; k < tempArray.length; k++) {
//         array[k].lastSeen = true;
//     }

//     return tempArray;
// }

shuffle(Product.all);

pickNewProduct();
