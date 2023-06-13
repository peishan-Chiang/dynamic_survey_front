<script>
import { RouterLink, RouterView } from 'vue-router'



export default {
  components: {

  },
  data() {
    return {

      startDate: '', // 起始日期
      endDate: '', // 結束日期
      questionTitle: null,
      questionDescription: null,
      surveyHeadTitle: null,
      surveyHeadDescription: null,
      isModi: false,
      isExist: true,
      isDisable: false




    }
  },
  methods: {

    goStatic() {

      localStorage.removeItem("saveQestion");
      sessionStorage.clear();
      this.$router.push('/');

    },
    addconfirmAndInsertDB() {
      this.checkAndSwapDates();

      if (confirm("確定問卷標題要建立了嗎?請確定時間及內容為正確")) {
        // 使用者點擊了"確定"
        this.addData();
        alert('請到分頁【題目問項】建立問卷統計問題即問項')
        this.$router.push('/subQuestion');
      } else {
        // 使用者點擊了"取消"
        // 跳出拒絕動作或執行其他操作


      }


    },

    addData() {


      let body = { //產品名稱
        "title": this.questionTitle,
        "start_day": this.startDate,
        "end_day": this.endDate,
        "discription": this.questionDescription
      }

      fetch("http://localhost:8080/create_survey", {
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
          let arr = [];
          console.log(data);
          alert(data.message);
          if (data.message === "successful") {
            // let tempInfo = {
            //   "title": this.questionTitle,
            //   "start_day": this.startDate,
            //   "end_day": this.endDate,
            //   "discription": this.questionDescription
            // };
            // arr.push(JSON.stringify(surveyHeadItem));
            let surveyIdGet = data.surveyHeadItem.surveyId;
            console.log(surveyIdGet);


            sessionStorage.setItem("saveQestion", JSON.stringify(data.surveyHeadItem));
            sessionStorage.setItem("surveyid", JSON.stringify(surveyIdGet));
            // localStorage.setItem("title",this.questionTitle)
            // localStorage.setItem("start_day",this.startDate)
            // localStorage.setItem("title",this.questionTitle)
            // localStorage.setItem("title",this.questionTitle)}

            // this.searchResultArr = data.product_list;

            // console.log(this.searchResultArr);
          }

        })

    },
    changeModi() {
      this.isModi = !this.isModi;
      this.isExist = !this.isExist;
    },
    modiSurveyHead() {
      let existedSurveyid = JSON.parse(sessionStorage.getItem('surveyid'));
      let body = {
        "surveyId": existedSurveyid,
        "start_day": this.startDate,
        "end_day": this.endDate,
        "title": this.questionTitle,
        "discription": this.questionDescription
      }

      fetch("http://localhost:8080/modify_survey", {
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
          alert(data.message);
          this.questionDescription = data.surveyHeadItem.description;
          this.questionTitle = data.surveyHeadItem.title;
          this.startDate = data.surveyHeadItem.startDay;
          this.endDate = data.surveyHeadItem.endDay;
          sessionStorage.setItem("existedSurveyHead", JSON.stringify(data.surveyHeadItem));

        })



      
    },
    // getEmitAction(){
    //   console.log("触发了 emitPush 事件");
    // },
    getSurveyIDInfo() { //
      let existedSurveyid = JSON.parse(sessionStorage.getItem('surveyid'));
      let body = {
        "surveyId": existedSurveyid
      }

      fetch("http://localhost:8080/find_questionaire_By_Id", {
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
          this.questionDescription = data.surveyHeadItem.description;
          this.questionTitle = data.surveyHeadItem.title;
          this.startDate = data.surveyHeadItem.startDay;
          this.endDate = data.surveyHeadItem.endDay;
          sessionStorage.setItem("existedSurveyHead", JSON.stringify(data.surveyHeadItem));

        })


    }, getToday() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    checkAndSwapDates() {
      if (this.endDate < this.startDate) {
        // 交換 startDate 和 endDate 的值
        alert('起訖相反，日期起訖範圍系統會協助轉換');
        const temp = this.startDate;
        this.startDate = this.endDate;
        this.endDate = temp;
      }
    }



    // 生命週期
  },
  created() {
    setTimeout(() => {
      if (JSON.parse(sessionStorage.getItem('surveyid')) !== null) {
        this.getSurveyIDInfo();
        this.changeModi();

      }
      let surveyStartDay = JSON.parse(sessionStorage.getItem('surveyStartDay'));
      let getToday = this.getToday();
      if (surveyStartDay < getToday) {
        this.isDisable = true;
        if (this.isDisable = true) {
          this.isExist = false;
          this.isModi = false;
        }
      }

    }, 300);


  },

  mounted() {
    // this.fn();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const endDate = new Date(today.getTime());
    endDate.setDate(endDate.getDate() + 7);
    const endDateYear = endDate.getFullYear();
    const endDateMonth = String(endDate.getMonth() + 1).padStart(2, '0');
    const endDateDay = String(endDate.getDate()).padStart(2, '0');

    this.startDate = `${year}-${month}-${day}`;
    this.endDate = `${endDateYear}-${endDateMonth}-${endDateDay}`;







  }
}




</script>



<template>
  <div class="nav-list">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/Add">問卷</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/subQuestion">題目問項</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/feedback">填寫回饋</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/static">統計數據</a>
      </li>

    </ul>
  </div>
  <div class="question-subject">
    <div class="content">
      <label for="name">問卷名稱</label>
      <input type="text" id="name" v-model="questionTitle" :disabled="this.startDate < getToday()">
    </div>
    <div class="content">
      <label for="TextArea1">描述內容</label>
      <textarea id="TextArea1" cols="5" rows="2" v-model="questionDescription"
        :disabled="this.startDate < getToday()"> </textarea>
      <!-- <input type="text" id="description"> -->
    </div>
    <div class="content">
      <label for="dateFromA">開始時間</label>
      <input type="date" class="form-control" :min="getToday()" id="dateFromA" name="date" v-model="startDate"
        :disabled="this.startDate < getToday()">
    </div>
    <div class="content">
      <label for="dateFromB">結束時間</label>
      <input type="date" class="form-control" :min="getToday()" id="dateFromB" name="date" v-model="endDate"
        :disabled="this.endDate < getToday()">
      <!-- @click="checkAndSwapDates"換到addData -->
    </div>

    <div class="button-area">
      <button type="button" v-on:click="goStatic()">
        取消(回首頁)
      </button>

      <button v-if="this.isExist" type="button" @click="addconfirmAndInsertDB()">
        創建子項目
      </button>

      <button v-if="this.isModi" type="button" @click="modiSurveyHead">
        修改問卷
      </button>
      <button v-if="this.isDisable" type="button" class="btn btn-secondary btn-lg disabled" disabled>Read Only</button>
    </div>


  </div>
</template>

<style lang="scss" scoped>
.nav-list {
  width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;

}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  margin: 10px;

  input {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 15vw;
    margin: 10px;


  }

  #TextArea1 {
    height: 5vw;
    width: 15vw;
    margin: 10px;
  }

  .form-control {
    text-align: center;
  }

}

.question-subject {
  margin-top: 80px;
  margin-right: 120px;
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

.btn {
  width: 8vw;
  height: 4vh;
  font-size: 10px;
  // text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;


}

.button-area {
  display: flex;
  justify-content: center;
  align-items: center;
}</style>
