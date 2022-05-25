<template>

<div class="wrapper">
            <div class="container">
                <form class="updateProfil-form">
                     <img class="logo" src="../assets/icon-left-font-monochrome-white.svg" alt="logo" width="200" height="160">
                     <div class="line-logo"></div>
                     <div class="fond-form">
                    <span class="form-title"> Modifiez votre profil</span>
                       
                   <div class=" form-group">
        
                </div>
                    
                    <div class="form-group" >
                        <label for="image">Choisissez une photo de profil</label>
                        <input
          type="file"
          name="image"
          id="PhotoPerfilChange"
          ref="file"
          @change="FileUpload"
          accept="image/png, image/jpeg"
        />
                    </div>    
                    <div class="form-group" >
                        <label>Nom</label>
                        <input v-model="user.firstName" type="text" name="nom" class="form-control"   placeholder="Nom" required />
                    </div>    
                    <div class="form-group" >
                        <label>Prénom</label>
                        <input v-model="user.lastName" type="text" name="prenom" class="form-control" placeholder="Prénom" required />
                    </div>    
                    <div class="form-group">
                        <label>Email</label>
                        <input v-model="user.email"  type="email" name="email" class="form-control" placeholder="Email" required />
                    </div>    
                    
                    
                    <div class="form-group">
                      <label class="btn-action" for="submit" >Modifier</label>
                        <input  name="submit" class="btn btn-primary mt-1 btn-lg btn-block" keyUp="enter" value="Modifier" @click="updateUser(userId)">
                        <label class="btn-action" for="retour">Retour</label>
                        <input  name="retour" class="btn btn-primary mt-1 btn-lg btn-block" keyUp="enter" value="Retour" @click="goToProfil">
                    </div>
                    </div>
   
                    
                </form>
            </div>
                    </div>

</template>


// *******  ******** ****** ******  SCRYPT   *******  ******** ****** ******//


<script>

import { mapState } from "vuex";
//import FormData from 'form-data';
const FormData = require("form-data");
import { axios } from "axios";
import moment from "moment";

let userCookies = $cookies.get("user");
console.log("USER COOKIES", userCookies);
let userId = userCookies.userId;
let userToken = userCookies.token;


console.log(userId, userToken);

export default {
  name: "profil",
  beforeMount: function () {

    console.log("BEFORE MOUNT");
    // console.log("USER-DATA-->", user)
  },
  onMounted: function () {
    console.log("ON MOUNTED");
    console.log("USER-DATA-->", user)
  },
  beforeCreate: function () {
    console.log("BEFORE CREATED");
    // console.log("USER-DATA-->", user)
  },
  
  mounted: function () {


    

    this.getUserData(userId);
  },


  data: () => {
    return {
      mode: "updateProfil",
      fileSelected: null,
      name: "",

      url: "http://localhost:3000",

      userId: userId,
     

      token: userToken,
    };
  },
  
  computed: {
    ...mapState({
      user: "userData",
      
    }),
  },
  methods: {
    goToProfil: function () {
      this.$router.push("/profil")
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

    updateUser() {
      // upload file
      
      var bodyFormData = new FormData();
      if(this.fileSelected){

        
        bodyFormData.append("media", this.fileSelected, this.fileSelected.name);
      bodyFormData.append("firstName", this.user.firstName);
      bodyFormData.append("lastName", this.user.lastName);
      bodyFormData.append("email", this.user.email);
      bodyFormData.append("userId", this.user.id);
        }else{
          bodyFormData.append("firstName", this.user.firstName);
      bodyFormData.append("lastName", this.user.lastName);
      bodyFormData.append("email", this.user.email);
      bodyFormData.append("userId", this.user.id);
        };
     console.log(" USER-ID UPDATE-USER UPDATE-PROFIL ----> ",this.user.id);
      console.table("FORMDATA UPDATE-USER UPDATE-PROFIL ------>", ...bodyFormData.entries());
      this.$store
        .dispatch("updateUser", bodyFormData)

        .then( (response) => {
          //handle success
          alert("Votre profil a bien été modifié")
          this.$router.push("/profil")
          console.log(response);

        })
        .catch((response) => {
          //handle error
          console.log(response);
        });
    },

    //--------------------DELETE USER-------------------------//

    deleteUser(data){
      const result = window.confirm("Voulez-vous vraiment supprimer votre compte ?")
      if(!result){
return
      }
      console.log("USER-ID PROFIL DELETE", data);
      this.$store
        .dispatch("deleteUser", data)
        .then((resolve) => {
          if(resolve){
            console.log("RESOLVE PROFIL PAGE DELETE ------>",resolve.data.message);
            alert("votre compte a été supprimé")
            // response.json({ message: "Compte supprimé" })
          this.$router.push("/");
            }
        }).catch((err)=>{
          console.log("ERREUR REQUETE PROFIL DELETE USER------>",err);
         
        })
    }
    
  },
};

</script>

// *******  ******** ****** ******  STYLE   *******  ******** ****** ******//


<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-weight: 300;
    
}
body {
    font-family: 'Lato', sans-serif;
    color: #FFF;
    font-weight: 300;
    background-color: white;
    /*    height: 100%;
        background: linear-gradient(90deg, #50a3a2 50%, #FFFFFF 50%);*/
}
body ::-webkit-input-placeholder {
    /* WebKit browsers */
    font-family: 'Lato', sans-serif;
    color: #555555;
    font-weight: 300;
}
body :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-family: 'Lato', sans-serif;
    color: #555555;
    opacity: 1;
    font-weight: 300;
}
body ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-family: 'Lato', sans-serif;
    color: #555555;
    opacity: 1;
    font-weight: 300;
}
body :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    font-family: 'Lato', sans-serif;
    color: #555555;
    font-weight: 300;
}
.wrapper {
    position: relative;
    z-index: 2;
    width: 100%;
    min-height: 750px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 5px 250px;
}
.container {
    -webkit-box-shadow: 10px 0px 30px 5px rgba(0,0,0,0.27);
    -moz-box-shadow: 10px 0px 30px 5px rgba(0,0,0,0.27);
    box-shadow: 5px 0px 30px 5px rgba(0,0,0,0.27);
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    flex-direction: row-reverse;
    padding: 0px;
    width: 50%;
    height: auto;
    border-radius: 15px;
    background-color: #FFE53B;
    background-image: linear-gradient(147deg, #b94d54 40%, #073985 80%);

}
.fond-form{
  background-color: #FFF;
  border-radius: 10px;
  padding:0 4rem;
  
}
/* #073985 7f141c*/
.profile {
  position: absolute;
  top: 50px;
  left: 38%;
  height: 90px;
  width: 90px;
  border: 3px solid #fff;

  border-radius: 50%;
}
.updateProfil-form {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    padding: 0 3rem 3rem ;
    justify-content: space-around;
    position: relative;
}
.login-logo {
    font-size: 60px;
    color: #333333;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 auto;    
}

.line-logo{
  width: 88%;
  border:2px solid white;
  position:absolute;
  top:100px;
  border-radius: 2px;
}
.form-title {
    font-size: 25px;
    font-weight: 900;
    text-align: center;
    width: 100%;
    display: block;
    padding-bottom: 25px;
    padding-top: 25px;
}
.forgot-link {
    display: block;
    width: 100%;
    text-align: right;
    padding-bottom: 25px;
}
.updateProfil-form a {
    color: #FFF;
    text-decoration: none;
    font-weight: 700;
    font-size: 15px;
}
.form-group {
    margin-bottom: 1rem;
}
.form-group {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
}
button, input, optgroup, select, textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}
button, input {
    overflow: visible;
    box-shadow: 1px 1px  5px #7f141c ;
}
[type="button"], [type="reset"], [type="submit"], button {
    -webkit-appearance: button;
}
.btn {
    display: inline-block;
    font-weight: 400;
    color: #429ffc;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .5rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.btn-primary {
    color: #fff;
    background-color: rgb(134, 2, 2);
    border-color: #FFF;
   
}
.btn-group-lg > .btn, .btn-lg {
    padding: .5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: 1rem;
    
}
.btn-block {
    display: block;
    width: 100%;
}
.btn-action{
  /* visibility: hidden; */
  display:none;
}
[type="button"]:not(:disabled), [type="reset"]:not(:disabled), [type="submit"]:not(:disabled), button:not(:disabled) {
    cursor: pointer;
}
input[type="button"].btn-block, input[type="reset"].btn-block, input[type="submit"].btn-block {
    width: 100%;
}
[type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner, button::-moz-focus-inner {
    padding: 0;
    border-style: none;
}
.form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 10px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.form-control::placeholder {
    color: #6c757d;
    opacity: 1;
}
label {
    display: inline-block;
    margin-bottom: .5rem;
    font-weight: 700;
}
.copyright {
    font-size: 15px;
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    text-align: center;
    color:#000;
}
.copyright a{
    color: #ee0a0a;
    font-size: 16px;
    text-decoration: none;
}
.copyright a:hover{
    color: #000;
}
.copyright strong {
    font-weight: 700;
}

/*-----Responsive------ */
@media (max-width: 1280px) {
    .login-form {
        padding-left: 50px;
        padding-right: 50px;
    }
    .wrapper {
        padding:50px;
    }
}
@media (max-width: 992px) {
    .login-form {
        padding-left: 30px;
        padding-right: 30px;
    }
    .container {
        width: 100%;
    }
}
@media (max-width: 767px){
    .login-form {
        width: 100%;
    }
    .wrapper {
        padding:10px;
    }
    .copyright {
        padding-bottom: 30px;
    }
}



</style>