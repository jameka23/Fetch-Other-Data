console.log("linked")
// created var that will get the body in which the foods will be displayed in
const entriesOnDom = document.querySelector('.foodlist')

// creating a component that will be called in the fetch that will display all the items on to the dom 
const htmlOnDom = (foodsContainer) => {
    return `
        <div class="foodItems">
            <h3>${foodsContainer.name}</h3>
            <p>${foodsContainer.category}</p>
            <p>${foodsContainer.ethnicity}</p>
        </div>
    `
}


fetch("http://localhost:8088/foods")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(item => {
            entriesOnDom.innerHTML += htmlOnDom(item)
        })
    })


