/*(function() {
  const sliders = document.querySelectorAll('.slider-iska')
})()*/
class Model {
  constructor() {
    this.data = new Map();
    this.config = new Map(); 
  }

  edit(id, offset, className) {
    const oldArray = this.data.get(Number(id))
    if((
         (className === 'lbutton') && (oldArray.lbutton > oldArray.rbutton)) || 
         ((className === 'rbutton') && (oldArray.lbutton > oldArray.rbutton))) {
      this.data.set(Number(id), {...oldArray, 'lbutton': offset, 'rbutton': offset});
      return;
    }
    this.data.set(Number(id), {...oldArray, [className]: offset}) 
  }
   // Чтение данных \|/
}

class View {
  //Кругляш
  //TODO: map for datas
  constructor() {
    this.button = new Button()
    this.range = new Range()
    this.input = new Input()
    this.onChanged = this.onChanged.bind(this);
  }
  
  onChanged(id, offset, className, obj) {  
    this.range.ChangeRange(id, offset, className)
    this.button.change(id, obj)
    this.input.changeInputs(id, obj)
  } 
  //private
  createTree(config) {
    this.button.createButton(config)
    this.range.createRange(config)
    this.input.createInputs(config)
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
  change(id, obj) {
    const div = document.getElementById(id)
    for (var key in obj) {
      const button = div.querySelector(`.${key}`)
      button.style.left = obj[key] + 'px'
    }
  }
}

class Range {
  constructor() {  
  } 
  createRange (config) {
    const toModify = config.entries()
    const size = config.size
    for (let i = 0; i < size; i++) {
      const {0: id, 1: item} = toModify.next().value
      const htmlDiv = document.getElementById(id) 
      const Range = document.createElement('div');
      if(htmlDiv.dataset.multiply === 'two') {
        Range.classList.add('double-slider', 'info');
        htmlDiv.append(Range)
      } else {
        const width = htmlDiv.querySelector('.button').offsetLeft;
        Range.classList.add('single-slider', 'info');
        Range.style.width = 15 + width + 'px'
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
        console.log(l, offset)
        element.style.width = 15 + offset - l + 'px'
        element.style.left = l + 'px'
        break;
      case 'lbutton':
        const r = div.querySelector('.rbutton').offsetLeft 
        element.style.width = 15 + r - offset + 'px'
        element.style.left = offset + 'px'
        break;
      case 'obutton':
        element.style.width = 15 + offset + 'px'
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
class Input {
    constructor() {
    }
    createInputs(config) {
      console.log(config)
      const toModify = config.entries()
      const size = config.size
      for (let i = 0; i < size; i++) {
        const {0: id, 1: item} = toModify.next().value
        const htmlDiv = document.getElementById(id) 
        const wrapper = document.createElement('div') 
        wrapper.classList.add('slider-iska-wrapper')
        document.body.append(wrapper)
        wrapper.append(htmlDiv)
        if(htmlDiv.dataset.multiply === 'two') {
          const lInput = document.createElement('input') 
          lInput.type = 'number'
          lInput.classList.add('linput', 'input')
          lInput.value = 0
          lInput.min = 0
          lInput.max = 278
          const RInput = document.createElement('input') 
          RInput.type = 'number'
          RInput.classList.add('rinput', 'input')
          RInput.min = 0;
          RInput.value = 278
          RInput.max = 278;
          htmlDiv.before(lInput)
          htmlDiv.after(RInput)
        } else {
          const oInput = document.createElement('input') 
          oInput.type = 'number'
          oInput.classList.add('input', 'oinput');
          oInput.min = 0;
          oInput.value = 150;
          oInput.max = 278;
          htmlDiv.after(oInput)
        }
      }
    }
  
    changeInputs(id, obj) {
      const div = document.getElementById(id)
      for(let i in obj) {
        const nameInput = i.replace('button','input')
        const input = div.parentNode.querySelector(`.${nameInput}`)
        input.value = obj[i]
      }
    }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;       
    this.changeData = this.changeData.bind(this)
  }  
  
  changeData(id, offset, className) {
    const dataField = className.replace('button ', '')
    this.model.edit(id, offset, dataField)
    //this.view.onChanged(id, offset, dataField)
    this.view.onChanged(id, offset, dataField, this.model.data.get(Number(id)))
    
  }
  //Обработать введённые атрибуты и поместить их в View
  //
  configurateSliders() {
    const sliders = document.querySelectorAll('.slider-iska')
    for(let i of sliders) {      
      //получаем данные data атрибутов
      const conf = this.getAttributes(i.dataset); 
      const id = Math.floor((Date.now() * Math.random()) / 1000000) 
      if(i.dataset.multiply === 'two') {
        this.model.data.set(Number(id), {lbutton: 0, rbutton: i.clientWidth - 26})
      } else {
          this.model.data.set(Number(id), {obutton: i.clientWidth / 2})
      }
        
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
    const  defaults = { min: 0, max: 20, flag: false, step: 1, multiply: 'one', vertical: false};
    return {...defaults, ...div}
  }
  
  setAttributesId(div, id) {
    div.setAttribute('id', id)
  } 
   
  addActionButton(change) {
    const a = document.querySelectorAll('.slider-iska .button')  
    a.forEach( i => {
      i.onmousedown = (event) => {
        //объявить об изменении     
        const slider = event.target.closest('.slider-iska');
        const thumb = event.target;  
        const className = event.target.className        
        const shiftX = event.clientX - thumb.getBoundingClientRect().left;
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
          //Вызываю функцию объявления данных и отображения 
          const id = thumb.parentNode.getAttribute('id');
          change(id, newLeft/*thumb.offsetLeft*/, className)
          }
          function  onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
          }
      }
    })
  }    
  addInputAction(change) {
    const inputs = document.querySelectorAll('.slider-iska-wrapper .input')
    inputs.forEach(i => {
      i.addEventListener('change', (event) => {
        if(event.target.value < 0 || event.target.value > 276) {
          return;
        }
        const div = i.parentNode.querySelector('.slider-iska')
        const id = div.getAttribute("id")
        const nameClass = event.target.className.replace('input', '').replace(' ', '').replace('input','button')
        change(id, Number(event.target.value), nameClass)
      })
    })
  }
  //TODO: refactor
  focusButton(change) {
    const buttons = document.querySelectorAll('.slider-iska-wrapper .button')
    function keydown(event) {
        const div = event.target.parentNode
        const id = div.getAttribute("id")
        const className = event.target.className 
        const ofset = event.target.offsetLeft
        if ((event.code === 'ArrowRight' || event.code === 'ArrowUp') && ofset + 1 < 276) {
            change(id, ofset + 1,className)
        }
        if ((event.code === 'ArrowLeft' || event.code === 'ArrowDown') && ofset - 1 >= 0) {
            change(id, ofset - 1, className)
        }
      }
    function buttonMove(event) {
      if(event.target.parentNode.className === 'slider-iska') {
        console.log(event.pageX)
      }
    }
    
    buttons.forEach(i => {
     i.addEventListener('focus', (event) => {
      document.addEventListener('keydown', keydown)
      document.addEventListener('click', buttonMove)
    })
      
     i.addEventListener('blur', (event) => {
       document.removeEventListener('keydown', keydown);
     })
    })
  }                    
  // установить конфигурацию
  // вертикаль|горизонталь устанавливается классом 
}
//const model = new Model()
function createConfigSlider(o: object | null) {
  const sliderControl = new Controller(new Model(), new View())
  sliderControl.configurateSliders()
  sliderControl.initialComponents()
  sliderControl.addInputAction(sliderControl.changeData)
  sliderControl.addActionButton(sliderControl.changeData)
  sliderControl.focusButton(sliderControl.changeData)
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

// Как формировать восставлять конфигурацию? 

//отдельный метод для обращения данных к модели
//указатели
//событие click 
//step
//fix bugs: rbutton className has lbutton class 