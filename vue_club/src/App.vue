<template>
  <div>
    <div v-show="viewflag">
      <AppHead
        @childClose="childClose"
        @childUser="childUser"
        :MemberID="MemberID"
      ></AppHead>
      <AppBody1
        @childClose="childClose"
        v-show="flag === 1 ? true : false"
        :MemberID="MemberID"
      ></AppBody1>
      <AppBody2
        @childClose="childClose"
        v-show="flag === 2 ? true : false"
        :MemberID="MemberID"
      ></AppBody2>
      <AppBody3
        @childClose="childClose"
        v-show="flag === 3 ? true : false"
        :MemberID="MemberID"
      ></AppBody3>
      <AppBody4
        @childClose="childClose"
        v-show="flag === 4 ? true : false"
        :MemberID="MemberID"
      ></AppBody4>
      <AppBody5
        @childClose="childClose"
        v-show="flag === 5 ? true : false"
        :MemberID="MemberID"
      ></AppBody5>
      <AppBody6
        @childClose="childClose"
        v-show="flag === 6 ? true : false"
        :MemberID="MemberID"
      ></AppBody6>
      <AppBody7
        @childClose="childClose"
        v-show="flag === 7 ? true : false"
        :MemberID="MemberID"
      ></AppBody7>
      <AppBody8
        @childClose="childClose"
        v-show="flag === 8 ? true : false"
        :MemberID="MemberID"
      ></AppBody8>
    </div>
    <div v-show="!viewflag">
      <a href="./login.html">Please login first !</a>
    </div>
  </div>
</template>

<script>
import AppHead from "./components/AppHead.vue";
import AppBody1 from "./components/AppBody1.vue";
import AppBody2 from "./components/AppBody2.vue";
import AppBody3 from "./components/AppBody3.vue";
import AppBody4 from "./components/AppBody4.vue";
import AppBody5 from "./components/AppBody5.vue";
import AppBody6 from "./components/AppBody6.vue";
import AppBody7 from "./components/AppBody7.vue";
import AppBody8 from "./components/AppBody8.vue";

export default {
  name: "App",
  data() {
    return {
      MemberID: 0,
      flag: 1,
      viewflag: 0,
    };
  },
  mounted() {
    this.MemberID = this.getQueryVariable("id");
    if (!this.MemberID) {
      this.viewflag = 0;
    } else {
      this.viewflag = 1;
    }
  },
  components: {
    AppHead,
    AppBody1,
    AppBody2,
    AppBody3,
    AppBody4,
    AppBody5,
    AppBody6,
    AppBody7,
    AppBody8,
  },
  methods: {
    childClose(data) {
      if (data == "News") {
        this.flag = 1;
      } else if (data == "Games") {
        this.flag = 2;
      } else if (data == "information") {
        this.flag = 3;
      } else if (data == "items") {
        this.flag = 4;
      } else if (data == "club") {
        this.flag = 5;
      } else if (data == "team") {
        this.flag = 6;
      } else if (data == "member") {
        this.flag = 7;
      } else if (data == "fixtures") {
        this.flag = 8;
      }
    },
    childUser(data) {
      this.MemberID = data;
    },
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
  },
  watch: {
    MemberID: function () {
      this.flag = 1;
    },
  },
};
</script>

<style>
</style>
