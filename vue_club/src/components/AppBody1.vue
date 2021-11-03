<template>
  <div id="AppBody1">
    <div class="row">
      <div class="leftcolumn">
        <div v-for="v in lists" :key="v.id">
          <div class="card">
            <h2>{{ v.NewsHeader }}</h2>
            <h5>Time: {{ changeTimestyle(v.NewsDate) }}</h5>
            <p>{{ "\u3000" + v.News }}</p>
            <p>{{ v.NewsByline }}</p>
          </div>
        </div>
      </div>
      <AppBodyRight
        :MemberID="MemberID"
        @childClose="childClose"
      ></AppBodyRight>
    </div>
  </div>
</template>

<script>
import AppBodyRight from "./AppBodyRight.vue";

export default {
  name: "AppBody1",
  props: ["MemberID"],
  data() {
    return {
      lists: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.axios
        .get(`http://47.241.238.158:20022/list/body`)
        .then((res) => {
          this.lists = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    childClose(data) {
      this.$emit("childClose", data);
    },
    changeTimestyle(oldtime) {
      var datejson = new Date(oldtime).toJSON();
      var date = new Date(+new Date(datejson) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return date;
    },
    cutDesc(index, num) {
      //console.log 44(index, num);
      return index.substring(0, num);
    },
  },
  components: {
    AppBodyRight,
  },
};
</script>

<style>
</style>