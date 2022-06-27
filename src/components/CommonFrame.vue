<template>
  <div id="home">
    <div id="title_bar">
      <div id="title_body">
        <div id="title_front">
          <img
                  class="back_icon"
                  src="../assets/image/back.png"
                  @click="goBack"
          />
          <div id="title_label">{{title}}</div>
        </div>
        <div class="connect-us" v-if="isHome" @click="touchus">联系我们</div>
        <div id="title_search" v-if="isSearch">
          <img
                  class="search_icon"
                  src="../assets/image/search.png"
                  @click="goSearch"
          />
        </div>
      </div>
    </div>
    <div id="main_body">
      <!--    <div id="main_body">-->
      <template v-if="isTag"
      >
        <div id="title_tag">
          <div id="box1" :class="{ box_show: !isDepartment }">
            <div id="box2"></div>
          </div>
          <div
                  id="department"
                  class="tags"
                  :class="{ tag: isDepartment, tag_p1: !isDepartment }"
                  @click="go_department"
          >
            部门
          </div>
          <div id="box3" :class="{ box_none: !isDepartment }">
            <div id="box4"></div>
          </div>
          <div id="box5" :class="{ box_none: isDepartment }">
            <div id="box6"></div>
          </div>
          <div
                  class="tags"
                  :class="{ tag: !isDepartment, tag_p2: isDepartment }"
                  @click="go_league"
          >
            社团
          </div>
          <div id="box7" :class="{ box_show: isDepartment }">
            <div id="box8"></div>
          </div>
        </div>
      </template>
      <div :class="isTag?'main_content':'main_content2'">
        <div v-if="isLoading">
          <Loading></Loading>
        </div>
        <div class="item-list" v-else>
          <slot name="item-list"></slot>
          <div class="long-active"
               v-show="isActive"
               :style="activeStyle">{{item}}
          </div>
        </div>
        <div class="letter-list-box"
             ref="scrollview"
        >
          <LetterList @touchstart1="touchstart"
                      @touchend1="touchend"
                      class="letter-list"
                      :lettersExist="lettersExist"
                      v-if="isLetterList"></LetterList>
        </div>
      </div>
    </div>
    <div class="mask" v-show="isMask">
      <div class="touch-box">
        <div class="touch-title">
          联系我们
        </div>
        <div class="touch-text">
          请加入福大助手社团与部门相关问题咨询群
        </div>
        <div class="touch-footer">
          <div class="footer-box">
            <div @click="goNum" class="addNum">加咨询群</div>
            <div @click="mackOk">确定</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // <!--  大体框架组件-->
  import LetterList from "./LetterList";
  import {classifyByLetter} from "../tool/classifyByLetter";
  import Loading from "./Loading";
  import {welcomeSearch} from "../api/buriedPoint";

  export default {
    name: "CommonFrame",
    data() {
      return {
        //点击效果的x，y坐标
        clickX: 0,
        clickY: 0,
        item: "",
        isActive: false,
        activeStyle: {
          left: this.clickX + 'px',
          top: this.clickY + 'px'
        },
        isMask:false,
        lettersExist: [],
        isDepartment: true,
      }
    },
    components: {
      LetterList, Loading
    },
    props: {
      title: String,
      isSearch: {
        type: Boolean,
        default() {
          return true;
        }
      },
      isTag: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isHome: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isLetterList: {
        type: Boolean,
        default() {
          return false;
        }
      },
      dataArr: Array,//全部数据
      itemName: String,//数据的关键字名称
      urlName: String,
    },
    computed: {
      isLoading() {
        return this.$store.state.loading;
      }
    },
    watch: {
      dataArr() {
        if (this.dataArr && this.itemName) {
          this.lettersExist = classifyByLetter(this.dataArr, this.itemName)[1];
        }
      },
    },
    methods: {
      go_department() {
        this.isDepartment = true;
        this.$emit("go_department")
      },
      touchend() {
        this.isActive = false;
      },
      go_league() {
        this.isDepartment = false;
        this.$emit("go_league")
      },
      touchstart(object) {
        //根据长按的位置动态修改字母活动框的位置
        this.clickX = object.x - 100;
        this.clickY = object.y - 25;
        this.isActive = true;
        this.item = object.item;
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
        welcomeSearch();
        let pageName = this.isDepartment ? this.$route.path.split('/')[1] : "league";
        this.$router.push({
          path: `/search/${pageName}/0`, query: {
            dataArr: this.dataArr,
            itemName: this.itemName
          }
        });
        this.$store.commit("SET_DataArr", this.dataArr);
        this.$store.commit("SET_ItemName", this.itemName);
        this.$store.commit("SET_SearchFrom", pageName);
      },

      touchus(){
        this.isMask=true;
      },
      goNum(){
        this.isMask=false;
        let u = navigator.userAgent;
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          window.yingxin.goGroup(628486154);
        } else if (isIOS) {
          window.webkit.messageHandlers.goGroup.postMessage(628486154);
        }
      },
      mackOk(){
        this.isMask=false;
      }
    },
  };
</script>
<style scoped>
  /*联系我们*/
  .mask{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(153, 153, 153, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
  }
  .touch-box{
    display: flex;
    width: 328px;
    height: 172px;
    background-color: #fff;
    flex-direction: column;
    padding: 21px 28px;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.16);
    border-radius: 5px;
  }
  .touch-title{
    width: 328px;
    font-size: 20px;
    margin: 15px 0;
  }
  .touch-text{
    width: 272px;
    font-family: Source Han Sans SC;
    font-size: 15px;
    height: 50px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 25px;
    letter-spacing: 0px;
    color: #3b3b3b;
  }
  .touch-footer{
    width: 272px;
    height: 41px;
    font-size: 15px;
    color: #3b9eff;
  }
  .footer-box{
    margin-left: 160px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 112px;
  }
  /*总*/
  #home {
    height: 100vh;
    background-color: #f8f8f8;
    overflow: hidden;
  }
  #home #title_bar {
    border: #f8f8f8 1px solid;
    box-sizing: border-box;
    width: 375px;
    height: 61px;
  }

  #home #title_bar #title_body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 325px;
    height: 25px;
    margin: 19px auto 0 auto;
  }

  #home #title_bar #title_body #title_front {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  #home #title_bar #title_body #title_front .back_icon {
    width: 10px;
    height: 19px;
  }

  #home #title_bar #title_body #title_front #title_label {
    margin-left: 26px;
    font-size: 18px;
  }

  #home #title_bar #title_body .connect-us {
    color: #999999;
    font-size: 14px;
  }

  #home #title_bar #title_body #title_search .search_icon {
    width: 18px;
    height: 18px;
  }

  #home #main_body {
    width: 375px;
  }

  #home #main_body #title_tag {
    display: flex;
    height: 35px;
    width: 375px;
    background-color: #f8f8f8;
  }

  #home #main_body #title_tag .tags {
    font-size: 15px;
    color: #1089ff;
    height: 35px;
    padding: 7px 0;
  }

  #home #main_body #title_tag .tag {
    padding-left: 22px;
    padding-right: 22px;
    background-color: #fff;
    border-radius: 15px 15px 0 0;
  }

  #home #main_body #title_tag .tag_p1 {
    padding-left: 22px;
    padding-right: 7px;
  }

  #home #main_body #title_tag .tag_p2 {
    padding-left: 7px;
    padding-right: 22px;
  }

  #home #main_body .main_content {
    padding-top: 9px;
    width: 375px;
    height: calc(100vh - 96px);
    overflow: auto;
    background-color: #fff;
    display: flex;
    flex-direction: row;
  }

  #home #main_body .main_content2 {
    background-color: #fff;
    padding-top: 10px;
    height: calc(100vh - 61px);
    border-radius: 0 40px 0 0;
    overflow: auto;
    display: flex;
    flex-direction: row;
  }

  #home #main_body .item-list {
    width: 332px;
    padding-left: 32px;
  }

  #home #main_body .letter-list-box {
    width: 43px;
  }

  #home #main_body .letter-list-box .letter-list {
    position: fixed;
    right: 11px;
    /*left: 50%;*/
    /*<!--transform: translateX(-50%);-->*/
    text-align: center;
  }

  .long-active {
    /*position: absolute;*/
    position: fixed;
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

  /*  动画加载*/
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
      box-shadow: 2em -2em 0 0 #3b9eff, /*右上*/ 3em 0 0 -0.5em #3b9eff, /*右*/ 2em 2em 0 -0.5em #3b9eff, /*右下*/ 0 3em 0 -0.5em #3b9eff, /*下*/ -2em 2em 0 -0.5em #3b9eff, /*左下*/ -3em 0 0 -0.5em #3b9eff, /*左*/ -2em -2em 0 0 #3b9eff;
      /*左上*/
    }
  }
  /*# sourceMappingURL=01.css.map */
</style>
