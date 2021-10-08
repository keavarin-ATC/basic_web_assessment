const carouselBar = document.querySelector(".carousel")
let scrollPerClick 
let imgPadding = 20;
let pic_caroesel = [
    "./pic_carousel.png", 
    "./pic_carousel.png", 
    "./pic_carousel.png", 
    "./pic_carousel.png", 
    "./pic_carousel.png", 
    "./pic_carousel.png", 
    "./pic_carousel.png", 
    "./pic_carousel.png", 
    "./pic_carousel.png", 
    "./pic_carousel.png", 
]
let scrollAmount =0;
const openCart = document.querySelector(".cart-icon")
const closeCart = document.getElementById("close-modal")
let cart = []
let button = []
const productDOM = document.querySelector(".products-container")
const cartDOM = document.querySelector(".cart");
const cartContent = document.querySelector(".cart-centent")
const modalCart = document.querySelector('.cart-modal')
const clearCart = document.getElementById('clear-modal')

openCart.addEventListener('click',()=>{
    modalCart.classList.add('show')
})
closeCart.addEventListener('click',()=>{
    modalCart.classList.remove('show')
})
clearCart.addEventListener('click',()=>{
    
    localStorage.removeItem('cartNumber');
    localStorage.removeItem('productInCart');
    let myList = document.getElementById('myList');
    myList.innerHTML = '';
})
function sliderLeft(){
    carouselBar.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollPerClick ),
        behavior: "smooth"
    })

    if(scrollAmount < 0){
        scrollAmount =0;
    }
}

function sliderRight(){
    if(scrollAmount<= carouselBar.scrollWidth - carouselBar.clientWidth){
        carouselBar.scrollTo({
            top: 0,
            left: (scrollAmount += scrollPerClick ),  
            behavior: "smooth"
        })
    }
}

pic_caroesel.map((item, index)=>{
    carouselBar.insertAdjacentHTML("beforeend",`<img class="img-${index} slider-img" src=${item}>`)
})

scrollPerClick = document.querySelector(".img-1").clientWidth + imgPadding;

class Display {
    showProducts(products){
       let result= ""
       products.forEach((item, index)=>{
           result += 
           `<div class="product-card">
           <div class="product-img">
            <img src="./pic_product.png" style="width: 100%" />
            </div>
 
            <div class="product-info">
           <h4 class="product-name">${item.name}</h4>
           <p class="product-brand">Brand : ${item.brand}</p>
           <p class="product-des">Description: ${item.description}</p>
            </div>
 
            <div class="card-order">
           <span class="product-price">${item.price}$</span>
           <button class="btn addToCart" id="add" >Order</button>
            </div>
            </div>`
       })
       productDOM.innerHTML = result;
   
   }

   getButtons(products){
       const buttons = [...document.querySelectorAll('.addToCart')]
       
       buttons.map((button, index)=>{
            button.addEventListener('click',e=>{
            e.target.innerText = "In cart"
            e.target.disabled = true
            cartNumbers(products[index])
          
        })
       })
   }
}
function cartNumbers(product){
    let productNumber = localStorage.getItem("cartNumber",0)
    productNumber = parseInt(productNumber)
    console.log("productNumber", productNumber)
    if(productNumber){
        localStorage.setItem('cartNumber', productNumber+1)
        document.querySelector('.item-total').textContent = productNumber+1;
    }else{
        localStorage.setItem('cartNumber',1)
        document.querySelector('.item-total').textContent =1;
    }
    setItemProduct(product)
    addCartModal(product)
}

function setItemProduct(product){
    cart = [...cart, product];
    localStorage.setItem("productInCart", JSON.stringify(cart))
}

function addCartModal(product) {
    
    const node = document.createElement("li");
    let textnode = document.createTextNode(`${product.name}  ${product.price}$`);
   
    node.appendChild(textnode);
    document.getElementById("myList").appendChild(node);
}

class Products{
async getProducts(){
    try{
        const result = await fetch("products.json");
      const data = await result.json();
      const products = data.product;
      return products;
    }catch(err){
        console.log(err)
    }
}
}



document.addEventListener('DOMContentLoaded', async ()=>{
  const productList = new Products()
  const display = new Display()
  const products = await productList.getProducts();
  display.showProducts(products)
  display.getButtons(products)

})