import articleAPI from '@/api/article';

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationsTypes = {
  getArticleStart: '[Article] Get Article Start',
  getArticleSuccess: '[Article] Get Article Success',
  getArticleFailure: '[Article] Get Article Failure',
};

export const actionTypes = {
  getArticle: '[Article] Get Article',
};

const mutations = {
  [mutationsTypes.getArticleStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationsTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationsTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutations.getArticleStart, slug);
      articleAPI
        .getArticle(slug)
        .then((article) => {
          context.commit(mutations.getArticleSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationsTypes.getArticleFailure);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
