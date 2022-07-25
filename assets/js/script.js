
var savedDrinkList = []


//calculates BAC using the WideMark Formula
function calculateBAC(weightInPounds, gender, totalTimeInHours, drinkList) {
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
function alreadyDrinking(event) {
    var drinkList = []
    event.preventDefault();
    var userInfo = findUserInfo("#weight", "#gender")
    var timeElapsed = document.querySelector("#time").value.trim()
    //localStorage.setItem("user", JSON.stringify(userInfo))
    var parentElId = event.target.parentElement.id
    drinkList = findUserDrinks(parentElId, drinkList)
    //localStorage.setItem("drinks", JSON.stringify(drinkList))
    calculateBAC(userInfo.weight, userInfo.gender, timeElapsed, drinkList)
}
//adds additonal drink inputs when add drink button is clicked
function addDrinkElement(event) {
    debugger;
    event.preventDefault();
    var elClicked = event.target
    var addButton = document.querySelector("#add-btn")
    var modal = document.querySelector("#user-inputs-modal")
    columnContainerEl = document.createElement("div")
    columnContainerEl.classList = "columns"
    var parentEl = elClicked.parentElement.id
    if (parentEl === "tracking") {
        buildlabelInputEl("ABV", "abv-tracking")
        buildlabelInputEl("Ounces", "drinksize-tracking")
        buildlabelInputEl("Quantity", "quantity-tracking")
        modal.insertBefore(columnContainerEl, addButton)
    } else {
        buildlabelInputEl("ABV", "abv")
        buildlabelInputEl("Ounces", "drinksize")
        buildlabelInputEl("Quantity", "quantity")
    modal.insertBefore(columnContainerEl, addButton)
    }
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
function findUserInfo(weightId, genderId) {
    var weight = document.querySelector(weightId).value.trim()
    var gender = document.querySelector(genderId).value.trim()
    var userInfo = {weight: weight, gender: gender}
    return userInfo
}
//gets the drinks user has inputed
function findUserDrinks(id, drinkList) {
    if (id === "tracking"){
    var abvEl = document.querySelectorAll("#abv-tracking")
    var ouncesEl = document.querySelectorAll("#drinksize-tracking")
    var quantityEl = document.querySelectorAll("#quantity-tracking")
        for (i=0; i < abvEl.length; i++ ) {
            var drink = {}
            var abvDrink = abvEl[i].value.trim();
            var ouncesDrink = ouncesEl[i].value.trim();
            var quantityDrink = quantityEl[i].value.trim();
            drink = {abv: abvDrink, ounces:ouncesDrink, quantity: quantityDrink}
            drinkList.push(drink)
        }
    } else {
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
    }
    return drinkList
}

//takes data from fetch request and adds to webpage
function createResults(data) {
    var mainContainerEl = createTableEl("div","columns m-0 is-flex-wrap-wrap","")
    for(i = 0 ; i < data.drinks.length; i++){
        var mainColumnEl = createTableEl("div","column is-4","")
        createDrinkEl(data, mainColumnEl, i)
        createInstructionsEl(data, mainColumnEl, i)
        createIngredientTable(data, mainColumnEl, i)
        mainContainerEl.appendChild(mainColumnEl)
    }
    document.querySelector("#test").appendChild(mainContainerEl)
}
//creates the ingredient table HTML
function createIngredientTable(data, mainColumnEl, i) {
    var tableContainerEl = createTableEl("div","columns m-0","")
    var tableColumnEl = createTableEl("div", "column","")
    var tableEl = createTableEl("table","table","")
    var tableHead = createTableEl("thead","","")
    var tableHeadRow = createTableEl("tr","","")
    var tableHeadText1 = createTableEl("th","","Ingredient")
    var tableHeadText2 = createTableEl("th","","Measurement")
    tableHeadRow.appendChild(tableHeadText1)
    tableHeadRow.appendChild(tableHeadText2)
    tableHead.appendChild(tableHeadRow)
    tableEl.appendChild(tableHead)
    var tableBody = createTableEl("tbody","","")
    for (j = 17; j < 32; j++) {

        var objArr = Object.values(data.drinks[i])
        var ingredient = objArr[j]
        var measurement = objArr[j+15]
        if (ingredient === null) {
            break
        } else {
        var tableBodyRow = createTableEl("tr","","")
        var tableBodyIngredient = createTableEl("td","",ingredient)
        var tableBodyMeasure = createTableEl("td","",measurement)
        tableBodyRow.appendChild(tableBodyIngredient)
        tableBodyRow.appendChild(tableBodyMeasure)
        tableBody.appendChild(tableBodyRow)
        }
    }
    tableEl.appendChild(tableBody)
    tableColumnEl.appendChild(tableEl)
    tableContainerEl.appendChild(tableColumnEl)
    mainColumnEl.appendChild(tableContainerEl)
    return mainColumnEl
}
//creates the drink name and picture html
function createDrinkEl(data, mainColumnEl) {
    var drinkContainerEl = createTableEl("div", "columns m-0","")
    var drinkPicColumnEl = createTableEl("div","column is-5","")
    var drinkPicEl = createTableEl("img","","")
    drinkPicEl.src = data.drinks[i].strDrinkThumb
    drinkPicColumnEl.appendChild(drinkPicEl)
    var drinkNameColumnEl = createTableEl("div","column",data.drinks[i].strDrink)
    drinkContainerEl.appendChild(drinkPicColumnEl)
    drinkContainerEl.appendChild(drinkNameColumnEl)
    mainColumnEl.appendChild(drinkContainerEl)
    return mainColumnEl
}
//creates the instructions html
function createInstructionsEl(data, mainColumnEl) {
    var instructionsContainerEl = createTableEl("div","columns m-0", "")
    var instructionsColumnEl = createTableEl("div", "column", data.drinks[i].strInstructions)
    instructionsContainerEl.appendChild(instructionsColumnEl)
    mainColumnEl.appendChild(instructionsContainerEl)
    return mainColumnEl
}
//base function to crete an element and assign class and innerHTML
function createTableEl(elementType, classList, text) {
    var element = document.createElement(elementType)
    element.classList = classList
    element.innerHTML = text
    return element
}3



//gets the results from the cocktail search
function cocktailNameSearch(searchedDrink) {
var cocktailApiURL = "https:/www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchedDrink
fetch(cocktailApiURL).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            createResults(data)
        })
    }
})
}
function trackDrinking(event) {
    event.preventDefault();
    var userInfo = findUserInfo("#weight-tracking", "#gender-tracking")
    localStorage.setItem("user", JSON.stringify(userInfo))
    var timestamp = Date.now()
    localStorage.setItem("time", JSON.stringify(timestamp))

}
function trackDrinkingDrinkAdd(event) {
    debugger;
    event.preventDefault
    var userInfo = JSON.parse(localStorage.getItem("user"));
    var currentTime = Date.now() 
    var storedTime = JSON.parse(localStorage.getItem("time"));
    var unixElapsed = (currentTime - storedTime) / 1000
    var hours = Math.floor(unixElapsed/3600) % 24
    var minutes = Math.floor(unixElapsed / 60) % 60;
    var seconds = unixElapsed % 60;
    var timeElapsed = hours + (minutes / 60) + (seconds / 3600)
    console.log(timeElapsed)
    var parentElId = event.target.parentElement.id
    savedDrinkList = findUserDrinks(parentElId, savedDrinkList)
    localStorage.setItem("drinks", JSON.stringify(savedDrinkList))
    calculateBAC(userInfo.weight, userInfo.gender, timeElapsed, savedDrinkList)

    

}
function loadPage() {
    savedDrinkList = JSON.parse(localStorage.getItem("drinks"))
}
loadPage()

//event lsiteners for submit button and add drink button within modal
if(document.querySelector("#submit-modal") === null) {
    
} else {
  document.querySelector("#submit-modal").addEventListener("click", alreadyDrinking)
}

if(document.querySelector("#add-drink") === null) {
    
} else {
  document.querySelector("#add-drink").addEventListener("click", addDrinkElement)
}

if(document.querySelector("#submit-modal-tracking") === null) {

} else {
  document.querySelector("#submit-modal-tracking").addEventListener("click", trackDrinking)
}

if(document.querySelector("#submit-modal-tracking-adddrink") === null) {
    
} else {
  document.querySelector("#submit-modal-tracking-adddrink").addEventListener("click", trackDrinkingDrinkAdd)
}