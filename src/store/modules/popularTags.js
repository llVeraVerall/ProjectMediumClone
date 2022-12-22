import popularTagsApi from '@/api/popularTags';

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationsTypes = {
  getPopularTagsStart: '[PopularTags] Get Popular Tags Start',
  getPopularTagsSuccess: '[Popular Tags] Get PopularTags Success',
  getPopularTagsFailure: '[Popular Tags] Get PopularTags Failure',
};

export const actionTypes = {
  getPopularTags: '[PopularTags] Get PopularTags',
};

const mutations = {
  [mutationsTypes.getPopularTagsStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationsTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationsTypes.getPopularTagsFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.getPopularTagsStart);
      popularTagsApi
        .getPopularTags()
        .then((tags) => {
          context.commit(mutationsTypes.getPopularTagsSuccess, tags);
          resolve(tags);
        })
        .catch(() => {
          context.commit(mutationsTypes.getPopularTagsFailure);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
