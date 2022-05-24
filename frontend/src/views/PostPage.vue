<template>
    <div class="container posts-content">
        <div class="row">
            <!-- ---------------------TOP-------------------- -->
            <div class="col-12 col-lg-12 col-xl-12">
                <div class="card card-nav mb-4">
                    <div class="card-footer">
                        <img class="fondLogoNavbar" src="../assets/Fondnav.png" alt="" title="Page Profil" />
                        <img class="logo col-md-0" src="../assets/icon-left-font-monochrome-white.svg" alt="" />
                        <img class="userMedia avatar" :src="user.media" alt="">
                        <span class="NameUser"> {{user.firstName}} {{user.lastName}}</span>
                       
                    </div>
                    <div class="navbar">
                        <div class="link">
                            <span>
                                <fa :icon="['fas', 'home']" @click="goToProfil()" />
                            </span>
                            <span @click="mesArticles(user.id)">Mes articles</span>
                        </div>
                        <span class="powerOff">
                            <fa :icon="['fas', 'power-off']" @click="disconnect()" />
                        </span>
                    </div>
                </div>
            </div>

            <!-- ++++----------------------CENTRE CARD TOP  ----------------**** -->



            <div class="col-lg-12 col-xl-12">

                <!-- //----------------------- EDITION POST-------------------------// -->
                <div class="col-lg-12 col-xl-12 articlePost bg-white mb-3 pb-2 pt-1">
                    <form id="formPost" @submit.prevent="articlePost">
                        <div id="articleUser">
                            <div id="postText">
                                <!-- <input v-model="CommentContent" class="commentaire" type="text" size="4"
                                        placeholder="Ecrire" /> -->
                                <textarea v-model="content" class="commentaire mt-3 form-control" col="6" rows="2"
                                    type="text" size="6" placeholder="Une petite pensée à partager ?"></textarea>
                                <!-- <div class="imagePreview" :style="{'background-image': url`(${previewImg})`}" ></div> -->
                                <div class="iconComment pt-1">
                                    <div class="ico">
                                        <span class="select-wrapper">
                                            <!-- <input type="file" id="mediaPost" ref="file" @change="FileUpload"
                                        accept="image/png, image/jpeg" /> -->
                                            <label class="labelImgUpload" for="image_src">i</label>
                                            <input type="file" name="image_src" id="image_src" @change="FileUpload" />

                                        </span>

                                        <span> {{ fileSelected.name }}</span>
                                    </div>
                                    <div class="ico">
                                        <!-- <button class="Publier" @click="uploadComment(article.id)"> -->
                                        <span>
                                            <fa :icon="['far', 'paper-plane']" class="Publier" @click="uploadPost" />
                                            <!-- <fa :icon="['fas', 'camera']" class="Publier" @click="uploadPost" /> -->
                                        </span>
                                    </div>
                                    <!-- </button> -->
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- ********++++----------------------POST-----------------************ -->
            <div class="post col-md-6c col-lg-8 col-xl-8 offset-md-2" v-for="article in dataArt" :key="article.id">
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
                        <!-- <div> -->
                        <!-- <div class="card-footer card-post-icon" v-for="(like) in article.dislike" :key="like.id"
                  > -->
                        <div class="card-footer card-post-icon ">

                            <!-- <div class="likedislike" v-for="(like) in article.dislike" :key="like.id"> -->
                            <div class="likedislike">
                                <!-- <div class="like" > -->
                                    <div class="like" > 

                                    <!-- ------------LIKE-------------- -->
                                    <!-- <span > -->
                                        <span >
                                        <fa v-model="likes" class="like-r" :icon="['fas', 'thumbs-up']"
                                            @click="liked(article.id, 0, 0)" />
                                        {{ article.likes }}
                                    </span>
                                    <!-- <span> -->
                                    <span >
                                        <fa class="like-sl" :icon="['far', 'thumbs-up']"
                                            @click="liked(article.id, 1, 0)" />

                                        {{ article.likes }}
                                    </span>
                                </div>
                                <!-- ------------DISLIKE-------------- -->
                                <div class="like">
                                    <span v-if="article.dislike.userId = userId">
                                        <fa class="like-sd" :icon="['fas', 'thumbs-down']"
                                            @click="liked(article.id, 0, 0)" />
                                        {{ article.dislikes }}
                                    </span>
                                    <span v-else>
                                        <fa v-model="dislikes" class="like-r" :icon="['far', 'thumbs-down']"
                                            @click="liked(article.id, 0, 1)" />
                                        {{ article.dislikes }}
                                    </span>
                                </div>
                           
                            </div>
                            <!-- ------------ICON COMMENTAIRE------------- -->
                            <div class="com-com">
                                <span class="countComment">commentaires</span>

                                <span>
                                    <fa class="d-inline-block text-muted ml-1" :icon="['far', 'comment']"
                                        @click="commentInput = !commentInput" v-model="PostLiked" />
                                </span>
                            </div>
                            <div class="IconEditTrash">
                                <span>
                                    <fa v-if="user.role === 'admin'" icon="['fas', 'pencil-alt']" />
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
                                    <div class="erreurMessageLike"  @click="likeErreur= false" v-show="likeErreur">{{"Vous avez déjà donner votre avis. X"}}</div>

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

                                        <!-- <button class="Publier" @click="uploadComment(article.id)"> -->
                                        <span>
                                            <fa :icon="['far', 'paper-plane']" class="Publier"
                                                @click="uploadComment(article.id)" />
                                        </span>
                                        <!-- </button> -->
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
                                        <fa :icon="['fas', 'pencil-alt']" />
                                    </span>
                                    <span>
                                        <fa :icon="['far', 'trash-alt']" @click="deleteComment(commKey.id)" />
                                    </span>
                                </div>
                            </div>

                        </div>
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
import navBar from "../components/Navbar.vue";
import postDisplay from "../components/postDisplay.vue";
const axios = require("axios");
const FormData = require("form-data");

let user = $cookies.get("user");
let userId = user.userId;
let userToken = user.token;

//***************    ******************// */

export default {
    name: "post",
    components: {
        navBar,
        postDisplay,
    },
    props: {},
    mounted: function () {
        this.userData(userId);
        console.log("MOUNTED");
        console.log("USER-DATA-->", this.$store.state.userData);

        // this.GetNextUser()
    },

    updated: function () {
        console.log("UPDATED");
        console.log("ARTICLES-->", this.$store.state.artData);
        console.log("COMMENT ALL DATA-->", this.$store.state.alldata);
        //this.comments=this.$store.state.comment;
        console.log("USER-DATA-->", this.$store.state.userData);
        console.log("COMMENT 2-->", this.$store.state.comments);

        // this.update(this.allData,this.comments)
    },

    data: function () {
        return {
            //-------COMMENT FORM POST----------------

            commentInput: false,

            commentContent: "",
            fileSelectedComment: "",
            articleId: "",
            likedArt: "",
            dislikedArt: "",

            //-------ARTICLE FORM POST----------------//

            fileSelected: "",
            content: "",
            media: "",

            // PostLiked: [],
            likes: false,
            dislikes: 0,
            error:[],
            likeErreur:false,
            //-------COMMUN DATA--------------//

            userId: userId,
            token: userToken,

            ArticleDate: "",
            //UsersId: [],

            UsersData: {
                firstName: "",
                lastName: "",
            },
        };
    },
    beforeMount: function () {
        this.getAllArticle();
        console.log("BEFORE MOUNT");

        console.log("USER-DATA-->", userId);
    },
    onMounted: function () {
        console.log("ON MOUNTED");

        console.log("USER-DATA-->", this.userD);
        this.countLike();
    },
    // beforeCreate: function () {
    //   console.log("BEFORE CREATED");
    //   console.log("USER-DATA-->", )
    // },
    // beforeUpdate: function () {
    //   console.log("BEFORE UPDATE");
    //   console.log("USER-DATA-->", )
    // },
    props: {},
    computed: {
        //   ...mapGetters({
        //     PostData:"allDatas"
        //   }),
        ...mapState({
            userC: "useData",
            user: "userData",
            dataArt: "artData",
            likeArray: "likeArr",
            CookUser: "user",
            erreurLike:"errorLike",
            likeList:"listLike",
        }),
    },

    watch: {
        likedArt: function (val) {
            console.log("watch", val);
        },
        likes: function (val) {
            console.log("watch", val);
        },
        dislikedArt: function (val) {
            console.log("watch", val);
        },

        dataArt: function (val) {
            console.log("WATCH ARTDATA MODIF LIVE", val);
        },
        user: function (val) {
            console.log("WATCH USER ", val);
        },
        error: function (val) {
            console.log("WATCH LIKE ", val);
            this.likeErreur=true
        },
    },

    methods: {
        goToProfil: function () {
            this.$router.push("/profil");
        },
        liked: function (a, b, c) {
            const likeData = { articleId: a, userId: userId, like: b, dislike: c };
let left = this;
            // console.log("LIKED", a, userId, b, c);
            console.log("LIKED", a, b, c);
            this.likedArt = likeData;
            this.$store
                .dispatch("likePost", likeData)

                .then(function (response) {
                    //handle success
                    console.log("RES LIKE-POST POST-PAGE", response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                    left.error = response;
                    
                });
        },
        disliked: function (a, b) {
            const likeData = { a, userId };
            console.log("LIKED", a, userId, b);
            this.dislikedArt = likeData;
        },

        LikeSum(a) {
            console.log("LIKE-SUM", a);
            var sum = 0;

            for (let value in a) {
                sum += value;
            }
            return sum;
        },

        //----------------DISCONNECT-----------------//
        disconnect() {
            console.log("DISCONNECT");
            $cookies.remove("user");
            this.$router.push("/");
        },

        //--------------FORMAT DATE----------------------//
        date(value) {
            return moment(value).format("DD/MM/YYYY à hh:mm");
        },

        count(a, b) {
            console.log("COUNT LIKED", a, b);
            return a + b;
        },

        //-------------ARTICLES DATE ----------------------//

        filtreArticleDate: function () {
            const Arts = this.dataArt;
            const date = this.ArticleDate;
            const arts = Arts.filter((a) => a.createdAt < date);

            console.log("Arts", Arts);
            console.log(arts);
            this.artsDate = arts;
        },
        //-----------------MAP---------------//
        filtreMAP: function () {
            const Arts = this.dataArt;
            console.log("ARTS", Arts);
            const comments = Arts.map((a) => a.comment);
            //-----------indexation des article------------//
            //  const indexed = Arts.reduce((acc, el)=>({
            //    ...acc,
            //    [el.createdAt]:el, // indexe les objets avec la clé argument "createdAt"
            //  }),{});
            //  console.log("INDEXED",indexed);
            //---------------------------------------------//
            //-----------indexation des article------------//
            const indexed = Arts.reduce(
                (acc, el) => ({
                    ...acc,
                    [el.id]: el, // indexe les objets avec la clé argument "createdAt"
                }),
                {}
            );
            console.log("INDEXED ", indexed);

            //----------------CONCAT------------------//
            const plano = Arts.reduce((acc, el) => acc.concat(el), []);
            console.log("PLANO", plano);

            //-----------------FOREACH-------------------//

            const articul = this.articulos;
            const foritch = Arts.forEach((item, index) => {
                console.log("ITEM INDEX", index, item);
            });
            //  articul.push(foritch);
            //   console.log("ARTICULOS", articul);
            //   console.log("ARTICULOS", articul);
            //   this.comment = comments;
            //   const IdComments = comments.map((id) => id);

            console.log("comments", this.comments);
            console.log("comments2", comments);
            console.log("Idcomments", IdComments);
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
            // console.log("Comment userData PostVue",comm);

            //this.UsersId=UserId;
        },

        //------------ UPLOAD POST-----------------------//
        uploadPost: function () {
            if (this.fileSelected == "" && this.content == "") {
                alert(" Votre poste est vide");
                return;
            }
            if (this.fileSelected) {
                var bodyFormData = new FormData();
                bodyFormData.append("media", this.fileSelected, this.fileSelected.name);
                bodyFormData.append("content", this.content);
                bodyFormData.append("userId", userId);
                bodyFormData.append("likes", this.likes);
                bodyFormData.append("dislikes", this.dislikes);

                console.table("FORM DATA AVEC IMAGE ", ...bodyFormData.entries());
            } else {
                var bodyFormData = new FormData();
                bodyFormData.append("content", this.content);
                bodyFormData.append("userId", userId);
                bodyFormData.append("likes", this.likes);
                bodyFormData.append("dislikes", this.dislikes);

                console.table("FORM DATA SANS IMAGE ", ...bodyFormData.entries());
            }
            this.$store
                .dispatch("uploadPost", bodyFormData)

                .then(function (response) {
                    //handle success
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        },

        FileUpload(event) {
            console.log("EVENT", event);
            this.fileSelected = event.target.files[0];
            console.log("fichier Image", this.fileSelected);
        },

        updatePost: function () {
            if (this.fileSelected) {
                var bodyFormData = new FormData();
                bodyFormData.append("media", this.fileSelected, this.fileSelected.name);
                bodyFormData.append("content", this.content);
                bodyFormData.append("userId", userId);
                bodyFormData.append("likes", this.likes);
                bodyFormData.append("dislikes", this.dislikes);

                console.table("FORM DATA AVEC IMAGE ", ...bodyFormData.entries());
            } else {
                var bodyFormData = new FormData();
                bodyFormData.append("content", this.content);
                bodyFormData.append("userId", userId);
                bodyFormData.append("likes", this.likes);
                bodyFormData.append("dislikes", this.dislikes);

                console.table("FORM DATA SANS IMAGE ", ...bodyFormData.entries());
            }
            this.$store
                .dispatch("updatePost", bodyFormData)

                .then(function (response) {
                    //handle success
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        },
        //------------ UPLOAD COMMENT-----------------------//
        uploadComment: function (Aid) {
            if (this.fileSelectedComment) {
                var bodyFormData = new FormData();
                bodyFormData.append(
                    "media",
                    this.fileSelectedComment,
                    this.fileSelectedComment.name
                );
                bodyFormData.append("comment", this.CommentContent);
                bodyFormData.append("userId", userId);
                bodyFormData.append("articleId", Aid);

                console.table(
                    "FORMDATA-COMMENT AVEC IMAGE------>",
                    ...bodyFormData.entries()
                );
            } else {
                var bodyFormData = new FormData();
                bodyFormData.append("comment", this.CommentContent);
                bodyFormData.append("userId", userId);
                bodyFormData.append("articleId", Aid);

                console.table(
                    "FORMDATA-COMMENT SANS IMAGE------>",
                    ...bodyFormData.entries()
                );
            }
            this.$store
                .dispatch("uploadComment", bodyFormData)

                .then(function (response) {
                    //handle success
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        },

        FileUploadCom(event) {
            console.log("EVENT", event);
            this.fileSelectedComment = event.target.files[0];
            console.log("fichier Image", this.fileSelectedComment);
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
            this.$store
                .dispatch("deleteArticle", data)
                .then((response) => {
                    if (response) {
                        response.json({ message: "Article supprimé" });
                        this.$router.push("login");
                    }
                })
                .catch((err) => {
                    console.log("ERREUR REQUETE PROFIL DELETE ARTICLE----->", err);
                });
        },
        //------------------DELETE COMMENT-------------------------//
        deleteComment(data) {
            console.log("USER-ID COMMENT DELETE", data);
            this.$store
                .dispatch("deleteComment", data)
                .then((response) => {
                    if (response) {
                        response.json({ message: "Commentaire supprimé" });
                        this.$router.push("login");
                    }
                })
                .catch((err) => {
                    console.log("ERREUR REQUETE PROFIL DELETE COMMENT----->", err);
                });
        },

        //     GetNextUser() {
        //   window.onscroll = () => {
        //     let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        //     if (bottomOfWindow) {
        //     //   axios.get(`https://randomuser.me/api/`).then(response => {
        //     //     this.users.push(response.data.results[0]);
        //     //   });
        //     alert("il n'y en a plus ")
        //     }
        //   }
        // }
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

html {
    background-attachment: fixed;
    /* background-color: blanchedalmond; */
}

.root {
    background-color: blanchedalmond;
}

.container {
    background-color: rgb(252, 217, 164);
}

#app {
    background-color: rgb(40, 30, 17);
    background-attachment: fixed;
}

body {
    background: #eee;
    max-width: 1000px;
    background-color: antiquewhite;
    background-attachment: fixed;
}
.erreurMessageLike{
    width: 100%;
    display:flex;
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
.NameUser{
    color:white;
    position: absolute;
     bottom:.15rem;
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
.userMedia{
    width:2.5rem;
    height: 2.5rem;
    position: absolute;
    top:.3rem;
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
.ico{
    display: flex;
}

/* .commentaire{
    margin-top:;
} */
/* //---------------------POST EDIT------------------------_// */

/* //---------------------POST------------------------_// */
/* .colonne-centree
{
float: none;
margin: 0 auto;
} */
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
</style>
