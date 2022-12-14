import authAPI from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  isSubmitting: false,
  currentUser: null,
  validationsErrors: null,
  isLoggedIn: null, //состояние залогинен ли пользователь
};

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  registerFailure(state, payload) {
    state.isSubmitting = false;
    state.validationsErrors = payload;
  },
};

const actions = {
  register(context, credentials) {
    return new Promise(() => {
      context.commit('registerStart');
      authAPI
        .register(credentials)
        .then((response) => {
          context.commit('registerSuccess', response.data.user);
          setItem('accessToken', response.data.user.token);
        })
        .catch((result) => {
          context.commit('registerFailure', result.response.data.errors);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
