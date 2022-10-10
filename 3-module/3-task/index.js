function camelize(str) {
 
  let firstToUpperCase = str[0] === '-';

  return str.split('-').
    map((item, index) => {
      if (item == "" || index == 0 && !firstToUpperCase) {
        return item;
      } else {
        return item[0].toUpperCase() + item.slice(1);
      }
      }).
    join('');

}