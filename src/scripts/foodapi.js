console.log("linked")
// created var that will get the body in which the foods will be displayed in
const entriesOnDom = document.querySelector('.foodlist')

// creating a component that will be called in the fetch that will display all the items on to the dom 


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
            // console.log(foodObj) // Should have a `barcode` property
            // console.log("checking response of my api")

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${foodObj.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    // console.log("checking response of external api")
                    // console.log(productInfo.product.brands)
                    // console.log(productInfo.product.ingredients)
                    // console.log(productInfo.product.countries)
                    // console.log(productInfo.product.nutriments.sugars_100g)
                    // console.log(productInfo.product.nutriments.fat_100g)
                    // console.log(productInfo.product.nutriments.carbohydrates_100g)
                    foodObj.ingredients = productInfo.product.ingredients
                    foodObj.countriesOrigin = productInfo.product.countries
                    foodObj.sugars = productInfo.product.nutriments.sugars_100g
                    foodObj.fats = productInfo.product.nutriments.fat_100g
                    foodObj.carbs = productInfo.product.nutriments.carbohydrates_100g

                    // // Produce HTML representation
                    // const foodAsHTML = foodFactory(food)
                    const foodAsHTML = (food) => {
                        let contents = " "
                        for(let item = 0; item < food.ingredients.length; item++){
                            contents += food.ingredients[item].text + ", "
                            console.log(contents)
                        }
                            
                        console.log(contents)
                        return `
                        <div class="foodItems">
                            <h3>${food.name}</h3>
                            <h4>${food.category}</h4>
                            <h5>${food.ethnicity}</h5>
                            <p>Origin: ${food.countriesOrigin}</p>
                            <p>Ingredients: ${contents}</p>
                            <p>Sugars: ${food.sugars}</p>
                            <p>Fats: ${food.fats}</p>
                            <p>Carbs: ${food.carbs}</p>
                        </div>
                        `
                    }
                    // // Add representaiton to DOM
                    // addFoodToDom(foodAsHTML)
                    entriesOnDom.innerHTML += foodAsHTML(foodObj)
                })
        })
})
