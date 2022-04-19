<template>
    <div id="homePage">
        <img id="userImg" src="" alt="">
        <h3 id="userName">{{userName}}Machin Bidule</h3>
        <span id="userDate" class="userInfo">Menbre depuis le:{{userDate}}</span>
        <span id="userEmail" class="userInfo">{{userEmail}}</span>
        <span id="userPost" class="userInfo">Articles publiés:{{userPost}}</span>
        <span id="userComment" class="userInfo">Commentaires publiés:{{userComment}}</span>
        <button class ="btn" id="passwordChange">passwordChange</button>
        <label>choisir Photo de profil
        
        <input type="file" id="PhotoPerfilChange" ref="file" v-on:change="onChangeFileUpload()" accept="image/png, image/jpeg"/>
        </label>
       
        
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

#homePage{
    width: 350px;
    margin:0 auto;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    border: 1px solid black;

}
#userImg{
    width:70px;
    height: 70px;
    border-radius: 50%;
    border:1px solid black;
    margin:20px auto;

}
.btn{
    width: 40%;
    margin:10px auto;
}

</style>