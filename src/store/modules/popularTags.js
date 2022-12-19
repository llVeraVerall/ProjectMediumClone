import popularTagsApi from '@/api/popularTags';

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationsTypes = {
  getPopularTagsStart: '[PopularTags] Get PopularTags Start',
  getPopularTagsSuccess: '[PopularTags] Get PopularTags Success',
  getPopularTagsFailure: '[PopularTags] Get PopularTags Failure',
};

export const actionTypes = {
  getPopularTags: '[PopularTags] Get PopularTags',
};

const mutations = {
  [mutationsTypes.getPopularTagsStar](state) {
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
  [actionTypes.getPopularTags](context, {apiUrl}) {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.getPopularTagsStart);
      popularTagsApi
        .getPopularTags(apiUrl)
        .then((response) => {
          context.commit(mutationsTypes.getPopularTagsSuccess, response.data);
          resolve(response.data);
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
