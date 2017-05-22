// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'

var locales = {
  en: {
    resume: {
      name: 'Name',
      city: 'City',
      title: 'Job Title',
      birthday: 'Birthday'
    }
  },
  zh_CN: {
    resume: {
      profile: {
        name: '名称',
        city: '城市',
        title: '',
        birthday: ''
      },
      workHistory: {
        _: '',
        company: '',
        details: ''
      },
      education: {
        _: '',
        school: '',
        details: ''
      },
      projects: {
        _: '',
        name: '',
        details: ''
      },
      awards: {
        _: '',
        name: '',
        details: ''
      },
      contacts: {
        _: '',
        contact: '',
        content: ''
      }
    }
  }
}

Vue.ues(VueI18n)
Vue.config.lang = 'zh_CN'

Object.keys(locales).forEach(function(lang)){
  Vue.locale(lang, locales[lang])
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
