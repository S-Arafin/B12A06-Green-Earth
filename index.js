// categories
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories/")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
}

const displayCategories = (categories) => {
    const listOfCategories = document.getElementById("categories")
    for (let category of categories){
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `<button class="btn btn-success btn-ghost pl-1" onclick="loadTreeByCategories(${category.id})">${category.category_name}</button>`
        listOfCategories.append(btnDiv)
    }
}

const loadTreeByCategories = (id) => {
    const url =`https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
}

const displayTreeByCategories = () => {
    
}


loadCategories()