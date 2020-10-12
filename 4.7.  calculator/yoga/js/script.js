window.addEventListener('DOMContentLoaded', function() {
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    /* info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) { // ниже тот же код, но с использованием стрелочной функции
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }                
            }
        }
    }); */

    info.addEventListener('click', event => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }                
            }
        }
    });

    // Timer

    let deadline = '2020-08-27';

    function getTimeRemaining (endtime) {

        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));
            
            // если необходимо отразить отсавщееся количество часов в формате 24 часа с днями
            // hours = Math.floor((t/1000/60/60) % 24); 
            // days = Math.floor((t/(1000*60*60*24)));
        
        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num) {
                if(num <= 9) {
                    return '0' + num;
                } else return num;
            };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent ='00';
            }
        }
    }

    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'), // кнопка узнать больше одна
        overlay = document.querySelector('.overlay'), // блок в котором содержится модальное окно
        close = document.querySelector('.popup-close'), // элмент крестик в модальном окне
        tabsBtn = document.querySelectorAll('.description-btn'), // кнопки узнать подробнее в табах
        modalBtn = document.querySelector('#about'); // родитель, в ктором содержаться more и modalBtn, а так почти весь контетн, переменная modalBtn использовалась для делегтрованния события more и modalBtn
    
    // функция которая показывает модальное окно и не дает прокручиваться окну
    function showModal() {                       
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // вешаем обработчик событий на modalBtn, чтобы делегировать событие на дочерние элементы, которые получаем при клике и свойста объекта event записываются в него. Далее создаем переменную let target и записываем в неё свойство target объекта event. Далее делаем проверку на дурака, существует ли элемент на который мы кликнули и содержит ли этот элемент класс description-btn или more, если да, то добавляем к текущему элемену класс more-splash и запускаем функцию showModal().
    /* modalBtn.addEventListener('click', function(event) {
        let target = event.target;
        if(target && target.classList.contains('description-btn') || target.classList.contains('more')) {
            target.classList.add('more-splash');
            showModal(); // сначала сделал showModal(target), затем убрал, вроде всё работает 
            
        }
    }); */
    // тот же код что и выше, толко со стрелочной функцией
    modalBtn.addEventListener('click', event => {
        let target = event.target;
        if(target && target.classList.contains('description-btn') || target.classList.contains('more')) {
            target.classList.add('more-splash');
            showModal(); // сначала сделал showModal(target), затем убрал, вроде всё работает 
            
        }
    });

    // вешаем обработчик событий на элемент close (крестик в модальном окне), при клике на него скрывается модальное окно, удаляется класс (more-splash') с переменной more в которой лежит кнопка, переберается псевдомассив tabsBtn при помощи метода forEach и если находит в элементе псевдомассива класс 'more-splash', удаляет его и далее overflow очищается и окно браузера снова перемещается.
    /* close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        tabsBtn.forEach(function (item) {
            item.classList.remove('more-splash');
        });
        document.body.style.overflow = '';
    }); */
    // тот же код что и выше, толко со стрелочной функцией
    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        tabsBtn.forEach(function (item) {
            item.classList.remove('more-splash');
        });
        document.body.style.overflow = '';
    });
    
    // код ниже по отдельности для кнопки more и для кнопок tabsBtn, выше улучшенный код
    /* more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    tabsBtn.forEach(function(item) {
        item.addEventListener('click', function() {
            overlay.style.display = 'block';
            item.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });  */
    
    // Form

    let messages = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
        
    statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function(event) {
            event.preventDefault();     
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);
            
            function postData(data) {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest(); 
                    
                    request.open('POST', 'server.php');
        
                    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
                    request.addEventListener('readystatechange', function() {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    }); 
        
                    request.send(data);
                });
            } // End postData
            
            function clearInput() {
                for (let i = 0; i < input.length; i++) {     
                    input[i].value = '';                  
                }
            }
    
            postData(formData)
                .then(()=> statusMessage.innerHTML = messages.loading)
                .then(()=> statusMessage.innerHTML = messages.success)
                .catch(()=> statusMessage.innerHTML = messages.failure)
                .then(clearInput)
        });
    }

    sendForm(form);

    // Slider

    let slideIndex = 1, // параметр текущего слайда (какой слай показывать)
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex); // 1
    
    function showSlides(n) { // функция переключения слайдов, n-аргумент это номер слайда // 1
        if (n > slides.length) { // > 4
            slideIndex = 1;
        }
        if (n < 1) {            // < 1
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');
        /* for (let i = 0; i < slides.length; i++) {    // выше тот же цикл, только в современном формате
            slides[i].style.display = 'none';
        } */
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block'; // slidIndex - 1, показывает нулевой слайд
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) { 
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });
    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {                                    // e 2
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) { // i 0, 1, 2, 3, 4 
                currentSlide(i);                                                       // d -1, 0, 1, 2, 3
            }                                                                          // 3
        }
    });

    // кликаем на третъю точку, в event получаем [2], цикл начинает перебор i = 0,
    // далее идет сравнение, если event[2] == dots[0-1=-1], в currentSlide переменная i(0) не передается
    // продолжает перебор i = 1, event[2] == dots[1-1=0], в currentSlide переменная i(1) не передается
    // продолжает перебор i = 2, event[2] == dots[2-1=1], в currentSlide переменная i(2) не передается
    // продолжает перебор i = 3, event[2] == dots[3-1=2], т.к. e[2] == d[2] передаем в currentSlide переменную i(3)
    // продолжает перебор i = 4, event[2] == dots[4-1=3], в currentSlide переменная i(4) не передается
    // далее по цепочке вызывается функция currentSlide(3), в которой вызывается функция showSlides(3)
    // в которой проверяется условие 3 не больше 4 и 3 не меньше 1, 
    // выполняется условие slides[slideIndex - 1].style.display = 'block'; 3-1=2 и показывается третий слайд

    // Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;
        
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });
   
    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
});
