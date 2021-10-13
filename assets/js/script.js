var searchTerm = document.querySelector("#searchTerm");
var searchTerm2;

var eventsButton = document.querySelector("#events-button");
var eventsSearchResultsEl = document.querySelector("#events-search-results1");
var eventsSearchResultsEl2 = document.querySelector("#events-search-results2");
var eventsSearchResultsEl3 = document.querySelector("#events-search-results3");

// API info
var dmApi = 'af775405a6cd37426f68ef95546e5d7c'; // personal google CS
// var dmApi = 'dacfd831a78aff5dfb256d77a9bbcb3c'; // work email CS
// var dmApi = 'bd8f07fd4ccba45e976bd5aff28bfb08' // Will Api key
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
              univSearchReturnListContainer.classList = "col s12 m12";
              univContainer.append(univSearchReturnListContainer);

              var univSearchReturnList = document.createElement('div');
              univSearchReturnList.classList = "card";
              univSearchReturnList.style.height = '180px';
              univSearchReturnList.style.maxHeight = '210px';
              univSearchReturnListContainer.append(univSearchReturnList);

              var univSearchReturnCardDiv = document.createElement('div');
              univSearchReturnCardDiv.classList = "card-list";
              univSearchReturnList.append(univSearchReturnCardDiv);

              var univSearchReturnCardContentDiv = document.createElement('div');
              univSearchReturnCardContentDiv.classList = "card-content";
              univSearchReturnCardContentDiv.style.backgroundImage = `url('${response._embedded.events[i].images[3].url}')`;
              univSearchReturnCardContentDiv.style.backgroundRepeat = 'none';
              univSearchReturnCardContentDiv.style.backgroundPosition = 'center center';
              univSearchReturnList.append(univSearchReturnCardContentDiv);

              var univSearchReturnCardContentP = document.createElement('p');
              univSearchReturnCardContentP.classList = "card-content";
              univSearchReturnCardContentP.innerHTML = response._embedded.events[i].name + `<br />` 
              + `<span class="font-date">` + response._embedded.events[i].dates.start.localDate + `</span>` 
              + `<br />` + `<span class="font-date">` + response._embedded.events[i]._embedded.venues[0].name + `</span>`;
              univSearchReturnCardContentDiv.append(univSearchReturnCardContentP);

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
              console.log(mostCommonZip + ' is the most common zip');

              var univSearchReturnCardActionDiv = document.createElement('div');
              univSearchReturnCardActionDiv.classList = "card-action";
              univSearchReturnList.append(univSearchReturnCardActionDiv);

              var univSearchReturnCardActionLink = document.createElement('a');
              // univSearchReturnCardActionLink.classList = "card-content";
              univSearchReturnCardActionLink.innerHTML = `<a href="${response._embedded.events[i].url}" target="_blank">Event Link</a>`;
              univSearchReturnCardActionDiv.append(univSearchReturnCardActionLink);

              searchTerm.value = '';
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

              for(var i = 0; i < 10; i++) {
                var restSearchListItem = document.createElement('div');
                restSearchListItem.classList ="col";
                restContainer.append(restSearchListItem);

                var restSearchListItemCardDiv = document.createElement('div');
                restSearchListItemCardDiv.classList = "col s12 m12 brew-list grey lighten-4 card";
                restSearchListItemCardDiv.style.backgroundImage = `url(./assets/images/dining-generic.jpg)`;
                restSearchListItemCardDiv.style.backgroundRepeat = 'none';
                restSearchListItemCardDiv.style.backgroundPosition = 'center center';
                restSearchListItemCardDiv.style.height = '180px';
                restSearchListItem.append(restSearchListItemCardDiv);
      
                var restSearchListItemCardSpan = document.createElement('span');
                restSearchListItemCardSpan.classList = "brewery-title";
                restSearchListItemCardSpan.textContent = response.data[i].restaurant_name;
                console.log('restSearchListItemCardSpan is ' + restSearchListItemCardSpan);
                restSearchListItemCardDiv.append(restSearchListItemCardSpan);
      
                var restSearchListItemCardP = document.createElement('li');
                restSearchListItemCardP.textContent = response.data[i].address.formatted;
                restSearchListItemCardDiv.append(restSearchListItemCardP);
      
                var restSearchListItemCardP2 = document.createElement('li');
                restSearchListItemCardP2.textContent = response.data[i].restaurant_phone;
                restSearchListItemCardP2.style.marginBottom = '20px';
                restSearchListItemCardDiv.append(restSearchListItemCardP2);
      
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
        
        for(var i = 0; i < 11; i++) {

          var brewSearchListItemCountry = response[i].country;
        
          if (brewSearchListItemCountry === 'United States') {
            var brewSearchListItem = document.createElement('div');
            brewSearchListItem.classList ='col';
            brewContainer.append(brewSearchListItem);

            var brewSearchListItemCardDiv = document.createElement('div');
            brewSearchListItemCardDiv.classList = "col s12 m12 grey lighten-4 card breweries-section";
            brewSearchListItemCardDiv.style.height = '180px';
            brewSearchListItemCardDiv.style.width = '250px';
            // brewSearchListItemCardDiv.style.backgroundImage = `url(./assets/images/brewery-generic.jpg)`;
            // brewSearchListItemCardDiv.style.backgroundImage = `url(./assets/images/${breweryImages[i]}`;
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
