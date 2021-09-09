let header = document.getElementById('top');
let menu = document.getElementById('navigation');
let menuBurger = document.getElementById('menuBurger');
let body = document.getElementsByTagName('body')[0];
let goTopBtn = document.getElementById('gotop');

let toggleMenu = function() {
    menuBurger.classList.toggle('is-active');
    menu.classList.toggle('hidden');
    header.classList.toggle('fixed');
    body.classList.toggle('active-menu');
    goTopBtn.classList.toggle('active-menu');
}
menuBurger.addEventListener('click', toggleMenu);

let menuList = document.querySelectorAll('#navigation a');
for (let i = 0; i < menuList.length; i++) {
    menuList[i].addEventListener('click', toggleMenu);
}
