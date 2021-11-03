<template>
  <div id="table">
    <h2>1qwe</h2>
    <div class="add-module">
      <button @click="setData('add', null)">new</button>
    </div>
    <table cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          xuhao1
        </tr>
      </thead>
      <tbody>
        <tr v-for="(v, i) in lists" :key="v.id">
          <td>{{ i + 1 }}</td>
          <td>{{ v.ClubID }}</td>
          <td>{{ v.ClubName }}</td>
          <td>{{ v.daContactPhoneta }}</td>
          <td>{{ v.Email }}</td>
          <td>{{ v.HomeGround }}</td>
          <td>
            <button class="delete" @click="del(v, i)">delete</button>
            <button class="edit" @click="setData('edit', v)">edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div id="layer" v-show="flag">
      <div class="mask">
        <div class="tittle">
          {{ state == "add" ? "add" : "edit" }}
          <span @click="flag = false"> x </span>
        </div>
        <div class="content">
          <input type="text" placeholder="biaoti" v-model="obj.tittle" />
          <input type="text" placeholder="biaoti" v-model="obj.user" />
          <input type="text" placeholder="biaoti" v-model="obj.data" />
          <button
            @click="submit()"
            :disabled="!obj.tittle || !obj.user || !obj.data"
          >
            {{ state == "add" ? "add" : "edit" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "demo01",
  data() {
    return {
      flag: false,
      state: "add",
      obj: {
        tittle: "",
        user: "",
        data: "",
      },
      lists: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.axios
        .get(`http://localhost:5000/list`)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          this.lists = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setData(type, v) {
      this.flag = true;
      this.state = type;
      if (this.state == "edit") {
        this.obj = JSON.parse(JSON.stringify(v));
      } else {
        this.obj = {};
      }
    },
    submit() {
      if (this.state == "add") {
        this.axios
          .post(`http://localhost:5000/add`, this.obj)
          .then((res) => {
            const code = res.data;
            if (code) {
              //如果请求成功
              console.log(res);
              // this.getList();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .put(`http://localhost:5000/update`, this.obj)
          .then((res) => {
            console.log(res);
            // let {code}=res.data;
            // if(code){//如果请求成功
            //     this.getList();
            // }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.flag = false;
      this.obj = {};
    },
    del(v) {
      axios
        .delete(`http://localhost:5000/del`, { data: { id: v.id } })
        .then((res) => {
          console.log(res);
          // let {code}=res.data;
          // if(code){//如果请求成功
          //     this.getList();
          // }
        })
        .catch((err) => {
          console.log(err);
        });
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