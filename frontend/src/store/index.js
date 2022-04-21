import { createStore } from "vuex";
const axios = require("axios");
//const mapState = require('vuex')

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  // headers:{'X-Custom-Headers':''}
});

const store = createStore({
  state: {
    status: "",
    user: {
      userId: -1,
      token: "",
    },
  },
  mutation: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: (state, user) => {
      state.user = user;
    },
  },
  computed:{
  //...mapState(['status'])
  },
  actions: {
    signupPost: ({ commit }, userData) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/signup", userData)
          .then(function (response) {
            commit("setStatus", "loading");
            resolve(response);
            console.log(response);
          })
          .catch(function (err) {
            commit("setStatus", "error_create");
            reject(err);
            console.log("ça ne fonctionne pas");
          });
      });
    },
    loginPost: ({ commit }, userData) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/login", userData)
          .then(function (response) {
            commit("setStatus", '');
            commit("logUser", response.data);
            resolve(response);
          })
          .catch((err) => {
            commit("setStatus", "error_login");
            reject(err);
          });
      });
    },
  },
});

export default store;
