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

    // создаем переменную в которой будет лежать объект с сообщениями о текущем состоянии запроса
    let messages = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    // получаем форму, инпуты в форме, создаем блок div и присваиваем ему класс status
    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'), // через вложенность получим только инпуты лежащие в main-form
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    // обработчик события вешается на форму с событием submit, это событие сработает только тогда, когда наша
    // форма отправляется, ошибкой будет повешать событие на кнопку, которая имеет type="submit" или это button
    // т.к. нужно отслеживать отправку формы на сервер
    form.addEventListener('submit', function(event) {
        event.preventDefault();     // отмена стандартного поведени браузера
        form.appendChild(statusMessage);
        
        let request = new XMLHttpRequest(); // создаем конструктор с объектом запроса XMLHttpRequest
        request.open('POST', 'server.php'); // настраиваем запрос 'POST' отправка данных 'server.php'- это url
        /* request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); // настраиваем заголовки http запроса */
        // если отправляем в JSON формате заголовок выгдядит так
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); 

        // получаем данные которые ввел пользователь в input при помощи объекта FormData, который сформирует ключ: значение;
        // в верстве в инпутах обязательно должен быть атрибут name, с него формируется ключ
        let formData = new FormData(form); // form это форма с которой мы хотим достать данные отправленые пользователем

        // чтобы преобоазовать данные с формы в JSON формат 
        // создаем пустой объект (промежуточный), чтобы его заполнить данными, которые есть в formData, используем цикл forEach
        let obj = {}; 
        formData.forEach(function(value, key) { 
            obj[key] = value;
        });
        // при помощи метода stringify(obj) превращаем обычный JS обект в JSON формат
        let json = JSON.stringify(obj);
        
        request.send(json); // отправляем тело в JSON формате

        /* request.send(formData); // отправляем данные на сервер с body (телом) formData, т.к. используется метод POST */

        // вешаем обработчик события на запрос request и отслеживаем его состояние при помощи события readystatechange
        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {   // при помощи свойства readyState объекта XMLHttpRequest узнаем состояние если < 4
                statusMessage.innerHTML = messages.loading; // вставлям текст с объекта messages, свойства loading
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = messages.success;
            } else {
                statusMessage.innerHTML = messages.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {    // очищаем формы после всего выполненого кода 
            input[i].value = '';                    // значение value становиться пустым
        }
    });
});
