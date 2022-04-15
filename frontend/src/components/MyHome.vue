<template>
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
      <input v-model="email" class="input" placeholder="Email" />

      <input
        v-model="password"
        type="password"
        class="input"
        placeholder="Password"
      />

      <button v-if="mode == 'signup'" id="btn" @click="signupPost()">
        S'inscrire
      </button>
      <button v-else id="btn" @click="loginPost()">Se connecter</button>

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
</template>

<script>
//import { log } from 'console';

//mport axios from axios;
const axios = require("axios");

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
  computed: {},
  methods: {
    goToSignup: function () {
      this.mode = "signup";
    },

    goToLogin: function () {
      this.mode = "login";
    },

    signupPost() {
      axios
        .post("http://localhost:3000/signup", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response.status(201)) {
            window.location.href = "http://localhost:8080/homepage";
          }
          console.log("reponse", response);
        })
        .catch(() => {
          console.log("ça m'énerve signup");
        });
    },
    loginPost() {
      axios
        .post("http://localhost:3000/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log("reponse", response);
        })
        .catch(() => {
          console.log("Restons calme login");
        });
    },
  },
};
</script>

<style scoped>
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
