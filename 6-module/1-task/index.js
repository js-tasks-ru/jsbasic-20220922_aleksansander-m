/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {

    let table = document.createElement('table');
    table.insertAdjacentHTML('beforeend', ' <thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead>');

    let arr = rows.map(row => `<tr>
    <td>${row.name}</td>
    <td>${row.age}</td>
    <td>${row.salary}</td>
    <td>${row.city}</td>
    <td><button>X</button></td>
    </tr>`).join ('');
 
    let tbody = document.createElement("tbody");
    tbody.insertAdjacentHTML('beforeend', arr);

    table.append(tbody);

    table.addEventListener('click', event =>{

      if (event.target.tagName != 'BUTTON') {
        return;
      }

      event.target.parentNode.parentNode.remove();
    })

    this.elem = table;

  }

  

    
  
}
