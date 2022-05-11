<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="mt-2 text-center">
        <router-link
          class="text d-block mb-3"
          to="/user/admin"
          v-if="user.role == 'admin'"
          ><button class="btn btn-primary btn-sm follow pt-20px">
            Page administrateur
          </button>
        </router-link>

        <button class="btn btn-sm follow mt-0">Modifier mon profil</button>
        <button class="btn btn-sm follow mt-0" @click="goToFilActu">
          Allez au fil d'actualité
        </button>
        <button class="btn btn-danger btn-sm follow mt-0">
          Effacer mon compte
        </button>
      </div>
      <div class="upper"></div>

      <div class="user text-center">
        <div class="profile">
          <img
            id="userImg"
            v-bind:src="user.media"
            class="rounded-circle"
            width="80"
            alt="Photo de profil"
          />
          <!-- <img src="https://i.imgur.com/JgYD2nQ.jpg" class="rounded-circle" width="80"> -->
        </div>
      </div>

      <div class="mt-5 text-center">
        <h4 class="mt-3">{{ user.firstName }} {{ user.lastName }}</h4>

        <p id="adminUser" v-if="user.role == 'admin'">Compte administrateur</p>

        <div
          class="d-flex justify-content-between align-items-center mt-4 px-3"
        >
          <div class="stats">
            <h6 class="mt-3">Articles</h6>
            <span class="stat">{{ CountArticle }}</span>
          </div>

          <div class="stats">
            <h6 class="mt-3">Commentaires</h6>
            <span class="stat">{{ CountComment }}</span>
          </div>

          <div class="stats">
            <h6 class="mt-3">Inscrit le:</h6>
            <span class="stat">{{ dateTime(user.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//import FormData from 'form-data';
const FormData = require("form-data");
import { axios } from "axios";
import moment from "moment";

let user = localStorage.getItem("user");
let userId = "";
let userToken = "";

// const User = JSON.parse(user);
// if (User) {
//   userId = User.userId;
//   userToken = User.token;
// } else {
// }

console.log(userId, userToken);

export default {
  name: "profil",

  mounted: function () {
    // console.log(this.$store.state.user);

    // const UserId = this.$store.state.user;
    // // if (User.userId == null) {
    // //   this.$router.push("/");
    // //   return;
    // // }
    // const User = JSON.parse(UserId);
    // console.log("USER-ID Mounted", User.userId);
    // const IdUser = User.userId;
    // //const userId = UserId.userId;

    // //this.userId = userId;
    // console.log("USER-ID", userId);
    // //this.$store.dispatch("getUserData");

    let user = localStorage.getItem("user");
let userId = "";
let userToken = "";
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else if (user) {
  const User = JSON.parse(user);
  userId = User.userId;
  userToken = User.token;
}

console.log(userId, userToken);

    this.getUserData(userId);
  },

  data: () => {
    return {
      mode: "profil",
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
    goToUpdateProfil: function () {
      this.mode = "profil";
    },
    goToFilActu: function () {
      this.$router.push("/post");
    },

    goToUpdateProfil: function () {
      this.mode = "updateProfil";
    },

    FileUpload(event) {
      console.log("EVENT", event);
      this.fileSelected = event.target.files[0];

      console.log("fichier Image", this.fileSelected);
    },
    dateTime(value) {
      return moment(value).format("DD-MM-YYYY");
    },

    //-----------------GET USER DATA-----------------------//
    getUserData(UserId) {
      this.$store
        .dispatch("getUserData", UserId)
        .then(function (response) {
          console.log("reponse Get USER DATA Profil", response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //--------------------UPDATE-USER 1---------------------//

    onSubmit() {
      // upload file
      var bodyFormData = new FormData();
      bodyFormData.append("media", this.fileSelected, this.fileSelected.name);
      bodyFormData.append("firstName", this.firstName);
      bodyFormData.append("lastName", this.lastName);
      bodyFormData.append("email", this.email);
      bodyFormData.append("userId", userId);
      console.log("FORMDATA", bodyFormData);
      console.table("this.firstName ", ...bodyFormData.entries());
      this.$store
        .dispatch("updateUser", bodyFormData)

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

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:weight@100;200;300;400;500;600;700;800&display=swap");

body {
  background-color: #545454;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
}

.container {
  height: 100vh;
}

.card {
  width: 380px;
  border: none;
  border-radius: 15px;
  padding: 8px;
  background-color: #fff;
  position: relative;
  height: 370px;
}

.upper {
  height: 70px;
}

.upper img {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.user {
  position: relative;
}

.profile img {
  height: 80px;
  width: 80px;
  margin-top: 2px;
}

.profile {
  position: absolute;
  top: -50px;
  left: 38%;
  height: 90px;
  width: 90px;
  border: 3px solid #fff;

  border-radius: 50%;
}

.follow {
  border-radius: 15px;
  padding-left: 20px;
  padding-right: 20px;
  height: 35px;
}

.stats span {
  font-size: 20px;
}
</style>
