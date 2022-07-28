var savedDrinkList = []
var bacValueEl = document.querySelector("#current-bac")



//calculates BAC using the WideMark Formula
function calculateBAC(weightInPounds, gender, totalTimeInHours, drinkList) {
    debugger;
    if (gender == "Male"){
        var alcoholGrams = convertDrinkToGrams(drinkList)
        bac = ((alcoholGrams/((weightInPounds * 454) * .68)) * 100) - (totalTimeInHours * .015) 
    } else {
        var alcoholGrams = convertDrinkToGrams(drinkList)
        bac = ((alcoholGrams/((weightInPounds * 454) * .55)) * 100) - (totalTimeInHours * .015) 
    }
    roundedBac = Math.round(bac * 1000) / 1000
    console.log(roundedBac)
    bacValueEl.innerHTML = roundedBac
    if (roundedBac <= .060) {
        bacValueEl.classList.add("has-background-success")
    } else if (roundedBac >.060 && roundedBac <= .13 ) {
        bacValueEl.classList.add("has-background-warning")
    } else { 
        bacValueEl.classList.add("has-background-danger")
    }

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
    var parentElId = event.target.parentElement.id
    drinkList = findUserDrinks(parentElId, drinkList)
    calculateBAC(userInfo.weight, userInfo.gender, timeElapsed, drinkList)
    bacValueEl.classList.remove("is-sr-only")
    document.querySelector("#already-drinking-btn").classList.add("is-sr-only")
    document.querySelector("#start-drinking-btn").classList.add("is-sr-only")
    document.querySelector("#search-again-btn").classList.remove("is-sr-only")
    document.querySelector("#home-btn").classList.remove("is-sr-only")

}
//adds additonal drink inputs when add drink button is clicked
function addDrinkElement(event) {
    event.preventDefault();
    var elClicked = event.target
    var addButton = elClicked.closest("#add-btn")
    var modal = elClicked.closest("#user-inputs-modal")
    columnContainerEl = document.createElement("div")
    columnContainerEl.classList = "columns"
    var parentEl = elClicked.parentElement.id
    if (parentEl === "tracking") {
        buildlabelInputEl("ABV", "abv-tracking", "column is-4")
        buildlabelInputEl("Ounces", "drinksize-tracking", "column is-4")
        buildlabelInputEl("Quantity", "quantity-tracking", "column is-3")
        var deleteBtn = document.createElement("button")
        deleteBtn.classList = "delete"
        deleteBtn.ariaLabel = "close"
        deleteBtn.id = "remove-drink-item"
        var columnEl = document.createElement("div")
        columnEl.classList = "column is-1"
        columnEl.appendChild(deleteBtn)
        columnContainerEl.appendChild(columnEl)
        modal.insertBefore(columnContainerEl, addButton)
    } else {
        buildlabelInputEl("ABV", "abv", "column is-4")
        buildlabelInputEl("Ounces", "drinksize", "column is-4")
        buildlabelInputEl("Quantity", "quantity", "column is-3")
        var deleteBtn = document.createElement("button")
        deleteBtn.classList = "delete"
        deleteBtn.ariaLabel = "close"
        deleteBtn.id = "remove-drink-item"
        var columnEl = document.createElement("div")
        columnEl.classList =  "column is-1"
        columnEl.appendChild(deleteBtn)
        columnContainerEl.appendChild(columnEl)
        modal.insertBefore(columnContainerEl, addButton)
    }
    findDrinkRemoveBtn()
}
//builds the html for the new drink inputs
function buildlabelInputEl(text, id, classCont) {
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
    columnEl.classList =  classCont
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

function trackDrinking(event) {
    event.preventDefault();
    var userInfo = findUserInfo("#weight-tracking", "#gender-tracking")
    localStorage.setItem("user", JSON.stringify(userInfo))
    var timestamp = Date.now()
    localStorage.setItem("time", JSON.stringify(timestamp))
    document.querySelector("#already-drinking-btn").classList.add("is-sr-only")
    document.querySelector("#start-drinking-btn").classList.add("is-sr-only")
    document.querySelector("#reset-app-btn").classList.remove("is-sr-only")
    document.querySelector("#add-drink-btn").classList.remove("is-sr-only")
    bacValueEl.classList.remove("is-sr-only")
    document.querySelector("#reset-app-btn").addEventListener("click", resetTracker)


}
function trackDrinkingDrinkAdd(event) {
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
function selectAPI(event) {
    var findForm = event.target.parentElement.id
    debugger;
    if(findForm === "drink"){
        var selectedDrinkApi = document.querySelector("#drink-api-select").value
        var selectedBrewApi = ""
    } else if (findForm === "brew") {
        var selectedBrewApi = document.querySelector("#brewery-api-select").value
        var selectedDrinkApi = ""
    }
    if (selectedDrinkApi === "Drink Name"){
        saveApiInfo(selectedDrinkApi, "#drink-search-text")
    } else if (selectedDrinkApi === "Random Drink") {
        saveApiInfo(selectedDrinkApi, "#drink-search-text")
    } else if (selectedBrewApi === "Brewery Name"){
        saveApiInfo(selectedBrewApi, "#brewery-search-text")
    } else if (selectedBrewApi === "Brewery Location") {
        saveApiInfo(selectedBrewApi, "#brewery-search-text")
    }

}

function saveApiInfo(functionName, id) {
    var saveArr = []
    var searchedText = document.querySelector(id).value.trim()
    var functionNeeded = functionName
    saveArr.push(searchedText, functionNeeded)
    localStorage.setItem("searched-input", JSON.stringify(saveArr))
    location.replace("./drinkfinder.html")
}

function resetTracker() {
    localStorage.clear()
    location.reload()
}

function removeAddDrinkEl(event) {
    var removeEl = event.target.closest(".columns")
    removeEl.remove()
}
function loadPage() {
    storedDrinks = JSON.parse(localStorage.getItem("drinks"))
    if (storedDrinks === null) {
        savedDrinkList = []
    } else {
        savedDrinkList = storedDrinks
        document.querySelector("#current-bac").classList.remove("is-sr-only")
        document.querySelector("#start-drinking-btn").classList.add("is-sr-only")
        document.querySelector("#already-drinking-btn").classList.add("is-sr-only")
        document.querySelector("#add-drink-btn").classList.remove("is-sr-only")
        document.querySelector("#reset-app-btn").classList.remove("is-sr-only")
        var userInfo = JSON.parse(localStorage.getItem("user"));
        var currentTime = Date.now() 
        var storedTime = JSON.parse(localStorage.getItem("time"));
        var unixElapsed = (currentTime - storedTime) / 1000
        var hours = Math.floor(unixElapsed/3600) % 24
        var minutes = Math.floor(unixElapsed / 60) % 60;
        var seconds = unixElapsed % 60;
        var timeElapsed = hours + (minutes / 60) + (seconds / 3600)
        calculateBAC(userInfo.weight, userInfo.gender, timeElapsed, savedDrinkList)
    }
    return savedDrinkList
}
function dropdownChanges(event) {
   var clickedEl = event.target.value
   console.log(event)
    if(clickedEl === "Drink Name") {
        document.querySelector("#drink-search-text").classList.remove("is-sr-only")
        document.querySelector("#call-api").innerHTML = "Submit"
    } else if (clickedEl === "Random Drink") {
        document.querySelector("#drink-search-text").classList.add("is-sr-only")
        document.querySelector("#call-api").innerHTML = "Get Random Drink"
    } else if (clickedEl === "Brewery Name") {
        document.querySelector("#brewery-search-text").classList.remove("is-sr-only")
        document.querySelector("#brewery-search-text").placeholder = "Enter name of Brewery"
    } else if (clickedEl === "Brewery Location") {
        document.querySelector("#brewery-search-text").classList.remove("is-sr-only")
        document.querySelector("#brewery-search-text").placeholder = "Enter location of Brewery"
    }
    
}

// Find a brewery function start
  
  var checkForNull = function(arr) {
    
    for (i = 0; i < arr.length; i++ ) {
      
      if ( arr[i] === null) {
        arr[i] = ""
      }
      
    }
    return arr;
  };
  
  var createBreweryContent= function(data) {
    
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

    
  
    //create ul element
    var breweryInfo = $('<ul>')
      .attr('id', 'brewery-info')
      .addClass("column is-4 box");
    // create list-items for each variable
    var nameEl = $('<li>')
     .text(name)
     .addClass("is-size-3 is-underlined");
    var addressEl = $('<a>')
     .attr('href','https://www.google.com/maps/place/' + address)
     .text(address);
    var phoneEl = $('<li>')
     .text("phone: " + phone);
    var websiteEl = $('<a>')
    .attr('href', website) 
    .text(website);
      //append list-items to ul
     $(breweryInfo).append(nameEl, addressEl, phoneEl, websiteEl);
     //append ul to html
     $("#test").append(breweryInfo);


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

      for (var i = 0; i < response.length; i++ ) {
        createBreweryContent(response[i]);
      }
    });
  }

window.onload = loadPage()
    
  

//event lsiteners for submit button and add drink button within modal
if(document.querySelector("#submit-modal") === null) {
    
} else {
  document.querySelector("#submit-modal").addEventListener("click", alreadyDrinking)
}
if(document.querySelector("#add-drink") === null) {
    
} else {
  (document.querySelectorAll("#add-drink") || []).forEach(($close) => {
    
    $close.addEventListener("click", addDrinkElement)
})
}

if(document.querySelector("#drink-api-select") === null) {

} else {
  document.querySelector("#drink-api-select").onchange = dropdownChanges;
}

if(document.querySelector("#brewery-api-select") === null) {

} else {
  document.querySelector("#brewery-api-select").onchange = dropdownChanges;
}

if(document.querySelector("#submit-modal-tracking") === null) {

} else {
  document.querySelector("#submit-modal-tracking").addEventListener("click", trackDrinking)
}

if(document.querySelector("#submit-modal-tracking-adddrink") === null) {
    
} else {
  document.querySelector("#submit-modal-tracking-adddrink").addEventListener("click", trackDrinkingDrinkAdd)
}

if(document.querySelector("#drinking") === null) {
    
} else {
  document.querySelector("#drinking").addEventListener("click", trackDrinkingDrinkAdd)
}

if(document.querySelector("#reset-app-btn") === null) {
    
} else {
  document.querySelector("#reset-app-btn").addEventListener("click", resetTracker)
}

if(document.querySelector("#call-api") === null) {
    
} else {
    (document.querySelectorAll("#call-api") || []).forEach(($callBtn) => {

    $callBtn.addEventListener("click", selectAPI)
    })
}


function findDrinkRemoveBtn() {
    if(document.querySelector("#remove-drink-item") === null) {
    
    } else {
        (document.querySelectorAll("#remove-drink-item") || []).forEach(($removeBtn) => {
    
        $removeBtn.addEventListener("click", removeAddDrinkEl)
        })
    }
}
if(document.querySelector("#home-btn") === null) {
    
} else {
  document.querySelector("#home-btn").addEventListener("click", function() {
    location.reload()
  })
}


document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
      (document.querySelectorAll('input[type="text"]') || []).forEach((input) => {
        input.value = ""
        })
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
  
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.modal;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
    }
});
});
