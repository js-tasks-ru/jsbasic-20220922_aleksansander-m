function getMinMax(str) {
  
  let arr = str.split(' ').
    map(item => Number(item)).
    filter(item => item > -Infinity && item < Infinity).
    sort((a, b) => a-b);
  
  return {
    min: arr[0],
    max: arr.pop(),
}
  
}