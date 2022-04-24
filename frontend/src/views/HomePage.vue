<template>
  <div id="homePage">
    <img id="userImg" src="user.profilImg" alt="" />
    <h3 id="userName">{{ user.firstName }} {{user.lastName}}</h3>
    <span id="userDate" class="userInfo">Menbre depuis le:{{ user.createdAt }}</span>
    <span id="userEmail" class="userInfo">Email: {{ user.email }}</span>
    <span id="userPost" class="userInfo">Articles publiés:{{ user.postCount }}</span>
    <span id="userComment" class="userInfo"
      >Commentaires publiés:{{ user.commentCount }}</span
    >
    <button class="btn" id="passwordChange">passwordChange</button>
    <label
      >choisir Photo de profil

      <input
        type="file"
        id="PhotoPerfilChange"
        ref="file"
        v-on:change="onChangeFileUpload()"
        accept="image/png, image/jpeg"
      />
    </label>
    <button  class ="btn" id="valider" >Valider </button>
    <!-- <button  class ="btn" id="logOut" :click="logOut()">Se deconnecter </button> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name:'HomePage',
  mounted:function(){
   
    console.log(this.$store.state.user);
     if (this.$store.state.user.userId == -1){
       this.$router.push('/MyHome');
       return;
     }
     this.$store.dispatch('getUserData');
      //getUserData();
  },

  data: () => {
    return {
      
    };
  },
  computed:{
    ...mapState({
      user:'userData',
    })
  },
  methods: {
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
  border:1px solid black;
  border-radius: 5px;
}
</style>