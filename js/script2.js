let obj = {
   name : 'Тематика сообщения',
   fill : [
      {
         name : 'Инфрмационный',
         fill : [
            {
               name : 'CRM',
               fill : ['По информации из CRM: '],
            },
            {
               name : 'Клиент',
               fill : ['Звонок клиенту: '],
            },
            {
               name : 'СД',
               fill : ['Ответ службы доставки: '],
            },
            {
               name : 'Склад',
               fill : ['Ответ от склада: '],
            },
         ]
      },
      {
         name : 'Сообщение для СД',
         fill : [
            {
               name : 'Дата отгрузки(Склад)',
               fill : ['По каким причинам заказ ',' не был отгружен в службу доставки. Прошу уточнить новую дату отгрузки.\nОжидаем ответа и просим предоставить его в кратчайший срок.'],
            },
            {
               name : 'Дата отгрузки(СЦ)',
               fill : ['Прошу уточнить дату отгрузки заказа ',' в службу доставки.\nЕсли заказ отгружен, прошу сообщить дату отгрузки и номер накладной.\nНа FTP сервере АПП не найден.'],
            },
         ]
      },
      {
         name : 'Письмо клиенту',
         fill : [
            {
               name : 'Недозвон(смс)',
               fill : ['По каким причинам заказ ',' не был отгружен в службу доставки. Прошу уточнить новую дату отгрузки.\nОжидаем ответа и просим предоставить его в кратчайший срок.'],
            },
            {
               name : 'Недозвон(письмо)',
               fill : ['По каким причинам заказ ',' не был отгружен в службу доставки. Прошу уточнить новую дату отгрузки.\nОжидаем ответа и просим предоставить его в кратчайший срок.'],
            },
         ],
      },
   ]
}
const page = document.querySelector('.page__container');

window.onload = begin();
window.onload = bbb();

function bbb() {
   const bbbb = 1;
}

console.log('===========================================3==');

function begin () {
   //----====
   beginMessage()
   //----
   beginSelect()
   //----
   beginAtaftp()
   //----====
}

function beginSelect () {
   let select__container = document.createElement('div');
   select__container.setAttribute('class','select__container container');
   let headlist = createlist(obj.fill);
   headlist.setAttribute('class','select__theme')
   let contheadlist = createcont('select__head');
   let contblockpage = createcont('select__page');
   //----
   //page.appendChild(select__container);
   page.prepend(select__container)
   contheadlist.appendChild(headlist)
   select__container.appendChild(contheadlist);
   select__container.appendChild(contblockpage);
   create(obj.fill[0],contblockpage);
   headlist.onchange = () => {
      //console.log(contblockpage.childNodes)
      //contblockpage.childNodes[0].remove();
      for (const element of contblockpage.childNodes) {
         element.remove();
      }
      create(obj.fill[headlist.options.selectedIndex],contblockpage)
   };
}
function beginMessage () {
   let message__container = document.createElement('div');
   message__container.setAttribute('class','message__container container');
   let message__block = createcont('complete__message__block')
   let message__area = document.createElement('textarea');
   message__area.setAttribute('class','complete__message')
   //----
   page.appendChild(message__container);
   message__container.appendChild(message__block);
   message__block.appendChild(message__area);
}

function beginAtaftp () {
   let ataftp__container = document.createElement('div');
   ataftp__container.setAttribute('class','ataftp__container container');
   //----
   page.appendChild(ataftp__container);
}

//obj.fill.ticketInf.fill

//body.appendChild(createlist(obj.fill.ticketInf.fill))

function create (obj,elem) {
   let cont = createcont('select__block');
   elem.appendChild(cont)
   let list = createlist(obj.fill);
   list.setAttribute('class','select');
   cont.appendChild(list);
   //---===
   construct(obj.fill[0]);
   let inptcont = createcont('');
   list.onchange = () => {
      construct();
      cont.appendChild(createinpt(inptcont,obj,list.options.selectedIndex));
   }
   //---===
}

function createcont (clas) {
   let cont = document.createElement('div');
   cont.setAttribute('class',clas)
   return cont;
}

function createinpt (elem,objc,select) {
   console.log(objc.fill[0] + 'fewqfqef');
   for (const element of elem.childNodes) {
      element.remove();
   }
   for (let i = 1; i < objc.fill.length; i++) {
      let inpt = document.createElement('input');
      elem.appendChild(inpt)
   }

   return elem;
}
function createlist (elem) {
   let selct = document.createElement('select');
   for (let i = 0; i < elem.length; i++) {
      let opt = document.createElement('option')
      opt.innerHTML = elem[i].name;
      opt.setAttribute('value',[]+i);
      selct.appendChild(opt);
   }
   return selct;
}
function construct () {
   let theme = document.querySelector('.select__theme').options.selectedIndex;
   let mess = document.querySelectorAll('.select');
   let block = document.querySelectorAll('.select__block');
   //найти в блоках инпуты и записать в структуру [1[1,2,3],2[1,2,3],3[1,2,3]] 
   let len = mess.length;
   let arr = [];
   let inp = [];
   document.querySelector('.complete__message').innerHTML = '';
   console.log(obj.fill[theme].fill[mess]);
   for (let i = 0; i < len; i++) {
      arr.push(mess[i].options.selectedIndex)
   }
   for (let i = 0; i < block.length; i++) {
      //что-то с инпутами
   }
   for (let m = 0; m < arr.length; m++) {
      for (let r = 0; r < obj.fill[theme].fill[arr[m]].fill.length; r++) {
         message(obj.fill[theme].fill[arr[m]].fill)
         //переделать
      }
   }
   console.log(arr);
   //document.querySelector('.complete__message').innerHTML = str.join('');
}
function message (arr) {
   let str = '';
   let len = arr.length;
   for (let i = 0; i < len; i++) {
      str = str + arr[i];

   }
   return str
}

function copy () {}
function clean (elem) {
   page.removeChild(elem);
   beginSelect();
}