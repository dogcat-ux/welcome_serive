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
          <span id="title_label">{{title}}</span>
        </div>
        <div id="title_search" v-if="isSearch">
          <img
                  class="search_icon"
                  src="../assets/image/search.png"
                  @click="goSearch"
          />
        </div>
      </div>
    </div>
    <div id="main_body" ref="scrollview">
      <template v-if="isTag">
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
        <div class="item-list">
          <slot name="item-list"></slot>
          <div class="long-active"
               v-show="isActive"
               :style="activeStyle">{{item}}
          </div>
        </div>
        <div class="letter-list-box">
          <LetterList @touchstart1="touchstart"
                      @touchend1="touchend"
                      class="letter-list"
                      :lettersExist="lettersExist"
                      v-if="isLetterList"></LetterList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // <!--  大体框架组件-->
  import LetterList from "./LetterList";
  import {classifyByLetter} from "../tool/classifyByLetter";

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
        lettersExist: [],
        isDepartment: true,
      }
    },
    components: {
      LetterList
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
    watch: {
      dataArr() {
        if (this.dataArr && this.itemName) {
          this.lettersExist = classifyByLetter(this.dataArr, this.itemName)[1];
        }
      }
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
        this.clickX = object.x -100;
        this.clickY = object.y  -100 + this.$refs.scrollview.scrollTop;
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
          console.log(u)

          if (isAndroid) {
            window.yingxin.FinishFragment("finish");
            // console.log("android");
          } else if (isIOS) {
            // window.webkit.
            window.webkit.messageHandlers.ExitWelcomeServiceDetail.postMessage(
                "finish"
            );
            // console.log("ios");
          }
        } else {
          this.$router.go(-1);
        }
      },

      goSearch() {
        let pageName = this.$route.path.split('/')[1];
        this.$router.push({
          path: `/search/${pageName}/0`, query: {
            dataArr: this.dataArr,
            itemName: this.itemName
          }
        })
      },
    },
  };
</script>

<style lang="scss" scoped>
  #home {
    height: 100vh;
    background-color: #f8f8f8;
    overflow: hidden;

    #title_bar {
      border: #f8f8f8 1px solid;
      box-sizing: border-box;
      width: 375px;
      height: 61px;

      #title_body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 325px;
        height: 25px;
        margin: 0 auto;
        margin-top: 19px;

        #title_front {
          display: flex;
          align-items: center;

          .back_icon {
            width: 10px;
            height: 19px;
          }

          #title_label {
            margin-left: 26px;
            font-size: 18px;
          }
        }

        #title_search {
          .search_icon {
            width: 18px;
            height: 18px;
          }
        }
      }
    }

    #main_body {
      width: 375px;

      #title_tag {
        display: flex;
        height: 35px;
        width: 375px;
        background-color: #f8f8f8;

        .tags {
          font-size: 15px;
          color: #1089ff;
          height: 35px;
          padding: 7px 0;
        }

        .tag {
          padding-left: 22px;
          padding-right: 22px;
          background-color: #fff;
          border-radius: 15px 15px 0 0;
        }

        .tag_p1 {
          padding-left: 22px;
          padding-right: 7px;
        }

        .tag_p2 {
          padding-left: 7px;
          padding-right: 22px;
        }

      }

      .main_content {
        padding-top: 9px;
        width: 375px;
        height: calc(100vh - 96px);
        overflow: auto;
        background-color: #fff;
        display: flex;
        flex-direction: row;
      }

      .main_content2 {
        background-color: #fff;
        padding-top: 10px;
        height: calc(100vh - 61px);
        border-radius: 0 40px 0 0;
        overflow: auto;
        display: flex;
        flex-direction: row;
      }
      .item-list {
        width: 332px;
        padding-left: 32px;
      }
      .letter-list-box{
        width: 43px;
        .letter-list {
          position: fixed;
          right: 11px;
          /*left: 50%;*/
          /*<!--transform: translateX(-50%);-->*/
          text-align: center;
        }
      }
    }
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
