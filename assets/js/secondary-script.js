var savedDrinkList = []

//get a random drink from Api
function cocktailRandom() {
    var cocktailApiRandomDrinkURL = "https:/www.thecocktaildb.com/api/json/v1/1/random.php"
    fetch(cocktailApiRandomDrinkURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                createResults(data,"columns m-0 is-justify-content-center")
            })
        }
    })
}

//gets the results from api based the cocktail search
function cocktailNameSearch(searchedDrink) {
    var cocktailApiSearchNameURL = "https:/www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchedDrink
    fetch(cocktailApiSearchNameURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                createResults(data, "columns m-0 is-flex-wrap-wrap")
            })
        }
    })
}

//takes data from fetch request and adds to webpage
function createResults(data, containerClass) {
    var mainContainerEl = createTableEl("div",containerClass,"")
    for(i = 0 ; i < data.drinks.length; i++){
        var mainColumnEl = createTableEl("div","column is-4","")
        createDrinkEl(data, mainColumnEl, i)
        createInstructionsEl(data, mainColumnEl, i)
        createIngredientTable(data, mainColumnEl, i)
        mainContainerEl.appendChild(mainColumnEl)
    }
    document.querySelector("#test").appendChild(mainContainerEl)
}

//base function to crete an element and assign class and innerHTML
function createTableEl(elementType, classList, text) {
    var element = document.createElement(elementType)
    element.classList = classList
    element.innerHTML = text
    return element
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




function loadPage() {
    var instructionsArr = JSON.parse(localStorage.getItem("searched-name"))
    console.log(instructionsArr)
    if (instructionsArr[1] === "cocktailNameSearch") {
        cocktailNameSearch(instructionsArr[0])
    } else if (instructionsArr[1] === "cocktailRandom") {
        cocktailRandom()
    }

}

window.onload = loadPage()

