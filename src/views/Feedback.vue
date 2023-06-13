<script>
export default {
  components: {

  },
  data() {
    return {

      PersonARR: [
        {
          personName: "何浩平",
          createTime: "2013-02-02"
        }, {
          personName: "鄭立鋒",
          createTime: "2013-02-03"
        }, {
          personName: "董人豪",
          createTime: "2013-02-01"
        }, {
          personName: "王宜宏",
          createTime: "2013-02-02"
        },

      ],
      pageinput: 0,
      itemsPerPage: 10,
      infoARR: [],
      totalPages: null,
      // previousInfo:[]






    }
  }, computed: {
    // totalPages() {

    //   return Math.ceil(this.totalPages/ this.itemsPerPage);

    // },
    // displayedItems() {
    //     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //     const endIndex = startIndex + this.itemsPerPage;
    //     return this.items.slice(startIndex, endIndex);
    // },
  },
  methods: {
    goHomePage() {



      sessionStorage.clear();
      this.$router.push('/');
    },
    goToPage(index) {
      // let getPreviousList = [];

      // let getPreviousSession = JSON.parse(sessionStorage.getItem('surveyFeedback'));
      // getPreviousList.push(getPreviousSession);
      // console.log(this.previousInfo);
      //第一頁

      console.log(index);//回傳現在頁數
      // 第一頁為0
      this.pageinput = index;//提供頁數
      this.isClickPage = !this.isClickPage;

      if (index >= 0 && index < this.totalPages) {
        this.currentPage = index + 1;
        this.activePage = this.currentPage; //他要是指定頁面

      }
      this.getFillPerson();
      // console.log(this.previousInfo);
      // let getnextSession=JSON.parse(sessionStorage.getItem('surveyFeedback'));
      // getPreviousList.push(getnextSession);
      // console.log(getPreviousList); 有執行續問題會抓到上筆session



    },



    gofeedbackPerson(index) {
      sessionStorage.setItem("selectFeedbackItem", JSON.stringify(index));
      this.$router.push('/feedbackPerson');

    },
    getFillPerson() {
      let existedSurveyid = JSON.parse(sessionStorage.getItem('surveyid'));
      let body = {
        "finishSurveyId": existedSurveyid,
        "currentPage": this.pageinput
      }

      fetch("http://localhost:8080/find_by_finish_survey_id_order_by_reg_time_desc", {
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
          this.infoARR = data.surveyFillList.content;
          if (this.infoARR.length === 0) {
            alert('別難過，沒人填寫而已')
          }

          // alert(data.message);
          // this.questionDescription = data.surveyHeadItem.description;
          // this.questionTitle = data.surveyHeadItem.title;
          // this.startDate = data.surveyHeadItem.startDay;
          // this.endDate = data.surveyHeadItem.endDay;

          sessionStorage.setItem("surveyFeedback", JSON.stringify(this.infoARR));

          //   if(this.previousInfo.length===this.pageinput){ //過去長度為0 我同請求為0
          //   this.previousInfo.push(this.infoARR);
          //   sessionStorage.setItem("surveyFeedback", JSON.stringify(this.previousInfo));
          // } 
          //   console.log(this.previousInfo);
          this.totalPages = Math.ceil(data.surveyFillList.totalElements / this.itemsPerPage);
          console.log(this.totalPages);


        })


    },



    performFeedbackAction() {
      // 執行需要在 /feedback 頁面中觸發的動作

      // setTimeout(() => {
      //   this.getFillPerson();
      // }, 500);
      // setTimeout(() => {
      //   this.gofeedbackPerson(index);
      // }, 1000);


    }

  },


  // 生命週期
  created() {

  },
  // beforeDestroy() {
  //   this.$bus.$off('feedbackAction');
  // },

  mounted() {
    const today = new Date();
    this.thisIsToday = today.getFullYear() + "-"
      + String(today.getMonth() + 1).padStart(2, '0')
      + "-" + String(today.getDate()).padStart(2, '0');


    //======================
    // this.$bus.$on('feedbackAction', () => {
    //   this.performFeedbackAction();
    // });

    // const year = today.getFullYear();
    // const month = String(today.getMonth() + 1).padStart(2, '0');
    // const day = String(today.getDate()).padStart(2, '0');
    // this.startDate = `${year}-${month}-${day}`;
    // this.endDate = `${year}-${month}-${day}`;

  }
}




</script>















<template>
  <div class="whole-body">
    <div class="upper-block">
      <div class="nav-list">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link " href="/Add">問卷</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/subQuestion">題目問項</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/feedback">填寫回饋</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/static">統計數據</a>
          </li>

        </ul>
      </div>

      <button @click="getFillPerson">參與者查詢</button>



      <!-- 下方表格 -->
      <div class="containing">
        <!-- 新增刪除按紐 -->

        <table class="table">


          <thead class="table-light">


            <tr>
              <!-- 表頭 -->
              <th scope="col">#</th>
              <th scope="col">姓名</th>
              <th scope="col">填寫時間</th>
              <th scope="col">觀看填寫細節</th>


            </tr>

          </thead>

          <tbody>
            <tr v-for="(item, index) in  infoARR" :key="index">
              <th scope="row">{{ index + 1 }}</th>

              <!-- //href="/Add" -->

              <td>{{ item.personName }}</td>
              <!-- <td v-if="item.startDay = thisIsToday && thisIsToday >= item.endDay"> 開放中 </td> -->
              <td>
                {{ item.installTime }}
              </td>

              <td><button @click="gofeedbackPerson(index)">查閱</button></td>
            </tr>
          </tbody>
        </table>

       
      </div>
      <!-- 分頁 -->
      <div class="page-part">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li class="page-item" :class="{ 'active': activePage === page }" :key="index"
              v-for="(page, index) in this.totalPages">
              <a class="page-link" v-on:click="goToPage(index)"> {{ page }}</a>
            </li>

            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>


      </div>
      <div class="goToHome">
          <button @click="goHomePage"> 回首頁 </button>
        </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

.goToHome{
  display: flex;
  align-items: center;
  justify-content: center;
}
// .reverse-function {
//   display: flex;
//   justify-content: left;
// }

.whole-body {
  width: 90vw;
  height: 90vw;
}

.page-part {
  display: flex;
  justify-content: center;
  align-items: center;
}

.upper-block {
  width: 80vw;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10vw;
}

td {
  text-align: center;
}

label {
  width: 20vw;

}

input {
  text-align: center;
}

th {
  text-align: center;
}

.survey {
  width: 80vw;
}

.table {
  margin: 10px;



}

.suevey-title {
  width: 50vw;
}

.form-control {
  width: 25vw;
}

.time {
  display: flex;
  height: 2vw;
}

.containing {

  margin: 100px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  // align-items: center;
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