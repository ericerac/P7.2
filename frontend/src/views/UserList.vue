<template>
    <!-- <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" /> -->

    <div class="container">

        <div class="row">
            <div class="col-md-12 bloc-list">
                <div class="card ccard radius-t-0 h-auto">
                    <div class="position-tl w-102 border-t-3 brc-primary-tp3 ml-n1px mt-n1px"></div>
                    <!-- the blue line on top -->

                    <div class="card-header  pb-2 brc-secondary-l3">
                        <div class="head-left ">
                            <span class="retour" @click="goToProfilPage()">
                                <i class="fa fa-arrow-left  text-95"></i>
                                Retour
                            </span>
<img class="logoTop" src="../assets/icon-left-font-monochrome-black.svg" alt="logo groupomania">

                        </div>
                        <div>
                            <h5 class="card-title mb-0 mb-md-0 text-dark-m3">
                                UTILISATEURS
                            </h5>

                            <input class="search-input mb-0 mt-1 pb-0" v-model="searchUser" type="search" id="search"
                                placeholder="rechercher" autocomplete="off" />

                        </div>
                    </div>
                    <div role="button"
                        class="d-flex flex-wrap align-items-center my-2 bgc-secondary-l4 bgc-h-secondary-l3 radius-1 p-25 d-style">
                        <span class="text-default-d3 text-90 text-600">
                            Avatar
                        </span>

                        <span class="text-default-d3 text-90 text-600">
                            Nom Prénom
                        </span>

                        <span class="text-default-d3 text-90 text-600 text-wrap">
                            Inscrit depuis le:
                            <span class="text-80">

                            </span>
                        </span>


                    </div>
                    <div class="card-body pl-1 pt-1 pb-1" v-for="user in filterUser">
                        <div role="button" @click="UserDetail(user.id)"
                            class="d-flex flex-wrap align-items-center my-2 bgc-secondary-l4 bgc-h-secondary-l3 radius-1 p-25 d-style">
                            <span
                                class="mr-25 w-4 h-4 overflow-hidden text-center border-3 text-default-d3 text-90 text-600 radius-round shadow-sm d-zoom-1">
                                <fa :icon="['far', 'trash-alt']" @click="deleteUser(user.id)" />
                            </span>
                            <span
                                class="mr-25 w-4 h-4 overflow-hidden text-center border-1 brc-secondary-m2 radius-round shadow-sm d-zoom-2">
                                <img v-if="user.media" alt="avatar" :src="user.media" class="h-4 w-4" />
                                <img v-else alt="avatar" src="../assets/icon.svg" class="h-4 w-4" />
                            </span>

                            <span class="text-default-d3 text-90 text-600">
                                {{ user.firstName }} {{ }} {{ user.lastName }}
                            </span>

                            <span class="ml-auto text-default-d3 text-90 text-600 text-wrap">
                                {{ date(user.createdAt) }}

                            </span>


                        </div>


                    </div>
                </div>
            </div>
        </div>

        
    </div>


</template>

<script>

import { mapState } from "vuex";
 console.log(" BEFORE tout");
import moment from "moment"
import store from "@/store/index.js";

//  if(user = undefined || user.role != "admin"){
//      alert("Vous n'êtes pas autorisée")
//  }

export default {
    name: "userList",
    data: function () {
        return {
            detailUser: true,
            searchUser: "",
        };
    },


beforeCreate:()=>{
    // console.log(" BEFORE CREATE",userId);
    
},
created:()=>{
    console.log("  CREATED");
},
mounted:()=>{
    console.log("  MOUNTED", userId);
},

// beforeRouteEnter:()=>{
//     console.log(" BEFORE ROUTE");
// },
//     beforeMount:()=>{
//         // location.reload();
//          console.log(" BEFORE MOUNT");
//     },
//     mounted: function () {
       
//         console.log(" MOUNTED USER-LIST ARTICLES");
//     },
     created: function () {
         console.log("CREATED");
        this.$store
            .dispatch("getAllUsersData")
             // location.reload();
     },

    computed: {
        ...mapState({
            AllUsers: "allsUsersData",
            dataArt: "artData",
            OneUserData: "useData",
           
        }),

        filterUser() {
            return this.AllUsers.filter((a) => {
                return a.firstName.toLowerCase().includes(this.searchUser.toLowerCase());
            })
        }
    },

    methods: {
        UserDetail: async function (userId) {
            this.detailUser === true;
            console.log("this.DetailUser", this.detailUser);
            await this.$store
                .dispatch("getUserData", userId)
                .then((res) => {
                    console.log("RES USER-DATA ADMINPAGE ------->", res);

                })
            console.log("BOUTON USER", this.DetailUser);
        },

        date(value) {
            return moment(value).format("DD/MM/YYYY ");
        },

        goToProfilPage: function () {
            this.$router.push("../components/profil");
        },
        goToAdminPage: function () {
            console.log("GO-TO-ADMIN-PAGE");
            this.$router.push("../user/admin");
        },

        deleteUser(data) {
            const result = window.confirm("Voulez-vous vraiment supprimer ce compte ?")
            if (!result) {
                return
            }
            console.log("USER-ID PROFIL DELETE", data);
            this.$store
                .dispatch("deleteUser", data)
                .then((resolve) => {
                    if (resolve) {
                        console.log("RESOLVE PROFIL PAGE DELETE ------>", resolve.data.message);
                        alert("le compte a bien été supprimé")
                        // response.json({ message: "Compte supprimé" })
                        this.$router.push("/profil");
                    }
                }).catch((err) => {
                    console.log("ERREUR REQUETE PROFIL DELETE USER------>", err);
                    alert("Requete refusée")

                })
        }
    },

}
</script>

<style scoped>
html {
    background: rgb(252, 85, 85);
}

body {
    margin-top: 0px;
    background: #eee;
}

.row {

    background: rgb(252, 85, 85);
    border-radius: 20px;
}

.retour {
    cursor: pointer;
    text-align: start;
}
.head-left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: flex-start;
}

.card-header {

    display: flex;
    justify-content: space-between;
    background-color: #FFE53B;
    background-image: linear-gradient(147deg, #FFE53B 0%, #FF2525 74%);
}

.card {
    box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);

}

.ccard {
    box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
    width: 100%;
}

.card-body {
    width: 100%;
}

.list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}


span {
    width: 30%;

}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 375px;
    margin: 0 auto;
    width: 95%;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid rgba(0, 0, 0, .125);
    border-radius: 1rem;
}

.d-flex {
    justify-content: space-between;
}

.bgc-h-secondary-l3:hover,
.bgc-secondary-l3 {
    background-color: #ebeff1 !important;
}

.h-4 {
    height: 2rem;
}

.w-4 {
    width: 2rem;
}

.d-zoom-1,
.d-zoom-2,
.d-zoom-3,
.dh-zoom-1,
.dh-zoom-2,
.dh-zoom-3 {
    transition: -webkit-transform 180ms;
    transition: transform 180ms;
    transition: transform 180ms, -webkit-transform 180ms;
}

.mr-25,
.mx-25 {
    margin-right: .75rem !important;
}

.p-25 {
    padding: .75rem !important;
}

.radius-1 {
    border-radius: .25rem !important;
}

[class*=bgc-h-] {
    transition: background-color .15s;
}

.text-default-d3 {
    color: #416578 !important;
}

.font-bolder,
.text-600 {
    font-weight: 600 !important;
}

.text-90 {
    font-size: .9em !important;
}


.bgc-h-secondary-l4:hover,
.bgc-secondary-l4 {
    background-color: #f2f4f6 !important;
}

.text-danger-m1 {
    color: #da3636 !important;
}

.text-green-m1 {
    color: #2c8d6a !important;
}

.text-95 {
    font-size: .95em !important;
}
</style>