<template>
  <img id ="logo" alt="Vue logo" src="./assets/logo.png">
   <router-link to="/homepage">Home page</router-link>
  <router-link to="/post">Post</router-link>
  <MyHome/>
  <router-view/>
  
</template>

<script>
import MyHome from './components/MyHome.vue'

export default {
  name: 'App',
  components: {
  MyHome
  }
}
</script>

<style>
#logo{
  width: 200px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
