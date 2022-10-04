function sumSalary(salaries) {
  
  let totalSumm = 0;
  
  for (const key in salaries) {
    
    let cSumm = salaries[key];
    
    if (typeof cSumm == 'number' && cSumm > -Infinity && cSumm < Infinity) {
    
      totalSumm = totalSumm + cSumm;
    
    }
  }

  return totalSumm;
}
