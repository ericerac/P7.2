import { _ } from "core-js";
import { createStore } from "vuex";
const axios = require("axios");

const mapState = require("vuex");

const instance = axios.create({
  baseURL: "http://localhost:3000/",
   headers: {
    //'Content-Type': 'multipart/form-data; boundary=--hadhba122--'
    //'content-Type': 'application/x-www-form-urlencoded; '
    //'Content-Type':'application/json; charset=utf-8',
   },
});

let user = localStorage.getItem("user");
let  userId ="";
let userToken = "";
if (!user) {
  user = {
    userId: -1,
    token: "",
  } 
}else if(user){
  const User = JSON.parse(user);
  userId = User.userId;
 userToken = User.token;
};




console.log(userId, userToken);

const store = createStore({
  state: {
    status: "",
    user: user,

    

    
     
    PostData:{},
    

    updateUser:{
      firstName:'',
      lastName:'',
      email:'',
      userId:'',
      token:'',
      media:'',
    },
    
    formData: {
      userId:"",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
     media:'',
    },

   userData:"",
    alldata:"",
    artData: "",
    comments: "",
    usersId:"",
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
    AllData:(state,alldata)=>{
      state.alldata = alldata;
    },
    // dat_Post:(state,data)=>{
    
    // PostData.set(state.PostData, data.property, data.value)
    // },
    FormData:(state,formData)=>{
      state.formData = formData;
    },
    Articles:(state, articles) => {
      state.articles = articles;
    },
    Comments:(state, comments) => {
      state.comments = comments;
    },
    UsersId:(state, usersId) => {
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
  getters:{
allDatas:(state)=> state.artData
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
    //----------UPDATE USER 1------------//

    updateUser: ({commit},Data) => {
      commit("setStatus", "loading");
      console.log("UPDATE USER INDEX",Data);
      
      return new Promise((resolve, reject) => {
        instance
          .put("/user/update", Data)
          .then( (response) => {

            console.log("RESPONSE INDEX -->",response);

            commit("setStatus", "loading");
            resolve(response);
            console.log("REPONSE UPDATE",response);
          })
          .catch((err) => {
            commit("setStatus", "error_create");
            reject(err);
            console.log("ERREUR",err);
            console.log("ça ne fonctionne pas");
          });
      });
    },

//-----------------GET USER DATA----------------(())
    getUserData: ({ commit },usersId) => {
      const User = JSON.parse(user);
      const userId = User.userId;
      console.log(userId);
      const useId = usersId;
      instance
        .get(`/user?id=${userId}`)
        .then((res) => {
          console.log("reponse", res.data);
          commit("UserData", res.data);
          const countArticle = res.data.article.length;
          commit("Articles",countArticle);
          const countComment = res.data.comment.length;
          console.log("Articles",countComment);
          commit("Comments",countComment);

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
    getAllUsersData: ({ commit },usersId) => {
      
      instance
        .get(`/user/all`)
        .then((res) => {
          console.log("reponse", res.data);
          commit("UserData", res.data);
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
    uploadPost: ({ commit }, uploadPost) => {
      console.log("UPLOAD-POST INDEX",uploadPost);
      commit("setStatus", "loading");
      

      return new Promise((resolve, reject) => {
        instance
          .post("/article/post", uploadPost)
          .then( (response) => {

            console.log("RESPONSE INDEX -->",response);

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
            commit("ArtData", res.data);
            const resData = res.data;
           
            const comments = resData.map((a) => a.comment);
            commit("Comments",comments)
            commit("AllData",resData.comment)
            console.log("ArtData  INDEX",  resData);
           
            let dat = res.data;
            console.log("res GET INDEX COMMENTS", comments);
            for(let i of dat){
              usersId.push(i.userId);
            

            }
           
            // console.log("BOUCLE INDEX USER-ID", usersId);
            commit("UsersId",usersId);
           commit("AllData",comments)
          
          
         
            resolve(res);
            
            
          })
            
            // return new Promise((resolve, reject) => {
            //   const self = this;
            //   instance
            //     .get(`/user?id=${userId}`)
            //     .then((res) => {
            //       const UsersId={};
            //       console.log("USER-ID",usersId);
            //       console.log("BOUCLE INDEX RES 2", res.data.firstName);
            //        for(let i of res.data){
            //          UsersId.push(i.firstName);
            //                      }

            //       console.log("BOUCLE INDEX USER-ID 3",self.usersId);
                  
      
            //       resolve(res);
                  
                  
            //     })
            //     .catch((err) => {
            //       commit("setStatus", "error_create");
            //       reject(err);
            //       console.log("ça ne fonctionne pas GET ART 2 ");
            //     });
            // });
            
          
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
