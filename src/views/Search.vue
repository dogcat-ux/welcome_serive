<template>
  <div id="search">
    <div id="title_bar">
      <div id="title_body">
        <img
                class="back_icon"
                src="../assets/image/back.png"
                @click="go_back"
        />

        <div id="key">
          <input
                  ref="key_input"
                  class="key_input"
                  required="required"
                  placeholder="请输入关键词搜索"
                  v-model="key"
                  @keyup="search"
          />
          <a href="javascript:;" class="clear_input">
            <img
                    src="../assets/image/clear.png"
                    class="clear_icon"
                    @click="clear_text"
            />
          </a>
        </div>
      </div>
    </div>
    <template v-if="!isSearch">
      <div id="before_search">
        <div id="history_label">历史搜索</div>
        <div id="history_tag">
          <span
                  class="tag"
                  v-for="(tag, index) in tags"
                  :key="index"
                  @click="go_tag(tag.name)"
          >
            {{ tag.name }}
          </span>
        </div>
      </div>
    </template>
    <template v-else-if="isOrgSearch">
      <div v-if="items.length===0" class="empty-img">
        <img src="../assets/image/empty.png" alt="">
      </div>
      <div id="org_search_result" v-else>
        <div class="department_list"
             v-for="(item, index) in items"
             :key="index"
             @click="go_next(item)"
        >
          <div class="org_box">
            <div class="item_name">
              {{item.orgName}}
            </div>
            <div class="org_introduction" v-html="parse_file(item)">
            </div>
          </div>
          <div class="org_box_img" v-if="item.logo">
            <img :src="item.logo" alt="#" class="img">
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div id="search_result" v-if="itemName!=='departmentName'">
        <div v-if="items.length===0" class="empty-img">
          <img src="../assets/image/empty.png" alt="">
        </div>
        <ItemList :item="{itemTitle:item[itemName]}"
                  v-for="(item, index) in items"
                  :key="index"
                  :id="item.firstLetter"
                  @click.native="go_next(item)"></ItemList>
      </div>
    </template>
  </div>
</template>

<script>
  import {makePy} from "../tool/getSpell";
  import parseFile from "../tool/parseFile";
  import ItemList from "../components/ItemList";

  export default {
    name: "Search",
    components: {ItemList},
    data() {
      return {
        id: this.$route.params.id,
        path: this.$route.params.from,
        key: "",
        tags: [],
        items: [],
        introduction: '',
        isSearch: false,
        isOrgSearch: false,
      };
    },

    computed:{
      dataArr(){
        return this.$store.state.dataArr||this.$route.query.dataArr;
      },
      itemName(){
        return this.$store.state.itemName||this.$route.query.itemName;
      }
    },
    created() {
      this.tags = JSON.parse(localStorage.getItem("result"));
    },

    methods: {
      parse_file(introductionDoc) {
        parseFile(introductionDoc, (value) => {
          this.introduction = introductionDoc ? value?.value : "";
        }).then();
        return this.introduction;
      },

      go_back() {
        this.$router.go(-1);
      },

      clear_text() {
        if (this.key !== "") {
          let item = {
            name: this.key,
          };

          if (this.tags == null) {
            this.tags = [];
            this.tags.push(item);
          } else {
            this.tags.splice(0, 0, item);
          }

          if (this.tags.length >= 7) {
            this.tags.pop();
          }
        }

        this.key = "";
        this.$refs.key_input.focus();
        this.isSearch = false;
      },

      search(event) {
        if (event.keyCode === 13) {
          this.go_tag(this.key);
        }
      },

      go_tag(name) {
        this.key = name;
        this.items = [];
        this.isSearch = true;
        if (this.path === "next") {
          this.isOrgSearch = true;
        }
        let result = [];
        if (localStorage.getItem("result")) {
          result = JSON.parse(localStorage.getItem("result"));
        }

        if (result != null && result.length >= 7) {
          result.pop();
        }

        let item = {
          name: this.key,
        };
        result.splice(0, 0, item);
        localStorage.setItem("result", JSON.stringify(result));
        if(this.dataArr.length>0){
          this.items = this.dataArr.filter(data => (!name || data[this.itemName].toLowerCase().includes(name.toLowerCase())) || makePy(data[this.itemName]).toLowerCase().includes(name.toLowerCase()))
        }
      },

      go_next(item) {
        console.log("item",item)
        console.log("this.path", this.path)
        let id = this.path === "main" ? item.collegeId : this.path === "second" ? item.parentId : item.orgId;
        let name =
            this.path === "main"
                ? item[this.$Global.COLLEGEABBR]
                : this.path === "second"
                ? item[this.$Global.PARENTNAME]
                : item[this.$Global.ORGNAME];
        if (this.path === "main") {
          this.$router.push({path: `/second/${id}/${name}`});
        } else if (this.path === "second") {
          //这边-1为学院id，这边不方便获取且无使用到就填了-1
          this.$router.push(`/next/-1/${id}/${name}`);
        } else {
          this.$router.push({path: `/details/${id}/${name}`});
        }
      },
    },
  };
</script>

<style scoped>
  #search {
    height: 100vh;
    background-color: #f8f8f8;
    overflow: hidden;
  }
  #title_bar {
    border: #f8f8f8 1px solid;
    box-sizing: border-box;
    width: 375px;
    height: 63px;
  }
  #title_body {
    display: flex;
    align-items: center;
    width: 318px;
    height: 35px;
    margin: 14px 33px 0 24px;
  }
  .back_icon {
    width: 10px;
    height: 19px;
  }
  #key {
    display: flex;
    width: 284px;
    height: 35px;
    margin-left: 24px;
    border-radius: 18px;
    background-color: #fff;
  }
  .key_input {
    margin-left: 25px;
    width: 218px;
    height: 35px;
    border: none;
    font-size: 14px;
  }
  .clear_icon {
    margin-top: 10px;
    width: 16px;
    height: 16px;
  }
  .clear_input {
    display: none;
  }
  .key_input:valid + .clear_input {
    display: block;
  }
  .key_input:focus {
    border: none;
    outline: none;
  }
  .key_input::-webkit-input-placeholder {
    color: #9e9e9e;
  }
  #before_search {
    width: 375px;
    min-height: calc(100vh - 63px);
  }
  .empty-img {
    width: 375px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .empty-img img {
    width: 264px;
    height: 322px;
    margin: 0 auto;
  }
  #history_label {
    margin-left: 25px;
    font-size: 14px;
    color: #9e9e9e;
  }
  #history_tag {
    display: flex;
    flex-wrap: wrap;
    margin: 10.5px 33px 0 21px;
    width: 313px;
  }
  .tag {
    font-size: 14px;
    color: #9e9e9e;
    margin: 13.5px 4px;
    padding: 8px 15px;
    max-width: 100px;
    border-radius: 18px;
    background-color: #f2f2f2;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  #search_result {
    padding-top: 9px;
    height: calc(100vh - 63px);
    background-color: #fff;
    border-radius: 0 40px 0 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #org_search_result {
    padding-top: 9px;
    height: calc(100vh - 63px);
    background-color: #f8f8f8;
    border-radius: 0 40px 0 0;
    overflow: auto;
  }
  #org_search_result .department_list {
    width: 343px;
    height: 106px;
    margin: 0 auto;
    border-radius: 10px;
    padding: 7px 16px;
    background-color: #ffffff;
    box-shadow: 3px 4px 12px 0 rgba(79, 79, 79, 0.16);
    display: flex;
    flex-direction: row;
  }
  #org_search_result .department_list .org_box {
    width: 228px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  #org_search_result .department_list .org_box .item_name {
    height: 22px;
    /*font-family: PingFang SC;*/
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 0;
    color: #1089ff;
    margin-bottom: 2px;
  }
  #org_search_result .department_list .org_box .org_introduction {
    width: 228px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #737373;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
  #org_search_result .department_list .org_box_img {
    padding: 16px 0 19px 22px;
    width: 61px;
    height: 61px;
    display: flex;
  }
  #org_search_result .department_list .org_box_img .img {
    width: 61px;
    height: 61px;
  }
  /*# sourceMappingURL=01.css.map */
</style>
