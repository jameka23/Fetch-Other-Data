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


// fetch("http://localhost:8088/foods")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         parsedFoods.forEach(item => {
//             entriesOnDom.innerHTML += htmlOnDom(item)
//         })
//     })
/*

Ingredients
Country of origin
Calories per serving
Fat per serving
Sugar per serving
*/
// do a post to post barcodes into my api from another api
fetch("http://localhost:8088/foods")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(foodObj => {
            console.log(foodObj) // Should have a `barcode` property
            console.log("checking response of my api")

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${foodObj.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    // console.log("checking response of external api")
                    console.log(productInfo.product.brands)
                    console.log(productInfo.product.ingredients)
                    // foodObj.ingredients = productInfo.product.ingredients
                    // foodObj.countriesOrigin = productInfo.product.

                    // // Produce HTML representation
                    // const foodAsHTML = foodFactory(food)

                    // // Add representaiton to DOM
                    // addFoodToDom(foodAsHTML)
                })
        })
    })
