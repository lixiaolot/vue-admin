<template>
  <el-aside width="200px">

    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <router-link to="/index">
        <el-menu-item index="0">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </template>
        </el-menu-item>
      </router-link>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-operation"></i>
          <span>系统管理</span>
        </template>
        <router-link to="/users">
        <el-menu-item index="1-1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </template>
        </el-menu-item>
        </router-link>
        <RouterLink to="/role">
        <el-menu-item index="1-2">
          <template slot="title">
            <i class="el-icon-rank"></i>
            <span slot="title">角色管理</span>
          </template>
        </el-menu-item>
        </RouterLink>
        <RouterLink to="/menus">
        <el-menu-item index="1-3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">菜单管理</span>
          </template>
        </el-menu-item>
        </RouterLink>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>系统工具</span>
        </template>
        <RouterLink to="/dict">
        <el-menu-item index="2-1">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">字典</span>
          </template>
        </el-menu-item>
        </RouterLink>
      </el-submenu>




    </el-menu>


  </el-aside>
</template>

<script>
export default {
  name: "Aside"
}
</script>

<style scoped>
.el-menu-vertical-demo{
  height: 100%;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: left;
  line-height: 200px;
}

</style>