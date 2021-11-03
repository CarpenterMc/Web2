<template>
  <div id="AppHead">
    <ul class="row" style="background-color: #000; height: 60px">
      <li
        style="
          font-size: 25px;
          color: #fff;
          padding-top: 15px;
          padding-left: 10px;
        "
      >
        Community Rugby Club
      </li>
      <li style="padding-left: 300px">
        <a @click="childClose('News')">News</a>
      </li>
      <li><a @click="childClose('Games')">Games</a></li>
      <li class="dropdown" style="margin-left: 350px">
        <a href="javascript:void(0)">{{
          list.MemberFirstName + " " + list.MemberLastName
        }}</a>
        <!-- <div class="dropdown-content">
          <div v-for="v in lists" :key="v.id">
            <a href="#"  @click="childUser(v.ID)">{{
              v.MemberFirstName + " " + v.MemberLastName
            }}</a>
          </div>
        </div> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppHead",
  props: ["MemberID"],
  data() {
    return {
      lists: [],
      list: [],
    };
  },
  mounted() {
    this.getLists();
    this.getList();
  },
  methods: {
    getLists() {
      this.axios
        .get(`http://47.241.238.158:20022/list`)
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
    childClose(data) {
      this.$emit("childClose", data);
    },
    childUser(data) {
      this.$emit("childUser", data);
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
* {
  box-sizing: border-box;
}

body {
  font-family: Arial;
  padding: 0px;
  background: #f1f1f1;
}

.leftcolumn {
  float: left;
  width: 75%;
}

.rightcolumn {
  float: left;
  width: 25%;
  background-color: #f1f1f1;
  padding-left: 20px;
}

.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}

.row {
  width: 1395px;
  margin: auto;
  font-size: 25px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li a,
.dropbtn {
  display: inline-block;
  color: white;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover,
.dropdown:hover .dropbtn {
  background-color: #999999;
}

li.dropdown {
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>