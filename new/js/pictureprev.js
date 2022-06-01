function initpicture() {
    const images = document.querySelectorAll('.cfgvrow img');
    const screenprev = document.querySelector('#preview');

    images.forEach(img => {
        img.addEventListener('click', function () {
            screenprev.style.backgroundImage = 'url(' + img.src + ')';
            screenprev.style.display = 'block';
        });
    });
}