import {createStore} from 'vuex';
const axios = require("axios");

const instance = axios.create({
    baseURL:'http://localhost:3000/',
    // headers:{'X-Custom-Headers':''}
})

const store = createStore({
    state:{

    },
    actions:{
        signupPost:({commit},userData)=>{
            commit;
            instance.post('signup',userData)
            .then(function(response){
                console.log(response);
            }).catch(function(err){
                console.log("ça ne fonctionne pas");
            })
        }

    }
})



export default store;