<template>
  <div id="post">
    <div id="articleUser">
      <div id="postText">
        <input
          v-model="post.content"
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
    <div id="postPublié" v-for="article in dataArt" :key="article.id">
      <div id="user">
        <span class="user">{{ article.userId }}</span>
        <span class="postDate"
          >posté le: {{ dateTime(article.createdAt) }}
        </span>
      </div>

      <div id="article">
        <span class="content">{{ article.content }}</span>
        <img class="postImg" alt="Image" v-bind:src="article.media" />
      </div>
      <div id="options">
        <span class="like"
          >{{ article.like }} like {{ article.dislike }} dislike</span
        >
        <div class="comment">commenter</div>
      </div>

      <div id="repondre">
        <input v-model="commentaire" class="commentaire" type="texte" />
        <button class="Valider">Répondre</button>
      </div>
      <div id="commentaires" v-for="comments in artData" :key="comments.id">
        <div id="identificationComment">
          <span id="UserComment">UserComment{{}}</span>
          <span id="dateComment">dateComment{{ date }}</span>
        </div>

        <div class="commentaire">UserName:{{ comments.content }}</div>
        <div id="options">
          <span class="like">{{ likes }} {{ dislikes }} </span>
          <span class="comment">{{ commenter }}ico commenter</span>
        </div>
      </div>
      <button>Se connecter</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import LoginVue from "../components/Login.vue";
const axios = require("axios");

let user = localStorage.getItem("user");
 const User = JSON.parse(user);
       const userId = User.userId;
       const userToken= User.token;
       console.log(userId,userToken);

export default {
  name: "MyHome",
  props: {},
  mounted: function () {
    console.log(this.$store.state.artData);
    console.log(this.$store.state.user);
    // console.log(userData);
    console.log("REPONSE artData", this.dataArt);

    this.$store.dispatch("getAllArticle");
    this.$store.dispatch("getUserData");
    //getUserData();
  },

  updated: function () {
    console.log(this.$store.state.artData);
    console.log(this.$store.state.comment);
  },

  data: function () {
    return {
      fileSelected: "",
      post: {
        content: "",
        media: "",
        userId: userId,
        token: userToken,
      },
    };
  },
  computed: {
    ...mapState({
      user: "userData",
      dataArt: "artData",
      comment: "comment",

      //dataCommenmt:"artDAta.comment"
    }),
  },

  methods: {
    dateTime(value) {
      return moment(value).format("DD-MM-YYYY");
    },

    uploadPost: function () {
      const self = this;
      console.log(" Publier Post");
      this.$store
        .dispatch("uploadPost", {
          // dispatch ("nom de la fonction dans ./store/index.js ")
          
            content: this.post.content,
            media: this.post.media,
            userId: this.post.userId,
            //token: this.token,
         
        })
        .then(function (response) {
          console.log("reponse", response);
          //self.$store.dispatch("getAllArticle");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    FileUpload(event) {
      console.log("EVENT", event);
      this.fileSelected = event.target.files[0];
      console.log("fichier Image", this.fileSelected);
    },
    //  getImg(img) {
    //    return require(`url/${img}`);
    //  }
  },
};
</script>

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

  margin: 20px auto;
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
}
</style>
