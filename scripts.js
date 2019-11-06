const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
    const iterable = items.querySelectorAll('.item');

    for( var item of iterable ){
      const checkbox = item.querySelector('.item__checkbox');
      const text = item.querySelector('.item__text');
      const button = item.querySelector('.item__button');
      
      checkbox.addEventListener('click', finish);
      text.addEventListener('click', edit);
      button.addEventListener('click', deleteItem);     
    }
  }

  function formHandler(e) {
    e.preventDefault();

    const input = e.target.querySelector('.form__input');
    if( input.value.trim().length > 0) {
      add(input.value.trim());
    }
    input.value = '';
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const { target } = e;
    const { textContent, parentNode } = target;

    parentNode.removeChild(target);
    const input = el('input', 'item__edit');
    input.setAttribute('type', 'text');
    input.value = textContent;
    input.addEventListener('keyup', commit);
    const button = parentNode.querySelector('.item__button');
    parentNode.insertBefore(input, button);
    input.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const {keyCode, target} = e;
    const {value, parentNode} = target;
    //if( keyCode !== ENTER_KEYCODE) { return; }
    if( keyCode === ENTER_KEYCODE) {
      target.removeEventListener('keyup', commit);
      parentNode.removeChild(target);
      const text = el('span', 'item__text', edit);
      text.appendChild(document.createTextNode(value));

      const button = parentNode.querySelector('.item__button');
      parentNode.insertBefore(text, button);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const item = el('li', 'item');

    const checkbox = el('input', 'item__checkbox', finish);
    checkbox.setAttribute('type', 'checkbox');
    item.appendChild(checkbox);

    const input = el('span', 'item__text', edit);
    input.appendChild(document.createTextNode(value));
    item.appendChild(input);

    const button = el('button', 'item__button', deleteItem);
    button.appendChild(document.createTextNode('Eyða'));
    item.appendChild(button);
    
    items.appendChild(item);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {

    const parent = e.target.parentNode;
    
    const checkbox = parent.querySelector('.item__checkbox');
    const text = parent.querySelector('.item__text');
    const button = parent.querySelector('.item__button');

    checkbox.removeEventListener('click', finish);
    text.removeEventListener('click', edit);
    button.removeEventListener('click', deleteItem);

    parent.parentNode.removeChild(parent);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const newElement = document.createElement(type);

    if( className ) {
      newElement.classList.add(className);
    }
    if( clickHandler ) {
      newElement.addEventListener('click', clickHandler);
    }
    return newElement;
  }

  return {
    init: init
  }
})();
