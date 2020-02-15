<style scoped lang="scss">
.editInformation {
  position: relative;
  width: 100%;
  font-size: 1.05rem;
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
  overflow: scroll;
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
  text-align: center;
  background-color: white;
  line-height: 3rem;
  font-size: 1rem;

  input {
    height: 76%;
    -webkit-appearance: none;
  }

}

.authority-container {
  height: 15rem;
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
  height: 100%;
  width: 100%;
  border: 1px solid #dcdee2;
  border-radius: 6px;
  text-indent: 10px;
  line-height: 18px;
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
  font-size: 1rem;
}

.status-container {
  margin-top: 1rem;
  height: 2.5rem;
  width: 88%;
  margin: 0 auto;
  background-color: white;
  text-align: left;
}

.status-title {
  display: inline-block;
  height: 100%;
  width: 12%;
  background-color: white;
  line-height: 2.5rem;
  text-align: left;
  font-size: 1rem;
  vertical-align: top;
}

.status-checkbox-container {
  display: inline-block;
  height: 100%;
  width: 70%;
  background-color: white;
  line-height: 2.3rem;
  text-align: left;
  vertical-align: top;
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

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<template>
  <div class="operate">
    <transition name="slide-fade" appear>
      <div class="editInformation">
        <div class="editInformation-contaniner">
          <div class="editInformation-title">
            <div class="name">新建管理员</div>
            <Button type="primary" class="save-button" @click="addManager">保存</Button>
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

            <div class="add-name-container">
              <div class="add-name-title">密码</div>
              <div class="add-name-input">
                <input type="text" placeholder="请输入密码" class="input-phone" v-model="password" />
              </div>
            </div>

            <div class="authority-container">
              <div class="authority-title">权限</div>
              <div class="authority-select">
                <div class="checkbox-container">
                  <Checkbox v-model="authority.printer">打印机模块</Checkbox>
                </div>
                <div class="checkbox-container">
                  <Checkbox v-model="authority.statistic">数据统计</Checkbox>
                </div>
                <div class="checkbox-container">
                  <Checkbox v-model="authority.customer">商户管理</Checkbox>
                </div>
                <div class="checkbox-container">
                  <Checkbox v-model="authority.admin">运营管理</Checkbox>
                </div>
              </div>
            </div>
            <!-- <div class="status-container">
              <div class="status-title">状态</div>
              <RadioGroup v-model="status" class="status-checkbox-container">
                <Radio label="1">启用</Radio>
                <Radio label="0">禁用</Radio>
              </RadioGroup>
            </div>-->
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getModule } from "vuex-module-decorators";
import managerModules from "../../../../../store/modules/managerModules";
import store from "../../../../../store";
import { isNotNullTrim } from "../../../../../utils/shared/isNotNullTrim";
import { PassWordFormat } from "../../../../../utils/shared/PassWordFormat";
import { PhoneFormat } from "../../../../../utils/shared/phoneFormat";

const managerModule = getModule(managerModules, store);

export default {
  data() {
    return {
      Name: "",
      phone: "",
      password: "",
      authority: {
        printer: "",
        statistic: "",
        customer: "",
        admin: ""
      },
      status: ""
    };
  },
  methods: {
    /**
     * 增加管理员
     */
    addManager() {
      this.$Modal.confirm({
        title: "提示",
        content: "确定保存?",
        onOk: () => {
          // 过滤空格
          let name = this.Name.replace(/(^\s*)|(\s*$)/g, "");
          if (name == "" || name == undefined || name == null) {
            this.$Message.error("名字不能为空！");
            return false;
          }
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
            username: this.phone,
            password: this.password,
            name: this.Name,
            // 以下分别对应用户四个模块的权限，有权限则发1 无权限则发0或者不发过来
            printer: this.authority.printer,
            customer: this.authority.customer,
            statistic: this.authority.statistic,
            admin: this.authority.admin
          };
          managerModule.addManagerFun(JSON.stringify(data)).then(res => {
            if (res.code == 1) {
              // 成功
              this.$Message.success("增加管理员成功！");
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
    }
  },
  mounted() {}
};
</script>
