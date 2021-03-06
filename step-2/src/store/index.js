import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'
import AV from '../lib/leancloud'
import getAVUser from '../lib/getAVUser'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resumeConfig: [
      { field: 'profile', icon: 'id', keys: ['name', 'city', 'title', 'birthday'] },
      { field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'details']  },
      { field: 'education', icon: 'book', type: 'array', keys: ['school', 'details'] },
      { field: 'projects', icon: 'heart', type: 'array', keys: ['name', 'details'] },
      { field: 'awards', icon: 'cup', type: 'array', keys: ['name', 'details'] },
      { field: 'contacts', icon: 'phone', type: 'array', keys: ['contact', 'content'] },
    ],
    resume: { }
  },
  mutations: {
    initState(state, payload){
      state.resumeConfig.map((item) => {
        if(item.type === 'array'){
          Vue.set(state.resume, item.field, [])
        }else{
          Vue.set(state.resume, item.field, {})
          item.keys.map((keys) => {
            Vue.set(state.resume[item.field], keys, '')
          })
        }
      })
      if(payload){
        Object.assign(state, payload)
      }
    },
    switchTab (state, payload){
      state.selected = payload
    },
    updateResume(state, {path, value}){
      objectPath.set(state.resume, path, value)
      console.log('update...')
      // localStorage.setItem('resume', JSON.stringify(state.resume))
    },
    setUser(state, payload){
      Object.assign(state.user, payload)
      
    },
    removeUser(state){
      state.user.id = ''
      //必须让本地中存储的用户信息清空，不然别的用户永远无法设置ucl
      state.resume.id = ''
    },
    addResumeSubfield(state, {field}){
      let empty = {}
      state.resume[field].push(empty)
      state.resumeConfig.filter((i) => i.field === field)[0].keys.map((key) => {
        Vue.set(empty, key, '')
      })
    },
    removeResumeSubfield(state, {field,i}){
      console.log('final')
      //为什么这么删删不掉？
      // state.resume[field].splice(i,1)
      // localStorage.setItem('resume', JSON.stringify(state.resume))
    },
    setResumeId(state, {id}){
      state.resume.id = id
    },
    setResume(state, resume){
      state.resumeConfig.map(({ field }) => {
        Vue.set(state.resume, field, resume[field])
      });
      state.resume.id = resume.id
    }
  },
  actions: {
    saveResume({ state, commit }, payload){
      var Resume = AV.Object.extend('Resume')
      var resume = new Resume()
      if(state.resume.id){
        debugger
        resume.id = state.resume.id
      }
      resume.set('profile', state.resume.profile)
      resume.set('workHistory', state.resume.workHistory)
      resume.set('education', state.resume.education)
      resume.set('projects', state.resume.projects)
      resume.set('awards', state.resume.awards)
      resume.set('contacts', state.resume.contacts)
      resume.set('owner_id', getAVUser().id)

      // var acl = new AV.ACL()
      // acl.setPublicReadAccess(true)
      // window.acl = acl
      // window.AV = AV
      // window.resume = resume
      // acl.setWriteAccess(AV.User.current(), true)
      // resume.setACL(acl)
      resume.save().then(function(response){
        if(!state.resume.id){
          commit('setResumeId', {id: response.id})
        }
      }).catch(function(error){
        console.log(error)
      })
    },
    fetchResume({commit}, payload){
      var query = new AV.Query('Resume');
      query.equalTo('owner_id', getAVUser().id)
      query.first().then((resume) => {
        if(resume){
          commit('setResume', {id: resume.id, ...resume.attributes})
        }
      })
    },
    removeResumeSubfield({state,commit}, {field,i}){
      console.log(field,i)
      state.resume[field].splice(i,1)

      // localStorage.setItem('resume', JSON.stringify(state.resume))     
    }
  }
  
})