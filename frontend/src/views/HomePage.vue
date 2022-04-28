<template>
  <div id="homePage">
    <div id="UserData" v-if="mode == 'homePage'">
      <img
        id="userImg"
        v-bind:src="user.media"
        alt="Photo de profil utilisatuer"
      />
      <h3 id="userName">{{ user.firstName }} {{ user.lastName }}</h3>
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
        v-model.lazy="formData.firstName"
        class="input"
        type="text"
        placeholder="Nom"
      />

      <input
        v-model="formData.lastName"
        class="input"
        type="text"
        placeholder="Prénom"
      />

      <input
        v-model="formData.email"
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
      @click="updateUser"
    >
      Modifier
    </button>
    <button
      v-if="mode == 'updateProfil'"
      class="btn"
      id="valider"
      @click="goToHomePage"
    >
      Annuler
    </button>
    <!-- <button  class ="btn" id="logOut" :click="logOut()">Se deconnecter </button> -->
  </div>
</template>

//***-----------------------------------***/
//***-----------------------------------***/
//***-----------------------------------***/

<script>
import { mapState } from "vuex";

export default {
  name: "HomePage",
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/MyHome");
      return;
    }
    const UserId = this.$store.state.user;
    const User = JSON.parse(UserId);
    const userId = User.userId;
    console.log(userId);

    this.formData.userId = userId;
    console.log("USER-ID", userId);
    this.$store.dispatch("getUserData");
    //getUserData();
  },

  data: () => {
    return {
      mode: "homePage",
      fileSelected: "",
      formData: {
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        media: "",
      },
    };
  },
  props: {},
  computed: {
    ...mapState({
      user: "userData",
      CountArticle: "articles",
      CountComment: "comments",
      UpdateData: "formData",
    }),
    //   firstName: {
    //   get () {
    //     return formData.firstName
    //   },
    //   set (value) {
    //     ( value)
    //   }
    // }
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
       this.formData.media = event.target.files[0];
       console.log("fichier Image",this.formData.media);
    },

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
updateUser(formData, index, fileList) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  }

  this.$store.dispatch('updateUser', {
    'imageData': this.formData,
    'config': config
  })
},


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
