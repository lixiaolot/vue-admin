<template>
  <el-container>
    <Aside/>
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <Tabs/>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/views/Aside";
import Header from "@/views/Header";
import Tabs from "@/views/Tabs";
export default {
  name: "Home",
  components: {Header, Aside,Tabs}
}
</script>

<style scoped>
.el-container{
  padding: 0;
  margin: 0;
  height: 100%;
}

.el-header {
  background-color: #17B3A3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  /*line-height: 160px;*/
  padding: 0;
}


</style>