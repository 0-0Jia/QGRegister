<style scoped>
@font-face {
  font-family: fontA;
  src: url("../../../assets/font/fontA.ttf");
}

#app {
  position: relative;
  z-index: 0;
  overflow-x: hidden;
  /* perspective: 1000px; */
}

.card {
  position: relative;
  width: 200%;
  height: 84vh;
}

.pageA {
  position: absolute;
  width: 50%;
  top: 0;
  left: 0;
  z-index: 10;
}

.pageB {
  position: absolute;
  width: 50%;
  left: 50%;
  top: 0;
  z-index: 10;
}

/* .card {
  transition: transform 2s;
  transform-style: preserve-3d;
}

.pageA,
.pageB {
  backface-visibility: hidden;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.pageA {
  z-index: 2;
}

.pageB {
  transform: rotateY(180deg);
  z-index: 1;
} */

.line {
  position: relative;
  width: 95%;
  margin: 1.7vh auto;
  text-align: left;
  font-family: fontA;
  font-size: 19px;
  color: black;
}
.lineB {
  margin: 1vh auto;
}

.form-input {
  display: inline-block;
  margin: 0 2%;
  padding: 0;
}
.form-input input {
  height: 28px;
  padding: 3px 5px;
  border: none;
  border-radius: 3px;
  border: 1px solid #bcbcbc;
  font-family: 微软雅黑;
  font-size: 15px;
}

.form-input span {
  font-size: 18px;
}

.remarks {
  margin-left: 90px;
  font-family: 微软雅黑;
  font-size: 14px;
}

.textarea-input {
  margin: 0 auto;
  margin-left: 2%;
  width: 101%;
}

.line textarea {
  width: 95%;
  height: 76px;
  padding: 1px 5px;
  border: 1px solid #bcbcbc;
  border-radius: 3px;
  font-family: 微软雅黑;
  font-size: 15px;
}

.next {
  position: absolute;
  margin-top: 3%;
  top: 91%;
  right: 3%;
}
.next img {
  width: 90px;
  cursor: pointer;
}

.last {
  position: absolute;
  margin-top: 4.22%;
  top: 91%;
  left: 3%;
}
.last img {
  width: 90px;
  cursor: pointer;
}

.submit-button {
  position: absolute;
  top: 91%;
  right: 3%;
  margin-top: 4%;
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #5d08c4;
  font-size: 18px;
  color: white;
  background-color: #5d08c4;
}

.popup {
  position: absolute;
  top: 24%;
  left: 69.5%;
  width: 300px;
  height: 200px;
  background: white;
  border-radius: 10px;
  border: 1px solid #DDDDDD;
  z-index: 10;
}

.success {
  margin: 50px auto;
  margin-bottom: 35px;
  font-family: fontA;
  font-size: 35px;
  color: black;
}

.sure-button {
  width: 75px;
  height: 30px;
  border-radius: 2px;
  border: 1px solid #5d08c4;
  font-size: 14px;
  color: white;
  background-color: #5d08c4;
}


</style>
<template>
  <div id="app">
    <div class="card">
      <div class="pageA">
        <div class="line">
          <div class="form-input">
            姓名
            <input v-model="name" placeholder="（1-12位）" style="width: 135px" />
          </div>
          <div class="form-input">
            性别
            <Radio-group v-model="sex">
              <Radio label="male">
                <span>男</span>
              </Radio>
              <Radio label="female">
                <span>女</span>
              </Radio>
            </Radio-group>
          </div>
          <div class="form-input">
            学号
            <input v-model="stuId" placeholder="（10位数字）" style="width: 135px" />
          </div>
          <div class="form-input">
            年龄
            <input v-model="age" placeholder="（请填写周岁）" style="width: 135px" />
          </div>
        </div>
        <div class="line">
          <div class="form-input">
            年级
            <input v-model="grade" placeholder="（例：19）" style="width: 150px" />
          </div>
          <div class="form-input">
            专业班级
            <input v-model="department" placeholder="（例：软件工程1班）" style="width: 200px" />
          </div>
          <div class="form-input">
            班级职务
            <input v-model="duty" placeholder="（没有填无）" style="width: 200px" />
          </div>
          <div class="form-input">
            宿舍
            <input v-model="dormitory" placeholder="（例：西二-312）" style="width: 150px" />
          </div>
        </div>
        <div class="line">
          <div class="form-input">
            上学期班级排名
            <input v-model="rank" placeholder="（1-2位数字）" style="width: 100px" />
          </div>
          <div class="form-input">
            大一上绩点
            <input v-model="point" placeholder="（0.0-5.0）" style="width: 100px" />
          </div>
          <div class="form-input fail">
            挂科
            <Radio label="yes">
              <span>有</span>
            </Radio>
            <Radio label="no">
              <span>无</span>
            </Radio>
          </div>
        </div>
        <div class="line">
          <div class="form-input">
            C理论成绩
            <input v-model="cTheory" placeholder="（0-100）" style="width: 100px" />
          </div>
          <div class="form-input">
            C实验成绩
            <input v-model="cExperiment" placeholder="（0-100）" style="width: 100px" />
          </div>
          <div class="form-input">
            英语（1）成绩
            <input v-model="english" placeholder="（0-100）" style="width: 100px" />
          </div>
        </div>
        <div class="line">
          <div class="form-input">
            参加其他学生科技团队、普通社团情况说明
            <input
              v-model="explain"
              placeholder="（0.0-5.0）"
              style="width: 300px"
            />
          </div>
        </div>
        <div class="line">
          <div class="form-input">
            邮箱
            <input v-model="email" placeholder style="width: 200px" />
          </div>
          <div class="form-input">
            手机
            <input v-model="phone" placeholder style="width: 200px" />
          </div>
          <div class="form-input">
            QQ
            <input v-model="qq" placeholder style="width: 200px" />
          </div>
        </div>
        <div class="line">
          <div class="form-input">
            特长爱好
            <input v-model="hobby" placeholder="（0-50字）" style="width: 480px" />
          </div>
        </div>
        <div class="line">
          <div class="form-input">
            座右铭
            <input v-model="motto" placeholder="（0-50字）" style="width: 500px" />
          </div>
        </div>
        <div class="line">
          <div class="form-input">
            应征方向
            <Radio-group v-model="group">
              <Radio label="1">
                <span>前端组</span>
              </Radio>
              <Radio label="2">
                <span>后台组</span>
              </Radio>
              <Radio label="3">
                <span>移动组</span>
              </Radio>
              <Radio label="4">
                <span>嵌入式组组</span>
              </Radio>
              <Radio label="5">
                <span>数据挖掘组</span>
              </Radio>
              <Radio label="6">
                <span>图形组</span>
              </Radio>
              <Radio label="7">
                <span>设计组</span>
              </Radio>
            </Radio-group>
          </div>
          <div class="remarks">*设计组与其他6个方向的流程不同，笔试时除了黑色签字笔请另外带上铅笔和橡皮擦</div>
          <div class="remarks">*7个方向只能填写一个</div>
        </div>
        <div class="line">
          <div class="form-input adjust">
            是否愿意服从应征方向调剂
            <Radio label="yes">
              <span>是</span>
            </Radio>
            <Radio label="no">
              <span>否</span>
            </Radio>
          </div>
        </div>
        <div class="line">
          <div class="form-input">
            是否组队报名，填写同组同学姓名（限3人）
            <input v-model="organize" placeholder style="width: 400px" />
          </div>
        </div>
        <div class="next" @click="flip($event)">
          <img src="../../../assets/img/NextPage.png" />
        </div>
      </div>

      <div class="pageB">
        <div class="line lineB">
          <div class="textarea-input">
            奖惩情况和实践经历(社会实践或计算机相关技术学习掌握情况)
            <textarea v-model="experiences"></textarea>
          </div>
        </div>
        <div class="line lineB">
          <div class="textarea-input">
            自我评价
            <textarea v-model="description"></textarea>
          </div>
        </div>
        <div class="line lineB">
          <div class="textarea-input">
            简述能体现你四个方面的一件事（1）善于协作（2）刻苦努力（3）甘于奉献（4）持之以恒
            <textarea v-model="oneThing"></textarea>
          </div>
        </div>
        <div class="line lineB">
          <div class="textarea-input">
            请说一下大学四年的个人规划以及为什么希望加入QG工作室
            <textarea v-model="plan"></textarea>
          </div>
        </div>
        <div class="last" @click="flip($event)">
          <img src="../../../assets/img/LastPage.png" />
        </div>
        <button class="submit-button" @click="submitRequest">提交</button>
      </div>

      <div class="popup" v-if="popup">
        <p class="success">提交成功!</p>
        <button class="sure-button" @click="closePopup">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import submit from "@/store/modules/submitModules";
import { getModule } from "vuex-module-decorators";
import store from "@/store";

export default {
  data() {
    return {
      stuId: "学号",
      name: "姓名",
      phone: "手机",
      sex: "性别",
      grade: "年级",
      department: "专业班级",
      point: "绩点",
      dormitory: "宿舍",
      qq: "qq",
      group: "组别",
      email: "邮箱",
      age: "年龄",
      rank: "上学期排名",
      duty: "职务",
      fail: "是否挂科",
      cTheory: "C语言理论成绩",
      cExperiment: "C语言实验成绩",
      english: "英语成绩",
      hobby: "爱好",
      motto: "座右铭",
      organize: "是否组队报名",
      experiences: "奖惩情况和实践经历(社会实践或计算机相关技术学习掌握情况）",
      description: "自我评价",
      oneThing:
        "简述能体现你四个方面的一件事（1）善于协作（2）刻苦努力（3）甘于奉献（4）持之以恒",
      plan: "个人规划和为什么加入qg工作室",
      explain: "参加其他学生科技团队/社团的情况说明",
      adjust: "是否服从调剂",
      popup: false
    };
  },
  methods: {
    flip(e) {
      var element = e.currentTarget.parentNode.parentNode;
      //翻转
      //   if (element.className === "card") {
      //     if (element.style.transform == "rotateY(180deg)") {
      //       element.style.transform = "rotateY(0deg)";
      //     } else {
      //       element.style.transform = "rotateY(180deg)";
      //     }
      //   }

      //左右滑动
      if (element.className === "card") {
        if (e.currentTarget.parentNode.className === "pageA") {
          element.style.transform = "translate(-50%,0)";
          element.style.transition = "3s";
        } else {
          element.style.transform = "translate(0%,0)";
          element.style.transition = "3s";
        }
      }
    },
    submitRequest() {
      let data = {
        stuId: this.stuId,
        name: this.name,
        phone: this.phone,
        sex: this.sex,
        grade: this.grade,
        department: this.department,
        point: this.point,
        dormitory: this.dormitory,
        qq: this.qq,
        group: this.group,
        email: this.email,
        age: this.age,
        rank: this.rank,
        duty: this.duty,
        fail: this.fail,
        cTheory: this.cTheory,
        cExperiment: this.cExperiment,
        english: this.english,
        hobby: this.hobby,
        motto: this.motto,
        organize: this.organize,
        experiences: this.experiences,
        description: this.description,
        oneThing: this.oneThing,
        plan: this.plan,
        explain: this.explain,
        adjust: this.adjust
      };
                this.popup = true;
      // submit.submitFun(JSON.stringify(data)).then(res => {
      //   if (res.code == 1) {
      //     this.popup = true;
      //     console.log(res);
      //   } else {
      //     // 登陆失败
      //     this.$Modal.info({
      //       title: "提示",
      //       content: res.message
      //     });
      //   }
      // });
    },
    closePopup(){
      this.popup = false;
    }
  },
  mounted() {}
};
</script>

