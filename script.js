'use strict';

function getRepos(handle) {
  
  const url = `https://api.github.com/users/${handle}/repos`;

  const options = {
    headers: new Headers({
      Accept: "application/vnd.github.v3+json"
    })
  };

  console.log(`Finding repos for ${handle}`);

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-error-message').text(`Something went wrong: ${error.message}`)
    });

  function displayResults(responseJson) {
    console.log(responseJson);
    $('#js-search-handle').val("");
    $('#username').text(`${handle}`);
    $('#repo-list').empty();
    responseJson.forEach(repo => $('#repo-list').append(`<li><a href="${repo.url}">${repo.name}</a></li>`));
    $('#results').removeClass('hidden');
  }

}

function watchForm() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    const handle = $('#js-search-handle').val();
    getRepos(handle);
  });
}

$(function() {
  watchForm();
});