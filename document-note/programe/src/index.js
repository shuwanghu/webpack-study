import _ from 'lodash';
import print from './print'

function component() {
  var element = document.createElement('button');

  element.innerHTML = 'click';
  element.onclick=()=>{
    print()
  }

  return element;
}
document.body.appendChild(component());