import { scrollTo } from 'scroll-js';

let goTopBtn = document.querySelector('#gotop');
if (goTopBtn) {
    goTopBtn.addEventListener('click', function(event) {
        event.preventDefault();
        scrollTo(document.body, {
            top: 0,
            duration: 500,
            easing: 'ease-out',
        }).then(function() {
            goTopBtn.style.display = 'none'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > document.documentElement.clientHeight) {
            goTopBtn.style.display = 'block'
        }
    });
}
