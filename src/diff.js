/**
 * 
 * @param {*} treeOld 
 * @param {*} treeNew 
 * 对比： 当节点类型相同时，对比属性是否相同 产生补丁包 {type: 'ATTRS', attrs: {class: 'list-group'}}
 * 新的dom节点不存在{type: 'REMOVE', index: xxx}
 * 节点类型不相同 直接采用替换模式 {type: 'REPLACE', newNode: newNode}
 * 文本变化 {type: 'TEXT', text: 1}
 */
function diff(treeOld, treeNew) {
  let patches = {}

  // 递归树 比较结果放入补丁包
  TreeWalker(treeOld, treeNew, Index, patches)
  return  patches
}

function diffChild(treeOldChild, treeNewChild, patches) {
  treeOldChild.forEach((oldChild, idx) => {
    TreeWalker(oldChild, treeNewChild[idx], ++Index, patches)
  });
}

function isString(node) {
  return typeof node === 'string'
}

const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
let Index = 0;
function TreeWalker(treeOld, treeNew, Index, patches) {
  let currentPatch = [];
  // 没有新节点
  if (!treeNew) {
    currentPatch.push({type: REMOVE, Index})
  } else if (isString(treeOld) && isString(treeNew)) {
    // 判断文本
    if (treeOld !== treeNew) {
      currentPatch.push({type: TEXT, text: treeNew})
    }
  } else if (treeOld.type === treeNew.type) {
    let attrs = diffAttr(treeOld.props, treeNew.props);
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({type: ATTRS, attrs})
    }
    // 如果有儿子节点遍历儿子
    diffChild(treeOld.children, treeNew.children, patches)
  } else {
    // 节点被替换了
    currentPatch.push({
      type: REPLACE,
      node: treeNew
    })
  }

  if (currentPatch.length > 0) {
    patches[Index] = currentPatch
  } 
  return patches
} 

function diffAttr(oldAttrs, newAttrs) {
  let patch = {};

  // 比较老的属性跟新的属性的关系
  for(let key in oldAttrs){
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]; // 有可能是underfined
    }
  }

  for (let key in newAttrs){
    // 老节点没有新节点的属性
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key];
    }
  }

  return patch;
}

export default diff;