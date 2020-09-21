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
});