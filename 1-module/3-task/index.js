function ucFirst(str) {
  
  let firstLetter = str[0];
  
  if (firstLetter === undefined) {
    return '';
  }else {
    firstLetter = firstLetter.toUpperCase();
  };

  return firstLetter + str.slice(1);
}