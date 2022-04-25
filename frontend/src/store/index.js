import { createStore } from "vuex";
const axios = require("axios");

const mapState = require("vuex");

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  // headers: {
  //   "content-Type": "multipart/form-data",
  // },
});

let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
}

const store = createStore({
  state: {
    status: "",
    user: user,
    userData: {
      firstName: "",
      lastName: "",
      email: "",

      createdAt: "",
    },
  },
  mutations: {
    setStatus: (state, status) => {
      state.status = status;
    },
    logUser: (state, user) => {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("LOCALSTORAGE", user);
      state.user = user;
    },
    UserData: (state, userData) => {
      state.userData = userData;
    },
    logOut: (state) => {
      state.user = {
        userId: -1,
        token: "",
      };
      //localStorage.removeItem('user')
    },
  },
  computed: {},
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
          .catch((err) => {
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
          .then((response) => {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
            console.log("logUser", logUser);
          })
          .catch((err) => {
            commit("setStatus", "error_login");
            console.log("ça deconne login index store");
            reject(err);
          });
      });
    },

    getUserData: ({ commit }) => {
      const User = JSON.parse(user);
      const userId = User.userId;
      console.log(userId);
      instance
        .get(`/user?id=${userId}`)
        .then((res) => {
          console.log("reponse", res.data);
          commit("UserData", res.data);
          if (res) {
            console.log("reponse", res);
          } else {
            console.log("pas de data");
          }
        })
        .catch((err) => {
          console.log("reponse err", err);

          //console.log("ça m'énerve encore");
        });
    },

    publishArt: ({ commit }, artData) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/article", artData)
          .then((response) => {
            commit("setStatus", "loading");
            resolve(response);
            console.log(response);
          })
          .catch((err) => {
            commit("setStatus", "error_create");
            reject(err);
            console.log("ça ne fonctionne pas post art");
          });
      });
    },

    getAllArticle: ({ commit }, artData) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/article", artData)
          .then((response) => {
            commit("setStatus", "loading");
            resolve(response);
            console.log(response);
          })
          .catch((err) => {
            commit("setStatus", "error_create");
            reject(err);
            console.log("ça ne fonctionne pas post art");
          });
      });
    },
  }, // fin actions
});

export default store;
