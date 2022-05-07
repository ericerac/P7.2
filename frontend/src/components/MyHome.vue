<template>
<div>
<nav class="navbar navbar-expand-lg navbar-dark " v-if="mode == 'login'">
  <div class="container">
    <a class="navbar-brand" href="#">
      <img src="../assets/icon-left-font-monochrome-white.png" alt="" width="100" height="80">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    <li><a class="dropdown-item active" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
</div>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" v-if="mode == 'signup'">Disabled</a>
          <a class="nav-link " v-if="mode == 'login'">Disabled</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>



  <div id="form_card">
   
    <div id="form_signup">
      <div id="formName" v-if="mode == 'signup'">
        <input
          v-model="firstName"
          class="input"
          type="text"
          placeholder="Nom"
        />

        <input
          v-model="lastName"
          class="input"
          type="text"
          placeholder="Prénom"
        />
      </div>
      
      <input 
        v-model="email" 
        class="input" 
        placeholder="Email" 
      />

      <input
        v-model="password"
        type="password"
        class="input"
        placeholder="Password"
      />

      <button v-if="mode == 'signup'" id="btn" @click="signupPost()">
        S'inscrire
      </button>
      <span v-if="status == 'loading'">En cours de connexion</span>
      <span v-else>Connecté</span>

      <button v-if="mode == 'login'" id="btn" @click="loginPost()">
        Se connecter
      </button>

      <p class="annonce" v-if="mode == 'signup'">
        Vous avez déjà un compte:><span @click="goToLogin">Se connecter</span>
      </p>
      <p class="annonce" v-if="mode == 'login'">
        Vous n'êtes pas encore inscrit:<span @click="goToSignup">
          S'inscrire</span
        >
      </p>
    </div>
  </div>
</div>
</template>
//----------------SCRIPT----------------//

                    //----------------SCRIPT----------------//
<script>
//import axios from axios;
const axios = require("axios");
import { mapState } from "vuex";

export default {
  name: "MyHome",
  props: {},
  data: function () {
    return {
      mode: "login",

      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  },
   mounted:function(){
     //localStorage.removeItem("user");
   },
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    goToSignup: function () {
      this.mode = "signup";
    },

    goToLogin: function () {
      this.mode = "login";
    },
    //-------------SIGNUP----------------------//

    signupPost: function () {
      const self = this;

      this.$store
        .dispatch("signupPost", {   // dispatch ("nom de la fonction dans ./store/index.js ")
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          console.log("reponse", response);
          self.loginPost();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //-------------LOGIN-----------------------//

    loginPost: function () {
      const self = this;
      this.$store
        .dispatch("loginPost", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data); // userId token
          self.$router.push("HomePage");
        })
        .catch((err) => {
          console.log("Restons calme login", err);
        });
    },
  },
};
</script>

<style scoped>
.navbar {
 /* Couleur de fond de la barre de navigation */
 background-color:#ffd7d7;
 
 border: 2px solid #fd7a7a;;
}
#form_card {
  width: 350px;
  margin: 0 auto;
  border: 2px solid red;
  border-radius: 10px;
  background-color: #ffd7d7;
}
#form_signup {
  display: flex;
  flex-direction: column;
}
.input {
  width: 90%;
  height: 40px;
  margin: 10px auto;
  border-radius: 5px;
  border: 1px solid red;
}
#btn {
  width: 90%;
  height: 40px;
  margin: 10px auto;
  border-radius: 20px;
  background-color: burlywood;
  border: 1px solid rgb(250, 170, 170);
}
</style>

// axios // .post("http://localhost:3000/signup", { // firstName:
this.firstName, // lastName: this.lastName, // email: this.email, // password:
this.password, // }) // .then((response) => { // if (response.status(201)) { //
window.location.href = "http://localhost:8080/homepage"; // } //
console.log("reponse", response); // }) // .catch(() => { // console.log("ça
m'énerve signup"); // });



//{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiYjUyNDBiLTkxZGUtNDc1YS1hMDQyLTNlMTEzMDA2MGZjZiIsImlhdCI6MTY1MTU3Njc0NX0.KYBkPXBeTQPMVRytgj0Z0MSQdiRhQg3Sdr7hNff-wQ8",
    "userId": "0bb5240b-91de-475a-a042-3e1130060fcf",
    "userRole": "admin"
}