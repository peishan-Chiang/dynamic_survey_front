<script>
import barCharView from '../components/barChar.vue'
import Chart from 'chart.js';
import { RouterLink, RouterView } from 'vue-router';



export default {
  components: {
    barCharView
  }, data() {
    return {

      resultArr: [
        // {
        //   "selection": ["台南", "高雄", "嘉義"],
        //   "title": ["你想去哪"],
        //   "data": [1, 2, 0]
        // }, {
        //   "selection": ["台南", "高雄", "嘉義"],
        //   "title": ["你想去哪"],
        //   "data": [1, 2, 0]
        // }, {
        //   "selection": ["台南", "高雄", "嘉義"],
        //   "title": ["你想去哪"],
        //   "data": [1, 2, 0]
        // }
      ],
      selectionGet: [], //取得此次問題選項
      titleGet: [], //針對哪一題
      personGet: [],//誰填寫問卷
      questionLength: null //一份問卷有多少題目




    }
  },
  methods: {
    goHomePage() {



      sessionStorage.clear();
      this.$router.push('/');
    },

    getListStatistic() { //找出有哪些人填寫問卷

      let existedSurveyid = JSON.parse(sessionStorage.getItem('surveyid'));
      let body = {
        "finishSurveyId": existedSurveyid
      }

      fetch("http://localhost:8080/find_by_list_finish_survey_id_order_by_reg_time_desc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          //vue不能用fetch+function 要用箭頭
          //從JSON格式轉回Js物件
          return response.json()
        })
        .then(data => {


          console.log(data);
          // alert(data.message)
          sessionStorage.setItem("surveyFeedback", JSON.stringify(data.surveyFillAnsList));
          // if(data.message='successful'){
          // this.getOptionAndTitle();}
        })



    },
    getOptionAndTitle() { //找出有哪些問項

      let existedSurveyid = JSON.parse(sessionStorage.getItem('surveyid'));
      let body = {
        "surveyId": existedSurveyid
      }

      fetch("http://localhost:8080/find_by_survey_selection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          //vue不能用fetch+function 要用箭頭
          //從JSON格式轉回Js物件
          return response.json()
        })
        .then(data => {


          console.log(data);
          // alert(data.message);
          let titleCollection = [];
          // let dataTitle = JSON.parse(sessionStorage.getItem('ensureSurvey'));
          for (let i = 0; i < data.surveyBodyList.length; i++) {
            titleCollection.push(data.surveyBodyList[i].subQuestion)
          }
          console.log(titleCollection); //0:"TOEIC 考試地點調查"
          this.titleGet = titleCollection;
          sessionStorage.setItem("titleGet", JSON.stringify(this.titleGet));
          console.log(this.titleGet);


          //option
          let optionColleciotn = [];

          // let dataOption = JSON.parse(sessionStorage.getItem('BodyArr'));
          for (let i = 0; i < data.surveyBodyList.length; i++) {

            let subQuestionSelection = data.surveyBodyList[i].subQuestionSelection;
            let optionlist = subQuestionSelection.split("；");
            this.selectionGet.push(optionlist);
            optionColleciotn.push(optionlist);
          }
          console.log(optionColleciotn);//0:(3) ['台南', '高雄', '台北']
          sessionStorage.setItem("selectionGet", JSON.stringify(this.selectionGet));


          this.questionLength = data.surveyBodyList.length;
          console.log(this.questionLength);

        })
    },

    getSelection() {


      //  收集[0,1,0]+[1,0,1]=[1,1,1];
      let feedbackList = JSON.parse(sessionStorage.getItem('surveyFeedback'));
      if (feedbackList.length === 0) {
        alert('毆哦~無人填寫，無資料統計')
      }

      // 將 finishSurveyAnswer 解析為陣列
      for (let i = 0; i < feedbackList.length; i++) {
        let answerArr = feedbackList[i].finishSurveyAnswer.split(";");
        feedbackList[i].finishSurveyAnswer = answerArr.map(answer => answer.split(",").map(Number));
      }

      console.log(feedbackList);

      let questionList = [];
      let optionList = [];

      // 建立 QuestionList 和 OptionList
      for (let i = 0; i < feedbackList.length; i++) {
        let answerArr = feedbackList[i].finishSurveyAnswer;

        for (let j = 0; j < answerArr.length; j++) {
          if (!questionList[j]) {
            questionList[j] = [];
          }

          if (!optionList[j]) {
            optionList[j] = [];
          }

          let answer = answerArr[j];

          if (questionList[j].indexOf(answer) === -1) {
            questionList[j].push(answer);
          }

          for (let k = 0; k < answer.length; k++) {
            let option = answer[k];

            if (optionList[j][k] === undefined) {
              optionList[j][k] = option;
            } else {
              optionList[j][k] += option;
            }
          }
        }
      }

      // console.log(questionList);
      console.log(optionList);

      let mergedOptionList = optionList.map(optionCounts => {
        let mergedCounts = optionCounts.map(() => 0);

        for (let j = 0; j < optionCounts.length; j++) {
          let count = optionCounts[j] || 0;
          mergedCounts[j] += count;
        }

        return mergedCounts;
      });

      console.log(mergedOptionList);
      console.log(this.titleGet);
      console.log(this.selectionGet);



      //合體
      for (let i = 0; i < this.questionLength; i++) {
        let statInfo = {
          "selection": this.selectionGet[i],
          "title": this.titleGet[i],
          "data": mergedOptionList[i]
        }
        this.resultArr.push(statInfo)
      }


    }

  },
  mounted() {

    this.getListStatistic();

    this.getOptionAndTitle();

    //先建立surveyFeedback
    // setTimeout(() => {
    //   this.getOptionAndTitle;
    // }, 500);
    // this.resultArr=JSON.parse(sessionStorage.getItem('ensureSurvey'));
  }

}

</script>

<template>
  <div class="about">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link " href="/Add">問卷</a>
      </li>
      <li class="nav-item">
        <a class="nav-link " href="/subQuestion">題目問項</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/feedback">填寫回饋</a>
      </li>
      <li class="nav-item">

        <a class="nav-link active" aria-current="page" href="/static">統計數據</a>

      </li>

    </ul>
    <!-- <button @click="getOptionAndTitle()">test</button> -->
    <div>
      <button @click="getSelection()"> 統計計算呈現 </button>
    </div>

    <div>

      <barCharView v-for="(question, index) in this.resultArr" :key="index" v-bind:votes="question.data"
        v-bind:labelInput="question.title" v-bind:Option="question.selection" />

    </div>
    <div>
      <button @click="goHomePage"> 回首頁 </button>
    </div>
  </div>
</template>



<style>
canvas {
  max-width: 600px;
  margin: 0 auto;
}

.about {
  width: 90vw;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

}

button {
  background: rgb(96, 88, 65);
  border: 2px solid rgb(235, 234, 217);
  border-radius: 5px;
  color: rgb(247, 246, 235);
  transition: 0.8s;
}

button:hover {
  background: rgb(45, 44, 42);
  border: 2px solid rgb(231, 229, 187);
  border-radius: 5px;
  color: rgb(184, 182, 159);

}

button:active {
  scale: 0.6;
}
</style>