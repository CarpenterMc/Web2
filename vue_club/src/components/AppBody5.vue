<template>
  <div id="AppBody5">
    <div class="row">
      <div class="leftcolumn">
        <div style="text-align: center; padding-top: 15px">
          <button @click="add(1)">Add Club</button>
        </div>

        <div v-for="v in lists" :key="v.id">
          <div class="card">
            <h3>Club ：{{ v.ClubName }} Details</h3>
            <p>Home Ground : {{ v.HomeGround }}</p>
            <p>Club Address : {{ v.ClubAddress }}</p>
            <p>Contact Phone : {{ v.ContactPhone }}</p>
            <p>Email : {{ v.Email }}</p>
            <div>
              <button @click="edit(v.ClubID,0)">Edit</button>
              <button @click="del(v.ClubID)">Delete</button>
            </div>
          </div>
        </div>
        <div class="card" v-show="this.flag">
          <p>
            Home Ground :
            <input type="text" v-model="obj.HomeGround" />
          </p>
          <p>
            Club Address :
            <input type="text" v-model="obj.ClubAddress" />
          </p>
          <p>
            Contact Phone :
            <input type="text" v-model="obj.ContactPhone" />
          </p>
          <p>
            Email :
            <input type="email" v-model="obj.Email" /></p>
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
  name: "AppBody5",
  props: ["MemberID"],
  data() {
    return {
      obj: {
        ClubID:'',
        HomeGround: "",
        ClubAddress: "",
        ContactPhone: "",
        Email: "",
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
        .get(`http://47.241.238.158:20022/list/clubs`)
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
      while(this.lists[this.i].ClubID!==id){
        this.i++;
        if(this.i>this.lists){
          this.i=0;
        }
      }
      this.obj.ClubID=this.lists[this.i].ClubID;
      this.obj.HomeGround=this.lists[this.i].HomeGround;
      this.obj.ClubAddress=this.lists[this.i].ClubAddress;
      this.obj.ContactPhone=this.lists[this.i].ContactPhone;
      this.obj.Email=this.lists[this.i].Email;
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
      this.axios.post(`http://47.241.238.158:20022/list/delete`,{ ID:id,database:5})        
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
      this.obj.database=5;
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