import authAPI from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null, //состояние залогинен ли пользователь
};

export const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
};

const mutations = {
  [mutationsTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationsTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [mutationsTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationsTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationsTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [mutationsTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise(() => {
      context.commit(mutationsTypes.registerStart);
      authAPI
        .register(credentials)
        .then((response) => {
          context.commit(mutationsTypes.registerSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
        })
        .catch((result) => {
          context.commit(
            mutationsTypes.registerFailure,
            result.response.data.errors
          );
        });
    });
  },

  [actionTypes.login](context, credentials) {
    return new Promise(() => {
      context.commit(mutationsTypes.loginStart);
      authAPI
        .login(credentials)
        .then((response) => {
          context.commit(mutationsTypes.loginSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
        })
        .catch((result) => {
          context.commit(
            mutationsTypes.loginFailure,
            result.response.data.errors
          );
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
