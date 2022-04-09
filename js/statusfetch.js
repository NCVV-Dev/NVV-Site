getText("fetch_outageinfo.txt");
async function getText(file) {
  let myObject = await fetch(file);
  let myText = await myObject.text();
  document.getElementById("outageinfdyn").innerHTML = myText;
}