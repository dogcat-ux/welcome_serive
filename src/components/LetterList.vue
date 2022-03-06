<template>
  <div class="letter-list">
    <span><img src="../assets/image/leterrStar.png" alt=""></span>
    <a :class="{ 'letter-active': item===clickItem }"
       v-for="(item,index) in letters"
       :key="index"
       @touchstart="touchstart(item)"
       @touchend="touchend(item)"
       @click="letterClick(item,index,)">{{item}}</a>
    <span>#</span>
  </div>
</template>

<script>
  // <!--  字母列表-->
  //需要传入：lettersExist当前的数据列表有那些开头字母
  export default {
    name: "LetterList",
    data() {
      return {
        letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",//字母列表
        clickItem: '',
        hrefItem: '',//
        x: 0,
        y: 0,
        path: this.$route.path
      }
    },
    props: {
      lettersExist: Array
    },
    methods: {
      letterClick(item, index) {
        this.clickItem = item;
        let letterNext = '';
        for (let i = index; i < this.letters.length; i++) {
          if (this.lettersExist.indexOf(this.letters[i]) !== -1) {
            letterNext = this.letters[i];
            break;
          }
        }
        this.hrefItem = (this.lettersExist.indexOf(item) === -1) ? letterNext : item;
        if (this.hrefItem) {
          document.querySelector("#" + this.hrefItem).scrollIntoView(true);
        }
      },
      touchstart(item) {
        this.clickItem = item;
        this.x = this.getPosition()[0];
        this.y = this.getPosition()[1];
        this.$emit("touchstart1", {x: this.x, y: this.y, item: item})
      },
      touchend(item) {
        this.clickItem = '';
        this.$emit("touchend1", {item: item})
      },
      //获得当前长按的位置,固定位置，不随滚动条滚动变化
      getPosition() {
        let posX = 0;
        let posY = 0;
        var events = event || window.event;
        let event = events.touches[0]
        if (event.pageX || event.pageY) {
          posX = event.pageX;
          posY = event.pageY;
        } else if (event.clientX || event.clientY) {
          posX = event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
          posY = event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
        }
        return [posX, posY];
      }
    }
  }
</script>

<style scoped>
  .letter-list {
    width: 10px;
    height: 516px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-top: 26px;
    font-size: 14px;
  }
  .letter-active {
    color: #3b9eff;
  }
  a, span {
    flex: 1;
    font-size: 14px;
    height: 19px;
    line-height: 19px;
    text-align: center;
    margin: 0 auto;
    color: #cdcdcd;
    font-family: SF Pro Text, sans-serif;
  }

  img {
    width: 10px;
    height: 10px;
  }
</style>
