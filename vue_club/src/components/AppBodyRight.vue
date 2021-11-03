<template>
  <div id="AppBody2">
    <div class="row">
      <div class="rightcolumn">
        <div class="card">
          <h2>Welcome</h2>
          <hr style="border:3 double #987cb9" color=#987cb9 SIZE=3>
          <ul>
            <li><a href="#" style="color:#000" @click="childClose('information')">Personal information</a></li>
            <!-- 修改个人信息 -->
            <li><a href="#" v-show="flag" style="color:#000" @click="childClose('items')">Add news items</a></li>
            <li><a href="#" v-show="flag" style="color:#000" @click="childClose('club')">Club details</a></li>
            <li><a href="#" v-show="flag" style="color:#000" @click="childClose('team')">Team details</a></li>
            <li><a href="#" v-show="flag" style="color:#000" @click="childClose('member')">Member details</a></li>
            <!-- 团队要在俱乐部里 -->
            <li><a href="#" v-show="flag" style="color:#000" @click="childClose('fixtures')">Fixtures details</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppBody2",
  props: ["MemberID"],
  data() {
    return {
      lists: [],
      flag: false,
      list: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.axios
        .post(`http://47.241.238.158:20022/list/members`, { ID: this.MemberID })
        .then((res) => {
          this.lists = res.data;
          this.list = this.lists[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    childClose(data) {
      this.$emit("childClose", data);
    },
  },
  watch: {
    MemberID: function () {
      this.getList();
      this.list = this.lists[0];
      if (this.MemberID == 5643) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
  },
};
</script>

<style>
</style>