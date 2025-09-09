

// categories
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories/")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
}

const displayCategories = (categories) => {
    
    const listOfCategories = document.getElementById("categories")
    listOfCategories.innerHTML = ""
    for (let category of categories){
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `<button class="btn btn-success btn-ghost pl-1 buttonAll" onclick="loadTreeByCategories(${category.id})">${category.category_name}</button>`
        listOfCategories.append(btnDiv)
        let button = document.querySelectorAll(".buttonAll")
       
    }
    const buttons = document.querySelectorAll(".buttonAll")
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(button => button.classList.remove("bg-[#15803D]", "text-white"))
      
      btn.classList.add("bg-[#15803D]", "text-white")
    })
})
}

const loadTreeByCategories = (id) => {
    const url =`https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayTreeByCategories(data.plants))
}

const displayTreeByCategories = (trees) =>{
    const treeCards = document.getElementById("cards")
    treeCards.innerHTML=""
    for(let tree of trees){
        const imgUrl = tree.image;
        
        const card = document.createElement('div')
        card.innerHTML = `<div class="card bg-base-100 w-96 shadow-sm p-4 max-w-[350px]">
                <figure>
                    <img
                          src="${imgUrl}"
                         alt="Shoes" />
                </figure>
                <div class="card-body">
                <h2 class="card-title font-semibold">${tree.name}</h2>
                <p>${tree.description}</p>
                <div class="flex items-center justify-between">
                    <h2 class="text-[#15803D] bg-[#DCFCE795] py-1 px-2 rounded-3xl">${tree.category}</h2>
                    <h2 class="font-semibold pr-2">৳${tree.price}</h2>
                </div>
                 <div class="card-actions justify-end">
                   <button onclick="cart(${tree.price},'${tree.name}')" class="btn bg-[#15803D] text-white rounded-3xl w-full">Add to Cart</button>
                </div>
            </div>
        </div>                    
        `
        treeCards.append(card)
    }

}

let cartItems = []

const cart = (price, name) => {
  let items = cartItems.find(item => item.name === name)
  if (items) {
    items.count++
  } else {
    cartItems.push({ name, price, count: 1 })
  }
  CartBuilt()
}

const CartBuilt = () => {
  const cartElement = document.getElementById("cartItems")
  cartElement.innerHTML = ""

  let total = 0

  cartItems.forEach(item => {
    total += item.price * item.count

    const addItems = document.createElement("div")
    addItems.innerHTML = `
      <div class="flex items-center justify-between gap-14 bg-[#DCFCE795] p-5 rounded-xl">
        <div>
          <h2 class="font-bold">${item.name}</h2>
          <p class="text-gray-400">৳${item.price} x ${item.count}</p>
        </div>
        <div>
          <i class="fa-solid fa-xmark text-gray-400 cursor-pointer"
             onclick="removeFromCart('${item.name}')"></i>
        </div>
      </div>`
    cartElement.append(addItems)
  })

  const totalDiv = document.createElement("div")
  totalDiv.className = "mt-4 font-bold text-xl"
  totalDiv.innerText = `Total: ৳${total}`
  cartElement.append(totalDiv)
}

const removeFromCart = (name) => {
  cartItems = cartItems.filter(item => item.name !== name)
  CartBuilt()
}



loadCategories()