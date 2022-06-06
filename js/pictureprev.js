function initpicture() {
    const images = document.querySelectorAll('.cfgvrow img');
    const screenprev = document.querySelector('#preview');
    const backgroundstyles = {
       "background-size": '50%',
    };

    images.forEach(img => {
        img.addEventListener('click', function () {
            screenprev.style.backgroundImage = 'url(' + img.src + ')';
            screenprev.style.display = 'block';
            Object.assign(screenprev.style, backgroundstyles);
        });
    });
}