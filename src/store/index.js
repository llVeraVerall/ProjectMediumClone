import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import feed from './modules/feed';
import popularTags from './modules/popularTags';
import article from '@/store/modules/article';
import createArticle from './modules/createArticle';
import editArticle from './modules/editArticle';

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
    createArticle,
    editArticle,
  },
});
