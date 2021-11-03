<template>
  <div id="AppBody8">
    <div class="row">
      <div class="leftcolumn">
        <div style="text-align: center; padding-top: 15px">
          <button @click="add(1)">Add Fixtures</button>
        </div>

        <div v-for="v in lists" :key="v.id">
          <div class="card">
            <p>Home Team Name : {{ v.HomeTeamName }}</p>
            <p>Away Team Name : {{ v.AwayTeamName }}</p>
            <p>Home Score : {{ v.HomeScore }}</p>
            <p>Away Score : {{ v.AwayScore }}</p>
            <p>FixtureDate : {{ changeTimestyle(v.FixtureDate) }}</p>
            <div>
              <button @click="edit(v.FixtureID, 0)">Edit</button>
              <button @click="del(v.FixtureID)">Delete</button>
            </div>
          </div>
        </div>
        <div class="card" v-show="this.flag">
          <p>
            Home Team Name :
            <input type="text" v-model="obj.HomeTeamName" />
          </p>
          <p>
            Away Team Name :
            <input type="text" v-model="obj.AwayTeamName" />
          </p>
          <p>
            Home Score :
            <input type="text" v-model="obj.HomeScore" />
          </p>
          <p>
            Away Score :
            <input type="text" v-model="obj.AwayScore" />
          </p>
          <p>
            FixtureDate :
            <input type="text" v-model="obj.FixtureDate" />
          </p>
          <button @click="save()">Save</button>
          <button @click="cancel()">Cancel</button>
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
  name: "AppBody8",
  props: ["MemberID"],
  data() {
    return {
      obj: {
        FixtureID: "",
        HomeTeamName: "",
        AwayTeamName: "",
        HomeScore: "",
        AwayScore: "",
        FixtureDate: "",
        flag: 0,
      },
      lists: [],
      flag: 0,
      i: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.axios
        .get(`http://47.241.238.158:20022/list/fixtures`)
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
    cancel() {
      this.flag = 0;
      document.body.scrollIntoView({ block: "start", behavior: "smooth" });
      this.getList();
    },
    changeTimestyle(oldtime) {
      var datejson = new Date(oldtime).toJSON();
      var date = new Date(+new Date(datejson) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return date;
    },
    edit(id, flag) {
      while (this.lists[this.i].FixtureID !== id) {
        this.i++;
        if (this.i > this.lists) {
          this.i = 0;
        }
      }
      this.obj.FixtureID = this.lists[this.i].FixtureID;
      this.obj.HomeTeamName = this.lists[this.i].HomeTeamName;
      this.obj.AwayTeamName = this.lists[this.i].AwayTeamName;
      this.obj.HomeScore = this.lists[this.i].HomeScore;
      this.obj.AwayScore = this.lists[this.i].AwayScore;
      this.obj.FixtureDate = this.changeTimestyle(this.lists[this.i].FixtureDate);
      this.flag = 1;
      if (flag) {
        this.obj.flag = 1;
      } else {
        this.obj.flag = 0;
      }
      setTimeout(() => {
        document.body.scrollIntoView({ block: "end", behavior: "smooth" });
      }, 100);
    },
    del(id) {
      this.axios
        .post(`http://47.241.238.158:20022/list/delete`, { ID: id, database: 8 })
        .then((res) => {
          if (res.data) {
            this.getList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    save() {
      this.flag = 0;
      this.obj.database=8;
      if (this.obj.flag) {
        this.axios.post(`http://47.241.238.158:20022/list/new`,this.obj),
          this.obj
            .then(() => {
              this.getList();
            })
            .catch((err) => {
              console.log(err);
            });
      } else {
        this.axios.post(`http://47.241.238.158:20022/list/update`,this.obj),
          this.obj
            .then(() => {
              this.getList();
            })
            .catch((err) => {
              console.log(err);
            });
      }
      document.body.scrollIntoView({ block: "start", behavior: "smooth" });
    },
    add(flag) {
      this.obj = {};
      if (flag) {
        this.obj.flag = 1;
      } else {
        this.obj.flag = 0;
      }
      this.flag = 1;
      setTimeout(() => {
        document.body.scrollIntoView({ block: "end", behavior: "smooth" });
      }, 100);
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
p{
width: auto;
}
input{
  width: 25%;
}
</style>