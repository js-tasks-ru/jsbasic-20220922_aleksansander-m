function factorial(n) {

  if (n <0){
    return NaN;
  };

  if (n < 2) {
    return 1;
  };


  let a = 1;

  for (let i = 2; i <= n; i++){
    
    a = a * i;
    
  }
  return a;

}

