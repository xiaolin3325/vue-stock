<template>
<div style="font-size: 12px; line-height: 60px; display: flex">
  
      <div style="flex: 1;font-size: 18px">
        <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
      </div>
      
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{ userName }}</span>
    
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        collapse: Function,
        collapseBtnClass: String
    },
    data() {
        return {
            userName: '超级管理员'
            
        }
    },
    methods: {
        
    }
}
</script>

<style>

</style>