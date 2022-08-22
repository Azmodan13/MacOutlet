function create(name) {
  return document.createElement(name);
}


const colMain = document.querySelector(".col-main");
const main = document.querySelector(".main");

//* Create product items
function createProduct(id, imgUrl, Name, inStock, price, reviews, orders) {
  const item = create("div");
  item.className = "items";
  item.setAttribute("item-id", id);

  const like = create("img");
  like.className = "like";
  like.src = "/img/icons/like_empty.svg";
  like.alt = "like";

  const productImg = create("img");
  productImg.className = "product_img";
  productImg.src = `/img/${imgUrl}`;

  const productName = create("div");
  productName.className = "product_name";
  productName.innerText = Name;

  const remainder = create("div");
  remainder.className = "remainder";

  const check = create("img");
  check.className = "check";
  if (inStock <= 0) {
    check.src = "/img/icons/close.svg";
  } else {
    check.src = "/img/icons/check.svg";
  }

  const left = create("span");
  left.className = "left";
  left.innerText = `${inStock} left in strock`;

  const productprice = create("div");
  productprice.className = "price";
  productprice.innerText = `Price:${price} $`;

  const btn = create("button");
  btn.className = "btn";
  btn.innerText = "Add to cart";
  if (inStock <= 0) {
    btn.classList.add("inactive");
  }

  const productReviews = create("div");
  productReviews.className = "reviews";

  const reviewsLike = create("img");
  reviewsLike.className = "reviews__like";
  reviewsLike.src = "/img/icons/like_filled.svg";

  const reviewsHolder = create("div");
  reviewsHolder.className = "reviews_holder";

  const reviewsSum = create("div");
  reviewsSum.className = "reviews__sum";
  reviewsSum.innerText = orders;

  const span = create("span");
  span.innerText = reviews;

  const reviewsGrade = create("div");
  reviewsGrade.className = "reviews__grade";
  reviewsGrade.innerText = "% Positive reviews";

  const reviewsPositiv = create("div");
  reviewsPositiv.className = "reviews__grade";
  reviewsPositiv.innerText = "Above avarage";

  const order = create("div");
  order.className = "order";

  const orderSum = create("div");
  orderSum.className = "order__sum";
  orderSum.innerText = "";

  const orderSpan = create("span");
  orderSpan.innerText = "orders";

  colMain.append(item);
  item.append(
    like,
    productImg,
    productName,
    remainder,
    productprice,
    btn,
    productReviews
  );
  remainder.append(check, left);
  productReviews.append(reviewsLike, reviewsHolder, order);
  reviewsHolder.append(reviewsGrade, reviewsPositiv);
  order.append(orderSum, reviewsSum);
  orderSum.append(orderSpan);
  reviewsGrade.append(span);
}

//* create search

const input = document.querySelector(".input__text");
const searchContent = document.querySelector(".search-content");

input.addEventListener("keyup", function () {
  const item = document.querySelectorAll(".items");
  searchContent.querySelectorAll(".search-item").forEach((e) => e.remove());
  item.forEach((e) => e.remove());

  for (const el of items) {
    if (
      el.name.toLowerCase().startsWith(input.value.toLowerCase()) === true &&
      input.value !== ""
    ) {
      searchContent.classList.add("search-active");
      let li = create("li");
      li.className = "search-item";
      li.innerText = el.name;
      searchContent.append(li);
      createProduct(
        el.id,
        el.imgUrl,
        el.name,
        el.orderInfo.inStock,
        el.price,
        el.orderInfo.reviews,
        el.orderInfo.orders
      );
    }

    if (input.value == "") {
      createProduct(
        el.id,
        el.imgUrl,
        el.name,
        el.orderInfo.inStock,
        el.price,
        el.orderInfo.reviews,
        el.orderInfo.orders
      );
      searchContent.classList.remove("search-active");
    }
  }
});

searchContent.addEventListener("click", (event) => {
  input.value = event.target.innerText;
  searchContent.classList.remove("search-active");
  document.querySelectorAll(".items").forEach((e) => e.remove());
  for (const el of items) {
    if (el.name == input.value) {
      createProduct(
        el.id,
        el.imgUrl,
        el.name,
        el.orderInfo.inStock,
        el.price,
        el.orderInfo.reviews,
        el.orderInfo.orders
      );
    }
  }
});
document.body.addEventListener("click", () => {
  searchContent.classList.remove("search-active");
});

//* Filter bar

const filterTitle = document.getElementsByClassName("filter-title");

Array.from(filterTitle, (el) =>
  el.addEventListener("click", function () {
    this.querySelector(".filter-icon").classList.toggle("filter-icon-active");
    this.nextElementSibling.classList.toggle("active");
    this.parentNode.classList.toggle("filter-card-active");
  })
);

//* create modal
function createModal(
  imgUrl,
  name,
  reviews,
  color,
  operating,
  height,
  width,
  depth,
  weight,
  chip,
  left,
  price,
  id
) {
  const picture = document.getElementsByClassName("modal__img-picture");
  picture[0].src = `/img/${imgUrl}`;
  const productName = document.getElementsByClassName("modal__name");
  productName[0].innerText = name;
  const positiveReviews = document.getElementsByClassName("positive");
  positiveReviews[0].innerText = reviews;
  document.getElementById("color").innerText = color.join(", ");
  document.getElementById("operating").innerText = operating;
  document.getElementById("height").innerText = height;
  document.getElementById("width").innerText = width;
  document.getElementById("depth").innerText = depth;
  document.getElementById("weight").innerText = weight;
  document.getElementById("chip").innerText = chip;
  document.getElementById("left").innerText = left;
  document.querySelector('.modal__to-buy').setAttribute("item-id", id);
  if (left <= 0) {
    document.querySelector('.modal__to-buy').querySelector('.btn').classList.add("inactive");
  } else {
    document.querySelector('.modal__to-buy').querySelector('.btn').classList.remove("inactive");

  }
  const modalPrice = document.getElementsByClassName("modal__price");
  modalPrice[0].innerText = `$ ${price}`;
}

//* modal, opan, close

document.querySelector(".col-main").addEventListener("click", (event) => {
  let id;
  if (
    event.target.className === "items" ||
    event.target.className === "product_img"
  ) {
    id = event.target.getAttribute("item-id");

    if (id === null) {
      id = event.target.parentNode.getAttribute("item-id");
    }
    for (const i of items) {
      if (i.id == id) {
        createModal(
          i.imgUrl,
          i.name,
          i.orderInfo.reviews,
          i.color,
          i.os,
          i.size.height,
          i.size.weight,
          i.size.depth,
          i.size.weight,
          i.chip.name,
          i.orderInfo.inStock,
          i.price,
          i.id
        );
      }
    }
    document.querySelector(".backgroundModal").classList.add("open");
  }
});
document.querySelector(".backgroundModal").addEventListener("click", (el) => {
  el.target.classList.remove("open");
});

//* filter


document.querySelector("#filters").addEventListener("input", AsideFilter);

function AsideFilter() {
  colMain.innerHTML = null;

  const priceFromFiltersWrapper = document.querySelector('#price-min').value;
  const priceToFiltersWrapper = document.querySelector("#price-max").value;
  const colorFiltersWrapper = document.querySelector("#colors");
  const memoryFiltersWrapper = document.querySelector("#memory");
  const osFiltersWrapper = document.querySelector("#os");
  const displayFiltersWrapper = document.querySelector("#display");

  // * Фильтр цены

  const filteredItemsWithPrice =
    priceFromFiltersWrapper.length > 0 && priceToFiltersWrapper.length > 0 ?
    items.filter((el) => {
      if (el.price > Number(priceFromFiltersWrapper) && el.price < Number(priceToFiltersWrapper)) {
        return true
      }

    }) : items



  const selectedColors = [
    ...colorFiltersWrapper.querySelectorAll(".checkbox input:checked"),
  ].map((n) => n.value); //* получаем отмеченые чекбоксы



  // * Фильтр цвета


  const filteredItemsWithColors =
    selectedColors.length > 0 ?
    filteredItemsWithPrice.filter((el) => {
      const intersection = el.color.filter((color) => {
        return selectedColors.includes(color)
      })
      if (intersection.length) {
        return true
      }
    }) : filteredItemsWithPrice


  // * Фильтр накопителя

  const selectedMemory = [
    ...memoryFiltersWrapper.querySelectorAll("#memory input:checked"),
  ].map((n) => Number(n.value));


  const filteredItemsAfterMemory =
    selectedMemory.length > 0 ?
    filteredItemsWithColors.filter((el) => {
      return selectedMemory.includes(el.storage)
    }) : filteredItemsWithColors;



  // * Фильтр ОС

  const selectedOs = [
    ...osFiltersWrapper.querySelectorAll("#os input:checked"),
  ].map((n) => n.value);


  const filtredItemsAfterOs = selectedOs.length > 0 ?
    filteredItemsAfterMemory.filter(el => {
      return selectedOs.includes(el.os)
    }) : filteredItemsAfterMemory

  // * Фильтр дисплея


  const DISPLAY_INCHES = {
    "2-5inch": {
      lowerValue: 2,
      higherValue: 5,
    },
    "5-7inch": {
      lowerValue: 5,
      higherValue: 7,
    },
    "7-12inch": {
      lowerValue: 7,
      higherValue: 12,
    },
    "12-16inch": {
      lowerValue: 12,
      higherValue: 16,
    },
    "16inch": {
      lowerValue: 16,
      higherValue: 20,
    },
  };

  const selectedDisplay = [
    ...displayFiltersWrapper.querySelectorAll("#display input:checked"),
  ].map(input => DISPLAY_INCHES[input.value])




  const filtredItemsAfterDisplay = selectedDisplay.length > 0 ?
    filtredItemsAfterOs.filter((el) => {
      return selectedDisplay.filter((dis) => {
        if (el.display > dis.lowerValue && el.display < dis.higherValue) {
          return true
        }
      }).length
    }) : filtredItemsAfterOs


  for (item of filtredItemsAfterDisplay) {
    createProduct(
      item.id,
      item.imgUrl,
      item.name,
      item.orderInfo.inStock,
      item.price,
      item.orderInfo.reviews,
      el.orderInfo.orders
    );
  }
}

for (el of items) {
  createProduct(
    el.id,
    el.imgUrl,
    el.name,
    el.orderInfo.inStock,
    el.price,
    el.orderInfo.reviews,
    el.orderInfo.orders
  );
}

document.querySelector('.serch__seting').addEventListener('click', () => {
  document.querySelector('.serch__seting').classList.toggle('serch__seting-active')
  document.querySelector('.order-search').classList.toggle('search-active')
  document.querySelector('.search__filter').classList.remove('serch__seting-active');
  document.querySelector('.broad-search').classList.remove('search-active');
})

//* Сортировка по цене

document.querySelector('.search__filter').addEventListener('click', () => {
  document.querySelector('.serch__seting').classList.remove('serch__seting-active')
  document.querySelector('.order-search').classList.remove('search-active')
  document.querySelector('.search__filter').classList.toggle('serch__seting-active');
  document.querySelector('.broad-search').classList.toggle('search-active');
})

document.querySelector('.order-search').addEventListener('click', (event) => {
  if (event.target.id === 'ascending') {
    document.querySelector('.order-search-items-active').classList.remove('order-search-items-active')
    event.target.classList.add('order-search-items-active')
    let temp = []
    sortByPriceAscending(temp)
    colMain.innerHTML = null;
    for (el of temp) {
      createProduct(el.id, el.imgUrl, el.name, el.orderInfo.inStock, el.price, el.orderInfo.reviews, el.orderInfo.orders);
    }
  }
  if (event.target.id === 'descending') {
    document.querySelector('.order-search-items-active').classList.remove('order-search-items-active')
    event.target.classList.add('order-search-items-active')
    let temp = []
    sortByPriceDescending(temp)
    colMain.innerHTML = null;
    for (el of temp) {
      createProduct(el.id, el.imgUrl, el.name, el.orderInfo.inStock, el.price, el.orderInfo.reviews, el.orderInfo.orders);
    }
  }
  if (event.target.id === 'default') {
    document.querySelector('.order-search-items-active').classList.remove('order-search-items-active')
    event.target.classList.add('order-search-items-active')
    let temp = []
    sortByPriceDefault(temp)
    colMain.innerHTML = null;
    for (el of temp) {
      createProduct(el.id, el.imgUrl, el.name, el.orderInfo.inStock, el.price, el.orderInfo.reviews, el.orderInfo.orders);
    }
  }
})



function sortByPriceAscending(temp) {
  document.querySelectorAll('.items').forEach((el) => {
    for (i of items) {
      if (el.getAttribute("item-id") == i.id) {
        temp.push(i)
      }
    }
    temp.sort((a, b) => a.price > b.price ? 1 : -1)
    return temp
  })
}


function sortByPriceDescending(temp) {
  document.querySelectorAll('.items').forEach((el) => {
    for (i of items) {
      if (el.getAttribute("item-id") == i.id) {
        temp.push(i)
      }
    }
    temp.sort((a, b) => a.price < b.price ? 1 : -1)
    return temp
  })
}

function sortByPriceDefault(temp) {
  document.querySelectorAll('.items').forEach((el) => {
    for (i of items) {
      if (el.getAttribute("item-id") == i.id) {
        temp.push(i)
      }
    }
    temp.sort((a, b) => a.id > b.id ? 1 : -1)
    return temp
  })
}










//* Реализация сортировки по категориям
document.querySelector('.broad-search').addEventListener('click', (event) => {
  if (event.target.className === 'broad-search-btn') {
    const category = document.getElementById('category').value
    const stock = document.getElementById('stock').value


    if (category !== 'All categories' && stock == 'In stock') {
      colMain.innerHTML = null;
      for (el of items) {
        if (el.category == category && el.orderInfo.inStock > 0) {
          createProduct(el.id, el.imgUrl, el.name, el.orderInfo.inStock, el.price, el.orderInfo.reviews, el.orderInfo.orders);
        }
      }
    }
    if (category === 'All categories' && stock == 'In stock') {
      colMain.innerHTML = null;
      for (el of items) {
        if (el.orderInfo.inStock > 0) {
          createProduct(el.id, el.imgUrl, el.name, el.orderInfo.inStock, el.price, el.orderInfo.reviews, el.orderInfo.orders);
        }
      }
    }
    if (category === 'All categories' && stock !== 'In stock') {
      colMain.innerHTML = null;
      for (el of items) {
        createProduct(el.id, el.imgUrl, el.name, el.orderInfo.inStock, el.price, el.orderInfo.reviews, el.orderInfo.orders);
      }
    }

    if (category !== 'All categories' && stock === 'Any') {
      colMain.innerHTML = null;
      for (el of items) {
        if (el.category == category) {
          createProduct(el.id, el.imgUrl, el.name, el.orderInfo.inStock, el.price, el.orderInfo.reviews, el.orderInfo.orders);
        }
      }
    }
  }
})


//* карусель / товар с карусели


// ?  Товар
document.querySelector('.carusel-wrapper').addEventListener('click', (event) => {
  if (event.target.className === 'btn') {
    console.log(event.target.getAttribute("item-id"))

    let key = event.target.getAttribute("item-id")
    let count = 1
    localStorage.setItem(key, count)
    document.querySelectorAll('.basket-cart-items').forEach((e) => e.remove());
    for (let i = 0; i < localStorage.length; i++) {
      for (el of items) {
        if (localStorage.key(i) == el.id) {
          createBasketProdukt(el, localStorage.getItem(localStorage.key(i)));
        }
      }
    }
    itemsInTheCart()
  }
})

// ? карусель

function randomInteger() {
  let rand = 1 + Math.random() * (8 + 1 - 1);
  return Math.floor(rand);
}
const random = randomInteger()
document.getElementById(random).classList.add('carusel-active')





//* работа с корзиной
document.querySelector('.cart').addEventListener('click', (el) => {
  document.querySelector(".basket-cart").classList.toggle('open');
});

//*  Добавляем товар в localStorage

let inStorage = JSON.parse(localStorage.getItem('inStorage'));
if (inStorage == null) {
  inStorage = [];
}
document.querySelector(".col-main").addEventListener("click", (event) => {
  test(event)
});

document.querySelector('.modal__to-buy').addEventListener("click", (event) => {
  test(event)
});

document.querySelector('.carusel-wrapper').addEventListener('click', (event) => {
  test(event)

});


function test(event) {
  if (event.target.className === 'btn') {
    const temp = {
      id: Number(event.target.parentNode.getAttribute("item-id")),
      counter: 1,
    };
    const tempIndex = inStorage.findIndex(({
        id
      }) =>
      id === temp.id)

    if (tempIndex !== -1 && inStorage[tempIndex].counter < 4) {
      inStorage[tempIndex].counter++
    }
    if (tempIndex == -1) {
      inStorage.push(temp)
    }
    localStorage.setItem('inStorage', JSON.stringify(inStorage));

    document.querySelectorAll('.basket-cart-items').forEach(el => el.remove())
    for (key in inStorage) {
      for (el of items) {
        if (inStorage[key].id == el.id) {
          createBasketProdukt(el, inStorage[key].counter);
        }
      }
    }
  }
  itemsInTheCart();
}
//* логика добавления количества товаров и удаленя
document.querySelector('.basket-cart').addEventListener('click', (event) => {
  if (event.target.className == 'basket-cart-remove') {
    event.target.closest('.basket-cart-items').remove();
    for (const key in inStorage) {
      if (event.target.closest('div[item-id]').getAttribute("item-id") == inStorage[key].id) {
        delete inStorage[key];
        inStorageFiltred = inStorage.filter(element => element != null);
        localStorage.setItem('inStorage', JSON.stringify(inStorageFiltred));
      }
    }
    itemsInTheCart();
  }

  //* 
  if (event.target.className == "basket-cart-sell-plus" &&
    event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText < 4
  ) {
    for (const key in inStorage) {
      if (event.target.closest('div[item-id]').getAttribute("item-id") == inStorage[key].id) {
        inStorage[key].counter++
        event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText = inStorage[key].counter
        localStorage.setItem('inStorage', JSON.stringify(inStorage));
      }
    }
    itemsInTheCart()
  }

  if (event.target.className == "basket-cart-sell-minus" &&
    event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText > 1
  ) {
    for (const key in inStorage) {
      if (event.target.closest('div[item-id]').getAttribute("item-id") == inStorage[key].id) {
        inStorage[key].counter--
        event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText = inStorage[key].counter
        localStorage.setItem('inStorage', JSON.stringify(inStorage));
      }
    }
    itemsInTheCart()
  }

  if (event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText > 3 &&
    event.target.className == "basket-cart-sell-plus") {
    event.target.parentNode.querySelector('.basket-cart-sell-plus').classList.add('not-active');
  }
  if (event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText < 4) {
    event.target.parentNode.querySelector('.basket-cart-sell-plus').classList.remove('not-active');
  }

  if (event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText < 2 &&
    event.target.className == "basket-cart-sell-minus") {

    event.target.parentNode.querySelector('.basket-cart-sell-minus').classList.add('not-active');
  }
  if (event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText > 1) {
    event.target.parentNode.querySelector('.basket-cart-sell-minus').classList.remove('not-active');
  }

  inStorage = JSON.parse(localStorage.getItem('inStorage'));

});






//* рендерим товар с localStorage
itemsInTheCart();
for (key in inStorage) {
  for (el of items) {
    if (inStorage[key].id == el.id) {
      createBasketProdukt(el, inStorage[key].counter);
    }
  }
}



function createBasketProdukt(el, count) {
  const basketCartItems = create('div');
  basketCartItems.className = 'basket-cart-items'
  basketCartItems.setAttribute("item-id", el.id);

  const basketCartWrapperImg = create('div');
  basketCartWrapperImg.className = 'baske-cart-wrapper-img';
  const basketCartImg = create('img');
  basketCartImg.className = 'baske-cart-img';
  basketCartImg.src = `/img/${el.imgUrl}`;
  const basketCartDescr = create('div');
  basketCartDescr.className = 'baske-cart-descr';


  const basketCartDescrTitle = create('span');
  basketCartDescrTitle.className = 'baske-cart-descr-title';
  basketCartDescrTitle.innerText = el.name;


  basketCartDescrPrice = create('div');
  basketCartDescrPrice.className = 'basket-cart-descr-price';
  basketCartDescrPrice.innerHTML = '$';
  basketCartDescrPriceSpan = create('span');
  basketCartDescrPriceSpan.innerText = el.price;
  basketCartDescrPrice.append(basketCartDescrPriceSpan);



  basketCartSell = create('div')
  basketCartSell.className = 'basket-cart-sell'

  basketCartSellMinus = create('span')
  basketCartSellMinus.className = 'basket-cart-sell-minus'
  basketCartSellMinus.innerText = '<'

  basketCartSellCounter = create('div')
  basketCartSellCounter.className = 'basket-cart-sell-counter'
  basketCartSellCounter.innerText = count //! количество товаров


  basketCartPlus = create('span')
  basketCartPlus.className = 'basket-cart-sell-plus'
  basketCartPlus.innerText = '>'

  if (count == 1) {
    basketCartSellMinus.classList.add('not-active')
  }
  if (count == 4) {
    basketCartPlus.classList.add('not-active')
  }

  basketCartRemove = create('span')
  basketCartRemove.className = 'basket-cart-remove'
  basketCartRemove.innerText = 'X'



  document.querySelector('.basket-cart').insertBefore(basketCartItems, document.querySelector('.basket-cart-total'))


  basketCartItems.append(basketCartWrapperImg, basketCartDescr, basketCartSell)
  basketCartWrapperImg.append(basketCartImg)
  basketCartDescr.append(basketCartDescrTitle, basketCartDescrPrice)
  basketCartSell.append(basketCartSellMinus, basketCartSellCounter, basketCartPlus, basketCartRemove)
}



//* получаем количество товаров в корзине 
function itemsInTheCart() {
  let sum = 0,
    count = 0;

  for (const key in inStorage) {
    count += inStorage[key].counter

    let value = inStorage[key].counter
    for (el of items) {
      if (inStorage[key].id == el.id) {
        sum += el.price * value
      }
    }
  }
  return document.querySelector('.basket-caunter').innerHTML = count,
    document.querySelector('#total-amount').innerHTML = count,
    document.querySelector('#total-price').innerHTML = `${sum} $`
}