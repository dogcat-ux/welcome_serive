<template>
  <div id="home">
    <div id="title_bar">
      <div id="title_body">
        <div id="title_front">
          <img
                  class="back_icon"
                  src="../assets/image/back.png"
                  @click="goBack"
                  alt="#"/>
          <span id="title_label">{{title}}</span>
        </div>
        <div id="title_search" v-if="isSearch">
          <img
                  class="search_icon"
                  src="../assets/image/search.png"
                  @click="goSearch"
           alt="#"/>
        </div>
      </div>
    </div>
    <div id="main_body" ref="scrollview">
      <div class="item-list"
           @touchstart='body_touchstart'>
        <div v-for="(item, index) in items"
             :id="item.firstLetter"
             :key="index">
          <ItemList :item="{itemTitle:item[cirName]}"
                    @click.native="go_next(item)"></ItemList>
        </div>
        <div class="long-active"
             v-if="isActive"
             :style="activeStyle">{{item}}</div>
      </div>
      <div class="letter-list">
        <div class="letter-list-list">
          <span><img src="../assets/image/leterrStar.png" alt=""></span>
          <a :class="{ 'letter-active': item===clickItem }"
             v-for="(item,index) in letters"
             :key="index"
             :href="'#'+clickItem"
             @touchstart="touchstart(item)"
             @touchend="touchend(item)"
             @click="letterClick(item)">{{item}}</a>
          <span>#</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ItemList from "./ItemList";
  export default {
    name: "FrameWithLetter",
    data() {
      return {
        //字母列
        letters:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        clickItem:'',
        //原生列
        clickX: 0,
        clickY: 0,
        item: "",
        isActive: false,
        activeStyle: {
          left: this.clickX + 'px',
          top: this.clickY + 'px'
        },
        listData: [],
      }
    },
    components: {
      // LetterList,
      ItemList
    },
    props: {
      title: String,//大标题
      isSearch: {
        type: Boolean,
        default() {
          return true;
        }
      },//有搜索框吗
      isHome: {
        type: Boolean,
        default() {
          return false;
        }
      },//是首页吗
      isLetterList: {
        type: Boolean,
        default() {
          return false;
        }
      },
      list: Object,//数据列表对象
      items:Array,//数据列表
      oneRow:Object,//一行数据
      cirName:String//每一行数据标题在数据列表中对应的变量名
    },
    methods: {
      letterClick(item){
        this.clickItem=item;
      },

      touchend() {
        this.isActive = false;
      },

      touchstart(item) {
        this.clickItem=item;
        let x=this.getPosition()[0];
        let y=this.getPosition()[1];
        //根据长按的位置动态修改字母活动框的位置
        this.clickX = x - 200;
        this.clickY = y - 200 + this.$refs.scrollview.scrollTop;
        this.item = item;
        this.isActive = true;
        this.activeStyle.left = this.clickX + 'px';
        this.activeStyle.top = this.clickY + 'px';
      },

      goBack() {
        if (this.isHome) {
          let u = navigator.userAgent;
          let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
          let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

          if (isAndroid) {
            window.yingxin.FinishFragment("finish");
          } else if (isIOS) {
            // window.webkit.
            window.webkit.messageHandlers.ExitWelcomeServiceDetail.postMessage(
                "finish"
            );
          }
        } else {
          this.$router.go(-1);
        }
      },

      goSearch() {
        this.$router.push("/search/other/0");
      },

      go_next(item){
        this.emit("go_next",item)
      },
      getPosition() {
        var events = event || window.event;
        let event = events.touches[0]
        let posX = event.clientX;
        let posY = event.clientY;
        return [posX, posY];
      },
    },
    created() {
    }
  };
</script>

<style scoped>
  #home {
    height: 100vh;
    background-color: #f8f8f8;
    overflow: hidden;
  }
  #title_bar {
    border: #f8f8f8 1px solid;
    box-sizing: border-box;
    width: 375px;
    height: 61px;
  }
  #title_body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 325px;
    height: 25px;
    margin: 0 auto;
    margin-top: 19px;
  }
  #title_front {
    display: flex;
    align-items: center;
  }
  #title_front .back_icon {
    width: 10px;
    height: 19px;
  }
  #title_front #title_label {
    margin-left: 26px;
    font-size: 18px;
  }
  #title_search .search_icon {
    width: 18px;
    height: 18px;
  }
  #main_body {
    padding-top: 10px;
    height: calc(100vh - 61px);
    width: 375px;
    border-radius: 0 40px 0 0;
    background-color: #fff;
    overflow: auto;
    display: flex;
  }
  .item-list {
    width: 350px;
  }
  .letter-list {
    width: 18px;
    position: fixed;
    right: 11px;
    /*margin-left: 350px;*/
  }
  .letter-list-list {
    width: 10px;
    height: 516px;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 26px;
    font-size: 14px;
  }
  .letter-list-list a,
  .letter-list-list span {
    flex: 1;
    font-size: 14px;
    height: 19px;
    line-height: 19px;
    text-align: center;
    margin: 0 auto;
    color: #cdcdcd;
    font-family: SF Pro Text, sans-serif;
  }
  .letter-list-list .letter-active {
    color: #3b9eff;
  }
  .letter-list-list img {
    width: 10px;
    height: 10px;
  }
  .letter-list-list .long-active {
    position: absolute;
    z-index: 999;
    width: 56px;
    height: 56px;
    background-color: #3b9eff;
    font-size: 35px;
    font-family: Roboto, sans-serif;
    font-weight: normal;
    font-stretch: normal;
    color: #ffffff;
    line-height: 56px;
    text-align: center;
    border-radius: 50%;
  }
  .long-active {
    position: absolute;
    z-index: 100;
    width: 56px;
    height: 56px;
    background-color: #3b9eff;
    font-size: 35px;
    font-family: Roboto, sans-serif;
    font-weight: normal;
    font-stretch: normal;
    color: #ffffff;
    line-height: 56px;
    text-align: center;
    border-radius: 50%;
  }
</style>
