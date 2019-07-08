// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import {
  createElement,
  render,
  renderDom
} from './createElement';
import diff from './diff'
import patch from './patch'

const vertualDom1 = createElement('ul', {class: 'list'}, [
  createElement('li', {class: 'item'}, ['a']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('li', { class: 'item' }, ['c']),
])

const vertualDom2 = createElement('ul', {class: 'list-group'}, [
  createElement('li', {class: 'item'}, ['1']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('div', { class: 'item' }, ['ppp']),
])


let el = render(vertualDom1)
renderDom( el, window.root)

let patches = diff(vertualDom1, vertualDom2);

// 给元素打补丁 更新视图
patch(el, patches);

