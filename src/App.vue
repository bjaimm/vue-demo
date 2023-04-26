<template>
  	
  <div id="app" style="text-align: left">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  created(){
    console.log("App created is called...")
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: top;
  color: #2c3e50;

}
body{
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
