<template>
  <div id="post">
    <div id="user">
      <span class="user">{{ userName }}user</span>
      <span class="postDate">posté le:{{ date }}</span>
    </div>
    <div id="postText">Ici le post texte</div>
    <div id="article">
      <img class="postImg" src="" alt="Image" />
    </div>
    <div id="options">
      <span class="like">{{ likes }}Icolike {{ dislikes }} Icodislike</span>
      <span class="comment">{{ commenter }}commenter</span>
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
</template>

<script>
const axios = require("axios");

export default {
  name: "MyHome",
  props: {},
  data: function () {
    return {
      formData: {
        articleId: "",
        content: "",
        createdAdt: "",
        updateAdt: "",
        media: "",
        like: "",
        dislike: "",
        user_id: "",
      },
    };
  },
  methods: {
    getArticle() {
      axios
        .get("http://localhost:3000/article/all")
        .then((res) => {
            console.log("reponse", res);
            formData.push(res);
            console.log("formData",formData);
          if (res) {
            formData.push(res);
            console.log("reponse", res);
            console.log(formData);
          }else{
              console.log("pas de data");
          }
        })
        .catch((err) => {
            console.log("reponse err",err);
          
          //console.log("ça m'énerve encore");
        });
    },
  },
};
</script>

<style scoped>
#post {
  width: 90%;
  max-width: 25rem;
  border: solid 2px #fd2d01;
  background-color: #ffd7d7;
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
  border: 1px solid #fd2d01;
  border-radius: 10px;
  height: 120px;
}
#postText {
  display: flex;
  width: 95%;
  background-color: rgb(255, 255, 255);
  margin: 5px auto;
  border: 1px solid black;
  border-radius: 5px;
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
  margin: 10px auto;
  background-color: rgb(255, 255, 255);
  width: 95%;
  margin: 0 auto;
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
