<template>
  <form id="form" @submit.prevent="uploadUser">
    <div id="homePage">
      <div id="UserData" v-if="mode == 'homePage'">
        <!-- USER NON DEFINI -->

        <img
          id="userImg"
          v-bind:src="user.media"
          alt="Photo de profil utilisateur"
        />

        <h3 id="userName">{{ user.firstName }} {{ user.lastName }}</h3>
        <p id="adminUser" v-if="user.role == 'admin'">Compte administrateur</p>
        <router-link to="/user/admin" v-if="user.role == 'admin'"
          >Page administrateur</router-link
        >
        <span id="userDate" class="userInfo"
          >Menbre depuis le:{{ user.createdAt }}</span
        >
        <span id="userEmail" class="userInfo">Email: {{ user.email }}</span>
        <span id="userPost" class="userInfo"
          >Articles publiés: {{ CountArticle }}</span
        >
        <span id="userComment" class="userInfo"
          >Commentaires publiés: {{ CountComment }}</span
        >
      </div>
      <div v-if="mode == 'updateProfil'" id="dataForm">
        <input
          v-model.lazy="firstName"
          name="firstName"
          class="input"
          type="text"
          placeholder="Nom"
        />

        <input
          v-model="lastName"
          name="lastName"
          class="input"
          type="text"
          placeholder="Prénom"
        />

        <input
          v-model="email"
          name="email"
          class="input"
          type="text"
          placeholder="Email"
        />
      </div>
      <button v-if="mode == 'updateProfil'" class="btn" id="passwordChange">
        passwordChange
      </button>
      <label v-if="mode == 'updateProfil'"
        >choisir Photo de profil

        <input
          type="file"
          name="image"
          id="PhotoPerfilChange"
          ref="file"
          @change="FileUpload"
          accept="image/png, image/jpeg"
        />
      </label>
      <button
        v-if="mode == 'homePage'"
        class="btn"
        id="valider"
        @click="goToUpdateProfil"
      >
        Modifier votre profil
      </button>
      <button
        v-if="mode == 'updateProfil'"
        class="btn"
        id="valider"
        @click="onSubmit()"
      >
        Modifier
      </button>
      <button
        type="submit"
        v-if="mode == 'updateProfil'"
        class="btn"
        id="valider"
        @click="goToHomePage"
      >
        Annuler
      </button>
      <!-- <button  class ="btn" id="logOut" :click="logOut()">Se deconnecter </button> -->
    </div>
  </form>
</template>

//***-----------------------------------***/
//***-----------------------------------***/
//***-----------------------------------***/

<script>
import { mapState } from "vuex";
//import FormData from 'form-data';
const FormData = require("form-data");
import { axios } from "axios";

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

export default {
  name: "HomePage",

  mounted: function () {
    console.log(this.$store.state.user);
    if (User.userId == null) {
      this.$router.push("/");
      return;
    }
    const UserId = this.$store.state.user;
    console.log("USER-ID Mounted", UserId.userId);

    const userId = UserId.userId;

    this.userId = userId;
    console.log("USER-ID", userId);
    this.$store.dispatch("getUserData");
    //getUserData();
  },

  data: () => {
    return {
      mode: "homePage",
      fileSelected: null,
      name: "",

      url: "http://localhost:8080",

      userId: "userId",
      firstName: "",
      lastName: "",
      email: "",
      password: "",

      token: userToken,
    };
  },
  props: {},
  computed: {
    ...mapState({
      user: "userData",
      CountArticle: "articles",
      CountComment: "comments",
      UpdateData: "formData",
      usersId: "usersId",
    }),
  },
  methods: {
    goToHomePage: function () {
      this.mode = "homePage";
    },

    goToUpdateProfil: function () {
      this.mode = "updateProfil";
    },

    FileUpload(event) {
      console.log("EVENT", event);
      this.fileSelected = event.target.files[0];

      console.log("fichier Image", this.fileSelected);
    },
    //--------------------UPDATE-USER 1---------------------//

    onSubmit() {
      // upload file
      var bodyFormData = new FormData();
      bodyFormData.append("media", this.fileSelected, this.fileSelected.name);
      bodyFormData.append("firstName", this.firstName);
      bodyFormData.append("lastName", this.lastName);
      bodyFormData.append("email", this.email);
      console.log("FORMDATA", bodyFormData);
      console.table("this.firstName ", ...bodyFormData.entries());
      axios({
        method: "post",
        url: "http://localhost:3000/user/update",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    },
    //--------------------UPDATE-USER 1.1---------------------//

    // updateUser: function () {
    //   console.log("UPDATE USER HOME PAGE");
    //   const getFormData = (formData =>
    //     Object.entries(formData).reduce((fd, [key, val]) => {
    //       if (Array.isArray(val)) {
    //         val.forEach((v) => fd.append(key, v));
    //       } else {
    //         fd.append(key, val);
    //       }
    //       return fd;
    //     }), new FormData());

    //   console.log("media", this.fileSelected)
    //   this.$store
    //     .dispatch("updateUser", this.getFormData
    //     //{
    //       //  userId: this.formData.userId,
    //       //  firstName: this.formData.firstName,
    //       //  lastName: this.formData.lastName,
    //       //  email: this.formData.email,
    //       //  password: this.formData.password,
    //       //  media: this.formData.media,
    //     //}
    //     )
    //     .then(function (response) {
    //       console.log("reponse", response);
    //       // self.loginPost();
    //       self.$router.push("/HomePage");
    //       goToHomePage();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    //-------------UPDATE USER 2--------------_();
    // updateUser(e) {
    //   e.preventDefault();
    //   const fd = new FormData();
    //   fd.append(e.currentTarget);
    //   console.log("NEW FORM-->", fd);

    //   //Data.append('corp',this.formData);
    //   // let fileName = this.fileSelected;
    //   // let naame = fileName.name;
    //   // fd.append('file',this.fileSelected,this.fileSelected.name);

    //   // console.log("DATA",fd);
    //   // console.log("file", this.fileSelected);
    //   // this.$store.dispatch("updateUser", fd);
    // },

    //----------------LOGOUT-------------------(())

    // logOut: (state) => {
    //   localStorage.removeItem('user')
    //   return
    // },
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
  border-radius: 10px;
}
#UserData {
  display: flex;
  flex-direction: column;
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
  border: 1px solid black;
  border-radius: 5px;
}
</style>
