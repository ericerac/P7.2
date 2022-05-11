<template>
  <!-- <button type="button" class="btn btn-primary position-relative">
  notifications
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    99+
    <span class="visually-hidden">unread messages</span>
  </span>
</button> -->

  <div id="post">
    <form id="formPost" @submit.prevent="articlePost">
      <div id="articleUser">
        <div id="postText">
          <input
            v-model="content"
            class="commentaire"
            type="texte"
            placeholder="Ecrire"
          />
          <label
            >choisir

            <input
              type="file"
              id="mediaPost"
              ref="file"
              @change="FileUpload"
              accept="image/png, image/jpeg"
            />
          </label>
          <button class="Publier" @click="uploadPost">Publier</button>
        </div>
      </div>
    </form>
    <div id="postPublié" v-for="article in dataArt" :key="article.id">
      <div id=" postUser ">
        <!-- <div id="user">
        <span class="user" >{{article.user }} {{ }} {{  }}</span>
        
        <span class="postDate"
        
          >posté le: {{ dateTime(article.createdAt) }}
        </span>
      </div> -->
        <span class="postDate">
          posté le: {{ dateTime(article.createdAt) }}
        </span>
        <div id="article">
          <span class="content">{{ article.content }}</span>
          <img class="postImg" alt="Image" v-bind:src="article.media" />
        </div>
        <template v-for="it in article.user" :key="it">
          <div id="user">
            <span class="user"> {{ it }} </span>
          </div>
        </template>
        <div id="options">
          <span class="like">{{}} like {{}} dislike</span>
          <div class="comment">commenter</div>
        </div>

        <div id="repondre">
          <input v-model="ArticleDate" class="commentaire" type="texte" />
          <button class="Valider" @click="filtreArticleDate()">Répondre</button>
          <button class="Valider" @click="filtreMAP()">Répondre</button>
        </div>
        
          <div id="commentaires">

            <template v-for="commKey in article.comment" :item="commKey.id">
            <div class="commentaire">{{ commKey.comment }}</div>
            </template>

            
            <div id="identificationComment" >
              <span id="UserComment" > name:{{ commKey }}</span>
              <!-- <span id="dateComment">{{ dateTime(commKey.createdAt) }}</span>-->
            </div>
           
            <!-- <div class="commentaire"  v-for="( comment, value,key ) in article.comment[0]" :Key="key">{{key}}:{{comment}}:{{value}}:</div> -->
            <!-- <div class="commentaire"  v-for="( comments,value ) in comments" :Key="comments"> ARTICLE COMMENT ?  :    {{comments}}:{{value}}</div> -->

            <div id="options">
              <span class="like" ><fa :icon="['fas','user']"  /> <fa :icon="['far','calendar-alt']" />
               <fa :icon="['far','bell']" /><fa :icon="['far','paper-plane']" /><fa :icon="['far','thumbs-up']" />
               <fa :icon="['far','thumbs-down']" /><fa :icon="['far','user-circle']" /><fa :icon="['far','trash-alt']" />
               <fa :icon="['far','file-alt']" /><fa :icon="['fas','upload']" /><fa :icon="['fas','bars']" /><fa :icon="['fas','pencil-alt']" /></span>
              <span class="comment"></span>
            </div>
          </div>
        
        <button>Se connecter</button>
      </div>
    </div>
  </div>
</template>

//**********************************************// */
//**********************************************// */

<script>
import { mapGetters, mapState } from "vuex";
import moment from "moment";
import LoginVue from "../components/Login.vue";

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
  name: "MyHome",
  props: {},
  mounted: function () {
    console.log("MOUNTED");
  },

  updated: function () {
    console.log("UPDATED");
    console.log("ARTICLES-->", this.$store.state.artData);
    console.log("COMMENT ALL DATA-->", this.$store.state.alldata);
    //this.comments=this.$store.state.comment;
    console.log("USER-DATA-->", this.$store.state.userData);
    console.log("COMMENT 2-->", this.comments);
    this.usersData(this.$store.state.artData);
    // this.update(this.allData,this.comments)
  },

  data: function () {
    return {
      // entries:[],
      // showEntries:[10,20,50],
      // currentEntires:10,
      // filterEntries:[],

      fileSelected: "",

      commenter: commentaires,

      content: "",
      media: "",
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
    console.log("BEFORE MOUNT");
  },
  onMounted: function () {
    console.log("ON MOUNTED");
  },
  beforeCreate: function () {
    console.log("BEFORE CREATED");
  },
  beforeUpdate: function () {
    console.log("BEFORE UPDATE");
  },

  computed: {
    //   ...mapGetters({
    //     PostData:"allDatas"
    //   }),
    ...mapState({
      // user: "userData",
      dataArt: "artData",
      
      comments: "comments",

      alldata: "alldata",

      //dataCommenmt:"artDAta.comment"
    }),
  },

  methods: {
    //-------------FILE NAME----------------//
    FileUpload(event) {
      console.log("EVENT", event);
      this.fileSelected = event.target.files[0];

      console.log("fichier Image", this.fileSelected);
    },

    //--------------COMPIL DATA ART ET COMMENT----------//
    // update:function(allData,comments){
    //   this.$store.dispatch("dat_Post",(allData,comments))
    // },

    //--------------FORMAT DATE----------------------//
    dateTime(value) {
      return moment(value).format("DD-MM-YYYY");
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

    usersData: (ua) => {
      let self = this;
      const UserId = [];
      const comm = [];
      console.log("DATA-ART", ua);
      for (let i of ua) {
        UserId.push(i.userId);
        comm.push(i.comment);
      }
      // console.log("UserId", UserId);
      // console.log("Comment userData PostVue",comm);

      //this.UsersId=UserId;
    },

    //------------ UPLOAD POST-----------------------//
    uploadPost: function () {
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

    //------------ UPLOAD POST-----------------------//
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

//***********   +++++++++++++  +++++++++++++ */
        //***********   +++++++++++++  +++++++++++++ */

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
  font-size: 12px;
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

  margin: 5px auto 20px;
  padding-top: 10px;
  background-color: rgb(255, 255, 255);
  width: 95%;
  height: auto;
  border: 1px solid #fd2d01;
  border-radius: 5px;
}
.comment {
  border: 1px solid blue;
}
#repondre {
  width: 100%;
  margin: 10px auto;
}
#identificationComment {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
  padding-bottom: 0;
}
</style>
