import { _ } from "core-js";
import { createStore } from "vuex";
const axios = require("axios");
import setHeaders from "../utils/setHaeaders";
const mapState = require("vuex");
import Vue from "vue";
import VueCookies from "vue-cookies";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});
// const config = {
//   headers:{
//     Authorization:this.token
//   }
// };
// let user = localStorage.getItem("user");
// let userId = "";
// let userToken = "";
// if (!user) {
//   user = {
//     userId: -1,
//     token: "",
//   };
// } else if (user) {
//   const User = JSON.parse(user);
//   userId = User.userId;
//   userToken = User.token;
// }
let userId="";
let userToken="";

let userCookies = $cookies.get("user");
if(!userCookies){
  
}else{
console.log("USER COOKIES", userCookies);
 userId = userCookies.userId;
 userToken = userCookies.token;}

// console.log(userId, userToken);

const store = createStore({
  state: {
    status: "",
    user: "",
    userId: "",
//----------------_LIKE--------------//
    errorLike:"",
listLike:"",

    PostData: {},
    likeArr: "",
    likeLength: "",
    articles: "",

    updateUser: {
      firstName: "",
      lastName: "",
      email: "",
      userId: "",
      token: "",
      media: "",
    },
    userToken: "",
    formData: {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      media: "",
    },
    useData: "",
    allsUsersData: "",
    userData: "", // data user connected
    alldata: "",
    artData: "", // contenu des articles
    comments: "",
    usersId: "",
  },
  mutations: {
    setStatus: (state, status) => {
      state.status = status;
    },
    LikeArr: (state, likeArr) => {
      state.likeArr = likeArr;
    },
    logUser: (state, user) => {
      // localStorage.setItem("user", JSON.stringify(user));
      console.log("COOKIES", user);
      state.user = user;
      $cookies.set("user", JSON.stringify(user));
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
    UseData: (state, useData) => {
      state.useData = useData;
    },
    Comment: (state, comment) => {
      state.comment = comment;
    },
    AllData: (state, alldata) => {
      state.alldata = alldata;
    },
    listLike: (state, listLike) => {
      state.listLike = listLike;
    },
    errorLike: (state, errorLike) => {
      state.errorLike = errorLike;
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
  },
  getters: {
    allDatas: (state) => state.artData,
  },

  computed: {},

  actions: {
    // dat_Post:({commit}, data)=>{
    //   commit("dat_Post",data)
    // },

    //----------DISCONNECT----------------//

    //------------- SIGNUP LOGIN-------------------_//

    signupPost: ({ commit }, userData) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/signup", userData)
          .then(function (response) {
            commit("setStatus", "loading");
            resolve(response);
            console.log("REPONSE SIGNUP ", response);
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
      console.log("USER-DATA LOGIN INDEX", userData);
      return new Promise((resolve, reject) => {
        instance
          .post("/login", userData)
          .then((response) => {
            // setHeaders(response.data.token)
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
            console.log("logUser", logUser);
          })
          .catch((err) => {
            commit("setStatus", "error_login");

            console.log("ça deconne login index store", err);
            reject(err);
          });
      });
    },

    //-----------------DELETE USER--------------------//

    deleteUser: ({ commit }, data) => {
      const token = userToken;
       const id = userId;
      const userDel = data;
      const headers = {
        headers: {
          Authorization: `Bearer + ${token}`,
        },
      };
      console.log("INDEX-TOKEN-DELETE------->", token);
      console.log("INDEX-ID-DELETE------>", data);
      console.log("INDEX-ID-DELETE------>", userId);
      const body = {
        id:userId
      }
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .put(`/user/delete?id=${userDel}`,body,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            commit("setStatus", "");
            if (response) {
              localStorage.removeItem("user");
            }
            resolve(response);
          })
          .catch((err) => {
            commit("setStatus", "error_login");
            console.log("ça deconne delete index store");
            reject(err);
          });
      });
    },

    

    //----------UPDATE USER 1------------//

    updateUser: ({ commit }, Data) => {
      const token = userToken;
      console.log("TOKEN", token);
      commit("setStatus", "loading");
      console.log("UPDATE USER INDEX", Data.entries());

      return new Promise((resolve, reject) => {
        instance
          .put("/user/update", Data,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
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

    //-----------------GET ONE USER DATA----------------(())
    getUserData: ({ commit }, data) => {
      const token = userToken;
      console.log("TOKEN", token);
      const userId = data;
      console.log(data);
      instance
        .get(`/user?id=${userId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("REPONSE USER-DATA INDEX STORE", res.data);

          const countArticle = res.data.article.length;
          commit("Articles", countArticle);
          const countComment = res.data.comment.length;
          console.log("Articles", countComment);
          commit("Comments", countComment);

          if (res) {
            commit("UserData", res.data);
            console.log("REPONSE USER-DATA INDEX STORE IF", res.data);
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
      const token = userToken;
      console.log("TOKEN", token);
      await instance
        .get(`/user/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("reponse", res.data);
          commit("AllsUsersData", res.data);
          // const countArticle = res.data.article;
          // commit("Articles",countArticle);
          // //const countComment = res.data.comment.length;
          // console.log("ARTICLES INDEX",countArticle);
          //commit("Comments",countComment);

          if (res) {
            console.log("reponse", res.data);
          } else {
            console.log("pas de data");
          }
        })
        .catch((err) => {
          console.log("reponse err", err);

          
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
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("RESPONSE INDEX -->", response);

            commit("setStatus", "loading");
            commit("ArtData", response.data);
            resolve(response);
          })
          .catch((err) => {
            commit("setStatus", "error_create");
            reject(err);
            console.log("ça ne fonctionne pas");
          });
      });
    },

    //-------------------UPDATEPOST-----------------//

    updatePost: ({ commit }, Data) => {
      const token = userToken;
      console.log("TOKEN", token);
      commit("setStatus", "loading");
      console.log("UPDATE USER INDEX", Data.entries());

      return new Promise((resolve, reject) => {
        instance
          .put("/article/update", Data,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
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
    //-----------UPLOAD COMMENT-----------------//uploadComment
    uploadComment: ({ commit }, data) => {
      console.log("UPLOAD-POST INDEX", ...data.entries());
      commit("setStatus", "loading");
      const token = userToken;
      console.log("TOKEN", token);
      return new Promise((resolve, reject) => {
        instance
          .post("/comment/post", data, {
            headers: {
              Authorization: `Bearer ${token}`,
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
      const token = userToken;
      const Us = userId;

      console.log("TOKEN", token);
      commit("setStatus", "loading");
      const self = this;
      console.log("getAllArticle");
      return new Promise((resolve, reject) => {
        instance
          .get(`/article/all`, {
            headers: {
              Authorization: `Basic ${token}`,
            },
          })
          .then((res) => {
            // console.log("ALL ARTICLES INDEX RES", res);
            const usersId = [];
            commit("setStatus", "loading");
            const Artrevers = res.data.reverse();
            commit("ArtData", Artrevers);
            const resData = res.data;
            const art = resData.article;
            // const like = art.like.length;

            // console.log(" LIKE-LENGTH  INDEX");
            const comments = resData.map((a) => a.comment);
            const sommeLike = resData.map((item) => item.dislike);
            commit("LikeArr", sommeLike);
            const liked = sommeLike.map((l) => l.like).reduce((a, b) => a + b);
            commit("Comments", comments);
            // commit("ALL COMMENTS", comments);
            console.log("RESDATA  COMMENTS", res.data);

            // console.log("res GET INDEX LIKE", sommeLike);
            // for (let l of sommeLike)  {
            //   const liked = sommeLike.map(l => l[0]);
            //   // .reduce((a, b) => a + b);
            //   likeData.push(liked)
            // }
            console.table("RES.DATA LIKE INDEX 1", sommeLike);
            commit
            console.table("RES.DATA LIKE INDEX 2", sommeLike[2]);
            // console.log("BOUCLE INDEX USER-ID", usersId);
            commit("UsersId", usersId);

            resolve(res);
          })

          .catch((err) => {
            commit("setStatus", "error_create");
            reject(err);
            console.log("ça ne fonctionne pas post art");
          });
      });
    },

    //---------------DELETE ARTICLE----------------//

    deleteArticle: ({ commit }, data) => {
      const token = userToken;
      // const userId = userId;

      console.log("INDEX-TOKEN-DELETE ARTICLE------->", token);
      console.log("INDEX-ID-DELETE ARTICLE------>", data);
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .put(`/article/delete?id=${data}`, {
            headers: {
              Authorization: `Bearer + ${token}`,
            },
          })
          .then((response) => {
            commit("setStatus", "");

            resolve(response);
          })
          .catch((err) => {
            commit("setStatus", "error_login");
            console.log("ça deconne delete index store");
            reject(err);
          });
      });
    },
    //---------------DELETE COMMENT----------------//

    deleteComment: ({ commit }, data) => {
      const token = userToken;
      // const userId = userId;

      console.log("INDEX-TOKEN-DELETE COMMENT------->", token);
      console.log("INDEX-ID-DELETE COMMENT------>", data);
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .put(`/comment/delete?id=${data}`, {
            headers: {
              Authorization: `Bearer + ${token}`,
            },
          })
          .then((response) => {
            commit("setStatus", "");

            resolve(response);
          })
          .catch((err) => {
            commit("setStatus", "error_login");
            console.log("ça deconne delete index store");
            reject(err);
          });
      });
    },

    //----------------- LIKE POST----------------//

    likePost: ({ commit }, data) => {
      const token = userToken;
      // const userId = userId
      console.log("INDEX-TOKEN-LIKE-POST------->", token);
      console.log("INDEX-ID-LIKE-POST------>", data);
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post(`/like/post`, data, {
            headers: {
              Authorization: `Bearer + ${token}`,
            },
          })
          .then((response) => {
            
            console.log("RESPONSE LIKE INDEX",response);
            instance.put(`/art/like`);
            
            resolve(response);
          })
          .catch((err) => {
            commit("setStatus", "error_login");
            commit("errorLike", err);
            console.log("Erreur 401 LIKE-POST index store",err);
            reject(err);
          });
      });
    },

    // ------------------MULTI LIKE------------------//
    // likePost: ({ commit }, data) => {
    //   const token = userToken;
    //   // const userId = userId;

    //   console.log("INDEX-TOKEN-DELETE COMMENT------->", token);
    //   console.log("INDEX-ID-DELETE COMMENT------>", data);
    //   commit("setStatus", "loading");

    // // const url = "http://localhost:3000/like/post";

    // // const reqDislikeTable = "http://localhost:3000/like/post";
    // // const One = axios.put(reqDislikeTable);

    // // const reqArtLike = `http://localhost:3000/art/like,`;
    // //  const Two = axios.post(reqArtLike);

    // //  const likeDislike = (axios.all([One, Two]).then(
    // //    // reste a definir les conditions de réponses pour chaque requete
    // //    axios.spread((...response) => {
    // //      console.log("---------RESPONSE----------", response.data);

    // //      console.log("---------REQUETE----------",  One, Two);

    // //      console.log("---------Response Type----------", One.blob);

    // //      const ResponseOne = response[0];

    // //      const ResponseTwo = response[1];

    // //      console.log(
    // //        "ResponseOne",
    // //        ResponseOne.data,
    // //        "ResponseTWo",
    // //        ResponseTwo.data
    // //      );
    // //    })
    // //  ).catch = () => {
    // //    res.json({message:"ça marche pas"})
    // //  })
    // },
  }, // fin actions
});

export default store;
