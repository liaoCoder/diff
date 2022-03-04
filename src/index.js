import h from "./utils/h";
import patch from "./utils/patch";

// const patch = init([
//   classModule, // makes it easy to toggle classes
//   propsModule, // for setting properties on DOM elements
//   styleModule, // handles styling on elements with support for animations
//   eventListenersModule, // attaches event listeners
// ]);

const container = document.getElementById("container");

const btn = document.getElementById("btn");
const vnode1 = h("ul", { key: "vnode" }, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "E" }, "E"),
  h("li", { key: "F" }, "F"),
]);

const vnode2 = h("ul", { key: "vnode" }, [
  h("li", { key: "R" }, "CCCC"),
]);

patch(container, vnode1);

btn.addEventListener("click", function () {
  patch(vnode1, vnode2);
});
