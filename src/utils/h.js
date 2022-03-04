import vnode from "./vnode";

//实现一个低配版本的h函数，这个函数必须接受3个参数
//调用的时候必须是以下三种情况之一
//形态一：h("div",{},"文字")
//形态二：h("div",{},[])
//形态三：h("div",{},h())

export default function (sel, data, c) {
    //检查参数的个数
    if (arguments.length !== 3) {
        throw Error("参数个数必须为3个");
    }
    if (typeof c === 'number' || typeof c === 'string') {
        //如果是形态一
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        //如果是形态二
        //将数组内的元素放到children内
        let children = [];
        for (let i = 0; i < c.length; i++) {
            if (typeof c[i] === 'object' && c[i].hasOwnProperty('sel')) {
                children.push(c[i]);
            } else {
                throw Error("传入的必须是h函数");
            }
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        //如果是形态三
        //传入的就只有一个h函数，作为children数组的第一个元素返回即可
        //这里c不用执行，因为生成h函数的时候已经调用了
        return vnode(sel, data, [c], undefined, undefined)
    } else {
        throw Error("传入的第三个参数有误");
    }
}