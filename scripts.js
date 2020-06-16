'use strict'; // это строгий режим стандарта JS6

/* a = 5;
console.log(a); выйдет ошибка в строгой (use strict) версии JS и нет без
(use strict) */ 

// "Comment me"

/* "And" 
    "ME!" */


console.log(leftBorderWidth); // получим undifined
var leftBorderWidth = 1; // var старая версия, она существует ещё до выполнения скрипта.
console.log(leftBorderWidth); // получим 1

// console.log(second); // код выдадет ошибку, т.к. он её не может найти
let second = 2; // современный стандарт переменной, создаётся толко тогда когда код до неё доходит, кроме того эта переменная может быть видна только в коде ограниченным фигурными скобками, т.е. если эту переменную заключить в скобки команда консольлог выдадет ошибку, т.к. не увидит переменную
console.log(second); // если ниже то код найдет её

const pi = 3.14; // как let, только менять нельзя (условно)
console.log(second);

// типы данных
var number = 5; // могут быть целыми и дробными, так же Infinity (который можно получить при делении на 0) и NaN (если умножить число на строку и т.д.)
var string = "Hello!";
var sym = Symbol();
var boolean = true;
null; // когда чего то в коде просто не существует
undefined; // когда какой-либо объект существуе, но значения никакого не имеет
var obj = {}; // используется для хранения любых данных

console.log(4/0); // Infinity
console.log('string'*4); // NaN
// console.log(something);  это null (ссылка на несуществующую вещь)

let something;
console.log(something); // undefined

let persone = { //объект
    name: "John", //свойство состоит из - ключ: значение
    age: 25,
    isMarried: false
};
console.log(persone.name); // получим John (добрались до значения свойства name)
console.log(persone["name"]); // если мы хотим добраться до свойства, заданное любой строкой, это может быть большое название, которое мы не сможем получить при помощи точки (используется реже чем точка)

// массив (частный случай объектов) используется для хранения данных (числа, фунции, объекты и т.д. и не обязательно однородных) которые идут по порядку от нуля и выше
let arr = ['plun.png', 'orange.jpeg', 'apple.bmp'];
console.log(arr[2]); // получаем apple.bmp
console.log(arr[0]); // получаем plun.png


/* // простое общение с пользователем
alert ("Hello world"); // сообщение 
// confirm ("Are you here?"); // выедет два варианта на выбор ok и отмена

let answer = confirm ("Are you here?");
console.log(answer); // если в предыдыщем шаге выбрать ok (вернёт true), если отмена (вернёт false) */

// let answer = prompt("Вам есть 18 лет?", ""); // пользователь может ввести ответ
// console.log(answer); // получим в консоль ответ от пользователя
// console.log(typeof(answer)); // получим в консоль sring, т.к. все вводимые пользователем символы буть то цифры или ещё что-то все равно строка. При помощи typeof можно проверять данные на тот тип который они содержат
// console.log(typeof(arr)); // в консоль получим object, т.к. массив это частный случай наших объектов 
// console.log(typeof(null)); // в консоль получим object это оффициальная ошибка JS

// Операторы
let answer = +prompt("Вам есть 18 лет?", "Да"); // если перед значением представленной строкой поставить плюс то она обратится в числовой тип данных
console.log(typeof(answer)); // получим number

console.log("arr" + " - object"); // получим arr - object (произошла конкотенация) это строка
console.log(4 + " - object"); // получим 4 - object (произошла конкотенация) это строка
console.log(4 + +" - object"); // получим NaN, т.к. " - object" перевелось в number, но это не число.

let incr = 10,
    decr = 10;

// incr++; // увеличивает значение на 1
// decr--; // уменьшает значение на 1
// console.log(incr); получим 11
// console.log(decr); получим 9

// console.log(++incr); //можно прям в консоле прописать данные команды (здесь применена префиксная форма, так же получим 11, т.е. сразу вернет увелтченное на 1 значение)
// console.log(--decr); // здесь применена префиксная форма, так же получим 9, сразу вернет уменьшенное на 1 значение
console.log(incr++); // постфиксная форма сначала вернёт 10, а потом увеличит на 1
console.log(decr--); // постфиксная форма сначала вернёт 10, а потом уменьшит на 1

console.log(5%2); // вернет остаток от деления двух чисел (здесь вернет 1)
console.log("2" == 2); // вернет true, т.к. сравнивает по значениям (один знак = это присваивание)
console.log("2" === 2); // строгое сравнение по типам данных (получим false)

let isChecked = true,
    isClose = true;
console.log(isChecked && isClose); // если оба (или три, четыре) значения вырны получем true, если хотя бы одно ложь получим false
console.log(isChecked || isClose); // вернет true если хотя бы один из аргументов правда, если все аргументы ложные вернет false
console.log(isChecked || !isClose); // оператор отрицание ! меняет значене, т.е. !isClose станет не true a false

// Условия
/* if (2*4 ==8) {
    console.log("Верно");
}

if (3*4 == 8) {
    console.log("Верно");
} else {
    console.log("Не верно");
}

if (1) {
    console.log("Верно");
} else {
    console.log("Не верно");
} */
/* let num = 50;

if (num < 49) {
    console.log('Неверно!');
} else if (num > 100) {
    console.log('Много');
} else {
    console.log('Верно!');
};

(num == 50) ? console.log('Верно!') : console.log('Неверно!'); // Тернарный оператор (т.к. в его работе участвуют три аргумента), если два (например 2 + 2) то это бинарный, если один то унарный (например инкримент (++) или дикримент(--))

switch (num) {
    case num < 49:
        console.log('Неверно!');
        break;
    case num > 100:
        console.log('Много!');
        break;
    case num > 80:
        console.log('Все ещё много!');
        break;
    case 50:
        console.log('Верно!');
        break;
    default:
        console.log('Что-то пошло не так');
        break;
};

switch (num) {
    case num < 49:
        console.log('Неверно!');
        break;
    case num > 100:
        console.log('Много!');
        break;
    case num > 80:
        console.log('Все ещё много!');
        break;
    default:
        console.log('Что-то пошло не так');
        break;
}; */

// Циклы
let num = 50;

/* while (num < 55) {
    console.log(num); //проверь, а потом сделай
    num++;
}; */

do {
    console.log(num); //сделай, а потом проверь
    num++;
}
while (num < 55);

for (let i = 1; i < 8; i++) {
    console.log(i);
};

for (let i = 1; i < 8; i++) {
    if (i == 6) {
        break;                  //прервать цикл если i равно 6
    }
    console.log(i);
};

for (let i = 1; i < 8; i++) {
    if (i == 6) {
        continue;               // цикл продолжается, но пропускает 6
    }
    console.log(i);
};