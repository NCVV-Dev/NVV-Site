let highestNumber = 0;
document.querySelectorAll('.dwn__count').forEach(elem => {
    let downCount = parseInt(elem.innerText.trim())
    if (downCount > highestNumber)
        highestNumber = downCount
});

let icon = document.createElement("em");
const popular = document.createElement('div');
popular.textContent = 'Popular!';
popular.style = "position: absolute; font-size: 13px; text-align: center; color: var(--buttonhover); font-weight: 600;";
icon.className = "bx bxs-hot tooltip";
icon.style = "color: var(--buttonhover);";

document.querySelectorAll('.dwn__count').forEach(elem => {
  if (parseInt(elem.innerText.trim()) == highestNumber)
  {
    elem.appendChild(popular.cloneNode(true));
    elem.appendChild(icon.cloneNode(true));
  }
});