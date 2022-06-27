<template>
  <div class="container" v-show="isShow">
    <div class="msg-box">
      1111
    </div>
  </div>
</template>

<script>
  export default {
    name: "MsgAlert",
    data: function () {
      return {
        title: '正在加载...',
        isShow: false
      }
    }
  }
</script>

<style scoped>
  .container{
    width: 100vw;
    height: 100vh;
    background-color: rgba(158, 158, 158, 0.5);
  }
  .msg-box{
    width: 200px;
    height: 60px;
    background-color: #fff;
  }

</style>
