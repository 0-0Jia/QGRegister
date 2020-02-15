<style scoped lang="scss">
.operate {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  z-index: 0;
}
.operate .top {
  position: fixed;
  width: 100%;
  height: 50px;
  z-index: 100;
  background-color: white;
}
.line {
  width: 100%;
  height: 8px;
  background-color: #f5f5f5;
}
.add-manager {
  position: fixed;
  height: 50px;
  top: 0;
  right: 0.6rem;
  width: 10%;
  line-height: 50px;
  text-align: center;
  font-size: 3rem;
  background-color: white;
  z-index: 1000;
}
.operate .container {
  width: 100%;
  overflow: scroll;
  padding-top: 2.9rem;
}
.operate .edit-button {
  float: right;
}
.operate .edit-button button {
  padding: 0.2rem 0.8rem;
  font-size: 1.1rem;
}
.super-manager-card {
  border: 1px solid transparent;
  height: 7.2rem;
  padding: 0.1rem 0;
  font-size: 1rem;
  background-color: white;
}
.super-manager-card p {
  margin-top: 0.4rem;
}
.super-manager-card h1 {
  font-size: 1.55rem;
  font-weight: 500;
}
.all-manager-card {
  margin: 0 auto;
  margin-top: 0.6rem;
  margin-bottom: 1rem;
  width: 100%;
  text-align: left;
  font-size: 1rem;
  color: #666666;
  background-color: white;
  overflow-y: auto;
}
.manager-card {
  margin: 0 auto;
  padding: 0.8rem 0;
  padding-bottom: 2.5rem;
  width: 85%;
  font-size: 15px;
  border-bottom: 1px solid #d8d8d8;
}

.manager-card .son-name {
  font-size: 18px;
  color: black;
  font-weight: bold;
}
.detail {
  position: absolute;
  right: 8%;
  top: 10%;
  color: #999999;
  font-size: 1.4rem;
}
.draw-container {
  width: 86%;
  margin: 0 auto;
  font-size: 1rem;
}
.draw-card {
  min-height: 2.6rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #d7dde4;
}
.draw-container .draw-title {
  float: left;
}
.draw-container p {
  text-align: right;
}
.draw-button {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 1rem;
}
.wx-button {
  display: inline-block;
  width: 50%;
  padding: 0.7rem 0;
  color: white;
  background-color: #00c5aa;
}
.pwd-button {
  display: inline-block;
  width: 50%;
  padding: 0.7rem 0;
  color: #999999;
  background-color: #f7f7f7;
}
.revise-pwd {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0.6rem 0;
  border-top: 2px solid #d7dde4;
  text-align: center;
  font-size: 1.1rem;
  color: #00c5aa;
  background-color: white;
}
.displayNone {
  display: none;
}
</style>

<template>
  <div class="operate">
    <div class="top">
      <div class="add-manager" @click="addFun">＋</div>
    </div>
    <div class="container">
      <div class="super-manager-card" @click="display = !display">
        <h1>{{currentManager.name}}</h1>
        <p class="super-username">
          <img
            src="../../../../assets/img/mobilePhone.png"
            style="position: absolute;width: 0.95rem;"
          />
          <span style="padding-left:1.2rem;">{{currentManager.username}}</span>
        </p>
        <p style="font-size: 0.9rem; color: #89929D;">查看个人资料</p>
        <div class="detail">></div>
      </div>
      <div class="line"></div>
      <div class="all-manager-card">
        <div class="manager-card" v-for="(data,item) in userList" v-bind:key="item">
          <p class="son-name">{{data.name?data.name:'\xa0'}}</p>
          <p>手机：{{data.username}}</p>
          <p>权限：{{data.authorityList}}</p>
          <div class="edit-button">
            <ButtonGroup>
              <Button style="background-color: #F7F7F7;" @click="currentIndex=item;reviseFun()">编辑</Button>
              <Button
                type="primary"
                style="background-color: #00C5AA;border-color: #00C5AA;"
                @click="currentIndex=item;deleteFun()"
              >删除</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
      <drawer title :display.sync="display" :width="drawerWidth" :height="drawerHeight">
        <div class="draw-container">
          <div class="draw-card">
            <div class="draw-title">权限</div>
            <p :class="{displayNone: !currentManager.printer}">
              打印机模块
              <img
                src="../../../../assets/img/true.png"
                style="width:1rem;margin-left: 0.1rem;"
              />
            </p>
            <p :class="{displayNone: !currentManager.statistic}">
              数据统计
              <img
                src="../../../../assets/img/true.png"
                style="width:1rem;margin-left: 0.1rem;"
              />
            </p>
            <p :class="{displayNone: !currentManager.customer}">
              商户管理
              <img
                src="../../../../assets/img/true.png"
                style="width:1rem;margin-left: 0.1rem;"
              />
            </p>
            <p :class="{displayNone: !currentManager.admin}">
              运营管理
              <img
                src="../../../../assets/img/true.png"
                style="width:1rem;margin-left: 0.1rem;"
              />
            </p>
          </div>
          <div class="draw-card">
            <div class="draw-title">上次登录IP</div>
            <p>{{currentManager.lastIp?currentManager.lastIp:'无'}}</p>
          </div>
          <div style="margin-top: 0.5rem;">
            <div class="draw-title">上次登录时间</div>
            <p>{{currentManager.lastTime?currentManager.lastTime:'无'}}</p>
          </div>
        </div>
        <div class="revise-pwd" @click="resetPwd">修改密码</div>
      </drawer>
    </div>
  </div>
</template>

<script>
import { getModule } from "vuex-module-decorators";
import managerModules from "../../../../store/modules/managerModules";
import store from "../../../../store";
import mobilePhoneImg from "../../../../assets/img/mobilePhone.png";
import drawer from "../../../../components/drawer/drawer";

// 获取模块
const managerModule = getModule(managerModules, store);

export default {
  components: { drawer },
  data() {
    return {
      currentManager: [], // 当前登录用户数据
      userList: [], // 子用户列表
      currentIndex: "", // 当前所点击子用户下标
      notOneself: false, //传递给子组件参数判断是否是修改自己密码还是修改其他管理员密码
      // 下拉抽屉
      activeName: "1",
      display: false,
      drawerWidth: "100%",
      drawerHeight: "78%"
    };
  },
  methods: {
    /**
     * 请求获取子列表数据
     */
    getData() {
      managerModule.getManagerListFun().then(res => {
        if (res.code == 1) {
          // 成功
          this.userList = [];
          for (let i = 0; i < res.data.length; i++) {
            let authorityList = [];
            if (res.data[i].printer == true) {
              authorityList.push("打印机模块");
            }
            if (res.data[i].statistic == true) {
              authorityList.push("数据统计");
            }
            if (res.data[i].customer == true) {
              authorityList.push("商户管理");
            }
            if (res.data[i].admin == true) {
              authorityList.push("运营管理");
            }
            this.userList.push(res.data[i]);
            res.data[i].authorityList = authorityList.join("、");
            if (authorityList.length == 1) {
              res.data[i].authorityList = authorityList[0];
            } else if (authorityList.length == 0) {
              res.data[i].authorityList = "无";
            } else if (authorityList.length == 2) {
              res.data[i].authorityList =
                authorityList[0] + "、" + authorityList[1];
            } else if (authorityList.length > 2) {
              res.data[i].authorityList =
                authorityList[0] + "、" + authorityList[1] + "...";
            }
          }
        } else if (res.code === "3001" || res.code === 3001) {
          localStorage.removeItem("AuthorizationAdmin");
          this.$router.push({ name: "login" });
          this.$Message.error(res.message);
        } else {
          // 登陆失败
          this.$Modal.info({
            title: "提示",
            content: res.message
          });
        }
      });
    },
    // 跳转增加管理员页面
    addFun() {
      this.$router.push({
        path: "./authorizedUser/addManager",
        query: {
          adminId: this.currentManager.adminId
        }
      });
    },
    // 跳转编辑管理员信息页面
    reviseFun() {
      sessionStorage.editManager = JSON.stringify(
        this.userList[this.currentIndex]
      );
      this.$router.push({
        path: "./authorizedUser/editManager"
      });
    },
    // 跳转修改当前管理员密码页面
    resetPwd() {
      this.$router.push({
        path: "./authorizedUser/resetManagerPwd",
        query: {
          adminId: this.currentManager.adminId,
          notOneself: this.notOneself
        }
      });
    },
    /**
     * 删除管理员请求
     */
    deleteFun() {
      this.$Modal.confirm({
        title: "提示",
        content:
          "确定删除用户" + this.userList[this.currentIndex].username + "?",
        onOk: () => {
          let data = {
            adminId: this.userList[this.currentIndex].adminId
          };
          managerModule.deleteManagerFun(JSON.stringify(data)).then(res => {
            if (res.code == 1) {
              // 成功
              this.$Message.success("删除成功！");
              this.getData();
            } else if (res.code === "3001" || res.code === 3001) {
              localStorage.removeItem("AuthorizationAdmin");
              this.$router.push({ name: "login" });
              this.$Message.error(res.message);
            } else {
              // 失败
              this.$Message.error(res.message);
            }
          });
        },
        onCancel: () => {}
      });
    }
  },
  mounted() {
    document.title = "运营管理";
    // 获取localstorage中当前用户信息
    this.currentManager = JSON.parse(
      localStorage.getItem("AuthorizationAdmin")
    ).managerInfo;
    // 刚开始请求数据
    this.getData();
  }
};
</script>
