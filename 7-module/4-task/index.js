import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {

    this.elem = renderElem(steps, value);

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let element = this.elem;

    element.addEventListener('click', clickOnpinterdown );
    
    function clickOnpinterdown(event) {
      let position = event.clientX - element.getBoundingClientRect().left;
      let lenth = element.getBoundingClientRect().right -
        element.getBoundingClientRect().left;

      let newStep = Math.round(position / lenth * (steps - 1));

      element.querySelector('.slider__value').textContent = newStep;

      let curStep = 0;
      let clAct = 'slider__step-active';
      for (const span of element.querySelector('.slider__steps').children) {
        if (curStep == newStep) {
          if (!span.classList.contains(clAct)) {
            span.classList.add(clAct);
          }
        } else {
          span.classList.remove(clAct);
        }
        curStep++;
      }

      let leftPercents = newStep / (steps - 1) * 100;; // Значение в процентах от 0 до 100

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      //this.value = newStep;

      let sliderChange = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: newStep, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      })

  
      element.dispatchEvent(sliderChange);
    }
    
    //-----часть - 2 ------
    //отключаем D&D по умолчанию
    thumb.ondragstart = () => false;

    thumb.onpointerdown = (event) => {

      let clSlDr = 'slider_dragging';
      if (!this.elem.classList.contains(clSlDr)) {
        this.elem.classList.add(clSlDr);
      }

      event.preventDefault();
      thumb.style.position = 'absolute';
      thumb.style.zIndex = 1000;

      let shiftX = event.clientX - this.elem.getBoundingClientRect().left;

      document.addEventListener('pointermove', onPointermove);

      function onPointermove(event) {
        event.preventDefault();
        let slider = document.querySelector('.slider')

        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let leftPercents = leftRelative * 100;

        let thumb = slider.querySelector('.slider__thumb');
        let progress = slider.querySelector('.slider__progress');

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

        let segments = steps - 1;
        let approximateValue = leftRelative * segments;

        let value = Math.round(approximateValue);
        slider.querySelector('.slider__value').textContent = value;
      }

      document.onpointerup = function (event) {
        document.removeEventListener('pointermove', onPointermove);
        clickOnpinterdown(event);
        element.classList.remove('slider_dragging');
      }
    }
  }
}

function renderElem(steps, value) {

  let sliderStepsText = "";

  for (let index = 0; index < steps; index++) {
    let e = (index == value) ? '<span class="slider__step-active"></span>\n' : '<span></span>\n';
    sliderStepsText = sliderStepsText + e;
  };
  let grad = value / (steps - 1) * 100;

  return createElement(`
  
  <div class="slider">

  <!--Ползунок слайдера с активным значением-->
  <div class="slider__thumb" style="left: ${grad}%;">
    <span class="slider__value">${value}</span>
  </div>

  <!--Заполненная часть слайдера-->
  <div class="slider__progress" style="width: ${grad}%;"></div>

  <!--Шаги слайдера-->
  <div class="slider__steps">
    ${sliderStepsText}
  </div>
  </div>
  </div>
  
  `);
}
