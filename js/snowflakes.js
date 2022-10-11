let browserWidth, browserHeight, snowflakes = [],
    numberOfSnowflakes = 50,
    resetPosition = !1,
    enableAnimations = !1,
    reduceMotionQuery = matchMedia("(prefers-reduced-motion)");

function setAccessibilityState() {
    enableAnimations = !reduceMotionQuery.matches
}

function setup() {
    enableAnimations && (window.addEventListener("DOMContentLoaded", generateSnowflakes, !1), window.addEventListener("resize", setResetFlag, !1))
}

function Snowflake(e, t, s, o) {
    this.element = e, this.speed = t, this.xPos = s, this.yPos = o, this.scale = 1, this.counter = 0, this.sign = Math.random() < .5 ? 1 : -1, this.element.style.opacity = (.1 + Math.random()) / 3
}

function setTransform(e, t, s, o) {
    o.style.transform = `translate3d(${e}px, ${t}px, 0) scale(${s}, ${s})`
}

function generateSnowflakes() {
    let e = document.querySelector(".snowflake"),
        t = e.parentNode;
    t.style.display = "block", browserWidth = document.documentElement.clientWidth, browserHeight = document.documentElement.clientHeight;
    for (let s = 0; s < numberOfSnowflakes; s++) {
        let o = e.cloneNode(!0);
        t.appendChild(o);
        let n = getPosition(50, browserWidth),
            i = getPosition(50, browserHeight),
            r = new Snowflake(o, 5 + 40 * Math.random(), n, i);
        snowflakes.push(r)
    }
    t.removeChild(e), moveSnowflakes()
}

function moveSnowflakes() {
    if (enableAnimations)
        for (let e = 0; e < snowflakes.length; e++) {
            (t = snowflakes[e]).update()
        }
    if (resetPosition) {
        browserWidth = document.documentElement.clientWidth, browserHeight = document.documentElement.clientHeight;
        for (e = 0; e < snowflakes.length; e++) {
            let t;
            (t = snowflakes[e]).xPos = getPosition(50, browserWidth), t.yPos = getPosition(50, browserHeight)
        }
        resetPosition = !1
    }
    requestAnimationFrame(moveSnowflakes)

    return 1;
}

function getPosition(e, t) {
    return Math.round(-1 * e + Math.random() * (t + 2 * e))
}

function setResetFlag(e) {
    resetPosition = !0
}
setAccessibilityState(), reduceMotionQuery.addListener(setAccessibilityState), setup(), Snowflake.prototype.update = function() {
    this.counter += this.speed / 5e3, this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40, this.yPos += Math.sin(this.counter) / 40 + this.speed / 30, this.scale = .5 + Math.abs(10 * Math.cos(this.counter) / 20), setTransform(Math.round(this.xPos), Math.round(this.yPos), this.scale, this.element), this.yPos > browserHeight && (this.yPos = -50)
};