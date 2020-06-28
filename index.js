/*(function() {
  const sliders = document.querySelectorAll('.slider-iska')
})()*/
class Model {
  options: Array<object>;
  constructor() {
    this.data = new Map();
    this.config = new Map(); 
    //TODO: баллистика, которую нужно интерпретировать в физ. величины
  }
  
  setOptions() {
    //отдать статику View и установить "постоянное значение"
  }
  
  //TODO: поменять название
  addSlider(o: object | null){
    this.options.push(o)
    // установить дэфолтное состояние
  }
  
  edit(id, offset, className) {
    const oldArray = this.data.get(Number(id))
    this.data.set(Number(id), {...oldArray, [className]: offset})
    console.log(this.data.get(Number(id)))
    //TODO: BAD
  }

   // Чтение данных \|/
}

class View {
  //получить слайдары, создать элементы, добавить данные
  //интерпретирует бизнес логику, то есть преобразует кол-во в статику DOMa
  //Кругляш
  //TODO: map for datas
  constructor() {
    //TODO:
    this.sliders = new Map();
    this.button = new Button();
    this.range = new Range()
    //TODO:
    this.onChanged = this.onChanged.bind(this);
  }
  
  onChanged(id, offset, className) {  
    //this.changeData = observer
    //this.bind() 
    this.range.ChangeRange(id, offset, className)
  }
  
  bind(handler) {
    //this.handler = handler 
  }
  
  //private
  createTree(config) {
    //this.button.createButton(this.sliders)
    this.button.createButton(this.sliders)
    //this.button.addActionButton(this.onChanged)
    this.range.createRange(this.sliders)
  }
  /*
  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)

    return element
  }
  getElement(selector) {
    const element = document.querySelector(selector)
    return element
  }*/
}

class sliderInstance {
  constructor() {    
    this.buttons = new Button()
  }
  
  
}

class Button extends View{
  constructor() {
  }
  
  createButton(config) {
    const attributes = config.entries()
    const size = config.size
    for (let i = 0; i < size; i++) {
      const {0: id, 1: item} = attributes.next().value
      const htmlDiv = document.getElementById(id)    
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
        Button.classList.add('button', 'obutton')
        htmlDiv.append(Button)
      }
    }
  }
  // changer - проброшенная функция this.onChanged
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
        Range.classList.add('double-slider', 'info');
        htmlDiv.append(Range)
      } else {
        const width = htmlDiv.querySelector('.button').offsetLeft;
        const Range = document.createElement('div');
        Range.classList.add('single-slider', 'info');
        Range.style.width = 5 + width + 'px'
        htmlDiv.append(Range)
      }
    }
  } 
  ChangeRange(id, offset, className) {
    const div = document.getElementById(id)
    const element = div.querySelector('.info') 
    switch (className) {
      case 'rbutton':
        //TODO: reconstruct
        const l = div.querySelector('.lbutton').offsetLeft 
        element.style.width = 5 + offset - l + 'px'
        break;
      case 'lbutton':
        const r = div.querySelector('.rbutton').offsetLeft 
        element.style.width = 5 + r - offset + 'px'
        element.style.left = offset + 'px'
        break;
      case 'obutton':
        element.style.width = 5 + offset + 'px'
        break;
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
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;   
    
    //this.view.bindChange(this.handle)    
    this.changeData = this.changeData.bind(this)
  }  
  
  changeData(id, offset, className) {
    const dataField = className.replace('button ', '')
    this.model.edit(id, offset, dataField)
    this.view.onChanged(id, offset, dataField)
  }

  //Обработать введённые атрибуты и поместить их в View
  //TODO убрать данные из view 
  //
  configurateSliders() {
    const sliders = document.querySelectorAll('.slider-iska')
    for(let i of sliders) {
      //console.log(this.getAttributes(i.dataset))
      
      //получаем данные data атрибутов
      const conf = this.getAttributes(i.dataset); 
      
      const id = Math.floor((Date.now() * Math.random()) / 1000000) 
      
      //'Observer'
      //this.view.onChanged(this.changeData)
      
      
      this.view.sliders.set(id,  i)
      
      //
      this.model.data.set(Number(id), {0: 1})
      console.log(this.model.data)
      //конфигурация, отвечающая за визуальное отображение элемента
      this.model.config.set(id, conf)
      
      //установить блоку уникальную идентификатор
      this.setAttributesId(i, id)
    }     
  }
    
  initialComponents() { 
    this.view.createTree(this.model.config)
  }
  
  //конфиг из дата-атрибутов для модели 
  getAttributes(div) {
    const  defaults = { min: '5', flag: true, step: '4', multiply: 'one'  };
    return {...defaults, ...div}
  }
  
  setAttributesId(div, id) {
    div.setAttribute('id', id)
  } 
   
  addActionButton(change) {
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
          let newLeft = event.pageX - shiftX - slider.getBoundingClientRect().left;
          if (newLeft < 0) {
            newLeft = 0;
          }
          let rightEdge = slider.offsetWidth - thumb.offsetWidth;
          
          if (newLeft > rightEdge) {
            newLeft = rightEdge;
          }
            thumb.style.left = newLeft + 'px';
          
            //Вызываю функцию объявления данных и отображения 
            const id = thumb.parentNode.getAttribute('id');
            change(id, thumb.offsetLeft, thumb.className)
          }
          function  onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
          }
      }
    })
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
  sliderControl.configurateSliders()
  sliderControl.initialComponents()
  sliderControl.addActionButton(sliderControl.changeData)
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