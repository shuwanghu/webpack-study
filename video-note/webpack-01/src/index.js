// import a from './a.js'
// const $ =import('expose-loader?$!jquery')
// import './picture'
import $ from 'jquery'
require('./css/index.css');
/* @log
class A {
    a = 1;yar
}
const b = () => {
    console.log(this)
}
b();
const a2 = new A;
console.log(a2) */
console.log('$', $)
console.log('window.$', window.$)
/* 
function log (target){
    console.log(target,18)
} */