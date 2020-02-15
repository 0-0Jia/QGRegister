<style scoped lang="scss">
.editInformation {
  position: relative;
  width: 100%;
  height: 100vh;
  font-size: 1.05rem;
  overflow: auto;
}

.name {
  position: absolute;
  width: 200px;
  left: 50%;
  margin-left: -100px;
  height: 100%;
  line-height: 50px;
  font-size: 20.8px;
}

.editInformation-contaniner {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  z-index: 99;
  overflow: auto;
}

.editInformation-title {
  position: fixed;
  width: 100%;
  height: 50px;
  z-index: 100;
  font-size: 1.3rem;
  background-color: white;
}

.add-information-container {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding-top: 50px;
  overflow: auto;
  padding-top: 50px;
}

.add-name-container {
  margin: 0 auto;
  height: 3rem;
  width: 88%;
  background-color: white;
  margin-top: 1rem;
}

.add-name-title {
  float: left;
  display: inline-block;
  height: 100%;
  width: 14%;
  text-align: left;
  background-color: white;
  line-height: 3rem;
}

.add-name-input {
  float: left;
  display: inline-block;
  height: 100%;
  width: 86%;
  margin-top: 2px;
  text-align: center;
  background-color: white;
  font-size: 1rem;
}

.authority-container {
  height: 12.5rem;
  width: 88%;
  margin: 0 auto;
  background-color: white;
  margin-top: 1rem;
}

.authority-title {
  height: 2rem;
  width: 88%;
  background-color: white;
  text-align: left;
}

.input-phone,
.input-name {
  width: 100%;
  height: 76%;
  border: 1px solid #dcdee2;
  padding: 5% 0;
  margin: 2% 0;
  text-indent: 5px;
  outline: none;
}

.authority-select {
  height: 18rem;
  width: 100%;
  margin: 0 auto;
  background-color: white;
}

.checkbox-container {
  height: 2.5rem;
  width: 88%;
  margin: 0 auto;
  margin-left: 12%;
  background-color: white;
  text-align: left;
  line-height: 2.5rem;
  font-size: 1.05rem;
}

.save-button {
  position: absolute;
  width: 20%;
  height: 68%;
  top: 8px;
  right: 1rem;
  background-color: #00c5aa;
  z-index: 100;
  font-size: 1rem;
  border: 0;
}

.time {
  height: 2rem;
  line-height: 2rem;
  width: 88%;
  text-align: left;
  margin: 0.2rem auto;
}

.revise-pwd {
  padding: 0.6rem 0;
  text-align: center;
  margin-top: 0.5rem;
  height: 2.5rem;
  width: 80%;
  border-color: #00c5aa;
  background-color: #00c5aa;
  color: white;
  font-size: 1rem;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-enter
  /* .slide-fade-leave-active for below version 2.1.8 */
 {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<template>
  <transition name="slide-fade" appear>
    <div class="editInformation">
      <div class="editInformation-contaniner">
        <div class="editInformation-title">
          <div class="name">编辑管理员信息</div>
          <Button type="primary" class="save-button" @click="reviseManager">保存</Button>
        </div>

        <div class="add-information-container">
          <div class="add-name-container">
            <div class="add-name-title">名称</div>
            <div class="add-name-input">
              <input type="text" placeholder="请输入名称" class="input-name" v-model="Name" />
            </div>
          </div>

          <div class="add-name-container">
            <div class="add-name-title">手机</div>
            <div class="add-name-input">
              <input type="text" placeholder="请输入手机" class="input-phone" v-model="phone" />
            </div>
          </div>

          <div class="authority-container">
            <div class="authority-title">权限</div>
            <div class="authority-select">
              <div class="checkbox-container">
                <Checkbox v-model="authority.printer" style="font-size: 1.05rem">打印机模块</Checkbox>
              </div>
              <div class="checkbox-container">
                <Checkbox v-model="authority.statistic" style="font-size: 1.05rem">数据统计</Checkbox>
              </div>
              <div class="checkbox-container">
                <Checkbox v-model="authority.customer" style="font-size: 1.05rem">商户管理</Checkbox>
              </div>
              <div class="checkbox-container">
                <Checkbox v-model="authority.admin" style="font-size: 1.05rem">运营管理</Checkbox>
              </div>
            </div>
          </div>
          <p class="time">创建时间：{{createTime?createTime:'无'}}</p>
          <p class="time">修改时间：{{updateTime?updateTime:'无'}}</p>
          <p class="time">上次登陆IP：{{lastIp?lastIp:'无'}}</p>
          <p class="time" style="margin-bottom: 1rem">上次登陆时间：{{lastTime?lastTime:'无'}}</p>
        </div>
        <Button class="revise-pwd" @click="resetPwd">修改密码</Button>
      </div>
    </div>
  </transition>
</template>

<script>
import { getModule } from "vuex-module-decorators";
import managerModules from "../../../../../store/modules/managerModules";
import store from "../../../../../store";
import { isNotNullTrim } from "../../../../../utils/shared/isNotNullTrim";
import { PhoneFormat } from "../../../../../utils/shared/phoneFormat";

const managerModule = getModule(managerModules, store);
export default {
  data() {
    return {
      user: this.editManager ? this.editManager.adminId : "",
      Name: this.editManager ? this.editManager.name : "",
      phone: this.editManager ? this.editManager.username : "",
      authority: {
        printer: this.editManager.printer ? this.editManager.printer : "",
        customer: this.editManager.customer ? this.editManager.customer : "",
        admin: this.editManager.admin ? this.editManager.admin : "",
        statistic: this.editManager.statistic ? this.editManager.statistic : ""
      },
      updateTime: this.editManager.username
        ? this.editManager.updateTime
        : "无",
      lastTime: this.editManager.lastTime ? this.editManager.lastTime : "无",
      createTime: this.editManager.username
        ? this.editManager.createTime
        : "无",
      lastIp: this.editManager.username ? this.editManager.lastIp : "无",
      notOneself: true //传递给子组件参数判断是否是修改自己密码还是修改其他管理员密码
    };
  },
  methods: {
    /**
     * 更改管理员信息
     */
    reviseManager() {
      // 权限必须至少填一个
      if (
        !this.authority.printer &
        !this.authority.customer &
        !this.authority.statistic &
        !this.authority.admin
      ) {
        this.$Message.error("权限至少选择一项！");
        return false;
      }
      let data = {
        adminId: this.editManager.adminId,
        username: this.phone,
        name: this.Name,
        printer: this.authority.printer,
        customer: this.authority.customer,
        statistic: this.authority.statistic,
        admin: this.authority.admin
      };
      this.$Modal.confirm({
        title: "提示",
        content: "确定保存?",
        onOk: () => {
          managerModule.updateManagerFun(JSON.stringify(data)).then(res => {
            if (res.code == 1) {
              // 成功
              this.$Message.success("更新管理员信息成功");
              this.$router.push({ name: "operate" });
            } else if (res.code === "3001" || res.code === 3001) {
              localStorage.removeItem("AuthorizationAdmin");
              this.$router.push({ name: "login" });
              this.$Message.error(res.message);
            } else {
              // 登陆失败
              this.$Message.error(res.message);
            }
          });
        },
        onCancel: () => {}
      });
    },
    // 跳转修改管理员密码页面
    resetPwd() {
      this.$router.push({
        path: "./resetManagerPwd",
        query: {
          adminId: this.editManager.adminId,
          notOneself: this.notOneself
        }
      });
    }
  },
  beforeCreate() {
    this.editManager = JSON.parse(sessionStorage.editManager);
  }
};
</script>
