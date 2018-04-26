import Vuex from 'Vuex'
import Vue from 'vue'
import Router from 'vue-router'
import Panel from '@/views/Panel'
import CyHome from '@/components/CyHome'
import axios from 'axios'
import a from '../components/Myecharts/CityLicenseEcharts'
Vue.use(Vuex)
Vue.use(Router)

// axios

Vue.prototype.$ajax = axios
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/panel'
    },
    {
      path: '/panel',
      name: 'Panel',
      component: Panel
    },
    {
      path: '/home',
      name: 'CyHome',
      component: CyHome
    },
    {
      path: '/a',
      name: 'a',
      component: a
    }
  ]
})
