<style lang="scss" scoped>
.history-task {
  width: 100%;
  height: 100vh;
  padding-bottom: 50px;
  background-repeat: no-repeat;
  background-position: 100% 95%;
  background-size: 76%;
  overflow-y: auto;
}
.history-task .menu {
  position: fixed;
  width: 100%;
  height: 50px;
  font-size: 20.8px;
}
.history-task .top {
  position: fixed;
  padding-top: 8px;
  width: 100%;
  height: 50px;
  z-index: 100;
  background-color: white;
}
h2 {
  font-size: 20.8px;
  font-weight: 500;
}
.time-choose {
  padding-top: 3.75rem;
  font-size: 1rem;
}

.tabs {
  border: none;
  padding: 0;
  font-size: 1rem;
  width: 96%;
  margin: 0 auto;
}
.history-task .container {
  padding-top: 2rem;
}
.history-task-card {
  border-radius: 12px;
  border: 1px solid transparent;
  width: 90%;
  height: 8.75rem;
  margin: 1.125rem auto;
  padding: 0.5rem 0.9375rem;
  font-size: 0.9375rem;
  line-height: 1.9375rem;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 1px 1px 6px rgba(168, 167, 167, 0.514);
}
.card-inf {
}
.card-inf .left {
  float: left;
  text-align: left;
  width: 30%;
}
.card-inf .right {
  float: right;
  text-align: right;
  width: 70%;
}
.page {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 4em;
  line-height: 4em;
  background-color: white;
  border-top: 1px solid #eeeeee;
}
.page input {
  width: 40px;
}
#prompt {
  margin: 25% auto;
  font-size: 30px;
  font-weight: 800;
  color: rgba(59, 59, 59, 0.6);
}

</style>

<template>
  <div class="history-task">
    <div class="menu"></div>
    <div class="top">
      <h2>{{printName}}</h2>
    </div>

    <div class="time-choose">
      <wv-tabs class="tabs">
        <wv-tab v-for="(data,index) in taskList" :key="index">
          <div
            slot="title"
            @click="currentIndex = index;displayNone = true;getData()"
          >{{ data.time }}</div>
          <div class="container">
            <div class="history-task-card" v-for="(task,index) in showData()" :key="index">
              <p class="card-inf">
                <span class="left">作业名称</span>
                <span class="right">{{task.name}}</span>
              </p>
              <p class="card-inf">
                <span class="left">开始时间</span>
                <span class="right">{{task.startTime}}</span>
              </p>
              <p class="card-inf">
                <span class="left">结束时间</span>
                <span class="right">{{task.endTime}}</span>
              </p>
              <p class="card-inf">
                <span class="left">最终状态</span>
                <span class="right">{{task.status}}</span>
              </p>
            </div>
            <!-- 无该时段历史作业数据 -->
            <div id="prompt" v-if="!displayNone">
              <img src="../../../../assets/search.png" width="20%" height="20%" />
              <p>无该时段数据</p>
            </div>
          </div>
        </wv-tab>
      </wv-tabs>
    </div>
    <div class="page">
      <Page
        :page-size.sync="pageSize"
        :current.sync="pageIndex"
        :total="taskList[currentIndex].task.length"
        simple
      />
    </div>
  </div>
</template>

<script>
import { getModule } from "vuex-module-decorators";
import historyModules from "../../../../store/modules/HistoryTaskModules";
import store from "../../../../store";

// 获取模块
const historyModule = getModule(historyModules, store);

export default {
  data() {
    return {
      printName: this.$route.query.printerName,
      getDateId: "",
      currentIndex: 0,
      dataList: [],
      taskList: [
        {
          time: "全部",
          task: []
        },
        {
          time: "最近一天",
          task: []
        },
        {
          time: "最近一周",
          task: []
        },
        {
          time: "最近一月",
          task: []
        }
      ],
      timeList: ["全部", "最近一天", "最近一周", "最近一月"],
      pageIndex: 1,
      pageSize: 6,
      printerDataList: [],
      // 无历史数据
      displayNone: true
    };
  },
  methods: {
    getData() {
      /**
       * 请求数据
       */
      let data = {
        serialNumber: this.$route.query.serialNumber,
        type: this.currentIndex + 1
      };
      let that = this;
      historyModule.HistoryTaskData(data).then(res => {
        if (res.code == 1) {
          // 成功
          this.pageIndex = 1;
          this.taskList[this.currentIndex].task = res.data;
          // 无历史作业数据时显示
          this.displayNone = true;
          if (res.data.length == 0) {
            this.displayNone = false;
          }
          for (
            let i = 0;
            i < this.taskList[this.currentIndex].task.length;
            i++
          ) {
            if (this.taskList[this.currentIndex].task[i].name == null) {
              this.taskList[this.currentIndex].task[i].name = "无";
            }
            if (this.taskList[this.currentIndex].task[i].startTime == null) {
              this.taskList[this.currentIndex].task[i].startTime = "无";
            }
            if (this.taskList[this.currentIndex].task[i].endTime == null) {
              this.taskList[this.currentIndex].task[i].endTime = "无";
            }
            if (this.taskList[this.currentIndex].task[i].status == null) {
              this.taskList[this.currentIndex].task[i].status = "未监控到";
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
    showData() {
      let dataArr = [];
      for (let i = 0; i < this.pageSize; i++) {
        let index = (this.pageIndex - 1) * this.pageSize + i;
        if (index >= this.taskList[this.currentIndex].task.length) {
          break;
        }
        dataArr.push(this.taskList[this.currentIndex].task[index]);
      }
      return dataArr;
    },
    getUrlParam(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    instance(type, contentType, message) {
      const title = "提示";
      let error = {
        login: "请重新登陆",
        ajax: message
      };
      let content = null;
      if (contentType == "time") {
        content = `<p>${error.timeError}</p>`;
      } else if (contentType == "login") {
        content = `<p>${error.login}</p>`;
      } else if (contentType == "ajax") {
        content = `<p>${error.ajax}</p>`;
      }

      switch (type) {
        case "info":
          this.$Modal.info({
            title: title,
            content: content
          });
          break;
        case "success":
          this.$Modal.success({
            title: title,
            content: content
          });
          break;
        case "warning":
          this.$Modal.warning({
            title: title,
            content: content
          });
          break;
        case "error":
          this.$Modal.error({
            title: title,
            content: content
          });
          break;
      }
    }
  },
  mounted: function() {
    document.title = "历史作业";
    this.getData();
  }
};
</script>

