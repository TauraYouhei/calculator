import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
      username: "",
      nameList: [],
      friendname: "",
      pendingUser: [],
      applyingUser: [],
      talkList: [],
  },
  getters: {
  },
  mutations: {
    setUserName(state, userName) {
      state.username = userName
    },
    setNameList(state, nameList){
      state.nameList = nameList
    },
    setFriName(state, friendname){
      state.friendname = friendname
    },
    setPendingUser(state, pendingUser){
      state.pendingUser = pendingUser
    },
    setApplyingUser(state, applyingUser){
      state.applyingUser = applyingUser
    },
    setTalkList(state, talkList){
      state.talkList = talkList
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.localStorage
  })]
})