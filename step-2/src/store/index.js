import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resume: {
      config: [
        { field: 'profile', icon: 'id', keys: ['name', 'city', 'title', 'birthday'] },
        { field: 'workHistory', icon: 'work', keys: ['company', 'details']  },
        { field: 'education', icon: 'book', keys: ['school', 'details'] },
        { field: 'projects', icon: 'heart', keys: ['name', 'details'] },
        { field: 'awards', icon: 'cup', keys: ['name', 'details'] },
        { field: 'contacts', icon: 'phone', keys: ['contact', 'content'] },
      ],
    },
  },
  mutations: {
    initState(state, payload){
      state.resume.config.map((item) => {
        if(item.type === 'array'){
          Vue.set(state.resume, item.field, [])
        }else{
          Vue.set(state.resume, item.field, {})
          item.keys.map((keys) => {
            Vue.set(state.resume[item.field], keys, '')
          })
        }
      })
      Object.assign(state, payload)
    },
    switchTab (state, payload){
      state.selected = payload
      localStorage.setItem('state', JSON.stringify(state))
    },
    updateResume(state, {path, value}){
      objectPath.set(state.resume, path, value)
      localStorage.setItem('state', JSON.stringify(state))
    },
    setUser(state, payload){
      Object.assign(state.user, payload)
    },
    removeUser(state){
      state.user.id = ''
    }
  }
})