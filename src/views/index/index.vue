<style scoped>
#app {
  position: relative;
  z-index: 0;
}

.top {
  background: white;
  width: 97%;
  height: 14%;
  margin: 0 auto;
  padding: 1.5% 0;
}
.left {
  width: 15%;
  float: left;
}

.center {
  width: 85%;
  margin: 0 auto;
}
</style>
<template>
  <div id="app">
    <div class="top">
      <div class="left">
        <img src="../../assets/img/QGlogo.png" style="width:23%;" />
        <img src="../../assets/img/QGstudio.png" style="width:73%;" />
      </div>
      <div class="center">
        <img src="../../assets/img/Form.png" style="width:45%;" />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

