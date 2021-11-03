<template>
  <div id="AppBody6">
    <div class="row">
      <div class="leftcolumn">
        <div style="text-align: center; padding-top: 15px">
          <button @click="add(1)">Add Team</button>
        </div>

        <div v-for="v in lists" :key="v.id">
          <div class="card">
            <h3>Team ：{{ v.TeamName }} Details</h3>
            <p>Club Name : {{ v.ClubName }}</p>
            <p>Grade Name : {{ v.GradeName }}</p>
            <p>Grade Minimum Age : {{ v.GradeMinimumAge }}</p>
            <p>Grade Maximum Age : {{ v.GradeMaximumAge }}</p>
            <div>
              <button @click="edit(v.TeamID,0)">Edit</button>
              <button @click="del(v.TeamID)">Delete</button>
            </div>
          </div>
        </div>
        <div class="card" v-show="this.flag">
          <p>
            Club Name :
            <input type="text" v-model="obj.ClubName" />
          </p>
          <p>
            Grade Name :
            <input type="text" v-model="obj.GradeName" />
          </p>
          <p>
            Grade Minimum Age :
            <input type="text" v-model="obj.GradeMinimumAge" />
          </p>
          <p>
            Grade Maximum Age :
            <input type="text" v-model="obj.GradeMaximumAge" /></p>
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
  name: "AppBody6",
  props: ["MemberID"],
  data() {
    return {
      obj: {
        TeamID:'',
        TeamName: "",
        ClubName: "",
        GradeName: "",
        GradeMinimumAge: "",
        GradeMaximumAge:"",
        flag:0,
      },
      flag: 0,
      lists: [],
      i:0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.axios
        .get(`http://47.241.238.158:20022/list/teams`)
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
    edit(id,flag) {
      while(this.lists[this.i].TeamID!==id){
        this.i++;
        if(this.i>this.lists){
          this.i=0;
        }
      }
      this.obj.TeamID=this.lists[this.i].TeamID;
      this.obj.TeamName=this.lists[this.i].TeamName;
      this.obj.ClubName=this.lists[this.i].ClubName;
      this.obj.GradeName=this.lists[this.i].GradeName;
      this.obj.GradeMinimumAge=this.lists[this.i].GradeMinimumAge;
      this.obj.GradeMaximumAge=this.lists[this.i].GradeMaximumAge;
      this.flag = 1;
      if(flag){
        this.obj.flag=1;
      }else{
        this.obj.flag=0;
      }
      setTimeout(() => {
        document.body.scrollIntoView({ block: "end", behavior: "smooth" });
      }, 100);
    },
    del(id) {
      this.axios.post(`http://47.241.238.158:20022/list/delete`,{ ID: id,database:6})        
          .then((res) => {
            if(res.data){
               this.getList();
           }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    save() {
      this.flag = 0;
      this.obj.database=6;
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
    add(flag){
      this.obj={};
      if(flag){
        this.obj.flag=1;
      }else{
        this.obj.flag=0;
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
  watch: {
    MemberID: function () {
      this.getList();
    },
  },
  components: {
    AppBodyRight,
  },
};
</script>

<style>
</style>