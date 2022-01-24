import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    loading:false,
    dataArr:window.localStorage.getItem("dataArr"),
    itemName:window.localStorage.getItem("itemName"),
    searchForm:""
  } ,
  mutations: {
    SET_LOADING:(state, data)=>{
      state.loading = data;
    },
    SET_DataArr:(state, data)=>{
      state.dataArr = data;
      window.localStorage.setItem("dataArr",data);
    },
    SET_ItemName:(state, data)=>{
      state.itemName = data;
      window.localStorage.setItem("itemName",data);
    },
    SET_SearchFrom:(state, data)=>{
      state.searchForm = data;
    },
  },
  getters : {
    getLoading(state) {
      return state.loading
    }
  },
  actions: {

  }
})
export default store
