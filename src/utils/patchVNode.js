import createElement from "./createElement";
import updateChildren from "./updateChildren";
//判断节点类型
const judgeNodeType = (node) => {
  if (node.text && (!node.children || node.children.length === 0)) {
    return "text";
  } else if (!node.text && node.children && node.children.length > 0) {
    return "element";
  }
};
/**
 * 精细化比较
 * 如果内存中是完全相同的节点就什么都不做
 * 如果新节点有text属性并且新老节点的text属性不一样的话，那就让老元素的innerText变为新节点的text
 * 如果新节点有children属性
 *  如果老节点有children属性，那就需要精细化比较
 *  如果老节点有text属性，那就让通过createElement将新节点创建为新元素，然后替换老节点
 */
export default (oldNode, newNode) => {
  //oldVNode和newVNode在内存中是否是一个对象就什么都不用做
  if (oldNode === newNode) return;
  //如果新节点有text属性
  if (judgeNodeType(newNode) === "text") {
    if (newNode.text !== oldNode.text) {
      oldNode.elm.innerText = newNode.text;
    }
    //否则新节点有children属性
  } else if (judgeNodeType(newNode) === "element") {
    //判断老节点有没有chidren属性
    if (judgeNodeType(oldNode) === "element") {
      updateChildren(oldNode.elm, oldNode.children, newNode.children);
    } else if (judgeNodeType(oldNode) === "text") {
      const newDOM = createElement(newNode);
      oldNode.elm.parentNode.insertBefore(newDOM, oldNode.elm);
      oldNode.elm.parentNode.removeChild(oldNode.elm);
    }
  }
};
