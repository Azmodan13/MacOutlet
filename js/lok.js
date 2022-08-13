document.querySelector('.cart').addEventListener('click', (el) => {
    document.querySelector(".basket-cart").classList.toggle('open')
})

//*  Добавляем товар в localStorage
document.querySelector(".col-main").addEventListener("click", (event) => {
    if (event.target.className === 'btn' && Number(event.target.parentNode.getAttribute("item-id")) > 0) {
        let local = Number(event.target.parentNode.getAttribute("item-id"))
        localStorage.setItem(local, 1);
        document.querySelectorAll('.basket-cart-items').forEach((e) => e.remove());
        for (let i = 0; i < localStorage.length; i++) {
            for (el of items) {
                if (localStorage.key(i) == el.id) {
                    createBasketProdukt(el.imgUrl, el.name, el.price)
                }
            }
        }
        itemsInTheCart()
    }
})

//* логика добавления количества товаров и удаленя
document.querySelector('.basket-cart').addEventListener('click', (event) => {
    if (event.target.className == 'basket-cart-remove') {
        event.target.closest('.basket-cart-items').remove()
        localStorage.removeItem(event.target.closest('div[item-id]').getAttribute("item-id"))
        itemsInTheCart()
    }

    //* 
    if (event.target.className == "basket-cart-sell-plus" &&
        event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText < 4
    ) {
        let key = event.target.closest('div[item-id]').getAttribute("item-id")
        let count = Number(localStorage.getItem(key)) + 1
        localStorage.setItem(key, count)
        event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText = count
        itemsInTheCart()

    }

    if (event.target.className == "basket-cart-sell-minus" &&
        event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText > 1
    ) {
        let key = event.target.closest('div[item-id]').getAttribute("item-id")
        let count = Number(localStorage.getItem(key)) - 1
        localStorage.setItem(key, count)
        event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText = count
        itemsInTheCart()

    }

    if (event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText > 3 &&
        event.target.className == "basket-cart-sell-plus") {
        event.target.parentNode.querySelector('.basket-cart-sell-plus').classList.add('not-active')
    }
    if (event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText < 4) {
        event.target.parentNode.querySelector('.basket-cart-sell-plus').classList.remove('not-active')
    }

    if (event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText < 2 &&
        event.target.className == "basket-cart-sell-minus") {

        event.target.parentNode.querySelector('.basket-cart-sell-minus').classList.add('not-active')
    }
    if (event.target.parentNode.querySelector('.basket-cart-sell-counter').innerText > 1) {
        event.target.parentNode.querySelector('.basket-cart-sell-minus').classList.remove('not-active')
    }
})

document.querySelector('.carusel-wrapper').addEventListener('click', (event) =>{
    if(event.target.className === 'btn'){
      console.log(event.target.getAttribute("item-id"))
  
      let key = event.target.getAttribute("item-id")
          let count = 1
          localStorage.setItem(key, count)
    }
  })




//* рендерим товар с localStorage
itemsInTheCart()
for (let i = 0; i < localStorage.length; i++) {
    for (el of items) {
        if (localStorage.key(i) == el.id) {
            createBasketProdukt(el.id, el.imgUrl, el.name, el.price, localStorage.getItem(localStorage.key(i)))
        }
    }
}



function createBasketProdukt(id, imgUrl, Name, price, count) {
    const basketCartItems = create('div')
    basketCartItems.className = 'basket-cart-items'
    basketCartItems.setAttribute("item-id", id);

    const basketCartWrapperImg = create('div')
    basketCartWrapperImg.className = 'baske-cart-wrapper-img'
    const basketCartImg = create('img')
    basketCartImg.className = 'baske-cart-img'
    basketCartImg.src = `/img/${imgUrl}`
    const basketCartDescr = create('div')
    basketCartDescr.className = 'baske-cart-descr'


    const basketCartDescrTitle = create('span')
    basketCartDescrTitle.className = 'baske-cart-descr-title'
    basketCartDescrTitle.innerText = Name


    basketCartDescrPrice = create('div')
    basketCartDescrPrice.className = 'basket-cart-descr-price'
    basketCartDescrPrice.innerHTML = '$'
    basketCartDescrPriceSpan = create('span')
    basketCartDescrPriceSpan.innerText = price
    basketCartDescrPrice.append(basketCartDescrPriceSpan)



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
    let count = 0,
        sum = 0
    for (let i = 0; i < localStorage.length; i++) {
        let value = Number(localStorage.getItem(localStorage.key(i)))
        count += value

        for (el of items) {
            if (Number(localStorage.key(i)) == el.id) {
                sum += el.price * value
            }
        }

    }
    return document.querySelector('.basket-caunter').innerHTML = count,
        document.querySelector('#total-amount').innerHTML = count,
        document.querySelector('#total-price').innerHTML = `${sum} $`
}
