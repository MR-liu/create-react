import {
  createElement,
  render,
  renderDom,
  Element
} from "./createElement";

let allPatchs;
let index = 0; //默认需要打补丁的
function patch(node, patches) {
  allPatchs = patches;

  wark(node)
}

// 倒序打补丁
function wark(node) {
  let currentPatch = allPatchs[index++];
  let childNodes = node.childNodes;

  childNodes.forEach(child => wark(child))

  if (currentPatch) {
    doPatch(node, currentPatch)
  }
}

function doPatch(node, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case 'ATTRS':
        
        break;
      case 'TEXT': 
        node.textContent = patch.text
        break;
      case 'REMOVE':

        break;

      case 'REPLACE':
        let newNode = (patch.node instanceof Element) ? render(patch.node) : document.createTextNode(patch.newNode)
        node.parentNode.replaceChild(newNode, node)
        break;
    
      default:
        break;
    }
  })
}

export default patch;