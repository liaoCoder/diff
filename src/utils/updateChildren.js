import isSameNode from "./isSameNode";
import patchVNode from "./patchVNode";
import createElement from "./createElement";
export default (parentElm, oldCh, newCh) => {
  //新前
  let newStartIdx = 0;
  //新后
  let newEndIdx = newCh.length - 1;
  //旧前
  let oldStartIdx = 0;
  //旧后
  let oldEndIdx = oldCh.length - 1;
  //新前节点
  let newStartNode = newCh[newStartIdx];
  //新后节点
  let newEndNode = newCh[newEndIdx];
  //旧前节点
  let oldStartNode = oldCh[oldStartIdx];
  //旧后节点
  let oldEndNode = oldCh[oldEndIdx];
  let mapObj = null;
  //当新前<=新后并且旧前<=旧后
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    //如果新前节点为空
    if (!oldStartNode) {
      oldStartNode = oldCh[++oldStartIdx];
      //如果旧前节点为空
    } else if (!oldEndNode) {
      oldEndNode = oldCh[--oldEndIdx];
    } else {
      //如果新前和旧前相同
      if (isSameNode(oldStartNode, newStartNode)) {
        console.log("如果新前和旧前相同");
        patchVNode(oldStartNode, newStartNode);
        newStartNode = newCh[++newStartIdx];
        oldStartNode = oldCh[++oldStartIdx];
        //如果新后和旧后相同
      } else if (isSameNode(oldEndNode, newEndNode)) {
        console.log("如果新后和旧后相同");
        patchVNode(oldEndNode, newEndNode);
        newEndNode = newCh[--newEndIdx];
        oldEndNode = oldCh[--oldEndIdx];
        //如果新后和旧前相同
      } else if (isSameNode(newEndNode, oldStartNode)) {
        console.log("如果新后和旧前相同");
        patchVNode(oldStartNode, newEndNode);
        newEndNode = newCh[--newEndIdx];
        oldStartNode = oldCh[++oldStartIdx];
        //插入到旧后的后面
        parentElm.insertBefore(oldStartNode.elm, oldEndNode.elm);
        //如果旧后和新前相同
      } else if (isSameNode(oldEndNode, newStartNode)) {
        console.log("如果旧后和新前相同");
        patchVNode(oldEndNode, newStartNode);
        newStartNode = newCh[--newStartIdx];
        oldEndNode = oldCh[++oldEndIdx];
        //插入到旧前之前
        parentElm.insertBefore(oldEndNode.elm, oldEndNode.elm);
      } else {
        //生成一个寻找key的map对象
        if (!mapObj) {
          mapObj = {};
          for (let i = oldStartIdx; i < oldEndIdx; i++) {
            mapObj[oldCh[i].data.key] = i;
          }
        }
        //寻找新前节点在mapObj中映射的下标
        const index = mapObj[newStartNode.data.key];
        //如果存在的话表示不是新创建的节点
        if (index) {
          patchVNode(oldCh[index], newStartNode);
          parentElm.insertBefore(oldCh[index].elm, oldStartNode.elm);
          oldCh[index] = undefined;
        } else {
          //如果不存在的话插入到旧前之前
          parentElm.insertBefore(createElement(newStartNode), oldStartNode.elm);
        }
        newStartNode = newCh[++newStartIdx];
      }
    }
  }

  //如果新前指针小于等于新后指针表示新节点有新增的内容
  if (newStartIdx <= newEndIdx) {
    const pivot = oldEndNode.elm.nextSibling;
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      if (!newCh[i]) continue;
      parentElm.insertBefore(createElement(newCh[i]), pivot);
    }
    //如果旧前指针小于等于旧后指针的话表示有删除的内容
  } else if (oldStartIdx <= oldEndIdx) {
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (!oldCh[i]) continue;
      parentElm.removeChild(oldCh[i].elm);
    }
  }
};
