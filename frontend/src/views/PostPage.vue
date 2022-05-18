<template>
    <div class="container posts-content">
        <div class="row">
            <!-- ++++----------------------ASIDE LEFT-TOP  ----------------**** -->
            <div class="col-lg-3 col-xl-3 sticky-top">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="media mb-3">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                class="d-block ui-w-40 rounded-circle" alt="" />
                            <div class="media-body ml-3 mt-0">
                                {{ user.lastName }}
                                <div class="text-muted small">3 days ago</div>
                            </div>
                        </div>

                        <div class="card-body ">
                   
                    <ul class="list-aside">
                        <li class="">Lorem ipsum .</li>
                        <li class="">Consectetur</li>
                        <li class="">Sed do .</li>
                        <li class="">Ut labore . </li>
                        <li class="">Exercitation .</li>
                    </ul>
                </div>
                    </div>
                    <div class="card-footer">
                        <a href="javascript:void(0)" class="d-inline-block text-muted">
                            <small class="align-middle"> <strong>123</strong> Likes</small>
                        </a>
                        <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                            <small class="align-middle"> <strong>12</strong> Comments</small>
                        </a>
                        <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                            <small class="align-middle">Repost</small>
                        </a>
                    </div>
                </div>
            </div>
            <!-- ++++----------------------CENTRE CARD TOP  ----------------**** -->
            <!-- <div class="col-lg-6 col-xl-3 ">

                </div> -->
            <div class="col-lg-6 col-xl-3 ">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="media mb-3">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                class="d-block ui-w-40 rounded-circle" alt="" />
                            <div class="media-body ml-3 mt-0">

                                <div class="text-muted small">3 days ago</div>
                            </div>
                        </div>


                    </div>
                    <div class="card-footer">
                        <a href="javascript:void(0)" class="d-inline-block text-muted">
                            <small class="align-middle"> <strong>123</strong> Likes</small>
                        </a>
                        <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                            <small class="align-middle"> <strong>12</strong> Comments</small>
                        </a>
                        <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                            <small class="align-middle">Repost</small>
                        </a>
                    </div>
                </div>

                <div class="col-lg-12 col-xl-3 articlePost">
                        <form id="formPost" @submit.prevent="articlePost" >
                            <div id="articleUser">
                                <div id="postText">
                                    <!-- <input v-model="CommentContent" class="commentaire" type="text" size="4"
                                        placeholder="Ecrire" /> -->
                                    <textarea v-model="content" class="commentaire form-control" col="6" rows="2"
                                        type="text" size="6" placeholder="Ecrire"></textarea>
                                    <div class="iconComment">
                                        <span>
                                            <fa :icon="['fas', 'upload']" type="file" id="mediaPost" ref="file" />
                                        </span>
                                        <input type="file" id="mediaPost" ref="file" @change="FileUpload"
                                        accept="image/png, image/jpeg" />


                                        <!-- <button class="Publier" @click="uploadComment(article.id)"> -->
                                        <span>
                                            <fa :icon="['far', 'paper-plane']" class="Publier"
                                                @click="uploadPost" />
                                        </span>
                                        <!-- </button> -->
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
            </div>
            <!-- ++++----------------------ASIDE RIGHT-TOP  ----------------**** -->
            <div class="col-lg-3 col-xl-3 sticky-top">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="media mb-3">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                class="d-block ui-w-40 rounded-circle" alt="" />
                            <div class="media-body ml-3 mt-0">
                                {{ user.lastName }}
                                <div class="text-muted small">3 days ago</div>
                            </div>
                        </div>

                        <div class="list-card-user">
                            <ul>
                                <li>Nouveau Commentaires</li>
                                <li>Messages</li>
                                <li>Articles populaires</li>
                                <li>ils vous suivent</li>

                            </ul>


                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="javascript:void(0)" class="d-inline-block text-muted">
                            <small class="align-middle"> <strong>123</strong> Likes</small>
                        </a>
                        <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                            <small class="align-middle"> <strong>12</strong> Comments</small>
                        </a>
                        <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                            <small class="align-middle">Repost</small>
                        </a>
                    </div>
                </div>
            </div>
            <!-- ********++++----------------------POST-----------------************ -->
            <div class=" post col-lg-6 col-xl-6 offset-md-3" v-for="article in dataArt" :key="article.id">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="media post-head mb-3">
                            <img v-if="article.user.media" alt="ImageProfil" :src="article.user.media"
                                class="d-block ui-w-40 rounded-circle" />
                            <div class="media-body fw-bold ml-3">
                                {{ article.user.lastName }} 
                                {{ }} {{ article.user.firstName }} 
                                <div class="text-muted small">le: {{ date(article.createdAt) }}</div>
                            </div>
                        </div>

                        <p>
                            {{ article.content }}
                        </p>
                        <div class=""><img v-if="article.media" class="postImg" alt="Image" :src="article.media" />
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="like">
                        <fa class="like-r" :icon="['far', 'thumbs-up']" @click="liked(article.id, 1)" />
                        <fa class="like-sl" :icon="['fas', 'thumbs-up']" @click="liked(article.id, 0)" />
                        </div>
                        <div class="like">
                        <fa class="like-r" :icon="['far', 'thumbs-down']" @click="disliked(article.id, -1)" />
                        <fa class="like-sd" :icon="['fas', 'thumbs-down']" @click="disliked(article.id, 0)" />
                        </div>
                        <span class="countComment">commentaires: 12</span>


                        <fa class="d-inline-block text-muted ml-3" :icon="['far', 'comment']"
                            @click="commentInput = !commentInput" v-model="PostLiked" />
                        <div class="IconEditTrash">
                            <span>
                                <fa v-if="user.role === 'admin'" icon="['fas', 'pencil-alt']" />
                            </span>
                            <span>
                                <fa :icon="['far', 'trash-alt']" @click="deleteComment(commKey.id)" />
                            </span>
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
                                        <span>
                                            <fa :icon="['fas', 'upload']" type="file" id="mediaPost" ref="file" />
                                        </span>
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

                        <div class="card-comment"></div>
                        <div class="card mb-1">
                            <div class="card-body">
                                <div class="media media-comment mb-3">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                        class="d-block ui-w-40 rounded-circle avatar-comment" alt="" />
                                    <div class="media-body ml-3 mt-0">
                                        <span>{{ commKey.user.lastName }}</span><span>{{ commKey.user.firstName
                                        }}</span>
                                        <div class="text-muted small">le: {{ date(commKey.user.createdAt) }}</div>
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
                            <!-- <div class="card-footer">
                                <a href="javascript:void(0)" class="d-inline-block text-muted">
                                    <small class="align-middle">
                                        <strong>123</strong> Likes</small>
                                </a>
                                <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                                    <small class="align-middle">
                                        <strong>12</strong> Comments</small>
                                </a>
                                <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                                    <small class="align-middle">Repost</small>
                                </a>
                            </div> -->
                        </div>

                    </div>
                </div>
            </div>

            <!-- ++++----------------------ASIDE RIGHT-----------------**** -->
            <div class="col-lg-12 sticky-top">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="media mb-0">

                            <div class="media-body ml-3 mt-0">
                                Georges du foix
                                <div class="text-muted small">3 days ago</div>
                            </div>
                        </div>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                            finibus commodo bibendum. Vivamus laoreet blandit odio, vel
                            finibus quam dictum ut.
                        </p>

                    </div>
                    <div class="card-footer">
                        <a href="javascript:void(0)" class="d-inline-block text-muted">
                            <small class="align-middle"> <strong>123</strong> Likes</small>
                        </a>
                        <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                            <small class="align-middle"> <strong>12</strong> Comments</small>
                        </a>
                        <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
                            <small class="align-middle">Repost</small>
                        </a>
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
import store from '@/store/index.js';
import navBar from "../components/Navbar.vue";
import postDisplay from "../components/postDisplay.vue";
const axios = require("axios");
const FormData = require("form-data");

let user = localStorage.getItem("user");
let userId = "";
let userToken = "";
const User = JSON.parse(user);
if (User) {
    userId = User.userId;
    userToken = User.token;
} else {
}

console.log(userId, userToken);


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
            // entries:[],
            // showEntries:[10,20,50],
            // currentEntires:10,
            // filterEntries:[],

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
            PostLiked: [],
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

        // this.userData(userId);
        console.log("BEFORE MOUNT");
        console.log("USER-DATA-->", userId)
    },
    onMounted: function () {
        console.log("ON MOUNTED");
        console.log("USER-DATA-->", this.userD)
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


        }),
    },

    watch: {
        likedArt: function (val) {
            console.log("watch", val);

        },
        dislikedArt: function (val) {
            console.log("watch", val);

        },

        dataArt: function (val) {
            console.log("WATCH ARTDATA MODIF LIVE", val);

        }
    },

    methods: {

        liked: function (a, b) {
            const likeData = { articleId: a, userId: userId, like: b }

            console.log("LIKED", a, userId, b);
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
                });

        },
        disliked: function (a, b) {
            const likeData = { a, userId }
            console.log("LIKED", a, userId, b);
            this.dislikedArt = likeData;

        },

        //--------------FORMAT DATE----------------------//
        date(value) {
            return moment(value).format("DD/MM/YYYY à hh:mm");
        },


        count(value) {
            return value++;
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
            this.$store
                .dispatch("getUserData", ud)
                .then((res) => {
                    console.log(" RES-DATA-USER-CONNECT", res);
                })
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
            if (this.fileSelected) {


                var bodyFormData = new FormData();
                bodyFormData.append("media", this.fileSelected, this.fileSelected.name);
                bodyFormData.append("content", this.content);
                bodyFormData.append("userId", userId);

                console.table("FORM DATA AVEC IMAGE ", ...bodyFormData.entries());
            } else {
                var bodyFormData = new FormData();
                bodyFormData.append("content", this.content);
                bodyFormData.append("userId", userId);

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
        //------------ UPLOAD COMMENT-----------------------//
        uploadComment: function (Aid) {

            if (this.fileSelectedComment) {

                var bodyFormData = new FormData();
                bodyFormData.append("media", this.fileSelectedComment, this.fileSelectedComment.name);
                bodyFormData.append("comment", this.CommentContent);
                bodyFormData.append("userId", userId);
                bodyFormData.append("articleId", Aid);

                console.table("FORMDATA-COMMENT AVEC IMAGE------>", ...bodyFormData.entries());
            } else {
                var bodyFormData = new FormData();
                bodyFormData.append("comment", this.CommentContent);
                bodyFormData.append("userId", userId);
                bodyFormData.append("articleId", Aid);

                console.table("FORMDATA-COMMENT SANS IMAGE------>", ...bodyFormData.entries());
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


                        response.json({ message: "Article supprimé" })
                        this.$router.push("login");
                    }
                }).catch((err) => {
                    console.log("ERREUR REQUETE PROFIL DELETE ARTICLE----->", err);

                })
        },
        //------------------DELETE COMMENT-------------------------//
        deleteComment(data) {

            console.log("USER-ID COMMENT DELETE", data);
            this.$store
                .dispatch("deleteComment", data)
                .then((response) => {
                    if (response) {


                        response.json({ message: "Commentaire supprimé" })
                        this.$router.push("login");
                    }
                }).catch((err) => {
                    console.log("ERREUR REQUETE PROFIL DELETE COMMENT----->", err);

                })
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
* {
    box-sizing: border-box;

}

html {
    background-attachment: fixed;
    background-color: blanchedalmond;
}

.root {
    background-color: blanchedalmond;

}

.container {
    background-color: antiquewhite;
}

body {
    background: #eee;
    max-width: 1000px;
    background-color: antiquewhite;
}
/* // ------------------ ASIDE LEFT------------------- */
li{
    list-style-type: none;
}
.list-aside{
    text-align: left;
    padding-left: 0;
}

/* // ------------------ CENTRE TOP------------------- */

.articlePost{
    border: 1px solid black;
}
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
.like{
    display: flex;
    flex-direction: row;
    width: 30%;
    justify-content: space-between;
    position: relative;
    padding-left: .5rem;
}
.like-sl{
    position: absolute;
   
}
.like-sd{
    position: absolute;
   
    
}
span {
    margin-right: 1rem;
}



.posts-content {
    margin-top: 20px;
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
    /* border:none; */
}

#postText {
    width: 100%;
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

.card-comment {
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
    border-bottom: 10px solid rgba(111, 111, 111, .3);
    border-right: 10px solid white;
    border-left: 10px solid white;
    margin-left: 1.2rem;
}

.p_comment {
    margin: 0 auto;
    padding: .4rem;
    text-align: left;
    border-left: 1px solid rgba(111, 111, 111, .3);
    border-top: 1px solid rgba(111, 111, 111, .3);
    box-shadow: 2px 2px 2px rgba(111, 111, 111, .4);
    border-radius: .5rem;
}

.media-comment {
    justify-content: start;
    border: 2px solid white;
    box-shadow: -2px -2px 0px 0px rgba(111, 111, 111, .4);
    border-radius: .5rem;
    padding-left: .2rem;
    padding-top: .2rem;
    margin-bottom: 0rem;
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
