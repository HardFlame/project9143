
const page = document.querySelector('.page__container');
//window.onload = begin();


//первичне создание
function begin () {
//контейнер для сообщений
create__message__form();
//контейнер для сборки
create__patern__form();
//контейенр для АПП
create__ataftr__form();
}

function create__message__form () {
   //контейнер
   let container = create__element('div','message__container container','');
   let message__block = create__element('form','complete__message__block','');
   let textarea = create__element('textarea','complete__message','');
   //привязка к основному контейнеру
   page.appendChild(container);
   container.appendChild(message__block);
   message__block.appendChild(textarea);
   //кнопки
   let reset = create__element('input','button','');
   reset.setAttribute('type','reset');
   message__block.appendChild(reset);
   reset.onclick = () => {
      select__init();
      page.querySelectorAll('.select')[0].options.selectedIndex = 0
   }
   let copy = create__element('input','button','');
   copy.setAttribute('type','button');
   copy.setAttribute('value','копировать');
   message__block.prepend(copy)
   copy.onclick = () => {
      textarea.select();
      document.execCommand('copy');
   }
}
function create__patern__form () {
   //контейнер
   let container = create__element('div','select__container container','');
   let head = create__element('div','select__head','');
   let pattern = create__element('div','select__pattern','');
   //привязка к основному контейнеру
   page.prepend(container);
   container.appendChild(head);
   container.appendChild(pattern);
   //создание первичного выбора
   let head__list = create__list(obj);
   head.appendChild(head__list);
   //создание вторичного выбора
   head__list.onclick = () => {

      select__init ()

      //create__list__pattern(pattern__block,head__list);
   }
   //изменение значения вторичного выбора

}

function select__init () {
   let pattern = page.querySelector('.select__pattern');
   let head__list = page.querySelectorAll('.select')[0];
   //нужно проверить работу
   for (let i = 0, amount = pattern.childNodes.length; i < amount; i++) {
      pattern.removeChild(document.querySelector('.select__block'));
   }
   let pattern__block = create__checkbox__pattern (pattern,head__list,0)
}

function create__ataftr__form () {

}

function create__checkbox__pattern (pattern,head__list,checked) {
   let pattern__block = create__element('div','select__block','');
   let checkbox = document.createElement('input');
   checkbox.setAttribute('class','checkbox');
   if (checked === 1) {checkbox.checked = true};
   checkbox.setAttribute('type','checkbox');
   pattern.appendChild(pattern__block);
   pattern__block.appendChild(checkbox);
   // привязка события чека
   checkbox.onchange = (elem) => {
      if (elem.currentTarget.checked == true) {
         create__list__pattern (pattern__block,head__list);
         create__checkbox__pattern (pattern,head__list,0);
      } else {
            //удаление select на этой строчке и checkbox на последней(требуется доработка) строчке
            elem.path[1].removeChild(elem.path[1].querySelector('select'));
            elem.path[1].removeChild(elem.path[1].querySelector('.input__block'));
            elem.path[2].removeChild(elem.path[2].children[elem.path[2].children.length - 1])
      }
      message__construct();
   }
   return pattern__block;
}

function create__list__pattern (pattern__block,head__list) {
   //создание select и контейнера для input
   let pattern__list = create__list(obj.fill[head__list.options.selectedIndex]);
   let input__block = create__element('div','input__block','');
   //привязка к контейнеру
   pattern__block.appendChild(pattern__list);
   pattern__block.appendChild(input__block);
   //создание input
   create__input(input__block,obj.fill[head__list.options.selectedIndex].fill[pattern__list.options.selectedIndex]);
   //запись выбора в атрибут
   pattern__list.setAttribute('V',head__list.options.selectedIndex + ',' + pattern__list.options.selectedIndex)
   pattern__list.onchange = (elem) => {
      elem.currentTarget.setAttribute('V',head__list.options.selectedIndex + ',' + pattern__list.options.selectedIndex)
      for (let i = 0, amount = input__block.childNodes.length; i < amount; i++) {
         elem.path[1].querySelector('.input__block').removeChild(document.querySelector('.input'));
      }
      create__input(elem.path[1].querySelector('.input__block'),obj.fill[head__list.options.selectedIndex].fill[pattern__list.options.selectedIndex]);
      message__construct();
   }
}

function create__element (el,clas,func) {
   let elem = document.createElement(el);
   elem.setAttribute('class',clas);
   if (func != '') {
      elem.setAttribute('onchange',func);
   }
   return elem;
}

function create__list (obj) {
   let container = create__element('select','select','');
   for (let i = 0; i < obj.fill.length; i++) {
      let option = create__element('option','','');
      option.innerHTML = obj.fill[i].name;
      container.appendChild(option);
   }
   return container;
}

function create__input (container,array) {
   let amount = array.fill.length;
   for (let i = 1; i < amount; i++) {
      let input = create__element('input','input','')
      input.setAttribute('type','text');
      input.oninput = () => {
         message__construct();
      }
      container.appendChild(input);
   }

}

function message__construct() {
   let select__block__array = page.querySelectorAll('.select__block');
   let textarea = page.querySelector('.complete__message')
   let message = '';
   for (let i = 0, amount = select__block__array.length - 1; i < amount; i++) {
      let select = select__block__array[i].querySelector('.select').getAttribute('v').split(',');
      let select__head = select[0];
      let select__pattern = select[1];
      message = message + parse__input(select__head,select__pattern,select__block__array[i]);
      if (i < (amount - 1)) {
         message = message + '\n';
      }
   }
   textarea.innerHTML = message;
}

function parse__input (head,pattern,block) {
   let message = '';
   for (let i = 0, amount = block.querySelectorAll('.input').length; i <= amount; i++) {
      message = message + obj.fill[head].fill[pattern].fill[i];
      if (i != amount) {
         message = message + block.querySelectorAll('.input')[i].value.replaceAll('\n','');
      }
   }
   return message.trim().replaceAll('&nbsp','').replaceAll('  ',' ').replaceAll('  ',' ').replaceAll('  ',' ').replaceAll('  ',' ');
}
