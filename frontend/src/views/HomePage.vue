<template>
  <div id="homePage">
    <img id="userImg" src="" alt="" />
    <h3 id="userName">{{ userName }}Machin Bidule</h3>
    <span id="userDate" class="userInfo">Menbre depuis le:{{ userDate }}</span>
    <span id="userEmail" class="userInfo">{{ userEmail }}</span>
    <span id="userPost" class="userInfo">Articles publiés:{{ userPost }}</span>
    <span id="userComment" class="userInfo"
      >Commentaires publiés:{{ userComment }}</span
    >
    <button class="btn" id="passwordChange">passwordChange</button>
    <label
      >choisir Photo de profil

      <input
        type="file"
        id="PhotoPerfilChange"
        ref="file"
        v-on:change="onChangeFileUpload()"
        accept="image/png, image/jpeg"
      />
    </label>
    <button  class ="btn" id="valider" >Valider </button>
  </div>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  methods: {
    getUser() {
      axios
        .get("http://localhost:3000/users")
        .then((res) => {
          console.log("reponse", res);
          formData.push(res);
          console.log("formData", formData);
          if (res) {
            formData.push(res);
            console.log("reponse", res);
            console.log(formData);
          } else {
            console.log("pas de data");
          }
        })
        .catch((err) => {
          console.log("reponse err", err);

          //console.log("ça m'énerve encore");
        });
    },
  },
};
</script>

<style scoped>
#homePage {
  width: 350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid black;
}
#userImg {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid black;
  margin: 20px auto;
}
.btn {
  width: 40%;
  margin: 10px auto;
  border:1px solid black;
  border-radius: 5px;
}
</style>