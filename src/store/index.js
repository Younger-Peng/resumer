import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    selected: 'profile',
    resume: {
      config: [
        { field: 'profile', icon: 'id' },
        { field: 'workHistory', icon: 'work' },
        { field: 'education', icon: 'book' },
        { field: 'projects', icon: 'heart' },
        { field: 'awards', icon: 'cup' },
        { field: 'contacts', icon: 'phone' },
      ],
      profile: {
        name: '彭某某',
        city: '城乡结合部',
        title: '杀马特发型师',
        birthday: '1989-11-26'
      },
      workHistory: [
        {
          company: '国家施工队射鸡尸',
          content: `公司总部设在美国洛杉矶，先后在北京、上海成立分公司，专注于搬砖码墙，主打刮墙，
                    我的主要工作如下：
                      1. 完成混凝土搅拌
                      2. 码墙，勾缝`
        },
        {
          company: '狗急跳墙责任有限公司',
          content: `公司总部设在美国洛杉矶，先后在北京、上海成立分公司，专注于搬砖码墙，主打刮墙，
                    我的主要工作如下：
                      1. 完成混凝土搅拌
                      2. 码墙，勾缝`
        }
      ],
      education: [
        { school: '华北野鸡大学', content: '本科' },
        { school: '沙发特高中', content: '一个打仨' }
      ],
      projects: [
        { name: 'project A', content: '文字' },
        { name: 'project B', content: '文字' }
      ],
      awards: [
        { name: '再来十瓶', content: '连续十次获得 【再来一瓶】 奖励 ' },
        { name: '英语口语大赛', content: '三等奖' }
      ],
      contacts: [
        { contact: 'phone', content: '13812345678'},
        { contact: 'qq', content: '123456789'}
      ]
    },
  },
  mutations: {
    switchTab (state, payload){
      state.selected = payload
    },
    updateResume(state, {path, value}){
      objectPath.set(state.resume, path, value)
    }
  }
})