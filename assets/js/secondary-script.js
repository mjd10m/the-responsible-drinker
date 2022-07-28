var savedDrinkList = []

//get a random drink from Api
function cocktailRandom() {
    var cocktailApiRandomDrinkURL = "https://www.thecocktaildb.com/api/json/v2/9973533/random.php"
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
    var cocktailApiSearchNameURL = "https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=" + searchedDrink
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
        var mainColumnEl = createTableEl("div","column is-4 textcolor","")
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

var createBreweryContent= function(data, columnEl) {
    //set data we want to pull to their own variable
    
    var uncheckedArr = [data.street, data.city, data.name, data.phone, data.website_url]
    
    var arr = checkForNull(uncheckedArr);

    var street = arr[0]
    console.log(street);
    var city = arr[1]
    var name = arr[2]
    var phone = arr[3]
    var website = arr[4]
    var address = street + " " + city + ", " + data.state;
    phone = formatPhoneNumber(phone);
    phone = checkPhoneNumber(phone);
    
    
  
    //create ul element
    var breweryInfo = $('<ul>')
      .attr('id', 'brewery-info')
      .addClass("column is-3 box mx-2");
    // create list-items for each variable
    var nameEl = $('<li>')
     .text(name)
     .addClass("is-size-3 is-underlined");
    var addressEl = $('<a>')
     .attr('href','https://www.google.com/maps/place/' + address)
     .attr('target', '_blank')
     .text(address);
      var phoneEl = $('<li>')
     .text("Phone: " + phone);
    if (website === "")
    var websiteEl = $('<li>')
     .text("No website provided.");
    else
    var websiteEl = $('<a>')
     .attr('href', website)
     .attr('target', '_blank') 
     .text(website);
     

      //append list-items to ul
     $(breweryInfo).append(nameEl, addressEl, phoneEl, websiteEl);
     //append ul to html 
     columnEl.append(breweryInfo);
        return columnEl

     }

var checkForNull = function(arr) {
    
    for (i = 0; i < arr.length; i++ ) {
    
        if ( arr[i] === null) {
        arr[i] = ""
        }
    
    }
    return arr;
};

var formatPhoneNumber = function(number) {
    debugger;
    
    formattedNumber = number.slice(0, 3) + "-" + number.slice(3, 6) + "-" + number.slice(6, 10);
    
    
    return formattedNumber;

}

var checkPhoneNumber = function (number) {
    if (number === "--") {
        number = "No number provided."
    }
    debugger;
    return number

}

// API call for beer brewing recipes
  
function breweryFinderApi(answer, idx) {

    if (idx === 0) {
      
      var urlQuery = "https://api.openbrewerydb.org/breweries?by_city=" + answer + "&per_page=50"
    }
    else {
      var urlQuery = "https://api.openbrewerydb.org/breweries?by_name=" + answer + "&per_page=1"

    };
  $.ajax({
      url: urlQuery,
      method: "GET"
  })

  // store all of the retrieved data inside an object called "response"
  .then(function (response) {
    console.log(response);
    var columnEl = $('<div>').attr('id', 'row').addClass("columns is-flex-wrap-wrap mt-3 pb-3 is-justify-content-center")
    console.log(columnEl)
    for (var i = 0; i < response.length; i++ ) {
      createBreweryContent(response[i], columnEl);
    }
    $('#test').append(columnEl)
    });
}




function loadPage() {
    var instructionsArr = JSON.parse(localStorage.getItem("searched-input"))
    console.log(instructionsArr)
    if (instructionsArr[1] === "Drink Name") {
        var title = (instructionsArr[1] + ": " + instructionsArr[0]).toUpperCase()
        document.querySelector("#result-title").innerHTML = title
        cocktailNameSearch(instructionsArr[0])
    } else if (instructionsArr[1] === "Random Drink") {
        var title = (instructionsArr[1] + ": " + instructionsArr[0]).toUpperCase()
        document.querySelector("#result-title").innerHTML = title
        cocktailRandom()
    } else if (instructionsArr[1] === "Brewery Name") {
        var title = (instructionsArr[1] + ": " + instructionsArr[0]).toUpperCase()
        document.querySelector("#result-title").innerHTML = title
        breweryFinderApi(instructionsArr[0], 1)
    } else if (instructionsArr[1] === "Brewery Location") {
        var title = (instructionsArr[1] + ": " + instructionsArr[0]).toUpperCase()
        document.querySelector("#result-title").innerHTML = title
        breweryFinderApi(instructionsArr[0], 0)
    }

}

window.onload = loadPage()

