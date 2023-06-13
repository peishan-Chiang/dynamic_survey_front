<script>
import { RouterLink, RouterView } from 'vue-router'


export default {
    components: {

    },
    data() {

        let today = new Date();  // 获取当前日期和时间
        let year = today.getFullYear();  // 获取年份
        let month = String(today.getMonth() + 1).padStart(2, '0');  // 获取月份（需要补零）
        let day = String(today.getDate()).padStart(2, '0');  // 获取日期（需要补零）
        let hours = String(today.getHours()).padStart(2, '0');  // 获取小时（需要补零）
        let minutes = String(today.getMinutes()).padStart(2, '0');  // 获取分钟（需要补零）
        let seconds = String(today.getSeconds()).padStart(2, '0');  // 获取秒数（需要补零）

        let createTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;  // 格式化为 YYYY-MM-DD HH:mm:ss
        return {
            recieveARR: [],
            selectionARR: [],
            personName: null,
            emailInfo: null,
            phoneInfo: null,
            ageInfo: null,
            createTime: createTime,
            isSelect: [],
            selectedOptions: true,  // 存儲已勾選的選項
            finishSuevey: [],
            checkOptionList: [],
          





        }
    },
    methods: {
        goStatic() {
            this.$router.push('/');
        },
        getSelectionInfo() {//from DB capture info
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
                    let contentArr = [];

                    console.log(data);
                    for (let i = 0; i < data.surveyBodyList.length; i++) {
                        let addItemArr = {
                            "surveyid": existedSurveyid,
                            "title": data.surveyBodyList[i].subQuestion,
                            "selection": data.surveyBodyList[i].subQuestionSelection.split("；"),
                            "type": data.surveyBodyList[i].type,
                            "neccassary": data.surveyBodyList[i].neccessary ? "必填" : "非必填",
                            "isDelete": false
                        };
                        contentArr.push(addItemArr);
                        console.log(addItemArr.selection);
                        console.log(contentArr);
                        sessionStorage.setItem("BodyArr", JSON.stringify(contentArr));
                        this.recieveARR = contentArr;
                        // this.selectionARR.push(addItemArr.selection);
                        console.log(this.recieveARR);
                        //=============================
                        //處理回寫確定直






                    }

                })

        },

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
                    sessionStorage.setItem("HeadArr", JSON.stringify(data));


                })


        },
         getPersonInfo() {
            this.getSelectionInfo();
            let feedbackIndex = JSON.parse(sessionStorage.getItem('selectFeedbackItem'));
            let feedback = JSON.parse(sessionStorage.getItem('surveyFeedback'));
            

            console.log(feedback)
            console.log(feedbackIndex)
            this.personName = feedback[feedbackIndex].personName;
            this.createTime = feedback[feedbackIndex].installTime;
            this.emailInfo = feedback[feedbackIndex].email;
            this.phoneInfo = feedback[feedbackIndex].phone;
            this.ageInfo = feedback[feedbackIndex].age;
            this.isSelect = feedback[feedbackIndex].finishSurveyAnswer.split(";");
            console.log(this.isSelect)
            //==============================
            const newIsSelect = [];

            Object.entries(this.isSelect).forEach(([key, value]) => {
                const indices = value.split(',').map(Number);
                newIsSelect[key] = indices;
            });

            console.log(newIsSelect);
            //[{0: [1,0,1], 1: [1,0], 2: [0,0,1], 3: [0,1], 4: [1]}]>>0:(3) [1, 0, 1]
            //==========================

            //將變成是哪一題+哪個選項+true/false
            //0 : Array(3)
           
            // 0: {sub: '台南', isChecked: true}
           
            // 1: {sub: '高雄', isChecked: false}
          
            // 2: {sub: '台北', isChecked: true}
            // 
            // 

            let surveylayout = JSON.parse(sessionStorage.getItem('BodyArr'));
            console.log(surveylayout);






            const newListbyOption = [];

            for (let j = 0; j < newIsSelect.length; j++) {
                let item = newIsSelect[j];
                let newList = [];

                for (let i = 0; i < item.length; i++) {
                    let dee = item[i];
                    let isChecked = dee === 1 ? true : false;

                    let addOption = {
                        "sub": surveylayout[j].selection[i],
                        "isChecked": isChecked
                    };

                    newList.push(addOption);
                }

                newListbyOption.push(newList);
            }

            console.log(newListbyOption);
            this.checkOptionList = newListbyOption;

            //===========================================
            //替換成boolean選項
            for (let i = 0; i < surveylayout.length; i++) {
                surveylayout[i].selection = this.checkOptionList[i];
            }

            console.log(surveylayout);
            this.finishSuevey=surveylayout;
            sessionStorage.setItem("ensureSurvey", JSON.stringify(this.finishSuevey));//確認勾選


            // for (let i = 0; i < surveylayout.length; i++) {

            //     let selectionArr = surveylayout[i].selection;
            //     for (let j = 0; j < newIsSelect.length; j++) {
            //         let selectionArrBoolean = newIsSelect[j]; // 取出每筆的01布林
            //       
            //     }





            //     console.log(newSelection);
            //     const optionsObject = selection.map((option, index) => {
            //         return {
            //             sub: option,
            //             isChecked: newIsSelect[index] === '1'
            //         };
            //     });

            // options.push(...optionsObject);
            // let addItemArr = {
            //     "surveyid": surveylayout[i].surveyid,
            //     "title": surveylayout[i].title,
            //     "selection": options,
            //     "type": surveylayout[i].type,
            //     "neccassary": surveylayout[i].neccassary,
            //     "isDelete": false
            // };

            // newSelection.push(addItemArr);
            // console.log(newSelection);
            // this.finishSuevey = newSelection;
            // console.log(this.finishSuevey);


        }
    }








    // 生命週期
    , created() {



        // if (JSON.parse(sessionStorage.getItem('addArr') !== null)){
        //     this.getsession();
        // }
    },
    mounted() {

        // if (JSON.parse(sessionStorage.getItem('HeadArr')) === null) {
        //     this.getSurveyIDInfo()
        // }
        setTimeout(() => {
            this.getSurveyIDInfo;
        }, 300);
        setTimeout(() => {
            this.getSelectionInfo;
        }, 500);

        // getSelectionInfo()
        // if (JSON.parse(sessionStorage.getItem('BodyArr')) === null) {
           
        // }

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
                <a class="nav-link active" aria-current="page" href="/feedback">填寫回饋</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/static">統計數據</a>
            </li>

        </ul>
        <button @click="getPersonInfo">呈現填寫人</button>
        <div class="print-basicInfo-area">
            <p class="text-danger">填寫時間{{ createTime }}</p>


            <label for="">姓名</label>
            <input type="text" name="" id="" v-model="this.personName" disabled>
            <label for="">Email</label>
            <input type="email" name="" id="" v-model="this.emailInfo" disabled>
            <label for="">手機</label>
            <input type="text" name="" id="" v-model="this.phoneInfo" disabled>
            <label for="">年齡</label>
            <input type="number" name="" id="" v-model="ageInfo" disabled>

        </div>





        <div class="print-ans-area">
            <!-- <button @click="getSelectionInfo">呈現填寫狀況</button> -->

            <ul>
                <li v-for="(item, index) in this.finishSuevey" :key="index" class="">
                    <p class="text-primary" >題目:{{ item.title }}</p>
                    <p class="text-primary">題型:【{{ item.type }}】</p>
                    <p class="text-danger">{{ item.neccassary }}</p>
                    <div class="flex">

                        <ol>
                            <li v-for="(option, optionIndex) in item.selection" :key="optionIndex" class="">
                                <!-- <label> -->
                                <input type="checkbox" v-model="option.isChecked" :value="option" disabled>
                                {{ option.sub }}

                                <!-- </label> -->
                            </li>
                        </ol>

                        <!-- <button
                        @click="switchDeleteModal(index)"
                        type="button"
                        class="text-xs bg-primary text-white py-1 px-2 rounded hover:bg-expense duration-300"
                    >
                        Cancel
                    </button> -->
                    </div>
                </li>
            </ul>
        </div>






    </div>
</template>

<style lang="scss" scoped>
.about {
    width: 90vw;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;

}

.print-ans-area {
    display: flex;
    justify-content: center;
    align-items: start;
}

.print-basicInfo-area {
    width: 30vw;
    margin-bottom: 5vh;
}

label {
    margin: 5px;
}

input {
    margin: 5px;
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
