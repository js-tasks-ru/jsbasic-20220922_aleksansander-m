import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  
  constructor() {

    this.elem = makeElement();
    this.elem.querySelector('.modal__close')
      .addEventListener('click', (event)=> {
        this.close();
      })

    


  }
  open() {
    document.body.appendChild(this.elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', closeByEsc);
  }
  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }
  setBody(node) {
    let modalBody = this.elem.querySelector('.modal__body'); 
    modalBody.innerHTML = '';
    modalBody.append(node);
  }
  close(){
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    
  }









  
}

function closeByEsc(event) {
  
 
  if (event.key == 'Escape') {
    console.log(document.querySelector('.modal'));
    document.querySelector('.modal').remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', closeByEsc);

  }
}
    

function makeElement() {
  let el = createElement(`
    <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          
        </h3>
      </div>

      <div class="modal__body">
        
      </div>
    </div>

    </div>
    `);
    return el;
}