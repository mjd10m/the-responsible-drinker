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
if(document.querySelector("#submit-modal") === null) {

} else {
  document.querySelector("#submit-modal").addEventListener("click", getInputs)
}

if(document.querySelector("#add-drink") === null) {

} else {
  document.querySelector("#add-drink").addEventListener("click", addDrinkElement)
}



function createResults(data) {
    debugger;
    console.log(data.drinks.length)
    var mainContainerEl = createTableEl("div","columns m-0 is-flex-wrap-wrap","")
    for(i = 0 ; i < data.drinks.length; i++){
        var mainColumnEl = createTableEl("div","column is-6","")
        createDrinkEl(data, mainColumnEl, i)
        createInstructionsEl(data, mainColumnEl, i)
        createIngredientTable(data, mainColumnEl, i)
        mainContainerEl.appendChild(mainColumnEl)
    }
    document.querySelector("#test").appendChild(mainContainerEl)
}

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
function createDrinkEl(data, mainColumnEl) {
    var drinkContainerEl = createTableEl("div", "columns m-0","")
    var drinkPicColumnEl = createTableEl("div","column is-3","")
    var drinkPicEl = createTableEl("img","","")
    drinkPicEl.src = data.drinks[i].strDrinkThumb
    drinkPicColumnEl.appendChild(drinkPicEl)
    var drinkNameColumnEl = createTableEl("div","column",data.drinks[i].strDrink)
    drinkContainerEl.appendChild(drinkPicColumnEl)
    drinkContainerEl.appendChild(drinkNameColumnEl)
    mainColumnEl.appendChild(drinkContainerEl)
    return mainColumnEl
}
function createInstructionsEl(data, mainColumnEl) {
    var instructionsContainerEl = createTableEl("div","columns m-0", "")
    var instructionsColumnEl = createTableEl("div", "column", data.drinks[i].strInstructions)
    instructionsContainerEl.appendChild(instructionsColumnEl)
    mainColumnEl.appendChild(instructionsContainerEl)
    return mainColumnEl
}

function createTableEl(elementType, classList, text) {
    var element = document.createElement(elementType)
    element.classList = classList
    element.innerHTML = text
    return element
}

var cocktailApiURL = "https:/www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
fetch(cocktailApiURL).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            debugger;
            createResults(data)
        })
    }
})


var alreadyDrinkingBtn = document.getElementById('drinking')
alreadyDrinkingBtn.addEventListener('click', alreadydrinking);
function alreadydrinking() {
  document.getElementById('alreadydrinkingform').classList.add('is-active')
}

var formClose = document.getElementById('formclose')
formClose.addEventListener('click', alreadydrinkingclose)
function alreadydrinkingclose() {
  document.getElementById('alreadydrinkingform').classList.remove('is-active')
}