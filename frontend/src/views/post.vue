<template>
  <div id="post">
    <div id="articleUser">
      <div id="postText">
        <input
          v-model="article"
          class="commentaire"
          type="texte"
          placeholder="Ecrire"
        />
        <label
          >choisir

          <input
            type="file"
            id="PhotoPerfilChange"
            ref="file"
            v-on:change="onChangeFileUpload()"
            accept="image/png, image/jpeg"
          />
        </label>
        <button class="Valider">Publier</button>
      </div>
    </div>
    <div id="postPublié">
    <div id="user">
      <span class="user">{{ user.firstName }}user</span>
      <span class="postDate">posté le:{{ date }}</span>
    </div>

    <div id="article">
      <img class="postImg" src="" alt="Image" />
    </div>
    <div id="options">
      <span class="like"
        >{{user.like }} Icolike {{ user.dislike }} Icodislike</span
      >
      <span class="comment">{{ user.comment }}commenter</span>
    </div>

    <div id="repondre">
      <div id="identificationComment">
        <span id="UserComment">UserComment{{ userName }}</span>
        <span id="dateComment">dateComment{{ date }}</span>
      </div>
      <input v-model="commentaire" class="commentaire" type="texte" />
      <button class="Valider">Répondre</button>
    </div>

    <div id="commentaires">
      <span class="commentaire"
        >{{ userName }}UserName:{{ commentaire }}Ici irons les commentaires
        publiés</span
      >
      <div id="options">
        <span class="like">{{ likes }}Icolike {{ dislikes }} Icodislike</span>
        <span class="comment">{{ commenter }}ico commenter</span>
      </div>
    </div>
    <button @click="getArticle()">Se connecter</button>
    </div>
  </div>
</template>

<script>
import LoginVue from "../components/Login.vue";
const axios = require("axios");

export default {
  name: "MyHome",
  props: {},
  mounted:function(){
   
    //console.log(this.$store.state.user);
    //  if (this.$store.state.user.userId == -1){
    //    this.$router.push('/MyHome');
    //    return;
    //  }
     this.$store.dispatch('getAllArticle');
      //getUserData();
  },
  data: function () {
    return {
      formData: {
        article: "",
        content: "",
        createdAdt: "",
        updateAdt: "",
        media: "",
        like: "",
        dislike: "",
        users_id: "",
      },
      formData: [],
    };
  },
  methods: {
    // getArticle() {
    //   let left = this;
    //   axios
    //     .get("http://localhost:3000/article/all")
    //     .then((res) => {
    //       console.log("reponse 1", res.data);
    //       left.formData.push(res.data);
    //       console.log("reponse this formData", left.formData[0]);

    //       if (res) {
    //         this.formData.push(res.data);

    //         console.log("reponse 3", this.formData);
    //       } else {
    //         console.log("pas de data");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("reponse err", err);

    //       //console.log("ça m'énerve encore");
    //     });
    // },
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
  height: 120px;
}
#articleUser{
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
#postPublié{
  border: 1px solid #fd2d01;
  border-radius: 5px;
  margin-top: 20px;
  background-color: #ffd7d7;
}
.postImg {
  width: 98%;
  height: auto;
  border: 1px solid black;

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
  margin: 20px auto;
  padding-top: 10px;
  background-color: rgb(255, 255, 255);
  width: 95%;

  border: 1px solid #fd2d01;
  border-radius: 5px;
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
