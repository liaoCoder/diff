//判断是否是同一个节点
export default (oldNode, newNode) => {
  return oldNode.sel === newNode.sel && oldNode.data.key === newNode.data.key;
};
