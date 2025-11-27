import { getTable3XByRef } from "@/api/common";

export default {
  namespaced: true,
  state() {
    return {
      selectData: {}
    };
  },
  getters: {
    getState(state) {
      console.log("state", state);
      return state;
    }
  },
  mutations: {
    modifyState(state, payload) {
      state.selectData = payload;
    }
  },
  actions: {
    async getActionSelectDatas({ commit }) {
      let selectData = {};
      const res = await Promise.all([
        getTable3XByRef({
          objRef: "InlandPurchase"
        })
      ]);
      selectData = {
        orderTypeList: res[0].data
      };
      commit("modifyState", selectData);
    }
  }
};
