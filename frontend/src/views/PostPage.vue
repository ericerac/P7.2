<template>
    <div class="container-fluid posts-content">
        <div class="row">
            <!-- ---------------------TOP-------------------- -->
            <div class="col-12 col-lg-12 col-xl-12">
                <div class="card card-nav mb-4">
                    <div class="card-footer">
                        <img class="fondLogoNavbar" src="../assets/Fondnav.png" alt="" title="Page Profil" />
                        <img class="logo col-md-0" src="../assets/icon-left-font-monochrome-white.svg" alt="" />
                        <img class="userMedia avatar" :src="user.media" alt="" />
                        <span class="NameUser">
                            {{ user.firstName }} {{ user.lastName }}</span>
                    </div>
                    <div class="navbar">
                        <div class="link">
                            <span>
                                <fa :icon="['fas', 'home']" @click="goToProfil()" />
                            </span>
                        </div>
                        <span class="powerOff">
                            <fa :icon="['fas', 'power-off']" @click="disconnect()" />
                        </span>
                    </div>
                </div>
            </div>

            <div class="col-lg-12 col-xl-12">
                <!-- //----------------------- EDITION POST-------------------------// -->
                <div class="col-lg-12 col-xl-12 articlePost bg-white mb-3 pb-2 pt-1">
                    <form id="formPost" @submit.prevent="articlePost">
                        <div id="articleUser">
                            <div id="postText">
                                <!-- <input v-model="CommentContent" class="commentaire" type="text" size="4"
                                        placeholder="Ecrire" /> -->
                                <textarea v-model="content" class="commentaire mt-3 form-control" col="6" rows="2"
                                    type="text" size="6" placeholder="Une petite pensée à partager  ?"></textarea>
                                <!-- <div class="imagePreview" :style="{'background-image': url`(${previewImg})`}" ></div> -->
                                <div class="iconComment pt-1">
                                    <div class="ico">
                                        <span class="select-wrapper">
                                            <label class="labelImgUpload" for="image_src">i</label>
                                            <input type="file" name="image_src" id="image_src" @change="FileUpload" />
                                        </span>

                                        <span> {{ fileSelected.name }}</span>
                                    </div>
                                    <div class="ico">
                                        <span>
                                            <fa :icon="['far', 'paper-plane']" class="Publier" @click="uploadPost" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- ********++++----------------------POST-----------------************ -->
            <div class="post col-md-10 col-lg-10 col-xl-8  col-xxl-6 offset-md-1 offset-xl-2 offset-xxl-3" v-for="article in dataArt" :key="article.id">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="media post-head mb-3">
                            <img v-if="article.user.media" alt="ImageProfil" :src="article.user.media"
                                class="d-block ui-w-40 rounded-circle" />
                            <div class="media-body fw-bold ml-3">
                                {{ article.user.lastName }}
                                {{}} {{ article.user.firstName }}
                                <div class="text-muted small">
                                    le: {{ date(article.createdAt) }}
                                </div>
                            </div>
                        </div>

                        <p class="contentArticle">
                            {{ article.content }}
                        </p>
                        <div class="">
                            <img v-if="article.media" class="postImg" alt="Image" :src="article.media" />
                        </div>
                    </div>

                    <div>

                        <div class="card-footer card-post-icon">


                            <!-- ------------ICON COMMENTAIRE------------- -->
                            <div class="com-com">


                                <span>Donnez votre avis
                                    <fa class="d-inline-block text-muted ml-1" :icon="['far', 'comment']"
                                        @click="commentInput = !commentInput" v-model="PostLiked" />
                                </span>
                            </div>

                            <div>
                                <span>
                                    <fa v-if="user.role === 'admin' || userId === article.userId"
                                        :icon="['far', 'trash-alt']" @click="deleteArticle(article.id)" />
                                </span>
                            </div>
                        </div>
                    </div>


                    <!--  **   -------- ** COMMENT  FORM ** HIDDEN -------   **  -->

                    <div class="col-lg-12 col-xl-3">
                        <form id="formPost" @submit.prevent="articleComment" v-show="commentInput">
                            <div id="articleUser">
                                <div id="postText">
                                    <!-- <input v-model="CommentContent" class="commentaire" type="text" size="4"
                                        placeholder="Ecrire" /> -->
                                    <textarea v-model="CommentContent" class="commentaire form-control" col="6" rows="2"
                                        type="text" size="6" placeholder="Ecrire"></textarea>
                                    <div class="iconComment">
                                        <!-- <input type="file" id="mediaPost" ref="file" @change="FileUploadCom"
                                        accept="image/png, image/jpeg" /> -->
                                        <div class="ico">
                                            <span class="select-wrapper">
                                                <label class="labelImgUpload" for="image_src">i</label>
                                                <input type="file" name="image_src" id="image_src"
                                                    @change="FileUpload" />
                                            </span>

                                            <span> {{ fileSelected.name }}</span>
                                        </div>

                                        <span>
                                            <fa :icon="['far', 'paper-plane']" class="Publier"
                                                @click="uploadComment(article.id)" />
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!--  **   -------- ** COMMENT   ** -------   **  -->

                    <div class="col-lg-12" v-for="commKey in article.comment" :key="commKey.id">
                        <div class="card-line-top"></div>
                        <div class="card card-comment mb-1">
                            <div class="card-body">
                                <div class="media media-comment mb-1">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                        class="d-block ui-w-40 rounded-circle avatar-comment" alt="" />
                                    <div class="media-body ml-3 mt-0">
                                        <span>{{ commKey.user.lastName }}</span><span>{{ commKey.user.firstName
                                        }}</span>
                                        <div class="text-muted small">
                                            le: {{ date(commKey.user.createdAt) }}
                                        </div>
                                    </div>
                                </div>
                                <img v-if="commKey.media" class="imgComment" alt="Image" :src="commKey.media" />
                                <div class="bloc-comment">
                                    <div class="fleche"></div>
                                    <p class="p_comment">
                                        {{ commKey.comment }}
                                    </p>
                                </div>
                                <div class="IconEditTrash" v-if="commKey.user.id === userId || user.role === 'admin'">
                                    <span>
                                        <fa :icon="['far', 'trash-alt']" @click="deleteComment(commKey.id)" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ---------------------FOOTER---------------------  -->
            <div class="col-12 col-lg-12 col-xl-12">
                <div class="card card-nav card-foot mb-4">
                    <div class="card-footer">
                        <img class="fondLogoNavbar footer-blue" src="../assets/Fondnav.png" alt=""
                            title="Page Profil" />
                        <img class="logo col-md-0" src="../assets/icon-left-font-monochrome-white.svg"
                            alt="logo groupomania" />

                         <a class="contact" href="mailto:contact@groupomania.com" >Contact</a>
                    </div>
                    <div class="navbar">
                        <div class="link"></div>
                        <span class="powerOff"> </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import moment from "moment";
import LoginVue from "../components/Login.vue";
import store from "@/store/index.js";

const axios = require("axios");
const FormData = require("form-data");

let user = $cookies.get("user");
let userId = user.userId;
let userToken = user.token;

//***************    ******************// */

export default {
    name: "post",
    components: {},
    props: {},
    mounted: function () {
        this.userData(userId);
    },

    data: function () {
        return {
            //-------COMMENT FORM POST----------------

            commentInput: false,

            commentContent: "",
            fileSelectedComment: "",
            articleId: "",


            //-------ARTICLE FORM POST----------------//

            fileSelected: "",
            content: "",
            media: "",


            //-------COMMUN DATA--------------//

            userId: userId,
            token: userToken,

            ArticleDate: "",



        };
    },
    beforeMount: function () {
        this.getAllArticle();

    },


    props: {},
    computed: {
        ...mapState({

            user: "userData",
            dataArt: "artData",


        }),
    },

    watch: {


        dataArt: function (val) {
            console.log("WATCH ARTDATA MODIF LIVE", val);
        },
        user: function (val) {
            console.log("WATCH USER ", val);
        },

    },

    methods: {
        goToProfil: function () {
            this.$router.push("/profil");
        },

        //----------------DISCONNECT-----------------//
        disconnect() {
            console.log("DISCONNECT");
            $cookies.remove("user");
            this.user="";
            userId="";
            this.$router.push("/");
        },

        //--------------FORMAT DATE----------------------//
        date(value) {
            return moment(value).format("DD/MM/YYYY à hh:mm");
        },

        //--------------USER DATA----------------------//

        userData: function (ud) {
            this.$store.dispatch("getUserData", ud).then((res) => {
                console.log(" RES-DATA-USER-CONNECT", res);
            });
            console.log("DATA-USER-CONNECT 1", ud);
            let self = this;
            const UserId = [];
            const comm = [];

            console.log("UserId", UserId);
        },

        //------------ UPLOAD POST-----------------------//
        uploadPost: function () {
            if (this.fileSelected == "" && this.content == "") {
                alert(" Votre article est vide");
                return;
            }
            if (this.fileSelected) {
                var bodyFormData = new FormData();
                bodyFormData.append("media", this.fileSelected, this.fileSelected.name);
                bodyFormData.append("content", this.content);
                bodyFormData.append("userId", userId);
                bodyFormData.append("likes", 0);
                bodyFormData.append("dislikes", 0);

                console.table("FORM DATA AVEC IMAGE 1", ...bodyFormData.entries());
            } else {
                var bodyFormData = new FormData();
                bodyFormData.append("content", this.content);
                bodyFormData.append("userId", userId);
                bodyFormData.append("likes", 0);
                bodyFormData.append("dislikes", 0);

                console.table("FORM DATA SANS IMAGE ", ...bodyFormData.entries());
            }
            this.$store
                .dispatch("uploadPost", bodyFormData)

                .then(function (response) {
                    //handle success
                    console.log(response);
                    location.reload();
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        },

        FileUpload(event) {
            console.log("EVENT", event);
            this.fileSelected = event.target.files[0];
            console.log("fichier Image ", this.fileSelected);
        },
        //-----------------------UPLOAD COMMENT---------------------------

        uploadComment: function (Aid) {
            if (this.fileSelected) {
                var bodyFormData = new FormData();
                bodyFormData.append("media", this.fileSelected, this.fileSelected.name);
                bodyFormData.append("comment", this.CommentContent);
                bodyFormData.append("userId", userId);
                bodyFormData.append("articleId", Aid);

                console.table("FORM DATA AVEC IMAGE 2", ...bodyFormData.entries());
            } else {
                var bodyFormData = new FormData();
                bodyFormData.append("comment", this.CommentContent);
                bodyFormData.append("userId", userId);
                bodyFormData.append("articleId", Aid);

                console.table("FORM DATA SANS IMAGE ", ...bodyFormData.entries());
            }
            this.$store
                .dispatch("uploadComment", bodyFormData)

                .then(function (response) {
                    //handle success
                    location.reload();
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        },

        //------------ GET ALL ARTICLE-----------------------//
        getAllArticle: function () {
            const self = this;
            this.$store
                .dispatch("getAllArticle")
                .then((response) => {
                    console.log("REPONSE GET ALL ARTICLE POST PAGE", response.data);
                    //self.filtreMAP()
                    const resData = response.data;
                    console.log("RESPONSE DATA", resData);
                    const commentes = resData.map((a) => a.comment);

                    console.log("POST VUE COMMENT PUSH", commentes);
                })
                .catch((err) => {
                    console.log("Restons calme getAllArticle:postPage", err);
                });
        },

        //------------------DELETE ARTICLE-------------------------//
        deleteArticle(data) {
            console.log("USER-ID PROFIL DELETE", data);
            const delart = {id:data}
            this.$store
                .dispatch("deleteArticle", delart)
                .then((response) => {
                    if (response) {
                        alert( "Article supprimé" );
                        location.reload();
                    }
                })
                .catch((err) => {
                    console.log("ERREUR REQUETE  DELETE ARTICLE----->", err);
                });
        },
        //------------------DELETE COMMENT-------------------------//
        deleteComment(data) {
            console.log("USER-ID COMMENT DELETE", data);
            const delcom = {id:data}
            this.$store
                .dispatch("deleteComment", delcom)
                .then((response) => {
                    if (response) {
                        alert( "Commentaire supprimé" );
                       location.reload();
                    }
                })
                .catch((err) => {
                    console.log("ERREUR REQUETE PROFIL DELETE COMMENT----->", err);
                });
        },
    },
};
</script>

//**********************************************// */
//**********************************************// */
//**********************************************// */

<style scoped>
.select-wrapper {
    background: url("../assets/camera-solid.svg  ") no-repeat;
    background-size: cover;
    display: block;
    position: relative;
    width: 23px;
    height: 23px;
}

#image_src {
    width: 23px;
    height: 23px;
    margin-right: 100px;
    opacity: 0;
    filter: alpha(opacity=0);
}

* {
    box-sizing: border-box;
}



.root {
    background-color: blanchedalmond;
}

.container-fluid {
    background-color: rgb(252, 217, 164);
    max-width: 1200px;
}

#app {
    background-color: rgb(40, 30, 17);
    background-attachment:scroll;
}

body {
    background: #eee;
    max-width: 1000px;
    background-color: antiquewhite;
    background-attachment: fixed;
}

.erreurMessageLike {
    width: 100%;
    display: flex;
    color: red;
}

/* // ------------------ ASIDE LEFT------------------- */
li {
    list-style-type: none;
}

/* <a href="https://www.flaticon.com/free-icons/power" title="power icons">Power icons created by Bogdan Rosu - Flaticon</a> */
.logoAside {
    width: 90%;
}

.list-aside {
    text-align: left;
    padding-left: 0;
}

.card-nav {
    background-image: url("../assets/fondNavRed.png");
}

.NameUser {
    color: white;
    position: absolute;
    bottom: 0.15rem;
}

.navbar {
    display: flex;
    justify-content: space-between;
}

/* // ------------------  TOP------------------- */
.fondLogoNavbar {
    width: 100%;
    height: 70px;
    border-radius: 0.7rem;
}

.logo {
    position: absolute;
    left: 1rem;
    width: 20%;
    top: 0.5rem;
}

.userMedia {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: 0.3rem;
}

/* // ------------------ CENTRE TOP------------------- */

.articlePost {
    border-radius: 10px;
    background-color: rgb(253, 224, 181);
    height: auto;

    box-shadow: 2px 5px 15px rgba(24, 28, 33, 0.2);
}

.iconComment {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.ico {
    display: flex;
}

.postImg {
    width: 98%;
    height: auto;
    border: 1px solid black;
    object-fit: cover;
    object-position: top;
    border-radius: 5px;
    margin: 5px auto;
}

.card {
    box-shadow: 2px 5px 15px rgba(24, 28, 33, 0.2);
}

.contentArticle {
    margin-top: 1rem;
}

.card-footer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: 2px solid black;
    position: relative;
    padding: 0;
}

.likedislike {
    display: flex;
    justify-content: space-around;
    width: 50%;
}

.media {
    display: flex;
    padding-bottom: 1rem;
    flex-direction: row;
    justify-content: space-around;
    /* border-bottom: 1px solid black; */
    border-radius: 1rem;
    box-shadow: 2px 5px 0px rgba(24, 28, 33, 0.2);
}

.media-body {
    text-align: left;
}

.like {
    display: flex;
    flex-direction: row;

    justify-content: space-around;
    position: relative;
    padding-left: 0.5rem;
}

span {
    margin-right: 1rem;
}

.posts-content {
    margin-top: 20px;
}

/* .card-footer{
    display: flex;
    justify-content: space-between;
} */
.com-com {
    display: flex;
    width: 30%;
    justify-content: space-between;
}

.ui-w-40 {
    width: 45px !important;
    height: auto;
}

.default-style .ui-bordered {
    border: 1px solid rgba(24, 28, 33, 0.06);
}

.ui-bg-cover {
    background-color: transparent;
    background-position: center center;
    background-size: cover;
}

.ui-rect {
    padding-top: 50% !important;
}

.ui-rect,
.ui-rect-30,
.ui-rect-60,
.ui-rect-67,
.ui-rect-75 {
    position: relative !important;
    display: block !important;
    padding-top: 100% !important;
    width: 100% !important;
}

.d-flex,
.d-inline-flex,
.media,
.media> :not(.media-body),
.jumbotron,
.card {
    -ms-flex-negative: 1;
    flex-shrink: 1;
    height: auto;
    width: auto;
    box-shadow: 2px 2px 2px solid black;
}

.post-head {
    justify-content: left;
}

.bg-dark {
    background-color: rgba(183, 214, 251, 0.9) !important;
}

.card-footer,
.card hr {
    display: flex;
    justify-content: space-evenly;
    border-color: rgba(24, 28, 33, 0.06);
}

/* // ----------------- FORM COMMENT ------------------ */

.commentaire {
    width: 95%;
    margin: 0 auto;
    box-shadow: 2px 5px 15px rgba(24, 28, 33, 0.2);
    /* border:none; */
}

#postText {
    width: 100%;
    margin-top: 1rem;
}

#articleUser {
    width: 100%;
}

#formPost {
    width: 100%;
}

#mediaPost {
    border: 1px solid black;
    display: hidden;
    width: 2rem;
}

#file-upload-button {
    display: hidden;
    text-decoration: blue;
}

/* // -----------------COMMENT ------------------ */

.card-line-top {
    width: 90%;
    margin: 10px auto 5px;
    height: 0.2rem;
    border: 2px solid rgb(253, 190, 33);
    border-radius: 50%;
}

.infoComment {
    display: flex;
    flex-direction: row;
}

.imgComment {
    width: 70%;
    height: auto;

    object-fit: cover;
    object-position: top;
    border-radius: 5px;
    margin: 5px auto;
}

.fleche {
    width: 10px;
    height: 10px;
    border-bottom: 10px solid rgba(111, 111, 111, 0.3);
    border-right: 10px solid white;
    border-left: 10px solid white;
    margin-left: 1.2rem;
}

.p_comment {
    margin: 0 auto;
    padding: 0.4rem;
    text-align: left;
    border-left: 1px solid rgba(111, 111, 111, 0.3);
    border-top: 1px solid rgba(111, 111, 111, 0.3);
    box-shadow: 2px 2px 2px rgba(111, 111, 111, 0.4);
    border-radius: 0.5rem;
}

.media-comment {
    justify-content: start;
    border: 2px solid white;
    box-shadow: -2px -2px 0px 0px rgba(111, 111, 111, 0.4);
    border-radius: 0.5rem;
    padding-left: 0.2rem;
    padding-top: 0.2rem;
    margin-bottom: 0rem;
}

.card-comment {
    box-shadow: 2px 2px 20px 2px rgba(24, 28, 33, 0.3);
}

.IconEditTrash {
    display: flex;
    width: 100%;
    justify-content: flex-end;
}

.media-body {
    margin-left: 2rem;
}

.avatar-comment {
    margin-left: 0;
}

.ui-rect-content {
    position: absolute !important;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}

.default-style .ui-bordered {
    border: 1px solid rgba(24, 28, 33, 0.06);
}

.footer-blue {
    height: 50px;
}

.contact {
    position: absolute;
    color: white;
    font-weight: bold;
    right: 2rem;
}
@media (max-width: 1980px) {
    
    .container-fluid {
    background-color: rgb(252, 217, 164);
    max-width: 1700px;
}
}
@media (max-width: 1280px) {
    .container-fluid {
    background-color: rgb(252, 217, 164);
    max-width: 1200px;
}
}
</style>
