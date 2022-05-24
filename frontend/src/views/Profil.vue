<template>
  <div class="container  d-flex justify-content-center align-items-center">

    <div class="row col-12 col-lg-10 col-xl-10">
      <div class="navBar mb-3 pd-3 d-flex justify-content-between align-items-center">
        <img class="logoTop" src="../assets/icon-left-font-monochrome-white.svg" alt="logo groupomania">
        <div .class="powerOff">
          <fa :icon="['fas', 'power-off']" @click="disconnect()" />
        </div>
      </div>
      <div class="card  ">
        <div class=" col-md-12 mt-2 text-center">
          <div class="user text-center">

          </div>
          <div class="user text-center">
            <span v-if="userData.role == 'admin'">
              <button class="btn btn-sm follow mt-0" @click="goToUsersData">
                Liste Des utilsateurs
              </button>
            </span>

            <span>
              <button class="btn btn-sm follow mt-0" @click="goToUpdateProfil">Modifier mon profil</button>
            </span>
            <span>
              <button class="btn btn-sm follow mt-0" @click="goToFilActu">
                Allez au fil d'actualité
              </button>
            </span>
            <span>
              <button class="btn btn-danger btn-sm follow mt-0" @click="deleteUser(userData.id)">
                Effacer mon compte
              </button>
            </span>
          </div>

        </div>

        <div class="upper">
          <div class="profile">
            <img v-if="!userData.media" id="userImg" src="../assets/icon.png " class="rounded-circle" width="80"
              alt="logo groupomanias" />
      
            <img v-if="userData.media" id="userImg" v-bind:src="userData.media" class="rounded-circle" width="80"
              alt="Photo de profil" />
            
          </div>
        </div>

 <div class="avis-media mt-1 mb-0 ">
<p  v-if="!userData.media">Choisissez une photo de profil</p>
</div>
        <div class="mt-1 text-center">

          <h4 class="mt-3">{{ userData.firstName }} {{ userData.lastName }}</h4>

          <p id="adminUser" v-if="userData.role == 'admin'">Compte administrateur</p>

          <div class="d-flex list-Foot justify-content-evently align-items-center px-1">
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
              <span class="stat">{{ dateTime(userData.createdAt) }}</span>
            </div>
            
          </div>
        </div>
      </div>

      <div class="navBar mt-3  d-flex justify-content-between ">
        <img class="logoTop" src="../assets/icon-left-font-monochrome-white.svg" alt="logo groupomania">

        <ul class="footerList">
          <li>Contact</li>
          <li>Avis légal</li>

        </ul>

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


let userCookies = $cookies.get("user");
if(!userCookies){
  
}else{
console.log("USER COOKIES", userCookies);
let userId = userCookies.userId;
let userToken = userCookies.token;}


// const User = JSON.parse(user);
// if (User) {
//   userId = User.userId;
//   userToken = User.token;
// } else {
// }

// console.log(userId, userToken);

export default {
  name: "profil",

  beforeMount: function () {
    console.log("BEFORE MOUNT");
    let userCookies = $cookies.get("user");
    console.log("USER COOKIES", userCookies);
    this.userId = userCookies.userId;
    this.userToken = userCookies.token;

    console.log("USER-DATA-->", this.userData);
    this.getUserData(this.userId);
  },
  // onMounted: function () {
  //   console.log("ON MOUNTED");

  // },
  beforeCreate: function () {
    console.log("BEFORE CREATED");
    console.log("USER-DATA-->", this.userData);
    // beforeUpdate: function () {
    //   console.log("BEFORE UPDATE");

  },
  created: function () {
    console.log("CREATED");
    console.log("USER-DATA-->", this.userData);
    // beforeUpdate: function () {
    //   console.log("BEFORE UPDATE");

  },

  mounted: function () {

    console.log("USER-DATA MOOUNTED PROFIL", this.userData);
    // let user = $cookies.get(JSON.parse("user"));
    // let userId =user.useiId;
    // let userToken = user.token;
    // if (!user) {
    //   user = {
    //     userId: -1,
    //     token: "",
    //   };
    // } else if (user) {
    //   // const User = JSON.parse(user);
    //   // userId = User.userId;
    //   // userToken = User.token;
    // }

    // console.log("USER-ID i TOKEN 1-------->", userId, userToken,this.user);

    // this.getUserData(userId);
  },


  data: () => {
    return {
      mode: "profil",
      fileSelected: null,
      name: "",

      url: "http://localhost:8080",

      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",

      userToken: "",
    };
  },
  props: {},
  computed: {
    ...mapState({
      userData: "userData",
      CountArticle: "articles",
      CountComment: "comments",
      UpdateData: "formData",
      usersId: "userId",
    }),
  },
  methods: {
    goToProfil: function () {
      this.mode = "profil";
    },
    goToFilActu: function () {
      this.$router.push("/postPage");
    },

    goToUpdateProfil: function () {
      this.$router.push("/updateProfil");
    },
    goToUsersData: function () {
      this.$store.dispatch("getAllUsersData")

      this.$router.push("../components/UserList ");
    },
    //----------------DISCONNECT-----------------//
    disconnect() {
      console.log("DISCONNECT");
      $cookies.remove("user");
      this.$router.push("/");
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
        .then((response) => {
          console.log("REPONSE USER DATA Profil", response);
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

    //--------------------DELETE USER-------------------------//

    deleteUser(data) {
      const result = window.confirm("Voulez-vous vraiment supprimer votre compte ?")
      if (!result) {
        return
      }
      console.log("USER-ID PROFIL DELETE", data);
      this.$store
        .dispatch("deleteUser", data)
        .then((res) => {
          if (res) {
            console.log("RESOLVE PROFIL PAGE DELETE ------>", res.data.message);
            alert("votre compte a été supprimé")
            // response.json({ message: "Compte supprimé" })
            // 
            this.disconnect()
          }
        }).catch((err) => {
          console.log("ERREUR REQUETE PROFIL DELETE USER------>", err);

        })
    }
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

#app {
  background-image: url("../assets/fondNavRed.png");
  background-repeat: unset;
  /* opacity:.7; */
}

.container {
  height: 100vh;
}

.navBar {
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  width: 100%;
  height: 50px;
  background-image: url("../assets/Fondnav.png ");
  border-radius: .7rem;
  color: white;

}

.logoTop {
  width: 20%;
  height: auto;
  box-shadow: 2px 2px 20px solid black;
}

.card {
  /* width: 380px; */
  border: none;
  border-radius: 15px;
  padding: 8px;
  background-color: #fff;
  position: relative;
  height: auto;
}

.upper {
  height: 70px;
}

/* .upper img {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
} */

.user {
  position: relative;
}

.profile img {
  height: 80px;
  width: 80px;
  margin: 2px auto;
}

.profile {

  height: 90px;
  width: 90px;
  border: 3px solid #fff;
  margin: 2px auto;

  border-radius: 50%;
}
.avis-media{
 
  width: 100%;
  
  text-align: center;

}
.follow {
  border-radius: 15px;
  padding-left: 20px;
  padding-right: 20px;
  height: 35px;
}

/* .stats span {
  font-size: 20px;
} */

.footerList {
  display: flex;
  list-style-type: none;
  justify-content: space-between;
  align-items: center;

}
.ul{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.list-Foot{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
ul li {
  margin-left: 2rem;
  font-size: 1rem;
  margin-top: 1rem;
}
</style>
