const content = document.querySelector("#content")
const mainsearch = document.querySelector(".mainsearch")
const search = document.querySelector(".search");
const cartContent = document.querySelector("#cartContent");
const drop = document.querySelector("#drop");
const popularB = document.querySelector(".popular");
const newArrives = document.querySelector(".newArrives");
const limit = 30;
let page = 1;
const METHOD = 'POST';
const apiBook = "bookshelter-87e0a-default-rtdb.firebaseio.com/books";
const apiCart = "bookshelter-87e0a-default-rtdb.firebaseio.com/cart";
let books = [];
let cart = [];

function getData() {
  let result = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
  </div>`;
  fetch(`https://${apiBook}.json`)
    .then(r => {
      if (!r.ok) throw r;
      return r.json();
    }).then(r => {
      console.log(r);
      if (r === null) {
        content.innerHTML = "<h4>Oops! Database is empty</h4>";
      }
      else {
        let arr = Object.keys(r).map(item => {
          return { ...r[item], id: item }
        })
        books = [...arr];
        popular();
        newArriwes();
        render(arr);
      }
    }).catch(err => {
      console.log(err);
    })
  content.innerHTML = result;
}

getData();

function render(arr) {
  let result = ""
  arr.forEach(val => {
    result += `<div class="card" style="width: 15rem;">
    <div class="p-4">
      <img src="./img/book.png" class="card-img-top" alt="...">
    </div>
    <h5 class="card-title p-1">${val.title}</h5>
    <div class="d-flex justify-content-between p-2">
      <p class="card-price">$40.00</p>
      <span class="stars"><img src="/img/star.svg" alt="stars" width="95"></span>
    </div>
    <button type="button" onclick="AddCart('${val.id}')" class="btn btn-primary w-100 rounded-top mt-3 border-0" style="background-color: #FF4450;">Add to Cart</button>
  </div>`;
  })
  content.innerHTML = result;
}
function AddCart(elementid) {
  let book = books.find(val => val.id == elementid)
  const cart = {
    title: book.title,
    price: Math.random().toFixed(2) * 100,
  };
  fetch(`https://${apiCart}.json`, {
    method: METHOD,
    body: JSON.stringify(cart),
  }).then(response => {
    if (!response.ok) throw response;
    return response.json();
  }).catch(err => {
    console.log(err);
  })
}
drop.addEventListener('click', () => {
  let result = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
  </div>`;
  fetch(`https://${apiCart}.json`)
    .then(r => {
      if (!r.ok) throw r;
      return r.json();
    }).then(r => {
      console.log(r);
      if (r === null) {
        cartContent.innerHTML = "<h4>Oops! Database is empty</h4>";
      }
      else {
        let arr = Object.keys(r).map(item => {
          return { ...r[item], id: item }
        })
        cart = [...arr];
        drop.textContent = `Cart(${cart.length})`;
        renderCard(arr);

      }
    }).catch(err => {
      console.log(err);
    })
  cartContent.innerHTML = result;
})

function renderCard(arr) {
  let result = "";
  arr.forEach(val => {
    result += `<li><a class="dropdown-item" href="#">${val.title}</a></li>`
  })
  cartContent.innerHTML = result;
}

mainsearch.addEventListener('click', (e) => {
  e.preventDefault();
  let arr2 = books.filter(value => value.title.toLowerCase().includes(search.value.toLowerCase()))
  render(arr2);
})

function newArriwes() {
  let res = "";
  let i=books.length;
  while (i>books.length-3) {
    i--;
    res += `<div class="d-flex bg-white rounded-3 mt-3 p-1 gap-2" style="width: 300px;">
    <img src="./img/book.png" class="card-img-top w-25" alt="...">
    <div class="card-body">
      <h5 class="card-title">${books[i].title}</h5>
      <p class="card-text">Some quick </p>
    </div>
  </div>`;
  }
  newArrives.innerHTML = res;
}

function popular() {
  let res = "";
  let i=0;
  while (i<3) {
    i++;
    res += `<div class="d-flex bg-white rounded-3 mt-3 p-1 gap-2" style="width: 300px;">
    <img src="./img/book.png" class="card-img-top w-25" alt="...">
    <div class="card-body">
      <h5 class="card-title">${books[i].title}</h5>
      <p class="card-text">Some quick </p>
    </div>
  </div>`;
  }
  
  popularB.innerHTML = res;
}