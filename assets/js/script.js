
// YOUR CODE HERE
var searchTerm = document.querySelector("#searchTerm");
var searchTerm2 = document.querySelector("#searchTerm2");

// API key ticketmaster
var tmApi = '&apikey=2MALjZsA5tAXCU1xKvJPNTzJVAsqk24J';

// YOUR CODE HERE
var loadEventsByCity = function() {
  // var rating = document.getElementById("rating").value;
  var theirSearch = searchTerm.value.trim();
 
      var tmApiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?sort=date,asc&city='
      + theirSearch + tmApi;

      fetch(tmApiUrl)
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            // Create a variable that will select the <div> where the GIF will be displayed
            // var univHeadline = document.createElement('h3');
            // univHeadline.textContent = 'Showing all events in ' + searchTerm.value;
            console.log('is this even running?');
            for(var i = 0; i < response._embedded.events.length; i++) {
              var univContainer = document.querySelector("#event-response-container");

              var univSearchReturnListContainer = document.createElement('div');
              univSearchReturnListContainer.classList = "col s12 m4";
              univContainer.append(univSearchReturnListContainer);

              var univSearchReturnList = document.createElement('div');
              univSearchReturnList.classList = "card";
              univSearchReturnListContainer.append(univSearchReturnList);

              var univSearchReturnCardDiv = document.createElement('div');
              univSearchReturnCardDiv.classList = "card-list";
              univSearchReturnList.append(univSearchReturnCardDiv);

              var univSearchReturnCardImage = document.createElement('img');
              univSearchReturnCardImage.setAttribute('href', response._embedded.events[i].images[4].url);
              univSearchReturnCardDiv.append(univSearchReturnCardImage);

              var univSearchReturnCardContentDiv = document.createElement('div');
              univSearchReturnCardContentDiv.classList = "card-content";
              univSearchReturnList.append(univSearchReturnCardContentDiv);

              var univSearchReturnCardContentP = document.createElement('p');
              univSearchReturnCardContentP.classList = "card-content";
              univSearchReturnCardContentP.textContent = response._embedded.events[i].name;
              univSearchReturnCardContentDiv.append(univSearchReturnCardContentP);

              var univSearchReturnCardActionDiv = document.createElement('div');
              univSearchReturnCardActionDiv.classList = "card-action";
              univSearchReturnList.append(univSearchReturnCardActionDiv);

              var univSearchReturnCardActionLink = document.createElement('a');
              univSearchReturnCardActionLink.classList = "card-content";
              univSearchReturnCardActionLink.innerHTML = `<a href="${response._embedded.events[i].url}" target="_blank">Link to Event</a>`;
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
        
        for(var i = 0; i < response.length; i++) {
          // console.log(response[i]);
          var brewContainer = document.querySelector("#brewery-response-container-events");
          
          var brewSearchListItem = document.createElement('div');
          brewSearchListItem.classList ="col s12 m12";
          brewContainer.append(brewSearchListItem);
          
          var brewSearchListItemCardDiv = document.createElement('div');
          brewSearchListItemCardDiv.classList = "brew-list grey lighten-4 card";
          brewSearchListItem.append(brewSearchListItemCardDiv);

          var brewSearchListItemCardSpan = document.createElement('span');
          brewSearchListItemCardSpan.classList = "brewery-title";
          brewSearchListItemCardSpan.textContent = response[i].name;
          brewSearchListItemCardDiv.append(brewSearchListItemCardSpan);

          var brewSearchListItemCardP = document.createElement('p');
          brewSearchListItemCardP.textContent = 'address goes here';
          brewSearchListItemCardDiv.append(brewSearchListItemCardP);

          var brewSearchListItemCardP2 = document.createElement('p');
          brewSearchListItemCardP2.textContent = 'phone unmber goes here';
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
        
        for(var i = 0; i < response.length; i++) {
          // console.log(response[i]);
          var brewContainer = document.querySelector("#brewery-response-container");
          
          var brewSearchListItem = document.createElement('div');
          brewSearchListItem.classList ="col s6 m3";
          brewContainer.append(brewSearchListItem);
          
          var brewSearchListItemCardDiv = document.createElement('div');
          brewSearchListItemCardDiv.classList = "brew-list grey lighten-4 card";
          brewSearchListItem.append(brewSearchListItemCardDiv);

          var brewSearchListItemCardSpan = document.createElement('span');
          brewSearchListItemCardSpan.classList = "brewery-title";
          brewSearchListItemCardSpan.textContent = response[i].name;
          brewSearchListItemCardDiv.append(brewSearchListItemCardSpan);

          var brewSearchListItemCardP = document.createElement('p');
          brewSearchListItemCardP.textContent = 'address goes here';
          brewSearchListItemCardDiv.append(brewSearchListItemCardP);

          var brewSearchListItemCardP2 = document.createElement('p');
          brewSearchListItemCardP2.textContent = 'phone unmber goes here';
          brewSearchListItemCardDiv.append(brewSearchListItemCardP2);

          var brewSearchReturnLink = document.createElement('button');
          brewSearchReturnLink.classList = "btn";
          brewSearchReturnLink.innerHTML = `<a href="${response[i].website_url}" target="_blank" style="font-size:12px; color: white">Visit Website</a>`;
          brewSearchListItemCardDiv.append(brewSearchReturnLink);

          searchTerm.value = '';
        };

      });
        
};


