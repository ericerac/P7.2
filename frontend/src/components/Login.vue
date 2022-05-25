<template>

    <div class="wrapper">
        <div class="container">
            <form class="login-form">
                <img src="../assets/icon-left-font-monochrome-white.png" alt="logo" width="100" height="80">
                <span class="form-title">Bienvenue sur votre reseau social Groupomania</span>


                <span class="form-title">Se connecter</span>
                <div class="form-group" v-if="mode == 'signup'">
                    <label for="nom">Nom</label>
                    <input v-model="firstName" type="text" name="nom" class="form-control" placeholder="Nom" required />
                </div>
                <div class="error" v-if="errorFirstName.length">
                    {{ errorFirstName }}
                </div>
                <div class="form-group" v-if="mode == 'signup'">
                    <label for="prenom">Prénom</label>
                    <input v-model="lastName" type="text" name="prenom" class="form-control" placeholder="Prénom"
                        required />
                </div>
                <div class="error" v-if="errorLastName.length">
                    {{ errorlastName }}
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input v-model="Email" type="email" name="email" class="form-control" placeholder="Email"
                        required />
                </div>
                <div class="error" v-if="errorEmail.length">
                    {{ errorEmail }}
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>

                    <input v-model="password" type="password" name="password" class="form-control"
                        placeholder=" Votre mot de passe" required>
                </div>
<div class="error" v-if="errorPassword.length">
                    {{ errorPassword }}
                </div>
                <div class="form-group">
                    <label class="btn-label">Se connecter</label>
                    <input v-if="mode == 'login'" name="submit" class="btn btn-primary btn-lg btn-block" :keyUp="enter"
                        value="Se connecter" @click="loginPost()">
                </div>
                <div class="form-group" v-if="mode == 'signup'">
                    <label class="btn-label">S'enregistrer</label>
                    <input name="submit" class="btn btn-primary btn-lg btn-block" keyUp="enter" value="S'enregistrer"
                        @click="checkForm()">
                </div>
                <p v-if="mode == 'login'">Vous n´êtes pas encore inscrit <span
                        @click="goToSignup">Inscrivez-vous</span>.</p>
                <p v-if="mode == 'signup'">Vous êtes déjà inscrit <span @click="goToLogin">Connectez-vous</span>.</p>
            </form>
        </div>
    </div>

</template>

<script>

import { mapState } from "vuex";
import { Vue } from "vue";


export default {

    name: "Login",
    props: {},
    data: function () {
        return {
            mode: "login",

            errorFirstName: [],
            errorLastName: [],
            errorEmail: [],
            errorPassword: [],

            lastNameErrorMsg:"",

            firstName: "",
            lastName: "",
            Email: "",
            password: "",
        };
    },
    
    computed: {
        ...mapState(["status"]),
    },
    // watch:{
    //     lastName:(val)=>{
    //         const that = this;
    // console.log(val);
    // if(val.match(/^[a-zA-Z-._àâéèêô´`¨ ñÑî'ùûïÏäëüöÖÄçÀÂÉÈÔÙÛÇ]*$/)){
    // // that.lastNameErrorMsg="veuillez saisir uniquement des lettres et tirets (pas de chiffres ni caractères spéciaux).";
    // that.lastNameErrorMsg=val;
    //     }
    // },

    // },
    methods: {
        goToSignup: function () {
            this.mode = "signup";
        },

        goToLogin: function () {
            this.mode = "login";
        },

        
        // --------------- VALIDATION FORM-------------------//
        checkForm: function () {
            const errorFirstName = [];
            const errorlastName = [];
            const errorEmail = [];


            if (!this.firstName) {
                this.errorFirstName.push(" * Le nom doit être renseigné.");
                return false
            } else if (!this.validFirstName(this.firstName)) {
                this.errorFirstName.push(' * Le nom ne doit pas contenir de caractères spéciaux');
                return false
            }

            if (!this.lastName) {
                this.errorLastName.push(" * Le prénom doit être renseigné.");
                return false
            } else if (!this.validLastName(this.lastName)) {
                this.errorLastName.push('* Le prénom ne doit pas contenir de caractères spéciaux');
                return false
            }
            
            if (!this.Email) {
                this.errorEmail.push("* l'adresse Email doit être renseignée.");
                return false
            } else if (!this.validEmail(this.Email)) {
                console.log("THIS:EMAIL", this.Email);
                this.errorEmail.push('* Adresse email non valide');
                return false
            }
            if (!this.password) {
                this.errorPassword.push("* l'adresse Email doit être renseignée.");
                return false
            } else if (!this.validPassword(this.password)) {
                console.log("THIS:PASSWORD", this.password);
                this.errorPassword.push('* Mot de passe de 8 a 20 caractères dont 1 special et 1 chiffre * ');
                return false
            }

            
            this.signupPost();

        },
        validFirstName: function (firstName) {
            console.log("VALIDATION FIRSTNAME", firstName);
            var re = /^[a-zA-Z-._àâéèêô´`¨ ñÑî'ùûïÏäëüöÖÄçÀÂÉÈÔÙÛÇ]*$/;
            return re.test(firstName);
        },
        validLastName: function (lastName) {
            console.log("VALIDATION LASTNAME", lastName);
            var re = /^[a-zA-Z-._àâéèêô´`¨ ñÑî'ùûïÏäëüöÖÄçÀÂÉÈÔÙÛÇ]*$/;
            return re.test(lastName);
        },
        validEmail: function (email) {
            console.log("VALIDATION EMAIL", email);
            var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return re.test(email);
        },
        validPassword: function (password) {
            console.log("VALIDATION PASSWORD", password);
            var re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?~_+-=|\]).{8,32}$/g;
            return re.test(password);
        },

        //-------------SIGNUP----------------------//

        signupPost: function () {
            const self = this;

            this.$store
                .dispatch("signupPost", {   // dispatch ("nom de la fonction dans ./store/index.js ")
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.Email,
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
            console.log(" LOGIN EMAIL", this.Email);
            this.$store
                .dispatch("loginPost", {
                    email: this.Email,
                    password: this.password,
                })
                .then((response) => {

                    console.log(response.data); // userId token
                    self.$router.push("profil");
                })
                .catch((err) => {
                    console.log("Restons calme login", err);
                });
        },
    },
};


</script>


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
    -webkit-box-shadow: 10px 0px 30px 5px rgba(0, 0, 0, 0.27);
    -moz-box-shadow: 10px 0px 30px 5px rgba(0, 0, 0, 0.27);
    box-shadow: 5px 0px 30px 5px rgba(0, 0, 0, 0.27);
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
    background-image: linear-gradient(147deg, #FFE53B 0%, #FF2525 74%);

}

.btn-label {
    display: none;
}

.login-form {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    padding: 50px;
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

.login-form a {
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

button,
input,
optgroup,
select,
textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

button,
input {
    overflow: visible;
}

[type="button"],
[type="reset"],
[type="submit"],
button {
    -webkit-appearance: button;
}

.btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
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
    border-radius: .25rem;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.btn-primary {
    color: #fff;
    background-color: #000;
    border-color: #FFF;
}

.btn-group-lg>.btn,
.btn-lg {
    padding: .5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: .3rem;
}

.btn-block {
    display: block;
    width: 100%;
}

[type="button"]:not(:disabled),
[type="reset"]:not(:disabled),
[type="submit"]:not(:disabled),
button:not(:disabled) {
    cursor: pointer;
}

input[type="button"].btn-block,
input[type="reset"].btn-block,
input[type="submit"].btn-block {
    width: 100%;
}

[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner,
button::-moz-focus-inner {
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
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
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
.error{
width: 100%;
height: 50px;
padding:3px;
color:red;
background-color: white;
}

.copyright {
    font-size: 15px;
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    text-align: center;
    color: #000;
}

.copyright a {
    color: #ee0a0a;
    font-size: 16px;
    text-decoration: none;
}

.copyright a:hover {
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
        padding: 50px;
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

@media (max-width: 767px) {
    .login-form {
        width: 100%;
    }

    .wrapper {
        padding: 10px;
    }

    .copyright {
        padding-bottom: 30px;
    }
}
</style>


<!-- Referencing column 'articles_users_id' and referenced column 'userId' 
in foreign key constraint 'fk_articles_like_articles1' are incompatible. -->
