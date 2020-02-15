<style scoped lang="scss">
</style>

<template>
  <div class="operate">
    <ModifyPassword ref="ModifyPassword" @resetpwd="resetpwd" :type="type" :notOneself="notOneself"></ModifyPassword>
  </div>
</template>

<script>
import { getModule } from "vuex-module-decorators";
import managerModules from "../../../../../store/modules/managerModules";
import store from "../../../../../store";
import ModifyPassword from "../../../../../components/ModifyPassword/ModifyPassword";

const managerModule = getModule(managerModules, store);
export default {
  components: {
    ModifyPassword
  },
  data() {
    return {
      type: "manager",
      notOneself: true,
      editManager: sessionStorage.hasOwnProperty("editManager")
        ? JSON.parse(sessionStorage.editManager)
        : ""
    };
  },
  methods: {
    /**
     * 更改密码请求
     */
    resetpwd() {
      let data = {
        adminId: this.$route.query.adminId? this.$route.query.adminId:this.editManager.adminId,
        oldPassword: this.$refs.ModifyPassword.oldPassword,
        password: this.$refs.ModifyPassword.newPassword
      };
      managerModule.updateManagerPwdFun(JSON.stringify(data)).then(res => {
        if (res.code == 1) {
          // 成功
          this.$Message.success("修改密码成功！");
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
    toBoolean(val) {
      if (val === true || val === false) {
        return false;
      }
      switch (val.toLowerCase()) {
        case "true":
        case 1:
        case "yes":
          return true;
        case "false":
        case 0:
        case "no":
        case null:
          return false;
        default:
          return Boolean(val);
      }
    }
  },
  mounted() {
    this.notOneself = this.toBoolean(this.$route.query.notOneself);
  }
};
</script>
