import h from "./mySnabbdom/h";

const vnode1 = h("div", {}, "文本");
const vnode2 = h("div", {}, [
    h("div", {}, "苹果"),
    h("div", {}, "香蕉"),
    h("div", {}, [
        h("div", {}, "小红"),
        h("div", {}, "小黄"),
        h("div", {}, "小橘"),
    ])
]);
const vnode3 = h("div", {}, h("div", {}, "文本"));

console.log(vnode1);
console.log(vnode2);
console.log(vnode3);