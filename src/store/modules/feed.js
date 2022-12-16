import feedApi from '@/api/feed';

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationsTypes = {
  getFeedStart: '[feed] Get Feed Start',
  getFeedSuccess: '[feed] Get Feed Success',
  getFeedFailure: '[feed] Get Feed Failure',
};

export const actionTypes = {
  getFeed: '[feed] Get feed ',
};

const mutations = {
  [mutationsTypes.getFeedStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationsTypes.getFeedSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationsTypes.getFeedFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getFeed](context, {apiUrl}) {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.getFeedStart);
      feedApi
        .getFeed(apiUrl)
        .then((response) => {
          context.commit(mutationsTypes.getFeedSuccess, response.data);
          resolve(response.data);
        })
        .catch(() => {
          context.commit(mutationsTypes.getFeedFailure);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
