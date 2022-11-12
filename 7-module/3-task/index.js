import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {

    this.elem = renderElem(steps, value);

    this.elem.addEventListener('click', event => {
      let position = event.clientX - this.elem.getBoundingClientRect().left;
      let lenth = this.elem.getBoundingClientRect().right -
        this.elem.getBoundingClientRect().left;

      let newStep = Math.round(position / lenth * (steps - 1));

      this.elem.querySelector('.slider__value').textContent = newStep;

      let curStep = 0;
      let clAct = 'slider__step-active';
      for (const span of this.elem.querySelector('.slider__steps').children) {
        if (curStep == newStep) {
          if (!span.classList.contains(clAct)) {
            span.classList.add(clAct);
          }
        } else {
          span.classList.remove(clAct);
        }
        curStep++;
      }

      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');

      let leftPercents = newStep / (steps - 1) * 100;; // Значение в процентах от 0 до 100

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      this.value = newStep;

      let sliderChange = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      })

      this.elem.dispatchEvent(sliderChange);


    })






  }
}

function renderElem(steps, value) {

  let sliderStepsText = "";

  for (let index = 0; index < steps; index++) {
    let e = (index == value) ? '<span class="slider__step-active"></span>\n' : '<span></span>\n';
    sliderStepsText = sliderStepsText + e;
    //console.log(sliderStepsText);
  };
  let grad = value / (steps - 1) * 100;

  //console.log (sliderStepsText);
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
