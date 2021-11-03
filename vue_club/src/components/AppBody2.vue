<template>
  <div id="AppBody2">
    <div class="row">
      <div class="leftcolumn">
        <div v-for="v in lists" :key="v.id">
          <div class="card">
            <p style="">My Team : {{list.TeamName}}</p>
            <h6>Time: {{ changeTimestyle(v.FixtureDate) }}</h6>
            <p style="text-align: center">{{v.HomeTeamName+'\u3000'}}VS{{'\u3000'+v.AwayTeamName}}</p>
            <p style="text-align: center">{{v.HomeScore+'\u3000'}}VS{{'\u3000'+v.AwayScore}}</p>
            
          </div>
        </div>
      </div>
      <AppBodyRight :MemberID="MemberID" @childClose="childClose"></AppBodyRight>
    </div>
  </div>
</template>

<script>
import AppBodyRight from "./AppBodyRight.vue";

export default {
  name: "AppBody2",
  props: ["MemberID"],
  data() {
    return {
      lists: [],
      list: [],
    };
  },
  components:{
    AppBodyRight,
  },
  mounted() {
    this.getLists();
    this.getList();
  },
  methods: {
    getLists() {
      this.axios
        .get(`http://47.241.238.158:20022/list/fixtures`)
        .then((res) => {
          this.lists = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getList() {
      this.axios
        .post(`http://47.241.238.158:20022/list/members`, { ID: this.MemberID })
        .then((res) => {
          this.list = res.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeTimestyle(oldtime) {
      var datejson = new Date(oldtime).toJSON();
      var date = new Date(+new Date(datejson) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return date;
    },
    childClose(data) {
      this.$emit("childClose", data);
    },
  },
  watch: {
    MemberID: function () {
      this.getList();
    },
  },
};
</script>

<style>
</style>