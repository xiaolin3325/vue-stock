<template>
  <el-aside
    :width="asideWidth + 'px'"
    style="background-color: rgb(238, 241, 246); height: 100%"
  >
    <el-menu
      :default-openeds="['1', '3']"
      style="min-height: 100%; overflow-x: hidden"
      background-color="rgb(48,65,86)"
      text-color="#FFF"
      active-text-color="#ffd04b"
      :collapse-transition="false"
      :collapse="isCollapse"
      router
    >
      <div style="height: 60px; line-height: 60px; text-align: center">
        <img
          src="../assets/logo.png"
          alt=""
          style="width: 20px; position: relative; top: 5px; margin-rigth: 5px"
        />
        <b style="color: #fff" v-show="logoTextShow">我的系统</b>
      </div>

      <el-submenu index="1">
        <template slot="title"
          ><i class="el-icon-message"></i>
          <span slot="title">业务管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/hot">连板股</el-menu-item>
          <el-menu-item index="/">我的持仓</el-menu-item>
          <el-menu-item index="/trend">涨跌停趋势</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"
          ><i class="el-icon-menu"></i>
          <span slot="title">系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  props: {
    isCollapse: Boolean,
    asideWidth: Number,
    logoTextShow: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
