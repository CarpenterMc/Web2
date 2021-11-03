<template>
  <div id="AppBody4">
    <div class="row">
      <div class="leftcolumn">
        <div style="text-align: center; padding-top: 15px">
          <button @click="add(1)">Add News</button>
        </div>

        <div v-for="v in lists" :key="v.id">
          <div class="card">
            <h2>{{ v.NewsHeader }}</h2>
            <h5>Time: {{ changeTimestyle(v.NewsDate) }}</h5>
            <p>{{ "\u3000" + v.News }}</p>
            <p>{{ v.NewsByline }}</p>
            <div>
              <button @click="edit(v.NewsID, 0)">Edit</button>
              <button @click="del(v.NewsID)">Delete</button>
            </div>
          </div>
        </div>
        <div class="card" v-show="this.flag">
          <p>
            NewsHeader :
            <textarea rows="1" cols="90" v-model="obj.NewsHeader"></textarea>
          </p>
          <p>
            Time :
            <input type="text" v-model="obj.NewsDate" />
          </p>
          <p>
            News :
            <textarea rows="6" cols="90" v-model="obj.News"></textarea>
          </p>
          <p>
            NewsByline :
            <input type="text" v-model="obj.NewsByline" />
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
  name: "AppBody4",
  props: ["MemberID"],
  data() {
    return {
      obj: {
        NewsID: "",
        NewsHeader: "",
        News: "",
        NewsByline: "",
        NewsDate: "",
        database:0,
        flag: 0,
      },
      i: 0,
      lists: [],
      flag: 0,
      newsflag: 0,
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
    cutDesc(index, num) {
      //console.log 44(index, num);
      return index.substring(0, num);
    },
    changeTimestyle(oldtime) {
      var datejson = new Date(oldtime).toJSON();
      var date = new Date(+new Date(datejson) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return date;
    },
    cancel() {
      this.flag = 0;
      document.body.scrollIntoView({ block: "start", behavior: "smooth" });
      this.getList();
    },
    edit(id, flag) {
      while (this.lists[this.i].NewsID !== id) {
        this.i++;
        if (this.i > this.lists) {
          this.i = 0;
        }
      }
      this.obj.NewsID = this.lists[this.i].NewsID;
      this.obj.NewsHeader = this.lists[this.i].NewsHeader;
      this.obj.News = this.lists[this.i].News;
      this.obj.NewsByline = this.lists[this.i].NewsByline;
      this.obj.NewsDate = this.changeTimestyle(this.lists[this.i].NewsDate);
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
        .post(`http://47.241.238.158:20022/list/delete`, { ID: id, database: 4 })
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
      this.obj.database=4;
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
  },
  components: {
    AppBodyRight,
  },
};
</script>

<style>
</style>