<template>
  <div id="details">
    <div id="title_bar">
      <div id="title_body">
        <img
                class="back_icon"
                src="../assets/image/back.png"
                @click="go_back"
                alt="#"/>

        <img
                class="share_icon"
                src="../assets/image/share.png"
                @click="go_share()"
                alt="#"/>
      </div>

      <div id="logo" :class="{ no_logo: !logo }">
        <img class="logo_image" :src="logo" alt="#"/>
      </div>

      <div id="title_detail">
        <div id="title_name">{{ name }}</div>
        <div id="title_level">{{ level }}</div>
      </div>
    </div>
    <div id="main_body">
      <div v-if="isLoading">
        <Loading/>
      </div>
      <div v-else-if="(!group_num)&&(!link)&&(!video_link)&&(!star_level)&&(!introduction)"
           class="empty-img-common-middle">
        <img src="../assets/image/empty.png" alt="">
      </div>
      <div v-else>
        <div class="group" :class="{ no_group: !group_num }">
          <img class="group_icon" src="../assets/image/group_num.png" alt="#"/>
          <span id="group_label">纳新群号：</span>
          <span id="group_num" @click="go_num(group_num)">{{ group_num }}</span>
        </div>

        <div class="link" :class="{ no_link: !link }">
          <img class="link_icon" src="../assets/image/link.png" alt="#"/>
          <span id="link_label">报名链接：</span>
          <span id="link_num" @click="go_link(link)">{{ link }}</span>
        </div>

        <div class="video_link" :class="{ no_video_link: !video_link }">
          <img class="link_icon" src="../assets/image/video.png" alt="#"/>
          <span id="video_link_label">视频链接：</span>
          <span id="video_link_num" @click="go_link(video_link)">{{ video_link }}</span>
        </div>

        <div class="star" :class="{ no_star: !star_level}">
          <img class="star_icon" src="../assets/image/star_level.png" alt="#"/>
          <span id="star_label">组织星级：</span>
          <span v-for="i in star_level" :key="i">
          <img class="star_level_icon" src="../assets/image/star.png" alt="#"/>
        </span>
        </div>

        <div class="member" :class="{ no_member: !has_member }">
          <img class="member_icon" src="../assets/image/member.png"/>
          <span id="member_label">主要成员：</span>
          <span id="member_num" @click="go_member()">点击查看</span>
        </div>

        <div class="introduct" v-if="introduction">
          <div id="introduct_front">
            <img class="introduct_icon" src="../assets/image/introduct.png"/>
            <span id="introduct_label">部门介绍：</span>
          </div>

          <div id="introduct_end">
            <div v-html="introduction"></div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Loading from "../components/Loading";
  import {getOrgDetail} from "../api/department";
  import parseFile from "../tool/parseFile";
  import {welcomeShare} from "../api/buriedPoint";
  import isUrl from "../tool/isUrl";

  export default {
    name: "Details",
    components: {Loading},
    data() {
      return {
        id: 0,
        accountId: 0,
        level: "",
        star_level: 0,
        group_num: "",
        link: "",
        logo: "",
        name: "",
        introduction: "",
        has_member: false,
        video_link: "",
      };
    },
    computed: {
      isLoading() {
        return this.$store.state.loading;
      }
    },
    created() {
      this.new();
    },

    methods: {
      async new() {
        let account = this.$route.params.id;
        const re = await getOrgDetail(account);
        let {orgName, videoLink, mark, orgId, starLevel, recruitingGroup, applyLink, logo, introductionDoc} = re.data.data;
        this.name = orgName;
        this.level = mark;
        this.id = orgId;
        this.star_level = starLevel;
        this.group_num = recruitingGroup;
        this.link = applyLink;
        this.logo = logo;
        this.has_member = true;
        this.video_link = videoLink;
        await parseFile(introductionDoc, (value) => {
          this.introduction = introductionDoc ? value?.value : "";
          console.log("valuevaluevalue",value?.value)
        });
      },

      go_back() {
        this.$router.go(-1);
      },

      // 点击分享(跟移动端交互)
      go_share() {
        welcomeShare();
        let path = this.$route.path;
        let u = navigator.userAgent;
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if (isAndroid) {
          window.yingxin.ShareDetail(path);
        } else if (isIOS) {
          window.webkit.messageHandlers.ShareWelcomeServiceDetail.postMessage(
              path
          );
        }
      },

      // 点击群号（跟移动端交互）
      go_num(group_num) {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          window.yingxin.goGroup(group_num);
        } else if (isIOS) {
          window.webkit.messageHandlers.goGroup.postMessage(group_num);
        }
      },

      go_link(link) {
        if (isUrl(link)) {
          window.location.href = link;
        }
      },

      go_member() {
        this.$router.push({path: `/members/${this.id}/${this.name}`});
      },
    },
  };
</script>

<style scoped>
  #details {
    background-color: #f8f8f8;
  }

  #title_bar {
    border: #f8f8f8 1px solid;
    box-sizing: border-box;
    width: 375px;
  }

  #title_body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 324px;
    height: 20px;
    margin-left: 25px;
    margin-top: 26px;
  }

  .back_icon {
    width: 10px;
    height: 19px;
  }

  .share_icon {
    width: 18px;
    height: 18px;
  }

  #logo {
    margin: 11px 155px 0 156px;
  }

  .logo_image {
    width: 64px;
    height: 64px;
  }

  #title_detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  #title_name {
    margin-top: 12px;
    font-size: 16px;
  }

  #title_level {
    margin: 12px 0 20px 0;
    color: #1089ff;
    font-size: 12px;
  }

  #main_body {
    border: 1px #fff solid;
    box-sizing: border-box;
    background-color: #fff;
    width: 375px;
    /* min-height: 570px; */
    border-radius: 40px 40px 0 0;
  }

  .group,
  .link,
  .video_link,
  .star,
  .member {
    display: flex;
    align-items: center;
    margin-left: 29px;
    padding: 16px 0;
    border-bottom: 1px #f8f8f8 solid;
  }

  .introduct {
    margin-left: 29px;
    padding: 16px 0;
  }

  .group_icon,
  .link_icon,
  .star_icon,
  .member_icon,
  .introduct_icon {
    width: 20px;
    height: 20px;
  }

  #group_label,
  #link_label,
  #star_label,
  #member_label,
  #video_link_label,
  #introduct_label {
    margin-left: 23px;
    margin-right: 22px;
    font-size: 16px;
  }

  #group_num,
  #link_num,
  #video_link_num,
  #member_num {
    width: 168px;
    font-size: 16px;
    color: #1089ff;
    text-decoration: underline;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal;
    word-break: keep-all;
    word-wrap: break-word;
  }

  .star_level_icon {
    margin-right: 15px;
    width: 15px;
    height: 15px;
  }

  #introduct_front {
    display: flex;
    align-items: center;
  }

  #introduct_end {
    width: 315px;
    margin-top: 16px;
    word-break: break-all;
    word-wrap: break-word;
    line-height: 20px;
    font-size: 14px;
    color: #9a9a9a;
  }

  .no_logo,
  .no_group,
  .no_link,
  .no_video_link,
  .no_star,
  .no_member {
    display: none;
  }

  #video_link {
    margin-top: 16px;
  }

  #introduct_end >>> img {
    width: 100%;
  }

  .video_player {
    width: 325px;
  }
</style>
