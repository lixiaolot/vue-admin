<template>
  <div>
  <strong>后台管理系统</strong>
  <div class="header-avatar">
    <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>

    <el-dropdown>
          <span class="el-dropdown-link">
            {{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <RouterLink to="/userCenter">个人中心</RouterLink>
        </el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-link href="https://www.bilibili.com/"  target="_blank">B站</el-link>
  </div>
  </div>
</template>

<script>
export default {
name: "Header",
  data(){
  return{
    userInfo: {
      id:"",
      username:"",
      avatar: ""
    }
  }
  },
  created() {
  this.getUserInfo();
  },
  methods:{
  getUserInfo(){
    this.$axios.get("/userInfo").then(res=> {
      this.userInfo = res.data.data
    })
  }
  }
}
</script>

<style scoped>
.header-avatar{
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: black;
}
.el-icon-arrow-down {
  font-size: 12px;
}


</style>