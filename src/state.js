import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['X-Mashape-Key'] = process.env.REACT_APP_API_KEY;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const getInitialState = (config) => {
  return {
    accessToken: null,
    createAccount: {
      isError: false,
      usernameAlreadyExists: false,
      emailAlreadyExists: false
    }
  };
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

export const actions = {
  checkForExistingUsername,
  checkForExistingEmail,
  createAccount
};

export const initialState = getInitialState({});
