var searchTerm = document.querySelector("#searchTerm");
var searchTerm2;

var eventsButton = document.querySelector("#events-button");
var eventsSearchResultsEl = document.querySelector("#events-search-results1");
var eventsSearchResultsEl2 = document.querySelector("#events-search-results2");
var eventsSearchResultsEl3 = document.querySelector("#events-search-results3");

var cityButtons = document.querySelector("#city-buttons");
var eventResultsLength = 0;

// API info
// var dmApi = 'af775405a6cd37426f68ef95546e5d7c'; // personal google CS
// var dmApi = 'dacfd831a78aff5dfb256d77a9bbcb3c'; // work email CS
var dmApi = 'bd8f07fd4ccba45e976bd5aff28bfb08' // Will Api key
// var dmApi = '0b1da3bd2b6b0219770486baca056a30' // Daniel Api key
var tmApi = '&apikey=2MALjZsA5tAXCU1xKvJPNTzJVAsqk24J'; // API key ticketmaster CS

var addHideClass = function() {
  console.log('events button was clicked');
  eventsSearchResultsEl.classList.remove('hide');
  eventsSearchResultsEl2.classList.remove('hide');
  eventsSearchResultsEl3.classList.remove('hide');
};

// creating empty array to store returned zipcide values from initial search by city to use for restaurant search
var postalCodeContainer = [];

var loadEventsByCity = function(url, brewUrl) {
      fetch(url)
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            var univContainer = document.querySelector("#event-response-container");
            univContainer.innerHTML = '';

            for(var i = 0; i < 10; i++) {

              var univSearchReturnListContainer = document.createElement('div');
              univSearchReturnListContainer.classList = "col";
              univContainer.append(univSearchReturnListContainer);

              var univSearchReturnList = document.createElement('div');
              univSearchReturnList.classList = "col s12 m12 grey lighten-4 card";
              univSearchReturnList.style.height = '180px';
              univSearchReturnList.style.width = '250px';
              univSearchReturnList.style.backgroundImage = `url('${response._embedded.events[i].images[3].url}')`;
              univSearchReturnList.style.backgroundRepeat = 'none';
              univSearchReturnList.style.backgroundPosition = 'center center';
              univSearchReturnListContainer.append(univSearchReturnList);

              // var genre = response._embedded.events[i].classifications[0].genre.name;
              //var health = response._embedded.events[i].ticketing.healthCheck.summary;

              var univSearchReturnCardContentDiv = document.createElement('p');
              univSearchReturnCardContentDiv.classList = "brewery-info";
              univSearchReturnCardContentDiv.innerHTML = response._embedded.events[i].name + `<br />` 
              + `<span class="font-date">` + response._embedded.events[i].dates.start.localDate + `</span>`
              //+ `<br />` + `<span class="font-date">Please note: ` + health + `</span>` +
              + `<br />` + `<span class="font-date">` + response._embedded.events[i]._embedded.venues[0].name + `</span>`;

              univSearchReturnList.append(univSearchReturnCardContentDiv);

              var univSearchReturnZip = response._embedded.events[i]._embedded.venues[0].postalCode;
              postalCodeContainer.push(univSearchReturnZip);

              function findMostFrequent(postalCodeContainer) {
                let mf = 1;
                let m = 0;
                let item;
              
                for (let i = 0; i < postalCodeContainer.length; i++) {
                  for (let j = i; j < postalCodeContainer.length; j++) {
                    if (postalCodeContainer[i] == postalCodeContainer[j]) {
                      m++;
                      if (m > mf) {
                        mf = m;
                        item = postalCodeContainer[i];
                      }
                    }
                  }
                  m = 0;
                }
              
                return item;
              }
              
              var mostCommonZip = findMostFrequent(postalCodeContainer); 
              // console.log(mostCommonZip + ' is the most common zip');

              var univSearchReturnCardActionLink = document.createElement('button');
              univSearchReturnCardActionLink.classList = "btn";
              univSearchReturnCardActionLink.innerHTML = `<a href="${response._embedded.events[i].url}" target="_blank" style="font-size:12px; color: white">Visit Website</a>`;
              univSearchReturnList.append(univSearchReturnCardActionLink);

              searchTerm.value = '';
              ;
            };

            

          // Documenu stuff
          var dmApiUrl = 'https://api.documenu.com/v2/restaurants/search/fields?&zip_code=' + mostCommonZip;
           
          fetch(dmApiUrl, {
               "method": "GET",
               "headers": {
                 "x-api-key": dmApi,
                 "x-rapidapi-host": "documenu.p.rapidapi.com",
                 "x-rapidapi-key": "64257fa8d8mshadaafd031c3689fp12cff3jsn0e2233fd401f"
              }
            })
            .then(response => {
              console.log(response);
              return response.json();
            })
            .then(function(response) {
              var restContainer = document.querySelector("#restaurant-response-container-events");
              restContainer.innerHTML = '';

              for(var i = 0; i < postalCodeContainer.length; i++) {
                var restSearchListItem = document.createElement('div');
                restSearchListItem.classList ="col";
                restContainer.append(restSearchListItem);

                var cuisineType = response.data[i].cuisines[0];
                var cuisineType2 = response.data[i].cuisines[1];
                // console.log(cuisineType, cuisineType2);

                // change background of listing based on type of cuisine
                if (cuisineType.includes('Burgers')) {
                  cuisineType = 'burgers' 
                } else if (cuisineType.includes('American')) { 
                  cuisineType = 'american'
                } else if (cuisineType.includes('Asian')) { 
                  cuisineType = 'asian'
                } else if (cuisineType.includes('Japanese')) { 
                  cuisineType = 'japanese'
                } else if (cuisineType.includes('Italian')) { 
                  cuisineType = 'italian'  
                } else {
                  cuisineType = 'dining-generic'
                }

                if(cuisineType2) {
                  if (cuisineType2.includes('Mexican')) {
                    cuisineType = 'mexican'
                  } else if (cuisineType2.includes('Steak')) {
                    cuisineType = 'steak'
                  } else if (cuisineType2.includes('Sandwiches')) {
                    cuisineType = 'sandwiches' 
                  } else if (cuisineType2.includes('Irish')) {
                    cuisineType = 'irish' 
                  } else {
                    cuisineType = 'dining-generic'
                  }
                } 

                var restSearchListItemCardDiv = document.createElement('div');
                restSearchListItemCardDiv.classList = `col s12 m12 brew-list grey lighten-4 card ${cuisineType}`;
                restSearchListItemCardDiv.style.backgroundRepeat = 'none';
                restSearchListItemCardDiv.style.backgroundPosition = 'center center';
                restSearchListItemCardDiv.style.height = '180px';
                restSearchListItem.append(restSearchListItemCardDiv);
      
                var restSearchListItemCardSpan = document.createElement('p');
                restSearchListItemCardSpan.classList = "brewery-info";
                restSearchListItemCardSpan.innerHTML = response.data[i].restaurant_name + `<br />`
                + `<span class="font-date">` + response.data[i].address.formatted + `</span>` + `<br />`
                + `<span class="font-date">` + response.data[i].restaurant_phone + `</span>`;
                console.log('restSearchListItemCardSpan is ' + restSearchListItemCardSpan);
                restSearchListItemCardDiv.append(restSearchListItemCardSpan);
      
                var restSearchReturnLink = document.createElement('button');
                restSearchReturnLink.classList = "btn";
                restSearchReturnLink.innerHTML = `<a href="${response.data[i].restaurant_website}" target="_blank" style="font-size:12px; color: white">Visit Website</a>`;
                restSearchListItemCardDiv.append(restSearchReturnLink);
      
                searchTerm.value = '';
              };

          });
      });
               
  
  fetch(brewUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        var brewContainer = document.querySelector("#brewery-response-container-events");
        
      
        brewContainer.innerHTML = '';
        // var breweryImages = ['brewery-generic.jpg', 'brewery-generic2.jpg', 'brewery-generic3.jpg', 'brewery-generic4.jpg', 'brewery-generic5.jpg', 'brewery-generic6.jpg', 'brewery-generic7.jpg', 'brewery-generic8.jpg', 'brewery-generic9.jpg', 'brewery-generic10.jpg'];
        
        for(var i = 0; i < 10; i++) {

          var brewSearchListItemCountry = response[i].country;
        
          if (brewSearchListItemCountry === 'United States') {
            var brewSearchListItem = document.createElement('div');
            brewSearchListItem.classList ='col';
            brewContainer.append(brewSearchListItem);

            var brewSearchListItemCardDiv = document.createElement('div');
            brewSearchListItemCardDiv.classList = "col s12 m12 grey lighten-4 card breweries-section";
            brewSearchListItemCardDiv.style.height = '180px';
            brewSearchListItemCardDiv.style.width = '250px';
            brewSearchListItemCardDiv.style.backgroundImage = `url(./assets/images/brewery-generic${i}.jpg`;
            brewSearchListItemCardDiv.style.backgroundRepeat = 'none';
            brewSearchListItemCardDiv.style.backgroundPosition = 'center center';
            brewSearchListItem.append(brewSearchListItemCardDiv);

            var brewSearchListItemCardSpan = document.createElement('p');
            brewSearchListItemCardSpan.classList = 'brewery-info';
            brewSearchListItemCardSpan.innerHTML = response[i].name + `<br />`
            + `<span class="font-date">Brewery Type: ` + response[i].brewery_type + `</span>` + `<br />`
            + `<span class="font-date">` + response[i].street + `</span>` + `<br />`
            + `<span class="font-date">` + response[i].phone + `</span>`;
            brewSearchListItemCardDiv.append(brewSearchListItemCardSpan);

            var brewSearchReturnLink = document.createElement('button');
            brewSearchReturnLink.classList = "btn";
            brewSearchReturnLink.innerHTML = `<a href="${response[i].website_url}" target="_blank" style="font-size:12px; color: white">Visit Website</a>`;
            brewSearchListItemCardDiv.append(brewSearchReturnLink);

            searchTerm.value = '';
          }
        };

      });
        
};

// controlling how search responds with no new city name
var searchControl = function() {

  // get city value from user input
  var theirSearch = searchTerm.value.trim();
  
  if(theirSearch) {

    // un-comment this if you want to add button when user creates a search
    // var cityButtonValue = theirSearch;

    // var cityButton = document.createElement('button');
    // cityButton.classList = 'btn btn-secondary saved-city';
    // cityButton.textContent = cityButtonValue;
    // cityButton.setAttribute('id', cityButtonValue);
    // cityButton.setAttribute('type', 'submit');

    // cityButtons.append(cityButton);

    // save to localStorage
    var savedCityButtons = localStorage.getItem("saved city buttons");
    var savedCities;
    
    // if there are no saved scores, create array to save them
    if(savedCityButtons === null) {
      savedCities = [];
    } else {
      // use JSON.parse to allow array to save stringified values 
      savedCities = JSON.parse(savedCityButtons);
    }
    var savedCityButton = {
      name: theirSearch
    };

    savedCities.push(savedCityButton);

    // use JSON.stringify to allow local storage to save values 
    var savedCitiesString = JSON.stringify(savedCities);
    window.localStorage.setItem("saved city buttons", savedCitiesString)

  } else {
    alert("Please enter a valid city name")
  
  }
  var classification = document.getElementById("classification").value;
 
  if (!theirSearch) {
    theirSearch = searchTerm2;
    var tmApiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?sort=date,asc&size=40&countryCode=US&city='
      + theirSearch + '&' + tmApi + '&classificationName=' + classification;

    var brewApiUrl = 'https://api.openbrewerydb.org/breweries/search?query=' + theirSearch;
  
    loadEventsByCity(tmApiUrl, brewApiUrl);

  } else {
    searchTerm2 = theirSearch;

    var tmApiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?sort=date,asc&size=40&countryCode=US&city='
      + theirSearch + '&' + tmApi + '&classificationName=' + classification;

    var brewApiUrl = 'https://api.openbrewerydb.org/breweries/search?query=' + theirSearch;

    loadEventsByCity(tmApiUrl, brewApiUrl);

  }
};

eventsButton.addEventListener("click", addHideClass);
