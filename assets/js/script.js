var searchFormEl = document.querySelector("#search-form-events"); // search area's form id
// YOUR CODE HERE
var searchTerm = document.querySelector("#searchTerm");

// API key ticketmaster
var tmApi = '&apikey=2MALjZsA5tAXCU1xKvJPNTzJVAsqk24J';


// YOUR CODE HERE
var loadEventsByCity = function() {
  // var rating = document.getElementById("rating").value;
  var theirSearch = searchTerm.value.trim();
  // var apiUrl = 'https://api.giphy.com/v1/gifs/search?api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&q=' + theirSearch + '&rating=' + rating;
  var brewApiUrl = 'https://api.openbrewerydb.org/breweries/search?query=' + theirSearch;

  // fetch(brewApiUrl)
  //     .then(function(response) {
  //       return response.json();
  //     })
  //     .then(function(response) {
  //       // brewContainer.innerHTML = '';
  //       // Create a variable that will select the <div> where the GIF will be displayed
  //       var brewHeadline = document.createElement('h3');
        
  //       for(var i = 0; i < response.length; i++) {
  //         // console.log(response[i]);
  //         var brewContainer = document.querySelector("#brewery-response-container");
          
  //         var brewSearchListItem = document.createElement('div');
  //         brewSearchListItem.classList ="card";

  //         var brewSearchReturn = document.createElement('a');
  //         brewSearchReturn.setAttribute('href', response[i].website_url);
  //         brewSearchReturn.setAttribute('type', 'submit');
  //         brewSearchReturn.setAttribute('target', '_blank');
  //         brewSearchReturn.textContent = response[i].name;
  //         console.log(brewSearchReturn + 'is bse');
  //         brewContainer.append(brewSearchListItem);
  //         brewSearchListItem.append(brewSearchReturn);

  //         brewContainer.append(brewSearchReturn);
  //         searchTerm.value = '';
  //       };

  //     });

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
              univContainer.textContent = 'testing';

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

              // Append to the <div>
              
              // univSearchReturnList.append(univSearchReturn);
              searchTerm.value = '';
            };
            // univContainer.prepend(univHeadline);
          });
        
};

console.log('is this loading');

searchFormEl.addEventListener("submit", loadEventsByCity);
