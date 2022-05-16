<template>
   <el-container style="height: 100vh; border: 1px solid #eee">
  <Aside :isCollapse="isCollapse" :asideWidth="asideWidth" :logoTextShow="logoTextShow"/>
  
  <el-container>
    <el-header style="border-bottom: 1px solid #ccc;">
      <Header :collapse="collapse" :collapseBtnClass="collapseBtnClass"/>
    </el-header>
    <el-main>
      
      <router-view />
    
    </el-main>   

  </el-container>  
</el-container>

</template>

<script>
import Aside from './Aside.vue'
import Header from './Header.vue'
export default {
  name: 'HomeView',
  components: {
    Aside,
    Header
  },
  data() {
      return {    
        collapseBtnClass: 'el-icon-s-fold',
        isCollapse: false,
        asideWidth: 200,
        logoTextShow: true
      }
    },
    methods: {     
      collapse() {
        this.isCollapse = !this.isCollapse;
        if(this.isCollapse) {
          this.asideWidth = 64;
          this.collapseBtnClass = 'el-icon-s-unfold';
          this.logoTextShow = false;
        } else {
          this.asideWidth = 200;
          this.collapseBtnClass = 'el-icon-s-fold';
          this.logoTextShow = true;
        }
    }
      
    }
}
</script>

<style>
  
</style>