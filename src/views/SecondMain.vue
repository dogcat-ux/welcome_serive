<template>
  <CommonFrame :title="title"
               is-search
               isTag
               @go_league="go_league"
               @go_department="go_department"
               :data-arr="isDepartment?departments:leagues"
               :item-name="isDepartment?parentName:orgName"
  >
    <div slot="item-list" v-if="isDepartment">
      <ItemList v-for="(item, index) in departments"
                :item="{itemTitle:item[parentName]}"
                :key="index"
                :id="item.firstLetter"
                @click.native="go_next(item)"
      >
      </ItemList>
      <div v-if="departments.length===0" class="empty-img-common">
        <img src="../assets/image/empty.png" alt="">
      </div>
    </div>
    <div slot="item-list" v-else>
      <div v-if="leagues.length===0" class="empty-img-common">
        <img src="../assets/image/empty.png" alt="">
      </div>
      <ItemList v-else
                v-for="(item, index) in leagues"
                :item="{itemTitle:item[orgName]}"
                :key="index"
                :id="item.firstLetter"
                @click.native="go_next(item)"
      >
      </ItemList>
    </div>
  </CommonFrame>
</template>

<script>
  import CommonFrame from "../components/CommonFrame";
  import ItemList from "../components/ItemList";
  import {getAssociation} from "../api/department";
  import {getParent} from "../api/department.js"
  import {welcomeBMXQ} from "../api/buriedPoint";

  export default {
    name: "Second_main",
    components: {
      CommonFrame,
      ItemList
    },
    data() {
      return {
        college_id: this.$route.params.id,
        title: this.$route.params.name,
        isDepartment: true,
        departments: [],
        leagues: [],
        parentName: this.$Global.PARENTNAME,
        orgName: this.$Global.ORGNAME
      };
    },

    created() {
      // let league_url;
      // if (this.title == "校级") {
      //   league_url = `/app/account?mark=2&collegeId=${this.college_id}`;
      // } else {
      //   league_url = `/app/account?mark=0&collegeId=${this.college_id}`;
      // }
      //
      // 获取部门
      getParent(this.college_id).then(res => {
        this.departments = res?.data?.data;
      })

      // 获取社团
      getAssociation(this.college_id).then((re) => {
        console.log("org",re)
        this.leagues = re?.data?.data;
      });
    },

    methods: {
      go_department() {
        this.isDepartment = true;
      },
      go_league(){
        this.isDepartment = false;
      },
      go_back() {
        this.$router.go(-1);
      },

      go_search() {
        if (this.isDepartment) {
          this.$router.push(`/search/second/${this.college_id}`);
        } else {
          this.$router.push(`/search/league/${this.college_id}`);
        }

        let mark;
        if (this.title === "校级" && !this.isDepartment) {
          mark = 2;
        } else if (this.title !== "校级" && !this.isDepartment) {
          mark = 0;
        }

        localStorage.setItem("mark", mark);
      },

      go_next(item) {
        if (this.isDepartment) {
          let id = item.parentId;
          let collegeId = this.$route.params.id;
          let name = item.parentName;
          welcomeBMXQ(name);
          this.$router.push(`/next/${collegeId}/${id}/${name}`);
        } else {
          let id = item[this.$Global.ORGID];
          let name = item[this.$Global.ORGNAME];
          welcomeBMXQ(name);
          this.$router.push({path: `/details/${id}/${name}`});
        }
      },

    },
  };
</script>

<style scoped>
  #second_main {
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

  .back_icon {
    width: 10px;
    height: 19px;
  }

  #title_label {
    margin-left: 26px;
    font-size: 18px;
  }

  .search_icon {
    width: 18px;
    height: 18px;
  }

  #main_body {
    width: 375px;
    background-color: #fff;
  }

  #title_tag {
    display: flex;
    height: 35px;
    width: 375px;
    background-color: #f8f8f8;
  }

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

  #box1 {
    margin-left: 9px;
  }

  #box2,
  #box6 {
    border-radius: 0 0 15px 0;
    background-color: #f8f8f8;
    width: 15px;
    height: 15px;
  }

  #box1,
  #box3,
  #box5,
  #box7 {
    margin-top: 20px;
    width: 15px;
    height: 15px;
    background-color: #fff;
  }

  #box4,
  #box8 {
    border-radius: 0 0 0 15px;
    background-color: #f8f8f8;
    width: 15px;
    height: 15px;
  }

  .box_show {
    visibility: hidden;
  }

  .box_none {
    display: none;
  }


  #main_content {
    padding-top: 9px;
    width: 375px;
    height: calc(100vh - 96px);
    overflow: auto;
  }

  .item_list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 22px;
    width: 300px;
    margin-left: 32px;
    margin-right: 43px;
    padding: 17px 0;
  }

  .item_name {
    font-size: 16px;
  }

  .next_icon {
    width: 10px;
    height: 16px;
  }
</style>
