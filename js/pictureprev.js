function initpicture() {
    let e = document.querySelectorAll(".cfgvrow img"),
        c = document.querySelector("#preview"),
        r = {
            "background-size": "60%"
        };
    e.forEach(e => {
        e.addEventListener("click", function() {
            c.style.backgroundImage = "url(" + e.src + ")";
            c.style.display = "block";
            Object.assign(c.style, r);
        });
    });
};