// This is probably the easiest way to track mobile devices and redirect them to more usable website version
if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
  window.location.href = "https://mobile.ncvisualsvault.cc/"
}