/* origin code*/

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

//#mock here
import {createElement,render,renderDom} from './element'
//create virtualDOM
let virtualDom = createElement('ul',{class:'list'},[
    createElement('li',{class:'item'},['a']),
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['c']),
])
//convert realDOM
let dom = render(virtualDom)
//render 
renderDom(dom,document.body)
