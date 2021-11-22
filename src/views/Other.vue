<template>
  <CommonFrame :title="'加了血赚的组织'"
               :is-search="true"
               :data-arr="items"
               :item-name="fullName"
               is-letter-list>
    <div slot="item-list">
      <ItemList :item="{itemTitle:item[fullName]}"
                v-for="(item, index) in items"
                :key="index"
                :id="item.firstLetter"
                @click.native="go_next(item[orgName],item[fullName])">
      </ItemList>
    </div>
  </CommonFrame>
</template>

<script>
  import CommonFrame from "../components/CommonFrame";
  import ItemList from "../components/ItemList";
  import {getExcellent} from "../api/excellent";
  import {get_first_letter} from "../tool/getFirstLetter";
  // import {get_first_letter} from "../tool/getFirstLetter";

  export default {
    name: "Other",
    components: {
      CommonFrame, ItemList
    },
    data() {
      return {
        items: [],
        orgName:this.$Global.ORGNAME,
        fullName:this.$Global.FULLNAME,
      };
    },

    created() {
      getExcellent().then(res => {
        console.log("getExcellent", res)
        res.data.data.forEach(value => {
          value.firstLetter = get_first_letter(value.fullName[0])
        })
        this.items = res.data.data;
      })
    },

    methods: {

      go_search() {
        this.$router.push("/search/other/0");
      },

      go_next(id, name) {
        this.$router.push({path: `/details/${id}/${name}`});
      },
    },
  };
</script>

<!--<style scoped>-->
<!--#other {-->
<!--  height: 100vh;-->
<!--  overflow: hidden;-->
<!--}-->

<!--#title_bar {-->
<!--  border: #fff 1px solid;-->
<!--  box-sizing: border-box;-->
<!--  width: 375px;-->
<!--  height: 61px;-->
<!--}-->

<!--#title_body {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: space-between;-->
<!--  width: 325px;-->
<!--  height: 25px;-->
<!--  margin: 0 auto;-->
<!--  margin-top: 19px;-->
<!--}-->

<!--#title_front {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.back_icon {-->
<!--  width: 10px;-->
<!--  height: 19px;-->
<!--}-->

<!--#title_label {-->
<!--  margin-left: 26px;-->
<!--  font-size: 18px;-->
<!--}-->

<!--.search_icon {-->
<!--  width: 18px;-->
<!--  height: 18px;-->
<!--}-->

<!--#main_body {-->
<!--  padding-top: 9px;-->
<!--  height: calc(100vh - 61px);-->
<!--  width: 375px;-->
<!--  border-radius: 0px 40px 0px 0px;-->
<!--  background-color: #fff;-->
<!--  overflow: auto;-->
<!--}-->

<!--.item_list {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: space-between;-->
<!--  height: 22px;-->
<!--  width: 300px;-->
<!--  padding: 17px 43px 17px 32px;-->
<!--}-->

<!--.isTop {-->
<!--  background-color: rgba(244, 244, 244, 0.25);-->
<!--}-->

<!--.item_name {-->
<!--  font-size: 16px;-->
<!--}-->

<!--.next_icon {-->
<!--  width: 10px;-->
<!--  height: 16px;-->
<!--}-->
<!--</style>-->
