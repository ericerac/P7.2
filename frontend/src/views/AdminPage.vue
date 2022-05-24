<template>
  <div id="adminPage">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" @click="goToAdmin">
          Acceuil administrateur
        </li>
        <li class="breadcrumb-item" @click="goToUsersData()">
          Liste Utilisateurs
        </li>
        <li class="breadcrumb-item" @click="goToForm()">
          Formulaire de recherche
        </li>
        <li
          class="breadcrumb-item active"
          aria-current="page"
          @click="goToProfilPage()"
        >
          Retour Page Profil
        </li>
      </ol>
    </nav>
    <div class="dropdown">
      <a
        class="btn btn-secondary dropdown-toggle"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Dropdown link
      </a>

      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>
    <form class="row g-3 needs-validation" novalidate v-if="mode == 'form'">
      <div class="col-md-4">
        <label for="validationCustom01" class="form-label">First name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom01"
          value="Mark"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <div class="col-md-4">
        <label for="validationCustom02" class="form-label">Last name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom02"
          value="Otto"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <div class="col-md-4">
        <label for="validationCustomUsername" class="form-label"
          >Username</label
        >
        <div class="input-group has-validation">
          <span class="input-group-text" id="inputGroupPrepend">@</span>
          <input
            type="text"
            class="form-control"
            id="validationCustomUsername"
            aria-describedby="inputGroupPrepend"
            required
          />
          <div class="invalid-feedback">Please choose a username.</div>
        </div>
      </div>
      <div class="col-md-6">
        <label for="validationCustom03" class="form-label">City</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom03"
          required
        />
        <div class="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div class="col-md-3">
        <label for="validationCustom04" class="form-label">State</label>
        <select class="form-select" id="validationCustom04" required>
          <option selected disabled value="">Choose...</option>
          <option>...</option>
        </select>
        <div class="invalid-feedback">Please select a valid state.</div>
      </div>
      <div class="col-md-3">
        <label for="validationCustom05" class="form-label">Zip</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom05"
          required
        />
        <div class="invalid-feedback">Please provide a valid zip.</div>
      </div>
      <div class="col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="invalidCheck"
            required
          />
          <label class="form-check-label" for="invalidCheck">
            Agree to terms and conditions
          </label>
          <div class="invalid-feedback">You must agree before submitting.</div>
        </div>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" type="submit">Submit form</button>
      </div>
    </form>
    <div id="data">{{}}Données recherchées</div>
    <div id ="listeUser">
    <select v-model="currentEntries" class="select" @change="listEntries"></select>
    <table class="table" v-if="mode == 'usersData'" >
  <thead>
    <tr>
      <th scope="col">Supprimer</th>
      <th scope="col">Nom</th>
      <th scope="col">Prénom</th>
      <th scope="col">Inscrition</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="use in AllUsers" v-bind:key="use">
      <th scope="row"></th>
      <td>{{use.firstName}}</td>
      <td>{{use.lastName}}</td>
      <td>{{ dateTime(use.createdAt) }}</td>
    </tr>
    
  </tbody>
</table>
</div>
  </div>
</template>

<script>
const url = "localhost:3000";
import { mapState } from "vuex";
//import{$array}from"alga.js";
const axios = require("axios");
import moment from "moment";
import UserList from "../components/UserList.vue";
export default {
  name: "adminPage",

  data: function () {
    return {
      mode: "admin",
//-------gestion affichage liste user-----//
      // entries:[],
      // listEntries:[10,20,50],
      // currentEntries:10,
      // filterEntries:[],
//-------*****************************-----//

      firstName: "",
      lastName: "",
      email: "",
      password: "",
      usersData:[],
    };
  },
  updated:function(){
 console.log(this.AllUsers);
  },
  
  computed: {
      //...mapState(["status"]),
      disconnect:function(){
this.$store
         .dispatch("disconnect")
      },
    ...mapState({
      user: "userData",
      CountArticle: "articles",
      CountComment: "comments",
      UpdateData: "formData",
      usersId:"usersId",
      AllUsers:"allsUsersData",

    }),
  },
  methods: {
    goToForm: function () {
      this.mode = "form";
    },

    goToAdmin: function () {
      this.mode = "admin";
    },
    goToProfilPage: function () {
      this.$router.push("../profil");
    },
    goToUsersData: function () {
         this.$store.dispatch("getAllUsersData")
         
            this.$router.push("/UserList ");
       
        
      // this.$router.push("../components/UserList ");
    },

    goToAdminPage: function (){
      this.$router.push("../homePage");
    },
    
  //   getUsersData: function () {
  //      const self = this;
  //      this.$store
  //        .dispatch("getAllUsersData")
  // .then((res)=>{
  //            console.log("REPONSE USER-DATA",res);
  //        });
  
  //    },
     dateTime(value) {
      return moment(value).format('DD-MM-YYYY');
    },


    // getAllUsersData: () => {
      
    //   axios
    //     .get(`http://localhost:3000/user/all`)
    //     .then((res) => {
    //       console.log("reponse", res.data);
    //      commit("usersData",res.data);
    //       const countArticle = res.data.article.length;
    //       commit("Articles",countArticle);
    //       const countComment = res.data.comment.length;
    //       console.log("USERS-DATA",usersData);
    //       commit("Comments",countComment);

    //       if (res) {
    //         console.log("reponse", res.data);
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
#adminPage{
  background-color: antiquewhite;
}
</style>
