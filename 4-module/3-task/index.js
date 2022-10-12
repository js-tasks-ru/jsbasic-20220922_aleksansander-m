function highlight(table) {
  for (const row of table.rows) {
    
    let cNum = getCellNumbers(table);
    
    if (row.parentElement == table.tHead) {
      continue;
    }
    
    switch (row.cells[cNum.Status].dataset.available) {
      case undefined:
        row.hidden = true;
        break;
      case 'false':
        row.classList.add('unavailable');
        break;
      case 'true':
        row.classList.add('available');
        break;  
    };
 
    switch (row.cells[cNum.Gender].textContent) {
      case 'm':
        row.classList.toggle('male', true);
        row.classList.toggle('female', false);
        break;
    
        case 'f':
          row.classList.toggle('male', false);
          row.classList.toggle('female', true);
          break;
    }

    if (Number(row.cells[cNum.Age].textContent)  < 18 ) {
      row.style.textDecoration = 'line-through'; 
    }
  }
}


function getCellNumbers(table) {
  return {
    Name: 0,
    Age: 1,
    Gender: 2,
    Status: 3
  }

  
}
