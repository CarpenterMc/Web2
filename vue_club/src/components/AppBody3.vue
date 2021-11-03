<template>
  <div id="AppBody3">
    <div class="row">
      <div class="leftcolumn">
        <div class="card">
          <h3>Personal information</h3>
          <div v-show="this.flag">
            <p v-show="flag">First Name :
              <input type="text" v-model="obj.MemberFirstName">
            </p>
            <p v-show="flag">Last Name : 
              <input type="text" v-model="obj.MemberLastName">
            </p>
            <p v-show="flag">Birthdate : 
              <input type="text" v-model="obj.Birthdate">
            </p>
            <p v-show="flag">Phone :
              <input type="text" v-model="obj.Phone">
            </p>
            <p v-show="flag">Email : 
              <input type="text" v-model="obj.Email">
            </p>
            <p v-show="flag">Address : 
              <input type="text" v-model="obj.City">
              <input type="text" v-model="obj.Address2">
              <input type="text" v-model="obj.Address1">
            </p>
          </div>
          
          <div v-show="!this.flag">
            <p>First Name : {{this.obj.MemberFirstName}}</p>
            <p>Last Name : {{this.obj.MemberLastName}}</p>
            <p>Birthdate : {{changeTimestyle(this.obj.Birthdate)}}</p>
            <p>Phone : {{this.obj.Phone}}</p>
            <p>Email : {{this.obj.Email}}</p>
            <p>Address : {{this.obj.City+' '}}{{this.obj.Address2+' '}}{{this.obj.Address1}}</p>
          </div>
          <p>Team Name : {{this.lists.TeamName}}</p>
          <p>Club Name : {{this.lists.ClubName}}</p>

          <div v-show="this.flag">
            <button @click="save()">Save</button>
            <button @click="cancel()">cancel</button>
          </div>
          <div v-show="!this.flag">
            <button @click="edit()">Edit</button>
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
  name: "AppBody3",
  props: ["MemberID"],
  data() {
    return {
      obj: {
        MemberID:"",
        MemberFirstName: "",
        MemberLastName: "",
        Birthdate: "",
        Phone: "",
        Email: "",
        City: "",
        Address2: "",
        Address1: "",
      },
      lists: [],
      flag:0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.axios
        .post(`http://47.241.238.158:20022/list/members`,{ ID: this.MemberID })
        .then((res) => {
          this.lists = res.data[0];
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
    save(){
      this.flag=0;
      this.axios.post(`http://47.241.238.158:20022/list/members/update`,this.obj).then((res) => {
          if(res.data){
               this.getList();
           }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel(){
      this.flag=0;
      this.getList();
    },
    edit(){
      this.flag=1;
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
    lists:function(){
      this.obj.MemberID=this.lists.MemberID;
      this.obj.MemberFirstName=this.lists.MemberFirstName;
      this.obj.MemberLastName=this.lists.MemberLastName;
      this.obj.Birthdate=this.changeTimestyle(this.lists.Birthdate,10);
      this.obj.Phone=this.lists.Phone;
      this.obj.Email=this.lists.Email;
      this.obj.City=this.lists.City;
      this.obj.Address2=this.lists.Address2;
      this.obj.Address1=this.lists.Address1;
    },
  },
  components: {
    AppBodyRight,
  },
};
</script>

<style>
</style>