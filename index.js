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
    }
    
    createTree() {
      this.button.createButton(this.sliders)
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
  
  class Button {
    constructor() {
    }
    //мб будет лучше просто пробрасывать idшники и обращаться к соотв элемент после создания комп-в
    createButton(data) {
      const toModify = data.values()
      const size = data.size
      for (let i = 0; i < size; i++) {
        const rButton = document.createElement('button')
        const htmlDiv = toModify.next().value
        htmlDiv.append(rButton)
        console.log(htmlDiv)
        //console.log(toModify.next().value.append(rButton)); // 500, 350, 50
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