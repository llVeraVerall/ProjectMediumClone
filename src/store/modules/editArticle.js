import articleAPI from '@/api/article';

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
};

export const mutationTypes = {
  updateArticleStart: '[updateArticle] update article start',
  updateArticleSuccess: '[updateArticle] update article success',
  updateArticleFailure: '[updateArticle] update article failure',

  getArticleStart: '[updateArticle] get article start',
  getArticleSuccess: '[updateArticle] get article success',
  getArticleFailure: '[updateArticle] get article failure',
};

export const actionTypes = {
  updateArticle: '[updateArticle] Update article',
  getArticle: '[updateArticle] Get article',
};

const mutations = {
  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.updateArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.updateArticle](context, {slug, articleInput}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.updateArticleStart);
      articleAPI
        .updateArticle(slug, articleInput)
        .then((article) => {
          context.commit(mutationTypes.updateArticleSuccess, article);
          resolve(article);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.updateArticleFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart);
      articleAPI
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
