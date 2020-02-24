/* origin code*/

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

//#mock here
import {createElement,render,renderDom,walk} from './element'
import diff from './diff'
import patch from './patch'
//create virtualDOM
let virtualDom = createElement('ul',{class:'list'},[
    createElement('li',{class:'item'},[createElement('div',{class:'item'},['m'])]),
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['c']),
])
//convert realDOM
console.log(virtualDom)
// walk(virtualDom)
let dom = render(virtualDom)
//render 
renderDom(dom,document.body)

let virtualDom2 = createElement('ul',{class:'list2'},[
    createElement('li',{class:'item active'},[createElement('div',{class:'item'},['m'])]),
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['c']),
    createElement('li',{class:'item'},['a']),
])
//diff
let patches = diff(virtualDom,virtualDom2)
console.log('patches here');
console.log(patches)
//将变化更新到DOM
patch(dom,patches)


