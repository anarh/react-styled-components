/* global localStorage */

import axios from 'axios';
// const config = require('../../config');
// const locales = require('./locales.json');
// const cobrands = require('./cobrands.json');

import locale from './locale';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['X-Mashape-Key'] = process.env.REACT_APP_API_KEY;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// config.locales = locales;
// config.cobrands = cobrands;

const getInitialState = (config) => {
  return {
    accessToken: null,
    isAuthenticated: false,
    createAccount: {
      isError: false,
      usernameAlreadyExists: false,
      emailAlreadyExists: false
    },
    loginRecovery: {
      isError: false,
      isVerified: false,
      isPasswordReset: false,
      maskedEmail: null,
      selectedUsername: null,
      tmpPin: null,
      pin: null,
      type: null,
      userAccounts: []
    },
    locale: locale,
    // config: config,
    // locale: {
    //   locales: process.env.REACT_APP_DEFAULT_LOCALE,
    //   t: config.locales.filter(function (l) {
    //     return l['locale-code'] === config.locale;
    //   })[0]
    // },
    // cobrand: config.cobrands.filter(function (l) {
    //   return l['querystring'] === config.cobrand_default;
    // })[0],
    dev: false,
    browserOutdated: false
  };
};

const authenticate = ({ username, password }, pathname) => async state => {
  let isAuthenticated = state.isAuthenticated;
  let accessToken = state.accessToken;
  let data = null;

  try {
    data = await axios.post(`/auth/login`, { username, password });
  } finally {
    if (pathname !== window.location.pathname) return; // eslint-disable-line

    if (data && data.status === 200) {
      isAuthenticated = true;
      accessToken = data.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
    }

    if (!data) { isAuthenticated = false; }

    return { accessToken, isAuthenticated }; // eslint-disable-line
  }
};

const forgotUsername = ({ firstname, lastname, email }) => async state => {
  const loginRecovery = JSON.parse(JSON.stringify(state.loginRecovery));
  let data = null;
  loginRecovery.isError = false;

  try {
    data = await axios.post(`/auth/login/forgot-username`, { firstname, lastname, email });
  } finally {
    if (data && data.status === 200) {
      loginRecovery.type = 'forgot-username';
      loginRecovery.tmpPin = data.data.tmpPin;
      loginRecovery.maskedEmail = email;
    }

    if (!data) loginRecovery.isError = true;

    return { loginRecovery }; // eslint-disable-line
  }
};

const forgotPassword = ({ username, email }) => async state => {
  const loginRecovery = JSON.parse(JSON.stringify(state.loginRecovery));
  let data = null;
  loginRecovery.isError = false;

  try {
    data = await axios.post(`/auth/login/forgot-password`, { username, email });
  } finally {
    if (data && data.status === 200) {
      loginRecovery.type = 'forgot-password';
      loginRecovery.tmpPin = data.data.tmpPin;
      loginRecovery.maskedEmail = email;
    }

    if (!data) loginRecovery.isError = true;

    return { loginRecovery }; // eslint-disable-line
  }
};

const createPassword = ({ password }) => async state => {
  let loginRecovery = JSON.parse(JSON.stringify(state.loginRecovery));
  let data = null;
  loginRecovery.isError = false;

  try {
    data = await axios.post(`/auth/login/create-password`, {
      pin: loginRecovery.pin,
      tmpPin: loginRecovery.tmpPin,
      email: loginRecovery.maskedEmail,
      password: password
    });
  } finally {
    if (data && data.status === 200) {
      loginRecovery = getInitialState({}).loginRecovery;
      loginRecovery.isPasswordReset = true;
    }

    if (!data) loginRecovery.isError = true;
    return { loginRecovery }; // eslint-disable-line
  }
};

const sendPin = () => async state => {
  const loginRecovery = JSON.parse(JSON.stringify(state.loginRecovery));
  let data = null;
  loginRecovery.isError = false;

  try {
    data = await axios.post(`/auth/login/send-pin`, { tmpPin: loginRecovery.tmpPin });
  } finally {
    if (data && data.status === 200) {
      loginRecovery.pin = data.data.pin;
    }

    if (!data) loginRecovery.isError = true;

    return { loginRecovery }; // eslint-disable-line
  }
};

const verifyPin = ({ pin }) => async state => {
  const loginRecovery = JSON.parse(JSON.stringify(state.loginRecovery));
  let data = null;
  loginRecovery.isError = false;

  try {
    data = await axios.post(`/auth/login/verify-pin`, {
      pin: pin,
      tmpPin: loginRecovery.tmpPin
    });
  } finally {
    if (data && data.status === 200) {
      loginRecovery.isVerified = true;
      loginRecovery.pin = pin;
    }

    if (!data) loginRecovery.isError = true;
    console.log(loginRecovery);
    return { loginRecovery }; // eslint-disable-line
  }
};

const getAccounts = () => async state => {
  const loginRecovery = JSON.parse(JSON.stringify(state.loginRecovery));
  let data = null;
  loginRecovery.isError = false;

  try {
    data = await axios.post(`/auth/login/get-accounts`, {
      pin: loginRecovery.pin,
      tmpPin: loginRecovery.tmpPin,
      email: loginRecovery.maskedEmail
    });
  } finally {
    if (data && data.status === 200) loginRecovery.userAccounts = data.data.accounts;

    if (!data) loginRecovery.isError = true;
    return { loginRecovery }; // eslint-disable-line
  }
};

const checkForExistingUsername = ({ username }) => async state => {
  let data = null;
  const createAccount = getInitialState({}).createAccount;
  try {
    data = await axios.get(`/accounts/check-username?username=${username}`);
  } finally {
    createAccount.usernameAlreadyExists = !!data && data.status === 200;
    return { createAccount }; // eslint-disable-line
  }
};

const checkForExistingEmail = ({ email }) => async state => {
  let data = null;
  const createAccount = getInitialState({}).createAccount;
  try {
    data = await axios.get(`/accounts/check-email?email=${email}`);
  } finally {
    createAccount.emailAlreadyExists = !!data && data.status === 200;
    return { createAccount }; // eslint-disable-line
  }
};

const createAccount = (account) => async state => {
  let data = null;
  try {
    data = await axios.post(`/create-account`, account);
  } finally {
    if (!data || (data && data.status !== 201)) {
      return { createAccount: { isError: true } }; // eslint-disable-line
    }

    return { createAccount: { isError: false } }; // eslint-disable-line
  }
};

const setSelectedUsername = (username) => async (state) => {
  let loginRecovery = null;
  try {
    loginRecovery = getInitialState({}).loginRecovery;
    loginRecovery.selectedUsername = username;
  } finally {
    return { loginRecovery }; // eslint-disable-line
  }
};

const signout = (user, callback) => (state) => {
  if (typeof callback === 'function') {
    setTimeout(callback, 100);
  }
  return { isAuthenticated: false };
};

const toggleDevMode = () => (state) => ({ dev: !state.dev });

export const actions = {
  authenticate,
  checkForExistingUsername,
  checkForExistingEmail,
  createPassword,
  createAccount,
  forgotPassword,
  forgotUsername,
  getAccounts,
  // setCobrand,
  sendPin,
  // setLocale,
  setSelectedUsername,
  signout,
  toggleDevMode,
  verifyPin
};

export const initialState = getInitialState({});
