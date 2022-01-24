import MsgAlert from "../components/MsgAlert";

export default {
  install: function (Vue) {
    // 1.根据我们的组件生成一个构造函数
    const LoadingContructor = Vue.extend(MsgAlert);
    // 2.根据构造函数创建实例对象
    const LoadingInstance = new LoadingContructor();
    // 3.随便创建一个标签(元素)
    const oDiv = document.createElement('div');
    // 4.将创建好的标签添加到界面上
    document.body.appendChild(oDiv);
    // 5.将创建好的实例对象挂载到创建好的元素上
    LoadingInstance.$mount(oDiv);
    // if (Options && Options.title !== null && Options.title !== undefined) {
    // }
    Vue.prototype.$showMsg = function (msg) {
      LoadingInstance.title = msg
      LoadingInstance.isShow = true
    }
    Vue.prototype.$hiddenMsg = function () {
      LoadingInstance.isShow = false
    }

  }
}
