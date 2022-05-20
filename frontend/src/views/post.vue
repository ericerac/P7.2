<template>
  <!-- <button type="button" class="btn btn-primary position-relative">
  notifications
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    99+
    <span class="visually-hidden">unread messages</span>
  </span>

</button> -->


  <!--*** ----------------- NAVBAR ---------------------*** -->
  <navBar />

  <!--*** ----------------- POST FORM ---------------------*** -->

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

    <!--*** ---------------- POST DISPLAY COMPONENT---------------------*** -->
<postDisplay/>

    <!--*** -----------------BLOC  POST DISPLAY---------------------*** -->

    <div id="postPublié" v-for="article in dataArt" :key="article.id">
      <div id=" postUser ">
        <div>


          <div id="user">
            <!-- <img v-if="article.user.media" class="UserImgProfil" alt="Image" :src="article.user.media" /> -->
            <!-- <span class="user"> Publié par: <strong>{{ article.user.lastName }} {{ }} {{ article.user.firstName
            }}</strong></span> -->

            <span class="postDate">
              le: {{ date(article.createdAt) }}
            </span>
          </div>
          <div id="article">
            <span class="content">{{ article.content }}</span>
            <img v-if="article.media" class="postImg" alt="Image" :src="article.media" />
          </div>
          <div class="icoTrashEdit" >
          <!-- <div class="icoTrashEdit" v-if=" article.user.role === 'admin'  "> -->
            <fa :icon="['fas', 'pencil-alt']" />
            <fa :icon="['far', 'trash-alt']" @click="deleteArticle(article.id)" />
          </div>
        </div>
        <!-- -----------------------BLOC LIKE   POST DISPLAY------------------------>

        <div id="iconPost">
          <div class="iconLike" v-for="like in article.dislike" :key="like.id">
            <span class="icon">
              <fa class="like" :icon="['far', 'thumbs-up']" @click="liked(article.id)" />{{ like.like + like.like}}
            </span>


            <span class="icon">
              <fa class="like" :icon="['far', 'thumbs-down']" @click="disliked(article.id)" />
            </span>

          </div>
          <span class="commentIcon">
            
            <fa :icon="['far', 'comment']" @click="commentInput = !commentInput" v-model="PostLiked" />
          </span>
        </div>


        <!-- ----------------------- FORM COMMENTER ------------------------>

        <form id="formPost" @submit.prevent="articleComment" v-show="commentInput">
          <div id="articleUser">
            <div id="postText">
              <input v-model="CommentContent" class="commentaire" type="texte" placeholder="Ecrire" />

              <fa :icon="['fas', 'upload']" />
              <input type="file" id="mediaPost" ref="file" @change="FileUploadCom" accept="image/png, image/jpeg" />

              <button class="Publier" @click="uploadComment(article.id)">Publier</button>
            </div>
          </div>
        </form>

        <!-- -----------------------COMMENTAIRE DISPLAY------------------------>

        <div id="commentaires">
          <template v-for="commKey in article.comment" :key="commKey.id">
            <div id="blocComment">
              <div class="commentaire">{{ commKey.comment }}</div>
              <img v-if="commKey.media" class="imgComment" alt="Image" :src="commKey.media" />

              <!-- -----------COMMENTAIRE DISPLAY BLOC INFO--------->

              <div id="identificationComment">
                <div id="ComData">
                  <span class="ComData"> par:{{ commKey.user.firstName }}</span>
                  <span class="ComData"> {{ commKey.user.lastName }}</span>
                  <span class="ComData">le:  {{ date(commKey.user.createdAt) }}</span>
                </div>
                <div id="blocInfo">
                  <div class="iconLike">
                    <div>
                      <button class="btnn" @click="liked(article.id)">
                        <fa class="like" :icon="['far', 'thumbs-up']" />
                      </button>
                      {{ 25 }}
                    </div>
                    <div>
                      <fa class="like" :icon="['far', 'thumbs-down']" />200
                    </div>
                  </div>
                  <div v-if="commKey.user.id === userId" class="icoTrashEdit">
                    <fa :icon="['fas', 'pencil-alt']" />
                    <fa :icon="['far', 'trash-alt']" @click="deleteArticle(article.id)" />
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
import postDisplay from "../components/postDisplay.vue";
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
    postDisplay,
  },
  props: {},
  mounted: function () {
this.userData(userId);
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
      articleId: "",
      likedArt: "",

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
        firstName: "",
        lastName: "",
      },
    };
  },
  beforeMount: function () {
    this.getAllArticle();
    
    // this.userData(userId);
    console.log("BEFORE MOUNT");
    console.log("USER-DATA-->", userId)
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

  watch: {
    likedArt: function (val) {
      console.log("watch", val);

    },

    dataArt: function (val) {
      console.log("WATCH ARTDATA MODIF LIVE", val);

    }
  },

  methods: {
    //-------------FILE NAME----------------//
    liked: function (a) {
      const likeData = { a, userId }
      console.log("LIKED", a, userId);
      this.likedArt = likeData;

    },



    //--------------COMPIL DATA ART ET COMMENT----------//
    // update:function(allData,comments){
    //   this.$store.dispatch("dat_Post",(allData,comments))
    // },

    //--------------FORMAT DATE----------------------//
    date(value) {
      return moment(value).format("DD/MM/YYYY à hh:mm");
    },


    count(value) {
      return value++;
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
      if (this.fileSelected) {


        var bodyFormData = new FormData();
        bodyFormData.append("media", this.fileSelected, this.fileSelected.name);
        bodyFormData.append("content", this.content);
        bodyFormData.append("userId", userId);

        console.table("FORM DATA AVEC IMAGE ", ...bodyFormData.entries());
      } else {
        var bodyFormData = new FormData();
        bodyFormData.append("content", this.content);
        bodyFormData.append("userId", userId);

        console.table("FORM DATA SANS IMAGE ", ...bodyFormData.entries());
      }
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
    uploadComment: function (Aid) {

      if (this.fileSelectedComment) {

        var bodyFormData = new FormData();
        bodyFormData.append("media", this.fileSelectedComment, this.fileSelectedComment.name);
        bodyFormData.append("comment", this.CommentContent);
        bodyFormData.append("userId", userId);
        bodyFormData.append("articleId", Aid);

        console.table("FORMDATA-COMMENT AVEC IMAGE------>", ...bodyFormData.entries());
      } else {
        var bodyFormData = new FormData();
        bodyFormData.append("comment", this.CommentContent);
        bodyFormData.append("userId", userId);
        bodyFormData.append("articleId", Aid);

        console.table("FORMDATA-COMMENT SANS IMAGE------>", ...bodyFormData.entries());
      }
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

    //------------------DELETE ARTICLE-------------------------//
    deleteArticle(data) {

      console.log("USER-ID PROFIL DELETE", data);
      this.$store
        .dispatch("deleteArticle", data)
        .then((response) => {
          if (response) {


            response.json({ message: "Article supprimé" })
            this.$router.push("login");
          }
        }).catch((err) => {
          console.log("ERREUR REQUETE PROFIL DELETE ARTICLE----->", err);

        })
    }

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

.liked-enter-active,
.liked-leave-active {
  transition: scale 0.5s ease;
  animation: scale(1.5);
}

.liked-enter-from,
.liked-leave-to {

  animation: scale(1);
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

.btnn {
  display: flex;
  justify-content: center;
  padding-top: 2px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
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
.UserImgProfil{
  width:40px;
  height: 40px;
  border-radius: 50%;
}
</style>
