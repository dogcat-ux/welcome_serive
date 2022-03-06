<template>
  <div class="loading">
    <div class="loader">Loading...</div>
  </div>
</template>

<script>
  export default {
    name: "Loading"
  }
</script>

<style scoped>
  .loading {
    width: 375px;
    height: 100%;
    min-height: 500px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  /*动画加载*/
  .loader {
    font-size: 20px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    text-indent: -9999em;

    animation: load-effect 1s infinite linear;
  }

  @keyframes load-effect {
    0% {
      box-shadow: 2em -2em 0 0 #3b9eff,
        /*右上*/ 3em 0 0 -.5em #3b9eff,
        /*右*/ 2em 2em 0 -.5em #3b9eff,
        /*右下*/ 0 3em 0 -.5em #3b9eff, /*下*/ -2em 2em 0 -.5em #3b9eff, /*左下*/ -3em 0 0 -.5em #3b9eff, /*左*/ -2em -2em 0 0 #3b9eff; /*左上*/
    }
  }
</style>
