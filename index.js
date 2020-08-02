"use strict";

const api_key = "By3gpLOn6L89azNYIxXUHPwwHsoDVlTjjACbaqw9";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function getNationalParks(limit, stateCode) {
  //create obect that provides key-value pairs for each query params needed
  const params = {
    api_key,
    stateCode,
    limit,
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $(".error-message").text(`Something went wrong: ${err}`);
    });
}

function displayResults(responseJson) {
  console.log(responseJson);
  const { data } = responseJson;
  $(".results-list").html("");
  $(".results-list").append(`<p>Number of results: ${data.length}`);

  for (let i = 0; i < { data }.data.length; i++) {
    $(".results-list").append(
      `<li>${data[i].name} - ${data[i].description} - ${data[i].url}</li>`
    );
  }
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    const searchState = $(".js-search-state").val();
    const searchResults = $(".js-search-results").val();
    $(".js-search-state").val("");
    $(".js-search-results").val("10");
    $(".results-list").append(
      '<img src="loading.gif" alt="Loading..." width="250"/>'
    );
    getNationalParks(searchResults, searchState);
  });
}

$(watchForm);
