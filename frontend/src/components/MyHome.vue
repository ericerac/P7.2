

<template>
  <div id = "formSignup">
                <form @submit.prevent="signupPost" id="form_signup">
                    <input v-model="formData.firstName" class ="input" type="text" placeholder="Nom">
                    

                    <input v-model="formData.lastName" class ="input" type="text" placeholder="Prénom">
                   

                    <input v-model="formData.email" class ="input" placeholder ="Email">
                   

                    <input v-model="formData.password" type="password" class ="input" placeholder ="Password">
                 

                    <button type="submit">S'inscrire</button>
                </form>
                
                    
            </div>
</template>

<script>
//import { log } from 'console';

//mport axios from axios;
const axios = require('axios');

export default {
name:'MyHome',
props:{

},
data:function(){
    return{
        formData:{
        firstName:'',
        lastName:'',
        email:'',
        password:''
        }
    }
},
methods:{
     signupPost() {
      
     axios.post("http://localhost:3000/signup", 
           this.formData,
        ).then((response) =>{
            console.log(response);
        }).
       catch (()=> {
        console.log("ça m'énerve");
      })
    },
}
}
</script>

<style>

</style>