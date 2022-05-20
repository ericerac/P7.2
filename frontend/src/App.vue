<template>
 
  <router-view/>
</template>

<script>
//import MyHome from './components/MyHome.vue'


export default {
  name: 'App',
  components: {
   //MyHome   
  }
}
</script>

<style>
html{
 background-color: rgb(252, 217, 164);
}
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
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
