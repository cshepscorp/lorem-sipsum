// here is my little note for Will
// YOUR CODE HERE
var searchTerm = document.querySelector("#searchTerm");
var searchTerm2 = document.querySelector("#searchTerm2");

var eventsButton = document.querySelector("#events-button");
var eventsSearchResultsEl = document.querySelector("#events-search-results1");
var eventsSearchResultsEl2 = document.querySelector("#events-search-results2");
var eventsSearchResultsEl3 = document.querySelector("#events-search-results3");


// API key ticketmaster
var tmApi = '&apikey=2MALjZsA5tAXCU1xKvJPNTzJVAsqk24J';

var addHideClass = function() {
  console.log('events button was clicked');
  eventsSearchResultsEl.classList.remove('hide');
  eventsSearchResultsEl2.classList.remove('hide');
  eventsSearchResultsEl3.classList.remove('hide');
};
var loadEventsByCity = function() {
  // var rating = document.getElementById("rating").value;
  var theirSearch = searchTerm.value.trim();
  eventsSearchResultsEl.classList.add("show")
 
      var tmApiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?sort=date,asc&countryCode=US&city='
      + theirSearch + tmApi;

      fetch(tmApiUrl)
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {

            for(var i = 0; i < 12; i++) {
              var univContainer = document.querySelector("#event-response-container");

              var univSearchReturnListContainer = document.createElement('div');
              univSearchReturnListContainer.classList = "col s12 m6";
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

              var univSearchReturnCardActionDiv = document.createElement('div');
              univSearchReturnCardActionDiv.classList = "card-action";
              univSearchReturnList.append(univSearchReturnCardActionDiv);

              var univSearchReturnCardActionLink = document.createElement('a');
              // univSearchReturnCardActionLink.classList = "card-content";
              univSearchReturnCardActionLink.innerHTML = `<a href="${response._embedded.events[i].url}" target="_blank">Event Link</a>`;
              univSearchReturnCardActionDiv.append(univSearchReturnCardActionLink);

              searchTerm.value = '';
            };

          });

          var brewApiUrl = 'https://api.openbrewerydb.org/breweries/search?query=' + theirSearch;
  
  fetch(brewApiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        
        for(var i = 0; i < 10; i++) {
          // console.log(response[i]);
          var brewContainer = document.querySelector("#brewery-response-container-events");
          
          var brewSearchListItem = document.createElement('div');
          brewSearchListItem.classList ="col";
          brewContainer.append(brewSearchListItem);
          
          var brewSearchListItemCardDiv = document.createElement('div');
          brewSearchListItemCardDiv.classList = "brew-list grey lighten-4 card";
          brewSearchListItemCardDiv.style.height = '180px';
          brewSearchListItemCardDiv.style.width = '250px';
          brewSearchListItem.append(brewSearchListItemCardDiv);

          var brewSearchListItemCardSpan = document.createElement('span');
          brewSearchListItemCardSpan.classList = "brewery-title";
          brewSearchListItemCardSpan.textContent = response[i].name;
          brewSearchListItemCardDiv.append(brewSearchListItemCardSpan);

          var brewSearchListItemCardP = document.createElement('li');
          brewSearchListItemCardP.textContent = response[i].street
          brewSearchListItemCardDiv.append(brewSearchListItemCardP);

          var brewSearchListItemCardP2 = document.createElement('li');
          brewSearchListItemCardP2.textContent = response[i].phone;
          brewSearchListItemCardP2.style.marginBottom = '20px';
          brewSearchListItemCardDiv.append(brewSearchListItemCardP2);

          var brewSearchReturnLink = document.createElement('button');
          brewSearchReturnLink.classList = "btn";
          brewSearchReturnLink.innerHTML = `<a href="${response[i].website_url}" target="_blank" style="font-size:12px; color: white">Visit Website</a>`;
          brewSearchListItemCardDiv.append(brewSearchReturnLink);

          searchTerm.value = '';
        };

      });
        
};

var loadBreweriesByCity = function() {
  // var rating = document.getElementById("rating").value;
  var theirSearch = searchTerm2.value.trim();
 
  var brewApiUrl = 'https://api.openbrewerydb.org/breweries/search?query=' + theirSearch;
  
  fetch(brewApiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        
        for(var i = 0; i < 12; i++) {
          // console.log(response[i]);
          var brewContainer = document.querySelector("#brewery-response-container");
          
          var brewSearchListItem = document.createElement('div');
          brewSearchListItem.classList ="col s12 m4";
          brewContainer.append(brewSearchListItem);
          
          var brewSearchListItemCardDiv = document.createElement('div');
          brewSearchListItemCardDiv.classList = "brew-list grey lighten-4 card";
          brewSearchListItemCardDiv.style.height = '180px';
          brewSearchListItem.append(brewSearchListItemCardDiv);

          var brewSearchListItemCardSpan = document.createElement('span');
          brewSearchListItemCardSpan.classList = "brewery-title";
          brewSearchListItemCardSpan.textContent = response[i].name;
          brewSearchListItemCardDiv.append(brewSearchListItemCardSpan);

          var brewSearchListItemCardP = document.createElement('li');
          brewSearchListItemCardP.textContent = response[i].street;
          brewSearchListItemCardDiv.append(brewSearchListItemCardP);

          var brewSearchListItemCardP2 = document.createElement('li');
          brewSearchListItemCardP2.textContent = response[i].phone;
          brewSearchListItemCardP2.style.marginBottom = '10px';
          brewSearchListItemCardDiv.append(brewSearchListItemCardP2);

          var brewSearchReturnLink = document.createElement('button');
          brewSearchReturnLink.classList = "btn";
          brewSearchReturnLink.innerHTML = `<a href="${response[i].website_url}" target="_blank" style="font-size:12px; color: white">Visit Website</a>`;
          brewSearchListItemCardDiv.append(brewSearchReturnLink);

          searchTerm.value = '';
        };

      });
        
};
var appendControlEvent = function() {
  var eventContainerEl = document.querySelector('#event-response-container');
  eventContainerEl.classList.add('check-class');

  var eventBreweryContainerEl = document.querySelector('#brewery-response-container-events');
  eventBreweryContainerEl.classList.add('check-class');

  var checkEvents = eventContainerEl.getAttribute('class');
  var checkEventsBrew = eventBreweryContainerEl.getAttribute('class');

  if (!checkEvents && !checkEventsBrew) {
    loadEventsByCity();
  } else {
    eventContainerEl.innerHTML = '';
    eventBreweryContainerEl.innerHTML = '';

    loadEventsByCity();
  };

};


var appendControlBrewery = function() {
  var brewContainerEl = document.querySelector('#brewery-response-container');
  brewContainerEl.classList.add('check-class');
  console.log(brewContainerEl);

  var checkBrew = brewContainerEl.getAttribute('class')

  if (!checkBrew) {
    loadBreweriesByCity
  } else {
    brewContainerEl.innerHTML = '';

    loadBreweriesByCity();
  };
};

eventsButton.addEventListener("click", addHideClass);
