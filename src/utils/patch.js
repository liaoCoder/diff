import vnode from "./vnode";
import patchVNode from "./patchVNode";
import createElement from "./createElement";
import isSameNode from "./isSameNode";

export default (oldNode, newNode) => {
  //判断是否是虚拟节点，如果不是虚拟节点，就创建一个虚拟节点
  if (oldNode.sel === undefined || oldNode.sel === "") {
    oldNode = vnode(oldNode.tagName.toLowerCase(), {}, [], undefined, oldNode);
  }
  //判断是不是同一个虚拟节点
  if (isSameNode(oldNode, newNode)) {
    //如果是同一个虚拟节点就精细化比较
    patchVNode(oldNode, newNode);
  } else {
    //如果不是同一个节点的话就要暴力删除旧的，插入新的
    //创建一个新的节点
    const newDOM = createElement(newNode);
    //插入新节点
    oldNode.elm.parentNode.insertBefore(newDOM, oldNode.elm);
    //删除老节点
    oldNode.elm.parentNode.removeChild(oldNode.elm);
  }
};
