<template>
  <div id="AppBody7">
    <div class="row">
      <div class="leftcolumn">
        <div style="text-align: center; padding-top: 15px">
          <button @click="add(1)">Add Member</button>
        </div>

        <div v-for="v in lists" :key="v.id">
          <div class="card">
            <h3>Member ：{{v.MemberFirstName+''+v.MemberLastName}} Details</h3>
            <p>Club Name : {{ v.ClubName }}</p>
            <p>Team Name : {{ v.TeamName }}</p>
            <p>Address : {{ v.Address1+''+ v.Address2+''+v.City }}</p>
            <p>Email : {{ v.Email }}</p>
            <p>Phone : {{ v.Phone }}</p>
            <p>Birthdate : {{ changeTimestyle(v.Birthdate) }}</p>
            <div>
              <button @click="edit(v.ID,0)">Edit</button>
              <button @click="del(v.ID)">Delete</button>
            </div>
          </div>
        </div>
        <div class="card" v-show="this.flag">
          <p>
            Club Name :
            <input type="text" v-model="obj.ClubName" />
          </p>
          <p>
            Team Name :
            <input type="text" v-model="obj.TeamName" />
          </p>
          <p>
            Address :
            <input type="text" v-model="obj.Address1" />
            <input type="text" v-model="obj.Address2" />
            <input type="text" v-model="obj.City" />
          </p>
          <p>
            Email :
            <input type="text" v-model="obj.Email" /></p>
            <p>
            Phone :
            <input type="text" v-model="obj.Phone" /></p>
            <p>
            Birthdate :
            <input type="text" v-model="obj.Birthdate" /></p>
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
  name: "AppBody7",
  props: ["MemberID"],
  data() {
    return {
      obj: {
        ID:'',
        MemberFirstName: "",
        MemberLastName: "",
        ClubName: "",
        TeamName: "",
        Address1:"",
        Address2:"",
        City:"",
        Email:"",
        Phone:"",
        Birthdate:"",
        flag:0,
      },
      lists: [],
      flag:0,
      i:0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.axios
        .get(`http://47.241.238.158:20022/list`)
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
    cancel() {
      this.flag = 0;
      document.body.scrollIntoView({ block: "start", behavior: "smooth" });
      this.getList();
    },
    edit(id,flag) {
      while(this.lists[this.i].ID!==id){
        this.i++;
        if(this.i>this.lists){
          this.i=0;
        }
      }
      if(flag){
        this.obj.flag=1;
      }else{
        this.obj.flag=0;
      }
      this.obj.ID=this.lists[this.i].ID;
      this.obj.MemberFirstName=this.lists[this.i].MemberFirstName;
      this.obj.MemberLastName=this.lists[this.i].MemberLastName;
      this.obj.ClubName=this.lists[this.i].ClubName;
      this.obj.TeamName=this.lists[this.i].TeamName;
      this.obj.Address1=this.lists[this.i].Address1;
      this.obj.Address2=this.lists[this.i].Address2;
      this.obj.City=this.lists[this.i].City;
      this.obj.Email=this.lists[this.i].Email;
      this.obj.Phone=this.lists[this.i].Phone;
      this.obj.Birthdate=this.changeTimestyle(this.lists[this.i].Birthdate);
      this.flag = 1;
      setTimeout(() => {
        document.body.scrollIntoView({ block: "end", behavior: "smooth" });
      }, 100);
    },
    del(id) {
      this.axios.post(`http://47.241.238.158:20022/list/delete`,{ ID:id,database:7})        
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
      this.obj.database=7;
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
  components: {
    AppBodyRight,
  },
};
</script>

<style>
</style>