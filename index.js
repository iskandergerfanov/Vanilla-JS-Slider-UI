/*(function() {
  const sliders = document.querySelectorAll('.slider-iska')
})()*/

class Model {
  options: Array<object>;
  constructor() {
    this.data = new Map();
  }
  
  setOptions() {
    //отдать статику View и установить "постоянное значение"
  }
  //TODO: поменять название
  addSlider(o: object | null){
    this.options.push(o)
    // установить дэфолтное состояние
  }
  
  edit(id: number) {
    return this.options.filter(i => i.id === id)
    //перевызов View
  }
  
  viewData() {
    return this.options
  }
   // Чтение данных \|/
}

class View {
  
  
  
  //получить слайдары, создать элементы, добавить данные
  //интерпретирует бизнес логику, то есть преобразует кол-во в статику DOMa
  //Кругляш
  //TODO: map for datas
  constructor() {
    this.sliders = new Map();
    this.button = new Button();
    this.range = new Range()
    this.onChanged = this.onChanged.bind(this);
    
  }
  
  onChanged() {
    console.log(this.sliders)
    this.range.ChangeRange(this.sliders)
  }
  
  createTree() {
    this.button.createButton(this.sliders)
    this.button.addActionButton(this.onChanged)
    this.range.createRange(this.sliders)
  }
  
  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)

    return element
  }

  getElement(selector) {
    const element = document.querySelector(selector)
    return element
  }
}

class sliderInstance {
  constructor() {    
    this.buttons = new Button()
  }
  
  
}

class Button extends View{
  constructor() {
  }
  
  //мб будет лучше просто пробрасывать idшники и обращаться к соотв элемент после создания комп-в
  createButton(data) {
    const toModify = data.values()
    const size = data.size
    console.log(data)
    for (let i = 0; i < size; i++) {
      const htmlDiv = toModify.next().value
      if(htmlDiv.dataset.multiply === 'two') {
        const lButton = document.createElement('button')
        const rButton = document.createElement('button')  
        lButton.style.left = 0 + 'px'
        rButton.style.left = 275 + 'px'
        lButton.classList.add('button', 'lbutton')
        rButton.classList.add('button', 'rbutton')
        htmlDiv.append(lButton, rButton)
      } else {
        const Button = document.createElement('button') 
        Button.classList.add('button')
        htmlDiv.append(Button)
      }
    }
  }
  
  addActionButton(changer) {
    let a = document.querySelectorAll('.button')
    a.forEach( i => {
      i.onmousedown = (event) => {
        //объявить об изменении     
        let slider = event.target.closest('.slider-iska');
        let thumb = event.target;   
        let shiftX = event.clientX - thumb.getBoundingClientRect().left;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        function onMouseMove(event) {
          changer()
          let newLeft = event.pageX - shiftX - slider.getBoundingClientRect().left;
          if (newLeft < 0) {
            newLeft = 0;
          }
          let rightEdge = slider.offsetWidth - thumb.offsetWidth;
          if (newLeft > rightEdge) {
            newLeft = rightEdge;
          }

            thumb.style.left = newLeft + 'px';
          }
          function  onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
          }
      }
    })
  }
  
}

class Range {
  constructor() {
   
  }
  
  createRange (data) {
    const toModify = data.values()
    const size = data.size
    
    for (let i = 0; i < size; i++) {
      const htmlDiv = toModify.next().value
      
      if(htmlDiv.dataset.multiply === 'two') {
        const Range = document.createElement('div');
        Range.classList.add('full-info');
        htmlDiv.append(Range)
      } else {
        const width = htmlDiv.querySelector('.button').offsetLeft;
        const Range = document.createElement('div');
        Range.classList.add('info');
        Range.style.width = 5 + width + 'px'
        htmlDiv.append(Range)
      }
    }
  }
  
  ChangeRange(data) {
    const toModify = data.values()
    const size = data.size
    
    for (let i = 0; i < size; i++) {
      const htmlDiv = toModify.next().value
      
      if(htmlDiv.dataset.multiply === 'two') {
        const R = htmlDiv.querySelector('.rbutton').offsetLeft
        const L = htmlDiv.querySelector('.lbutton').offsetLeft
        const Range = htmlDiv.querySelector('.full-info')
        Range.style.width = 5 + R - L + 'px'
        Range.style.left = L + 'px'
      } else {
        const width = htmlDiv.querySelector('.button').offsetLeft;
        const Range = htmlDiv.querySelector('.info') ;
        Range.style.width = 5 + width + 'px'
        htmlDiv.append(Range)
      }
    }
  }
}

/*
class Flag extends sliderInstance{
    constructor(sliders) {
      super(sliders);
  }
}
*/
/*
class Line extends sliderInstance{
    constructor(sliders) {
      super(sliders);
  }
}
*/
/*
class Input extends sliderInstance{
    constructor(sliders) {
      super(sliders);
  }
}
*/

/*
One or Two Buttons
*/
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    
  }
  
  
  setConfig(o: object | null) {
     //console.log(o)
  }  
  
  
  //Обработать введённые атрибуты и поместить их в View
  
  selectAllSliders() {
    const sliders = document.querySelectorAll('.slider-iska')
    for(let i of sliders) {
      let id = Date.now() * Math.random()
      this.view.sliders.set(id,  i)
    }
      //this.view.sliders.set(3, {i: 'ad'})
  }
  
   initialComponents() {
     this.view.createTree()
   }
   setDataToModel() {
      this.view.sliders.keys()
      this.data.set()
  }
  
  
  //Поместить данные с ключами в модель
  
  // установить атрибут полученному диву, привязать к айди и передать данные в модель
  // установить конфигурацию
  // сделать связь между компонентами
  // вертикаль|горизонталь устанавливается классом 
  // установить аттрибут в элемент
}

//const model = new Model()

function createConfigSlider(o: object | null) {
  const sliderControl = new Controller(new Model(), new View())
  //return model.addSlider({b: 1, id: 1})
  sliderControl.setConfig(o)
  sliderControl.selectAllSliders()
  sliderControl.initialComponents()
  // при динамическом изменении, установить пересчет параметров  и задать максимальные, если они невалидны
}

//формируем конфиг "на лету"
createConfigSlider({
  'min-size': 0,
  'max-size': 10,
  'currentValues': {first: 0, second: 10},
  'step': 1,
  'indicator': true
})

//console.log(model.edit(1))
// Как взаимодействуют данные и объявленные блоки ? 
// Как формировать восставлять конфигурацию? 