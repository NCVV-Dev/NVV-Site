if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
    if (location.search.indexOf('app=true') > -1) {
        document.write('<link rel="stylesheet" type="text/css" href="https://mobile.ncvisualsvault.cc/ncv.css" />');
      }
}