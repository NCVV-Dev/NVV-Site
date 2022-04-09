getText("fetch_outageinfo.txt");
async function getText(file) {
  let FetchObj = await fetch(file);
  let FetchTxt = await FetchObj.text();
  document.getElementById("outageinfdyn").innerHTML = FetchTxt;
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

fetchtime__d = document.getElementById('response');

fetch('/').then(function(response) {
    fetchtime__d.insertAdjacentHTML('beforebegin', response.timing + 'ms');
    return response.json();
})