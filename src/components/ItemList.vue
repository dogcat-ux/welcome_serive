<template>
  <div class="item_list-content">
    <div class="item_name">
      <img class="item_icon" :src="item.imgUrl" v-show="item.imgUrl"/>
      {{item.itemTitle}}
    </div>
    <img class="next_icon" src="../assets/image/next.png"/>
  </div>
</template>

<script>
  export default {
    name: "ItemList",
    props: {
      item: {
        type: Object,
        default() {
          return {
            imgUrl: null,
            itemTitle: "加了血赚的组织",
          }
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .item_list-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    width: 300px;
    height: 56px;
    padding: 17px 0;

    .item_name {
      display: flex;
      align-items: center;
      font-size: 16px;
      .item_icon {
        width: 19px;
        height: 19px;
        margin-right: 23px;
      }
    }

    .next_icon {
      width: 10px;
      height: 16px;
    }
  }
</style>
