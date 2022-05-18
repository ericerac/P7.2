<template>

    <!--*** -----------------BLOC  POST DISPLAY---------------------*** -->

    <div id="postPublié" v-for="article in dataArt" :key="article.id">
        <div id=" postUser ">
            <div>


                <div id="user">
                    <img v-if="article.user.media" class="UserImgProfil" alt="Image" :src="article.user.media" />
                    <span class="user"> Publié par: <strong>{{ article.user.lastName }} {{ }} {{ article.user.firstName
                    }}</strong></span>

                    <span class="postDate">
                        le: {{ date(article.createdAt) }}
                    </span>
                </div>
                <div id="article">
                    <span class="content">{{ article.content }}</span>
                    <img v-if="article.media" class="postImg" alt="Image" :src="article.media" />
                </div>
                <div class="icoTrashEdit" v-if="article.user.id === userId">
                    <fa :icon="['fas', 'pencil-alt']" />
                    <fa :icon="['far', 'trash-alt']" @click="deleteArticle(article.id)" />
                </div>
            </div>
            <!-- -----------------------BLOC LIKE   POST DISPLAY------------------------>

            <div id="iconPost">
                <div class="iconLike" v-for="like in article.like" :key="article.id">
                    <span class="icon">
                        <fa class="like" :icon="['far', 'thumbs-up']" @click="liked(article.id)" />{{ like.like }}
                    </span>


                    <span class="icon">
                        <fa class="like" :icon="['far', 'thumbs-down']" @click="disliked(article.id)" />
                    </span>

                </div>
                <span class="commentIcon">
                    <fa :icon="['far', 'comment']" @click="commentInput = !commentInput" v-model="PostLiked" />
                </span>
            </div>
        </div>
    </div>

</template>