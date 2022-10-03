function checkSpam(str) {
  
  return str.toLowerCase().includes("XXX".toLowerCase()) || str.toLowerCase().includes("1xBet".toLocaleLowerCase());
  
}