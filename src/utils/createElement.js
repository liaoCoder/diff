//参数是一个新的节点
const createElement = (vnode) => {
  let domNode = document.createElement(vnode.sel);
  //如果是文本节点的话那就直接插入即可
  if (vnode.text && (!vnode.children || vnode.children.length === 0)) {
    domNode.innerText = vnode.text;
  } else if (!vnode.text && vnode.children && vnode.children.length > 0) {
    for (var i = 0; i < vnode.children.length; i++) {
      const newNode = vnode.children[i];
      domNode.appendChild(createElement(newNode));
    }
  }
  vnode.elm = domNode;
  return domNode;
};

export default createElement;
