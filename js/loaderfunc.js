;
(function() {
    function id(v) {
        return document.getElementById(v)
    }

    function loadbar() {
        let prog = id("progress"),
            img = document.images,
            c = 0,
            tot = img.length;
        if (tot == 0) {
            return doneLoading()
        }

        function imgLoaded() {
            c += 1;
            let perc = ((100 / tot * c) << 0) + "%";
            prog.style.width = perc;
            if (c === tot) {
                return doneLoading()
            }
        }

        function doneLoading() {
            setTimeout(function() {
                prog.style.opacity = "none";
                prog.style.opacity = 0
            }, 1800)
        }
        for (let i = 0; i < tot; i += 1) {
            let tImg = new Image();
            tImg.onload = imgLoaded;
            tImg.onerror = imgLoaded;
            tImg.src = img[i].src
        }
    }
    document.addEventListener('DOMContentLoaded', loadbar, false)
}());