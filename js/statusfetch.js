getText("fetch_outageinfo.txt");
async function getText(file) {
  let myObject = await fetch(file);
  let myText = await myObject.text();
  document.getElementById("outageinfdyn").innerHTML = myText;
}

window.fetch = (function(fetch) {
  return function(fn, t) {
    const begin = Date.now();
    return fetch.apply(this, arguments).then(function(response) {
      response.timing = Date.now() - begin;
      return response;
    });
  };
})(window.fetch);

fetch('https://github.com')
  .then(function(response) {
    console.log(response.timing + 'ms')
    return response.json();
  }).then(function(jsonData) {
    console.log(jsonData);
  }).catch(function(err) {
    console.log("Opps, Something went wrong!", err);
  })