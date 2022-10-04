<template>
 <div>
   <strong style="font-size: 55px;">尊敬的{{username}},欢迎来到后台管理系统!</strong>
<!--   position: absolute;　top:50%;left:25%;margin-left:-100px;margin-top:-50px;-->
 </div>
</template>

<script>
export default {
  name: "Index",
  data(){
    return{
      username: ""
    }
  },
  created() {
    this.getUserInfo();
  },
  methods:{
    getUserInfo(){
      this.$axios.get("/userInfo").then(res=> {
        this.username = res.data.data.username
      })
    }
  }
}
</script>

<style scoped>
.el-main {
  color: #333;
  /*text-align: center;*/
  line-height: 160px;
}
</style>