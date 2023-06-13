<script>
export default {
  components: {

  },
  data() {
    return {
      startDate: null,
      endDate: null,
      items: [],
      arrList: [],
      allList: [],

      itemsPerPage: 10,
      currentPage: 1,
      isClickPage: false,
      activePage: 1,
      pageinput: 0,
      titleInput: null,
      isForTitle: false,
      status: "未確認",
      thisIsToday: null,
      totalPages: null,
      submitID: null,
      istitleBtn: false,
      isDateBtn: false,
      methodSearch: "Str",
      isApproval: false //用於偵測是否開放修改






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

    clearInput() {
      this.titleInput = null;

    },
    cleanInputDateStart() {
      this.startDate = null;

    },
    cleanInputDateEnd() {

      this.endDate = null;
    },
    getPeriodInfo() {
      this.checkAndSwapDates();//若日期相反協助轉換
      let body = { //產品名稱
        "start_day": this.startDate,
        "end_day": this.endDate,
        "currentPage": this.pageinput,
      }

      fetch("http://localhost:8080/find_by_priod", {
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
          let contentArr = [];

          console.log(data);
          // alert(data.message);

          this.items = data.surveyHeadPage.content

          console.log(this.items);



          for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].startDay > this.thisIsToday) {
              this.items[i].status = '尚未開放';
              contentArr.push(this.items[i]);
              continue;
            }
            if (this.items[i].endDay < this.thisIsToday) {
              this.items[i].status = '已結束';
              contentArr.push(this.items[i]);
              continue;
            }
            if (this.items[i].startDay <= this.thisIsToday && this.items[i].endDay >= this.thisIsToday) {
              this.items[i].status = '已經開放';
              contentArr.push(this.items[i]);
              continue;
            }
          }
          console.log(contentArr);
          this.arrList = contentArr;
          this.allList.push(this.arrList);
          // 重新计算totalPages
          this.totalPages = Math.ceil(data.surveyHeadPage.totalElements / this.itemsPerPage);
          console.log(this.totalPages);
          let Search = { //產品名稱
            "methodSearch": "getPeriodInfo"

          }

          this.methodSearch = "getPeriodInfo";


        })

    },
    getPeriodStartOrEndInfo() {
      let body = {
        "start_day": this.startDate,
        "end_day": this.endDate,
        "currentPage": this.pageinput,
      }

      fetch("http://localhost:8080/find_by_period_start_or_end", {
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
          let contentArr = [];

          console.log(data);
          // alert(data.message);

          this.items = data.surveyHeadPage.content

          console.log(this.items);



          for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].startDay > this.thisIsToday) {
              this.items[i].status = '尚未開放';
              contentArr.push(this.items[i]);
              continue;
            }
            if (this.items[i].endDay < this.thisIsToday) {
              this.items[i].status = '已結束';
              contentArr.push(this.items[i]);
              continue;
            }
            if (this.items[i].startDay <= this.thisIsToday && this.items[i].endDay >= this.thisIsToday) {
              this.items[i].status = '已經開放';
              contentArr.push(this.items[i]);
              continue;
            }
          }
          console.log(contentArr);
          this.arrList = contentArr;
          this.allList.push(this.arrList);
          // 重新计算totalPages
          this.totalPages = Math.ceil(data.surveyHeadPage.totalElements / this.itemsPerPage);
          console.log(this.totalPages);
          this.methodSearch = "getPeriodStartOrEndInfo";

        })

    },
    getTitleAndPeriodInfo() {
      this.checkAndSwapDates();//若日期相反協助轉換
      let body = { //產品名稱
        "start_day": this.startDate,
        "end_day": this.endDate,
        "currentPage": this.pageinput,
        "title": this.titleInput

      }

      fetch("http://localhost:8080/find_by_title_and_period", {
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
          let contentArr = [];

          console.log(data);
          // alert(data.message);

          this.items = data.surveyHeadPage.content

          console.log(this.items);



          for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].startDay > this.thisIsToday) {
              this.items[i].status = '尚未開放';
              contentArr.push(this.items[i]);
              continue;
            }
            if (this.items[i].endDay < this.thisIsToday) {
              this.items[i].status = '已結束';
              contentArr.push(this.items[i]);
              continue;
            }
            if (this.items[i].startDay <= this.thisIsToday && this.items[i].endDay >= this.thisIsToday) {
              this.items[i].status = '已經開放';
              contentArr.push(this.items[i]);
              continue;
            }
          }
          console.log(contentArr);
          this.arrList = contentArr;
          this.allList.push(this.arrList);
          // 重新计算totalPages
          this.totalPages = Math.ceil(data.surveyHeadPage.totalElements / this.itemsPerPage);
          console.log(this.totalPages);
          this.methodSearch = "getTitleAndPeriodInfo";

        })

    },
    getPeriodAndAnotherInfo() {
      let body = { //產品名稱
        "start_day": this.startDate,
        "end_day": this.endDate,
        "currentPage": this.pageinput,
        "title": this.titleInput
      }

      fetch("http://localhost:8080/find_by_title_and_one_Of_period", {
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
          let contentArr = [];

          console.log(data);
          // alert(data.message);

          this.items = data.surveyHeadPage.content

          console.log(this.items);



          for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].startDay > this.thisIsToday) {
              this.items[i].status = '尚未開放';
              contentArr.push(this.items[i]);
              continue;
            }
            if (this.items[i].endDay < this.thisIsToday) {
              this.items[i].status = '已結束';
              contentArr.push(this.items[i]);
              continue;
            }
            if (this.items[i].startDay <= this.thisIsToday && this.items[i].endDay >= this.thisIsToday) {
              this.items[i].status = '已經開放';
              contentArr.push(this.items[i]);
              continue;
            }
          }
          console.log(contentArr);
          this.arrList = contentArr;
          this.allList.push(this.arrList);
          // 重新计算totalPages
          this.totalPages = Math.ceil(data.surveyHeadPage.totalElements / this.itemsPerPage);
          console.log(this.totalPages);
          this.methodSearch = "getPeriodAndAnotherInfo";
        })


    },





    submitSurvey(surveyid) { //取得問卷ID
      console.log(surveyid);
      sessionStorage.setItem("surveyid", JSON.stringify(surveyid));
      //   this.submitID=surveyid;
      this.$emit("emitPush")

    },
    goStaticPure() {
      sessionStorage.clear();
      this.$router.push('/Add');
    },


    // goStatic() {
    //   
    // },
    goToPage(index) {
      console.log(index);//回傳現在頁數
      // 第一頁為0
      this.pageinput = index;//提供頁數
      this.isClickPage = !this.isClickPage;

      if (index >= 0 && index < this.totalPages) {
        this.currentPage = index + 1;
        this.activePage = this.currentPage; //他要是指定頁面

      }
      if (this.methodSearch === "getPeriodStartOrEndInfo") {
        this.getPeriodStartOrEndInfo();
      }
      else if (this.methodSearch === "titleGetInfo") {
        this.titleGetInfo();
      }
      else if (this.methodSearch === "getTitleAndPeriodInfo") {
        this.getTitleAndPeriodInfo();
      }
      else if (this.methodSearch === "getPeriodAndAnotherInfo") {
        this.getPeriodAndAnotherInfo();
      }
      else if (this.methodSearch === "getPeriodInfo") {
        this.getPeriodInfo();
      }
      else if (this.methodSearch === "getWholeInfo") {
        this.getWholeInfo();
      }

    },
    getWholeInfo() {//空值搜尋所有資料
      let body = { //產品名稱
        "currentPage": this.pageinput
      }

      fetch("http://localhost:8080/find_by_all_colume", {
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
          let contentArr = [];

          console.log(data);
          // alert(data.message);

          this.items = data.surveyHeadPage.content

          console.log(this.items);



          for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].startDay > this.thisIsToday) {
              this.items[i].status = '尚未開放';
              contentArr.push(this.items[i]);
              continue;
            }
            if (this.items[i].endDay < this.thisIsToday) {
              this.items[i].status = '已結束';
              contentArr.push(this.items[i]);
              continue;
            }
            if (this.items[i].startDay <= this.thisIsToday && this.items[i].endDay >= this.thisIsToday) {
              this.items[i].status = '已經開放';
              contentArr.push(this.items[i]);
              continue;
            }
          }
          console.log(contentArr);
          this.arrList = contentArr;
          this.allList.push(this.arrList);
          // 重新计算totalPages
          this.totalPages = Math.ceil(data.surveyHeadPage.totalElements / this.itemsPerPage);
          console.log(this.totalPages);
          this.methodSearch = "getWholeInfo";
        })



    },

    titleGetInfo() { //標題搜尋

      let body = { //產品名稱
        "currentPage": this.pageinput,
        "title": this.titleInput
      }

      fetch("http://localhost:8080/find_by_title", {
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
          let contentArr = [];

          console.log(data);
          // alert(data.message);

          this.items = data.surveyHeadPage.content

          console.log(this.items);



          for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].startDay > this.thisIsToday) {
              this.items[i].status = '尚未開放';
              contentArr.push(this.items[i]);
              continue;
            }
            if (this.items[i].endDay < this.thisIsToday) {
              this.items[i].status = '已結束';
              contentArr.push(this.items[i]);
              continue;
            }
            if (this.items[i].startDay <= this.thisIsToday && this.items[i].endDay >= this.thisIsToday) {
              this.items[i].status = '已經開放';
              contentArr.push(this.items[i]);
              continue;
            }
          }
          console.log(contentArr);
          this.arrList = contentArr;
          this.allList.push(this.arrList);
          // 重新计算totalPages
          this.totalPages = Math.ceil(data.surveyHeadPage.totalElements / this.itemsPerPage);
          console.log(this.totalPages);
          this.methodSearch = "titleGetInfo";

        })

    },
    goStatic(surveyId , startDay) {
      // this.submitSurvey(surveyid);
      sessionStorage.setItem("surveyid", JSON.stringify(surveyId));
      sessionStorage.setItem("surveyStartDay", JSON.stringify(startDay));
      this.$router.push('/static');
      // alert('NOT YET，此路徑要從java運算')

      // this.$router.push({ path: '/feedback', query: { action: 'feedbackAction' }});

    },
    alertMsg() {
      alert('NOT YET')
    },getToday() {
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



  },


  // 生命週期


  mounted() {
    const today = new Date();
    this.thisIsToday = today.getFullYear() + "-"
      + String(today.getMonth() + 1).padStart(2, '0')
      + "-" + String(today.getDate()).padStart(2, '0');


    //======================

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

      <div class="survey-title">
        <div class="survey">

          <label for="title">問卷標題</label>
          <input type="text" id="title" class="suevey-title" v-model="this.titleInput" @click="clearInput()">

        </div>
        <div class="time">

          <label for="dateFrom">開始/結束</label>
          
          <input type="date" class="form-control" id="dateFrom" name="date" v-model="startDate"  @click="cleanInputDateStart()">
          <input type="date" class="form-control" id="dateTo" name="date" v-model="endDate" 
            @click="cleanInputDateEnd()">


        </div>
        
      </div>
      <div class="start-ended">
        <button v-if="this.titleInput === null && this.startDate === null && this.endDate === null" type="button"
          v-on:click="getWholeInfo">搜尋</button>
        <!-- find_by_title -->
        <button v-if="this.titleInput !== null && this.startDate === null && this.endDate === null" type="button"
          v-on:click="titleGetInfo">標題搜尋</button>

        <!-- find_by_priod -->
        <button v-if="this.startDate !== null && this.endDate !== null && this.titleInput === null" type="button"
          v-on:click="getPeriodInfo">期間搜尋</button>

        <!-- find_by_period_start_or_end -->
        <button v-if="(this.startDate !== null && this.endDate === null) && this.titleInput === null" type="button"
          v-on:click="getPeriodStartOrEndInfo">起始後搜尋</button>
        <button v-if="(this.startDate === null && this.endDate !== null) && this.titleInput === null" type="button"
          v-on:click="getPeriodStartOrEndInfo">截止前搜尋</button>

        <!-- find_by_title_and_period -->
        <button v-if="this.startDate !== null && this.endDate !== null && this.titleInput !== null" type="button"
          v-on:click="getTitleAndPeriodInfo">標題與範圍日期</button>

        <!-- find_by_title_and_one_Of_period -->
        <button v-if="this.startDate !== null && this.endDate === null && this.titleInput !== null" type="button"
          v-on:click="getPeriodAndAnotherInfo">標題與起迄任一日期</button>
        <button v-if="this.startDate === null && this.endDate !== null && this.titleInput !== null" type="button"
          v-on:click="getPeriodAndAnotherInfo">標題與起迄任一日期</button>
      </div>


      <!-- <div class="start-ended">

       
        <button v-if="this.istitleBtn" type="button" v-on:click="titleGetInfo">標題搜尋</button>
        <button v-if="this.isDateBtn" type="button" v-on:click="titleGetInfo">日期搜尋</button>
      </div> -->


    </div>




    <!-- 下方表格 -->
    <div class="containing">
      <!-- 新增刪除按紐 -->
      <div class="reverse-function">

        <button><i class="fa-solid fa-plus" v-on:click="goStaticPure"></i></button>
        <button> <i class="fa-solid fa-trash" @click="alertMsg()"></i></button>
      </div>
      <table class="table">


        <thead class="table-light">


          <tr>
            <!-- 表頭 -->
            <th scope="col">#</th>
            <th scope="col">Check</th>
            <th scope="col">問卷ID</th>
            <th scope="col">問卷標題</th>
            <th scope="col">狀態</th>
            <th scope="col">開始時間</th>
            <th scope="col">結束時間</th>
            <th scope="col">統計內容</th>

          </tr>

        </thead>

        <tbody>
          <tr v-for="(item, index) in arrList" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td><input type="checkbox" name="" id="" :disabled="item.startDay < getToday()"></td>
            <!-- //href="/Add" -->
            <td><a :href="item.startDay <= getToday() ? null : '/Add'" @click="submitSurvey(item.surveyId)">{{ item.surveyId }}</a></td>
            <td>{{ item.title }}</td>
            <!-- <td v-if="item.startDay = thisIsToday && thisIsToday >= item.endDay"> 開放中 </td> -->
            <td>
              {{ item.status }}
            </td>
            <td>{{ item.startDay }}</td>
            <td>{{ item.endDay }}</td>
            <td><button v-if="item.endDay<getToday()" @click="goStatic(item.surveyId,item.startDay)">Detail</button></td>
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
          <!-- <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li> -->
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>


    </div>

  </div>
</template>


<style lang="scss" scoped>
.reverse-function {
  display: flex;
  justify-content: left;
}

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

label {
  width: 20vw;
}

input {
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

.error-message {
  color: red;


}
button{
    background: rgb(96, 88, 65);
    border: 2px solid rgb(235, 234, 217);
    border-radius: 5px;
    color: rgb(247, 246, 235);
    transition: 0.8s;
}
button:hover{
    background: rgb(45, 44, 42);
    border: 2px solid rgb(231, 229, 187);
    border-radius: 5px;
    color: rgb(184, 182, 159);

}
button:active{
   scale:0.6;
}
</style>