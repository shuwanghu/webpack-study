/* class A {
    constructor(){
        console.log('A Objext created! I‘m  ')
    }
}

const a = new A; */
const xhr = new XMLHttpRequest();

xhr.open('GET','/user',true);

xhr.onload = function(){
    console.log(xhr.response);
}

xhr.send();