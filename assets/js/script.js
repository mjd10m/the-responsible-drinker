






































































































































































































































































































































































































































































































































































































































































































































































































































































































































































// event listen to for button
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
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

  // Find a brewery function start

  var checkForNull = function(data) {
    
    //set data we want to pull to their own variable
    var street = data.street;
    var city = data.city
    var name = data.name;
    var phone = data.phone;
    var website = data.website_url;
    var address = street + " " + city + ", " + data.state;
    var arr = [street, city, name, phone, website]

    // if data is undefined, set it to empty string
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === null) {
        arr[i] = "";
      }
      createBreweryContent(name, phone, website, address);
    }
  }
  
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
     $("#b-info-html").append(breweryInfo);


     }
    

  
  
  
  
// API call for beer brewing recipes
  
  $("#brewery-submit").click(function (event) {
    // user input variable
      var answer = input.value
    // user selected index of dropdown
      var idx = ($("#search-option")[0].selectedIndex);

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
      //reset input value
      input.value = ""
    });
  })