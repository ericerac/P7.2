import { _ } from "core-js";
import { createStore } from "vuex";
const axios = require("axios");

const mapState = require("vuex");

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  
});

let user = localStorage.getItem("user");
let userId = "";
let userToken = "";
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else if (user) {
  const User = JSON.parse(user);
  userId = User.userId;
  userToken = User.token;
}

console.log(userId, userToken);

const store = createStore({
  state: {
    status: "",
    user: user,

    PostData: {},

    updateUser: {
      firstName: "",
      lastName: "",
      email: "",
      userId: "",
      token: "",
      media: "",
    },

    formData: {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      media: "",
    },
    allsUsersData: "",
    userData: "",
    alldata: "",
    artData: "",
    comments: "",
    usersId: "",
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
    AllsUsersData: (state, allsUsersData) => {
      state.allsUsersData = allsUsersData;
    },
    ArtData: (state, artData) => {
      state.artData = artData;
    },
    Comment: (state, comment) => {
      state.comment = comment;
    },
    AllData: (state, alldata) => {
      state.alldata = alldata;
    },
    // dat_Post:(state,data)=>{

    // PostData.set(state.PostData, data.property, data.value)
    // },
    FormData: (state, formData) => {
      state.formData = formData;
    },
    Articles: (state, articles) => {
      state.articles = articles;
    },
    Comments: (state, comments) => {
      state.comments = comments;
    },
    UsersId: (state, usersId) => {
      state.usersId = usersId;
    },

    logOut: (state) => {
      state.user = {
        userId: -1,
        token: "",
      };
      //localStorage.removeItem('user')
    },
  },
  getters: {
    allDatas: (state) => state.artData,
  },

  computed: {},

  actions: {
    // dat_Post:({commit}, data)=>{
    //   commit("dat_Post",data)
    // },

    signupPost: ({ commit }, userData) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/signup", userData)
          .then(function (response) {
            commit("setStatus", "loading");
            resolve(response);
            console.log("REPONSE SIGNUP ",response);
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
      console.log("USER-DATA LOGIN INDEX",userData);
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
            
            console.log("ça deconne login index store",err);
            reject(err);
          });
      });
    },
    //----------DELETE USER---------------//
    deleteUser: ({ commit }, userData) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .put(`/user/delete?id=${userId}`)
          .then((response) => {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
            console.log("logUser", logUser);
          })
          .catch((err) => {
            commit("setStatus", "error_login");
            console.log("ça deconne delete index store");
            reject(err);
          });
      });
    },

    //----------DISCONNECT----------------//
    disconnect: () => {
      localStorage.removeItem("user");
      this.$router.push("/");
    },
    //----------UPDATE USER 1------------//

    updateUser: ({ commit }, Data) => {
      commit("setStatus", "loading");
      console.log("UPDATE USER INDEX", Data.entries());

      return new Promise((resolve, reject) => {
        instance
          .put("/user/update", Data)
          .then((response) => {
            console.log("RESPONSE INDEX -->", response);

            commit("setStatus", "loading");
            resolve(response);
            console.log("REPONSE UPDATE", response);
          })
          .catch((err) => {
            commit("setStatus", "error_create");
            reject(err);
            console.log("ERREUR", err);
            console.log("ça ne fonctionne pas");
          });
      });
    },

    //-----------------GET USER DATA----------------(())
    getUserData: ({ commit },data ) => {
      const userId = data;
      console.log(data);
      instance
        .get(`/user?id=${userId}`)
        .then((res) => {
          console.log("REPONSE USER-DATA INDEX STORE", res.data);
          commit("UserData", res.data);
          const countArticle = res.data.article.length;
          commit("Articles", countArticle);
          const countComment = res.data.comment.length;
          console.log("Articles", countComment);
          commit("Comments", countComment);

          if (res) {
            console.log("reponse", res.data);
          } else {
            console.log("pas de data");
          }
        })
        .catch((err) => {
          console.log("reponse err", err);

          //console.log("ça m'énerve encore");
        });
    },
    //-----------------GET ALL USERS DATA----------------(())
    getAllUsersData: async ({ commit }, usersId) => {
      await instance
        .get(`/user/all`)
        .then((res) => {
          console.log("reponse", res.data);
          commit("AllsUsersData", res.data);
          //const countArticle = res.data.article.length;
          //commit("Articles",countArticle);
          //const countComment = res.data.comment.length;
          //console.log("Articles",countComment);
          //commit("Comments",countComment);

          if (res) {
            console.log("reponse", res.data);
          } else {
            console.log("pas de data");
          }
        })
        .catch((err) => {
          console.log("reponse err", err);

          //console.log("ça m'énerve encore");
        });
    },
    //-----------UPLOAD POST-----------------//
    uploadPost: ({ commit }, data) => {
      console.log("UPLOAD-POST INDEX", ...data.entries());
      commit("setStatus", "loading");
      const token = userToken;
      console.log("TOKEN", token);
      return new Promise((resolve, reject) => {
        instance
          .post("/article/post", data, {
            headers: {
              Authorization: `Basic ${token}`,
            },
          })
          .then((response) => {
            console.log("RESPONSE INDEX -->", response);

            commit("setStatus", "loading");
            resolve(response);
          })
          .catch((err) => {
            commit("setStatus", "error_create");
            reject(err);
            console.log("ça ne fonctionne pas");
          });
      });
    },
    //----------------GET ALL ARTICLES---------------//
    getAllArticle: ({ commit }) => {
      commit("setStatus", "loading");
      const self = this;
      console.log("getAllArticle");
      return new Promise((resolve, reject) => {
        instance
          .get("/article/all")
          .then((res) => {
            console.log(res);
            const usersId = [];
            commit("setStatus", "loading");
            const revers = res.data.reverse();
            commit("ArtData", revers);
            const resData = res.data;

            const comments = resData.map((a) => a.comment);
            commit("Comments", comments);
            commit("AllData", resData.comment);
            console.log("ArtData  INDEX", resData);

            let dat = res.data;
            console.log("res GET INDEX COMMENTS", comments);
            for (let i of dat) {
              usersId.push(i.userId);
            }

            // console.log("BOUCLE INDEX USER-ID", usersId);
            commit("UsersId", usersId);
            commit("AllData", comments);

            resolve(res);
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

// const One = axios.get(reqAll);
// const url = "http://localhost:3000/article?";
// const reqAll = "http://localhost:3000/article/all";
// const reqOne = `http://localhost:3000/article?${One}`;

//  const Two = axios.get(reqOne);

//  const getArticle = (axios.all([One, Two]).then(
//    // reste a definir les conditions de éponses pour chaque requete
//    axios.spread((...response) => {
//      console.log("---------RESPONSE----------", response.data);
//      console.log("---------REQUETE----------",  One, Two);
//      console.log("---------Response Type----------", One.blob);
//      const ResponseOne = response[0];
//      const ResponseTwo = response[1];
//      console.log(
//        "ResponseOne",
//        ResponseOne.data,
//        "ResponseTWo",
//        ResponseTwo.data
//      );
//    })
//  ).catch = () => {
//    res.json({message:"ça marche pas"})
//  })
