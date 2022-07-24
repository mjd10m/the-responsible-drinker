
var drinkList = []

var timestamp = Date.now()

//calculates BAC using the WideMark Formula
function calculateBAC(weightInPounds, gender, totalTimeInHours) {
    if (gender == "Male"){
        var alcoholGrams = convertDrinkToGrams(drinkList)
        bac = ((alcoholGrams/((weightInPounds * 454) * .68)) * 100) - (totalTimeInHours * .015) 
    } else {
        convertDrinkToGrams(drinks)
        bac = ((alcoholGrams/((weightInPounds * 454) * .55)) * 100) - (totalTimeInHours * .015) 
    }
    roundedBac = Math.round(bac * 1000) / 1000
    console.log(roundedBac)
}
//converts abv and ounces to grams of alcohol
function convertDrinkToGrams(drinkList) {
    var totalGramsOfAlcohol = 0
    for (i = 0; i < drinkList.length; i++) {
        for (u = 0; u < drinkList[i].quantity; u++) {
        var gramsOfAlcohol = (drinkList[i].ounces) * (drinkList[i].abv) * .789 * 29.5735
        totalGramsOfAlcohol = totalGramsOfAlcohol + gramsOfAlcohol
        }
    }
    return totalGramsOfAlcohol
}
//gets users inputs and calls BAC calculation
function getInputs(event) {
    event.preventDefault();
    var userInfo = findUserInfo()
    var timeElapsed = document.querySelector("#time").value.trim()
    localStorage.setItem("user", JSON.stringify(userInfo))
    drinkList = findUserDrinks()
    localStorage.setItem("drinks", JSON.stringify(drinkList))
    calculateBAC(userInfo.weight, userInfo.gender, timeElapsed)
}
//adds additonal drink inputs when add drink button is clicked
function addDrinkElement(event) {
    event.preventDefault();
    var addButton = document.querySelector("#add-drink")
    var modal = document.querySelector("#user-inputs-modal")
    columnContainerEl = document.createElement("div")
    columnContainerEl.classList = "columns"
    buildlabelInputEl("ABV", "abv")
    buildlabelInputEl("Ounces", "drinksize")
    buildlabelInputEl("Quantity", "quantity")
    modal.insertBefore(columnContainerEl, addButton)
}
//builds the html for the new drink inputs
function buildlabelInputEl(text, id) {
    var inputEL = document.createElement("input")
    inputEL.type = "text"
    inputEL.id = id
    inputEL.name = id
    inputEL.classList = "input"

    var controlEl = document.createElement("div")
    controlEl.classList = "control"
    controlEl.appendChild(inputEL)

    var labelEl = document.createElement("label")
    labelEl.for = id
    labelEl.classList = "label"
    labelEl.innerHTML = text

    var columnEl = document.createElement("div")
    columnEl.classList = "column is-4"
    columnEl.appendChild(labelEl)
    columnEl.appendChild(controlEl)
    columnContainerEl.appendChild(columnEl)
}
//gets the users weight and gender
function findUserInfo() {
    var weight = document.querySelector("#weight").value.trim()
    var gender = document.querySelector("#gender").value.trim()
    var userInfo = {weight: weight, gender: gender}
    return userInfo
}
//gets the drinks user has inputed
function findUserDrinks() {
    debugger;
    var abvEl = document.querySelectorAll("#abv")
    var ouncesEl = document.querySelectorAll("#drinksize")
    var quantityEl = document.querySelectorAll("#quantity")
    for (i=0; i < abvEl.length; i++ ) {
        var drink = {}
        var abvDrink = abvEl[i].value.trim();
        var ouncesDrink = ouncesEl[i].value.trim();
        var quantityDrink = quantityEl[i].value.trim();
        drink = {abv: abvDrink, ounces:ouncesDrink, quantity: quantityDrink}
        drinkList.push(drink)
    }
    return drinkList
}
//event lsiteners for submit button and add drink button within modal
document.querySelector("#submit-modal").addEventListener("click", getInputs)
document.querySelector("#add-drink").addEventListener("click", addDrinkElement)









var cocktailApiURL = "https:/www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
fetch(cocktailApiURL).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            createResults()
        })
    }
})