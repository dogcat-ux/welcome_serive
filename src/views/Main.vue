<template>
  <CommonFrame
          :title="title"
          :is-search="true"
          :data-arr="items"
          :item-name="title === '部门与社团' ? collegeAbbr : orgName"
          :is-letter-list="title === '部门与社团'">
    <div slot="item-list">
      <div v-if="items.length===0" class="empty-img-common">
        <img src="../assets/image/empty.png" alt="">
      </div>
      <ItemList :item="{itemTitle:title === '部门与社团' ? item[collegeAbbr] : item[orgName]}"
                v-else
                v-for="(item, index) in items"
                :key="index"
                :id="title === '部门与社团'?item.firstLetter:''"
                @click.native="go_next(item)"></ItemList>
    </div>
  </CommonFrame>
</template>

<script>
  import CommonFrame from "../components/CommonFrame";
  import ItemList from "../components/ItemList";
  import {getCollegeAbbr, getDepartment} from "../api/department.js"
  import {get_first_letter} from "../tool/getFirstLetter";

  export default {
    name: "Main",
    components: {CommonFrame, ItemList},
    data() {
      return {
        collegeAbbr: this.$Global.COLLEGEABBR,
        orgName: this.$Global.ORGNAME,
        college_id: this.$route.params.collegeId,
        parent_id: this.$route.params.id,
        title: this.$route.params.name === undefined ? "部门与社团" : this.$route.params.name,
        items: [],
        listData: {},
        lettersExist: [],
      };
    },
    created() {
      if (this.$route.params.name === undefined) {
        getCollegeAbbr().then(res => {
          res.data.data.forEach(value => {
            value.firstLetter = get_first_letter(value.collegeAbbr[0])
          })
          this.items = res.data.data;
        })
      } else {
        getDepartment(this.parent_id).then(res => {
          this.items = res.data.data;
        })
      }
    },

    methods: {
      go_search() {
        if (this.$route.params.name === undefined) {
          this.$router.push({path: "/search/main/0"});
        } else {
          this.$router.push({path: `/search/next/${this.parent_id}`});
        }
      },

      go_next(item) {
        let id = item.collegeId;
        let name = item[this.collegeAbbr];
        if (this.$route.params.name === undefined) {
          this.$router.push({path: `/second/${id}/${name}`});
        } else {
          id = item.orgId;
          name = item[this.orgName];
          this.$router.push({path: `/details/${id}/${name}`});
        }
      },
    },
  };
</script>
