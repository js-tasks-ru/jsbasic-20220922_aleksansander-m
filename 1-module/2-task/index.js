const { RuleTester } = require("eslint");

/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  //return name != undefined && length.name >= 4 && name.indexOf(' ') == -1 && true;
  if ( name === null || name.length < 4 || name.indexOf(' ') != -1 ) {
    return false
  }else return true
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
