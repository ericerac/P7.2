<template>
  
                <h2>Bienvenue sur votre Reseau social</h2>
                  <div id = "formLogin">
                      <form id="form_login">
                        
                          <input class ="input" placeholder ="Email">
                          <input class ="input" placeholder ="Password">
                          <button class ="btn" v-on:click="loginPost()">Login</button>
                      </form>
                          <p class= "formlogin_inscription">Vous n'avez pas encore de compte ?<a> Incrivez-vous</a></p>
                  </div>


</template>

<script>
export default {
  name: 'login',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
