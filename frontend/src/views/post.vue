<template>
  <!-- <button type="button" class="btn btn-primary position-relative">
  notifications
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    99+
    <span class="visually-hidden">unread messages</span>
  </span>
</button> -->
  <navBar />
  <div id="post">
    <form id="formPost" @submit.prevent="articlePost">
      <div id="articleUser">
        <div id="postText">
          <span>{{ user.firstName }}...</span>
          <input v-model="content" class="commentaire" type="texte" placeholder="Ecrire" />
          <label>choisir

            <input type="file" id="mediaPost" ref="file" @change="FileUpload" accept="image/png, image/jpeg" />
          </label>
          <button class="Publier" @click="uploadPost">Publier</button>
        </div>
      </div>
    </form>
    <div id="postPublié" v-for="article in dataArt" :key="article.id">
      <div id=" postUser ">

        <div id="user">
          <span class="user"> Publié par: <strong>{{ article.user.lastName }} {{ }} {{ article.user.firstName
          }}</strong></span>

          <span class="postDate">
            le: {{ date(article.createdAt) }}
          </span>
        </div>
        <div id="article">
          <span class="content">{{ article.content }}</span>
          <img class="postImg" alt="Image" :src="article.media" />
        </div>

        <!-- -----------------------BLOC LIKE ------------------------>
        <div id="iconPost">
          <div class="iconLike">
            <span class="icon">
              <fa class="like" :icon="['far', 'thumbs-up']" />120
            </span>
            <input type="checkbox"  name="dislike"  :value="article.id"
              v-model="PostLiked" />
            <label v-bind:for="dislike">
              <fa class="like" :icon="['far', 'thumbs-down']" />
            </label>
          </div>
          <span>
            <fa :icon="['far', 'comment']" @click="commentInput = !commentInput"  v-model="PostLiked" />
          </span>
        </div>


        <!-- -----------------------COMMENTER ------------------------>

        <form id="formPost" @submit.prevent="articleComment" v-show="commentInput">
          <div id="articleUser">
            <div id="postText">
              <input v-model="contentComment" class="commentaire" type="texte" placeholder="Ecrire" />

              <fa :icon="['fas', 'upload']" />
              <input type="file" id="mediaPost" ref="file" @change="FileUploadCom" accept="image/png, image/jpeg" />
              <input type="file" class="custom-file-input">
              <button class="Publier" @click="uploadComment">Publier</button>
            </div>
          </div>
        </form>
        <!-- -----------------------COMMENTAIRE ------------------------>
        <div id="commentaires">
          <template v-for="commKey in article.comment" :key="commKey.id">
            <div id="blocComment">
              <div class="commentaire">{{ commKey.comment }}</div>
              <img class="imgComment" alt="Image" :src="commKey.media" />
              <div id="identificationComment">
                <div id="ComData">
                  <span class="ComData"> par:{{ commKey.user.firstName }}</span>
                  <span class="ComData"> {{ commKey.user.lastName }}</span>
                  <span class="ComData">le: à {{ date(commKey.user.createdAt) }}</span>
                </div>
                <div class="iconLike">
                  <div>
                    <fa class="like" :icon="['far', 'thumbs-up']" />{{ 25 }}
                  </div>
                  <div>
                    <fa class="like" :icon="['far', 'thumbs-down']" />200
                  </div>
                </div>
                <!-- <span id="dateComment">{{ dateTime(commKey.createdAt) }}</span>-->
              </div>
            </div>
          </template>

          <!-- <div class="commentaire"  v-for="( comment, value,key ) in article.comment[0]" :Key="key">{{key}}:{{comment}}:{{value}}:</div> -->
          <!-- <div class="commentaire"  v-for="( comments,value ) in comments" :Key="comments"> ARTICLE COMMENT ?  :    {{comments}}:{{value}}</div> -->

          <!-- <div id="options">
            <span class="like">
              <fa :icon="['fas', 'user']" />
              <fa :icon="['far', 'calendar-alt']" />
              <fa :icon="['far', 'bell']" />
              <fa :icon="['far', 'paper-plane']" />
              <fa :icon="['far', 'comment']" />
              <fa :icon="['far', 'user-circle']" />
              <fa :icon="['far', 'trash-alt']" />
              <fa :icon="['far', 'file-alt']" />
              <fa :icon="['fas', 'upload']" />
              <fa :icon="['fas', 'bars']" />
              <fa :icon="['fas', 'pencil-alt']" />
            </span>
            <span class="comment"></span>
          </div> -->
        </div>

        <!-- <button>Se connecter</button> -->
      </div>
    </div>
  </div>
</template>

//**********************************************// */

                  //**********************************************// */

                                      //**********************************************// */

<script>
import { mapGetters, mapState } from "vuex";
import moment from "moment";
import LoginVue from "../components/Login.vue";
import store from '@/store/index.js';
import navBar from "../components/Navbar.vue";
const axios = require("axios");
const FormData = require("form-data");

let user = localStorage.getItem("user");
let userId = "";
let userToken = "";
const User = JSON.parse(user);
if (User) {
  userId = User.userId;
  userToken = User.token;
} else {
}

console.log(userId, userToken);
let commentaires = [];

//***************    ******************// */

export default {

  name: "post",
  components: {
    navBar,
  },
  props: {},
  mounted: function () {

    console.log("MOUNTED");
    console.log("USER-DATA-->", this.$store.state.userData);
  },

  updated: function () {
    console.log("UPDATED");
    console.log("ARTICLES-->", this.$store.state.artData);
    console.log("COMMENT ALL DATA-->", this.$store.state.alldata);
    //this.comments=this.$store.state.comment;
    console.log("USER-DATA-->", this.$store.state.userData);
    console.log("COMMENT 2-->", this.$store.state.comments);


    // this.update(this.allData,this.comments)
  },

  data: function () {
    return {
      // entries:[],
      // showEntries:[10,20,50],
      // currentEntires:10,
      // filterEntries:[],

      //-------COMMENT FORM POST----------------

      commentInput: false,

      commentContent: "",
      fileSelectedComment: "",
      articleId:"",


      //-------ARTICLE FORM POST----------------//

      fileSelected: "",
      content: "",
      media: "",
      PostLiked: [],
      //-------COMMUN DATA--------------//

      userId: userId,
      token: userToken,

      ArticleDate: "",
      //UsersId: [],

      UsersData: {
        firstName: user.firstName,
        lastName: "",
      },
    };
  },
  beforeMount: function () {
    this.getAllArticle();
    this.userData(userId);
    console.log("BEFORE MOUNT");
    console.log("USER-DATA-->", this.userD)
  },
  onMounted: function () {
    console.log("ON MOUNTED");
    console.log("USER-DATA-->", this.userD)
  },
  // beforeCreate: function () {
  //   console.log("BEFORE CREATED");
  //   console.log("USER-DATA-->", )
  // },
  // beforeUpdate: function () {
  //   console.log("BEFORE UPDATE");
  //   console.log("USER-DATA-->", )
  // },
  props: {},
  computed: {
    //   ...mapGetters({
    //     PostData:"allDatas"
    //   }),
    ...mapState({
      userC: "useData",
      user: "userData",
      dataArt: "artData",


    }),
  },

  methods: {
    //-------------FILE NAME----------------//
    FileUpload(event) {
      console.log("EVENT", event);
      this.fileSelected = event.target.files[0];

      console.log("fichier Image", this.fileSelected);
    },

    liked: function (a) {
      console.log("LIKED", a);

    },
    //--------------COMPIL DATA ART ET COMMENT----------//
    // update:function(allData,comments){
    //   this.$store.dispatch("dat_Post",(allData,comments))
    // },

    //--------------FORMAT DATE----------------------//
    date(value) {
      return moment(value).format("DD/MM/YYYY à hh:mm");
    },
    Hour(value) {
      return moment(value).format("HH:mm");
    },

    //-------------ARTICLES DATE ----------------------//

    filtreArticleDate: function () {
      const Arts = this.dataArt;
      const date = this.ArticleDate;
      const arts = Arts.filter((a) => a.createdAt < date);

      console.log("Arts", Arts);
      console.log(arts);
      this.artsDate = arts;
    },
    //-----------------MAP---------------//
    filtreMAP: function () {
      const Arts = this.dataArt;
      console.log("ARTS", Arts);
      const comments = Arts.map((a) => a.comment);
      //-----------indexation des article------------//
      //  const indexed = Arts.reduce((acc, el)=>({
      //    ...acc,
      //    [el.createdAt]:el, // indexe les objets avec la clé argument "createdAt"
      //  }),{});
      //  console.log("INDEXED",indexed);
      //---------------------------------------------//
      //-----------indexation des article------------//
      const indexed = Arts.reduce(
        (acc, el) => ({
          ...acc,
          [el.id]: el, // indexe les objets avec la clé argument "createdAt"
        }),
        {}
      );
      console.log("INDEXED ", indexed);

      //----------------CONCAT------------------//
      const plano = Arts.reduce((acc, el) => acc.concat(el), []);
      console.log("PLANO", plano);

      //-----------------FOREACH-------------------//

      const articul = this.articulos;
      const foritch = Arts.forEach((item, index) => {
        console.log("ITEM INDEX", index, item);
      });
      //  articul.push(foritch);
      //   console.log("ARTICULOS", articul);
      //   console.log("ARTICULOS", articul);
      //   this.comment = comments;
      //   const IdComments = comments.map((id) => id);

      console.log("comments", this.comments);
      console.log("comments2", comments);
      console.log("Idcomments", IdComments);
    },
    //--------------USER DATA----------------------//

    userData: function (ud) {
      this.$store
        .dispatch("getUserData", ud)
        .then((res) => {
          console.log(" RES-DATA-USER-CONNECT", res);
        })
      console.log("DATA-USER-CONNECT 1", ud);
      let self = this;
      const UserId = [];
      const comm = [];


      console.log("UserId", UserId);
      // console.log("Comment userData PostVue",comm);

      //this.UsersId=UserId;
    },

    //------------ UPLOAD POST-----------------------//
    uploadPost: function () {
      let self = this;
      var bodyFormData = new FormData();
      bodyFormData.append("media", this.fileSelected, this.fileSelected.name);
      bodyFormData.append("content", this.content);
      bodyFormData.append("userId", userId);
      console.log("FORMDATA", bodyFormData);
      console.table("this.firstName ", ...bodyFormData.entries());
      this.$store
        .dispatch("uploadPost", bodyFormData)

        .then(function (response) {
          //handle success
          console.log(response);

        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    },

    FileUpload(event) {
      console.log("EVENT", event);
      this.fileSelected = event.target.files[0];
      console.log("fichier Image", this.fileSelected);
    },
    //------------ UPLOAD COMMENT-----------------------//
    uploadComment: function () {
      let self = this;
      var bodyFormData = new FormData();
      bodyFormData.append("media", this.fileSelectedComment, this.fileSelectedComment.name);
      bodyFormData.append("comment", this.CommentContent);
      bodyFormData.append("userId", userId);
      bodyFormData.append("articleId", articleId);

      console.table("FORMDATA-COMMENT------>", ...bodyFormData.entries());
      this.$store
        .dispatch("uploadComment", bodyFormData)

        .then(function (response) {
          //handle success
          console.log(response);

        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    },

    FileUploadCom(event) {
      console.log("EVENT", event);
      this.fileSelectedComment = event.target.files[0];
      console.log("fichier Image", this.fileSelectedComment);
    },
    //------------ GET ALL ARTICLE-----------------------//
    getAllArticle: function () {
      const self = this;
      this.$store
        .dispatch("getAllArticle")
        .then((response) => {
          console.log("REPONSE GET ALL ARTICLE POST PAGE", response.data);
          //self.filtreMAP()
          const resData = response.data;
          console.log("RESPONSE DATA", resData);
          const commentes = resData.map((a) => a.comment);

          console.log("POST VUE COMMENT PUSH", commentes);

          console.log("POST VUE COMMENT DATA", this.comments);
        })
        .catch((err) => {
          console.log("Restons calme getAllArticle:postPage", err);
        });
    },
  },
};
</script>

//**********************************************// */

                  //**********************************************// */

                                      //**********************************************// */

<style scoped>
#post {
  width: 90%;
  max-width: 25rem;

  border-radius: 10px;
  margin: 0 auto;
  padding-bottom: 10px;
}

#user {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 10px;

}

.user {
  font-size: 16px;
}

#article {
  width: 95%;

  margin: 0 auto;
  background-color: rgb(255, 255, 255);
  border: 2px solid #fd2d01;
  border-radius: 10px;
  height: auto;
}

#articleUser {
  border: 2px solid #fd2d01;
  border-radius: 5px;
  background-color: #fecdcd;
}

#postText {
  display: flex;
  flex-direction: column;
  width: 95%;
  background-color: #ffd7d7;
  margin: 5px auto;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
}

#postPublié {
  border: 1px solid #fd2d01;
  border-radius: 5px;
  margin-top: 20px;
  background-color: #ffd7d7;
}

.postDate {
  font-size: 16px;
}

.postImg {
  width: 98%;
  height: auto;
  border: 1px solid black;
  object-fit: cover;
  object-position: top;
  border-radius: 5px;
  margin: 5px auto;
}

#iconPost {
  display: flex;
  width: 90%;
  justify-content: space-between;
  margin: 0 auto;
}

.iconLike {
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;

  width: 30%;

  margin-left: 10px;
  margin-top: 5px;
}

.like {
  display: flex;
  justify-content: flex-start;
  margin-left: 0px;

  left: 10px;
}

.icon {
  display: flex;
}

#options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 10px;
}

.commentaire {
  display: flex;
  flex-wrap: nowrap;
  text-align: justify;

  margin: 5px auto 5px;
  padding-top: 10px;
  background-color: rgb(255, 255, 255);
  width: 98%;
  height: auto;
  border: 1px solid #f8aa9b;
  border-radius: 10px;
}

.imgComment {
  width: 98%;
  height: auto;
  border: 1px solid black;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
  margin: 5px auto;
}

.comment {
  border: 1px solid blue;
}

#commentaire {
  height: auto;
}

#blocComment {
  width: 95%;
  height: auto;
  background-color: #fde7e7;
  border: 1px solid blue;

  border-radius: 10px;
  margin: 10px auto;
}

#ComData {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.ComData {
  margin-left: 0;

  text-align: left;
}

#repondre {
  width: 100%;
  margin: 10px auto;
}

.filestyle {
  content: "image"
}

#identificationComment {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
  padding-bottom: 0;
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  content: 'Choisir une image';
  display: inline-flex;
  background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 0px 8px;
  outline: none;

  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}

.custom-file-input:hover::before {
  border-color: black;
}

.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>
