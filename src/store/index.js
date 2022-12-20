import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import feed from './modules/feed';
import popularTags from './modules/popularTags';
import article from '@/api/article';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    popularTags,
    article,
  },
});
