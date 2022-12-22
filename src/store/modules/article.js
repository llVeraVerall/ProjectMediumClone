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

  deleteArticleStart: '[Article] Delete Article Start',
  deleteArticleSuccess: '[Article] Delete Article Success',
  deleteArticleFailure: '[Article] Delete Article Failure',
};

export const actionTypes = {
  getArticle: '[Article] Get Article',
  deleteArticle: '[Article] Delete Article',
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
  [mutationsTypes.deleteArticleStart]() {},
  [mutationsTypes.deleteArticleSuccess]() {},
  [mutationsTypes.deleteArticleFailure]() {},
};

const actions = {
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.getArticleStart);
      articleAPI
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationsTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationsTypes.getArticleFailure);
        });
    });
  },

  [actionTypes.deleteArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.deleteArticleStart);
      articleAPI
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationsTypes.deleteArticleSuccess);
          resolve();
        })
        .catch(() => {
          context.commit(mutationsTypes.deleteArticleFailure);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
