<script>
import { RouterLink, RouterView } from 'vue-router'


export default {
    components: {

    },
    data() {
        return {
            items: [
                // {
                //     question: '台式便當會想吃哪一家', //頂多8碼
                //     type: '單選題',
                //     needed: true,
                //     content: "aaa;fff;ddd"



                // },
                // {
                //     question: '日式便當會想吃哪一家', //頂多8碼
                //     type: '單選題',
                //     needed: true,
                //     content: "ccc;bbb;ddd"
                // },
                // {
                //     question: '台式便當會想吃哪一家', //頂多8碼
                //     type: '單選題',
                //     needed: true,
                //     content: "rrr;sss;ddd"
                // },
                // {
                //     question: '泰式便當會想吃哪一家', //頂多8碼
                //     type: '單選題',
                //     needed: true,
                //     content: "ppp;www;ddd"
                // },
                // {
                //     question: '中式便當會想吃哪一家', //頂多8碼
                //     type: '單選題',
                //     needed: true,
                //     content: "qqq;www;ddd"
                // },
                // {
                //     question: '美式便當會想吃哪一家', //頂多8碼
                //     type: '單選題',
                //     needed: true,
                //     content: "ccc;bbb;ddd"
                // },
                // {
                //     question: '越式便當會想吃哪一家', //頂多8碼
                //     type: '單選題',
                //     needed: true,
                //     selection: "ccc;bbb;ddd"
                // },
                // {
                //     question: '粵式便當會想吃哪一家', //頂多8碼
                //     type: '複選題',
                //     needed: true,
                //     content: "ccc;bbb;ddd"
                // },

            ],


            addArrList: [],
            //以10筆作切割
            itemsPerPage: 10,
            currentPage: 1,
            pageinput: 0,
            isClickPage: false,
            activePage: 1,
            subTitle: "",
            selection: "單選題",
            neededchecked: false,
            contentSelect: null,
            chosenIndex: null,
            modifyIndex: null,
            checkIndex: null,
            checkList: [],
            isDelete: false,
            totalPages: null,
            showPages: [], //要呈現的迴圈  
            surveyidGet: null,
            insertData: [],
            isEdit: false,
            isAdd: true,
            surveyTimeStatus: null,
            isDisable:false,
            isAddSelection:true,
            todayDay:null







        }
    },
    computed: {
        // totalPages() {
        //     return Math.ceil(this.items.length / this.itemsPerPage);
        // },
        // displayedItems() {
        //     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        //     const endIndex = startIndex + this.itemsPerPage;
        //     return this.items.slice(startIndex, endIndex);
        // },
    },
    methods: {
        preDataDelete() {
            let existedSurveyid = JSON.parse(sessionStorage.getItem('surveyid'));
            let body = {
                "surveyId": existedSurveyid

            }

            fetch("http://localhost:8080/delete_survey_selection", {
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




                })



        },




        goStatic() {

            if(this.isDisable===true){
                sessionStorage.clear();
                this.$router.push('/');
            }else{

            if (confirm("確定要離開嗎?已經送出選項了嗎?我不會存檔喔~")) {
                // 使用者點擊了"確定"
                sessionStorage.clear();
                this.$router.push('/');

            } else {
                // 使用者點擊了"取消"
                // 跳出拒絕動作或執行其他操作
                history.go(0);

            }}


        },
        goToPage(index) {
            console.log(index);//回傳現在頁數
            // 第一頁為0
            // console.log(page);
            this.pageinput = index;//提供頁數
            this.isClickPage = !this.isClickPage;

            if (index >= 0 && index < this.totalPages) {
                this.currentPage = index + 1;
                this.activePage = this.currentPage; //他要是指定頁面

            }
            this.getsession();
        },
        showSubQuestion(index) {

            this.isEdit = true;
            this.isAdd = false;
            if(this.isDisable===true){
            this.isEdit = false;
            this.isAdd = false;
            this.isAddSelection=false;
            }
            
            console.log(index);
            this.modifyIndex = index;
            this.subTitle = this.addArrList[index].title;
            this.selection = this.addArrList[index].type;
            this.neededchecked = this.addArrList[index].neccassary;
            this.contentSelect = this.addArrList[index].selection;


        },
        changeSelection() {
            // this.isEdit = !this.isEdit;
            let updateArr = [];
            let existedArr = JSON.parse(sessionStorage.getItem('addArr'));
            let existedSurveyid = JSON.parse(sessionStorage.getItem('surveyid'));
            let existedSurveyHead = JSON.parse(sessionStorage.getItem('existedSurveyHead'));
            let addItemArr = {
                "surveyid": existedSurveyid,
                "title": this.subTitle,
                "selection": this.contentSelect,
                "type": this.selection,
                "neccassary": this.neededchecked,
                "isDelete": this.isDelete

            };
            for (let i = 0; i < existedArr.length; i++) {
                if (i === this.modifyIndex) {
                    updateArr.push(addItemArr);
                }
                else {
                    updateArr.push(existedArr[i])
                }
            }
            console.log(updateArr)
            sessionStorage.clear();
            sessionStorage.setItem("addArr", JSON.stringify(updateArr));

            alert('successed')
            history.go(0);
            sessionStorage.setItem("surveyid", JSON.stringify(existedSurveyid));
            sessionStorage.setItem("existedSurveyHead", JSON.stringify(existedSurveyHead));



        },
        getToday() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            
            return `${year}-${month}-${day}`;
           
        },
        addsession() { //建立資料
            let addArr = [];
            let existedSurveyid = JSON.parse(sessionStorage.getItem('surveyid'));
            let existedSurveyHead = JSON.parse(sessionStorage.getItem('existedSurveyHead'));
            let addItemArr = {
                "surveyid": existedSurveyid,
                "title": this.subTitle,
                "selection": this.contentSelect,
                "type": this.selection,
                "neccassary": this.neededchecked,
                "isDelete": false

            };
            console.log(addItemArr);
            // let existedArr = JSON.parse(sessionStorage.getItem('addArr'));


            if (sessionStorage.getItem("addArr") === null) {   // 假使內容為空，我就新增資料進來，


                addArr.push(addItemArr);
                sessionStorage.setItem("addArr", JSON.stringify(addArr));

                this.addArrList = JSON.parse(sessionStorage.getItem('addArr'));
                console.log(this.addArrList);
            }
            else {  //有值
                let getAddArr = []
                getAddArr = JSON.parse(sessionStorage.getItem('addArr')); //取出

                sessionStorage.clear();
                console.log(getAddArr);
                getAddArr.push(addItemArr);
                sessionStorage.setItem("addArr", JSON.stringify(getAddArr));

                console.log(getAddArr);
                this.addArrList = getAddArr;
                console.log(this.addArrList);





            }
            history.go(0);
            sessionStorage.setItem("surveyid", JSON.stringify(existedSurveyid));
            sessionStorage.setItem("existedSurveyHead", JSON.stringify(existedSurveyHead));
        },
        deleteList() {
            let arr = JSON.parse(sessionStorage.getItem('addArr'));    // 取出購物車內容
            let existedSurveyid = JSON.parse(sessionStorage.getItem('surveyid'));
            let existedSurveyHead = JSON.parse(sessionStorage.getItem('existedSurveyHead'));
            let deleteList = []

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].isDelete === true) {
                    deleteList.push(arr[i]);
                };
            }

            if (deleteList.length === 0) {
                alert('請勾選刪除資料');
            }


            // arr.forEach((item, index) => {
            //     if (item.isDelete ==! false) {
            //         arr.splice(index, 1);

            //     }
            // });
            arr = arr.filter(item => !deleteList.includes(item));

            console.log(arr)
            if (confirm("確定要清除資料嗎?")) {
                // 使用者點擊了"確定"
                sessionStorage.clear();
                sessionStorage.setItem("addArr", JSON.stringify(arr));

            } else {
                // 使用者點擊了"取消"
                // 跳出拒絕動作或執行其他操作
                history.go(0);
                sessionStorage.setItem("surveyid", JSON.stringify(existedSurveyid));
                console.log(arr)
            }

            history.go(0);
            sessionStorage.setItem("surveyid", JSON.stringify(existedSurveyid));
            sessionStorage.setItem("existedSurveyHead", JSON.stringify(existedSurveyHead));




        },

        getsession() { //取出資料 ->做分頁

            // this.getSelectionInfo();
            this.addArrList = JSON.parse(sessionStorage.getItem('addArr'));

            // console.log(this.totalPages);

            // let tenArr = [];

            // for (let i = 0; i <= 200; i += 10) {
            //     tenArr.push(i);
            // }

            let pageList = [];
            let tempList = [];


            for (let i = 0; i < this.addArrList.length; i++) {
                tempList.push(this.addArrList[i]);

                if (tempList.length === 10) {
                    pageList.push(tempList);
                    tempList = [];
                }
            }

            if (tempList.length > 0) {
                pageList.push(tempList);
            }

            console.log(pageList);
            this.showPages = pageList[this.pageinput];
            console.log(this.showPages);
            this.totalPages = Math.ceil(this.addArrList.length / this.itemsPerPage);

        },
        getCheckIndex(index) {
            let addArr = [];
            let modiArr = [];
            console.log(index);
            addArr = JSON.parse(sessionStorage.getItem('addArr'));
            let existedSurveyid = JSON.parse(sessionStorage.getItem('surveyid'));

            for (let i = 0; i < addArr.length; i++) {


                if (i === index && addArr[i].isDelete === true) {
                    let setUpdate = {
                        "surveyid": existedSurveyid,
                        "title": addArr[i].title,
                        "selection": addArr[i].selection,
                        "type": addArr[i].type,
                        "neccassary": addArr[i].neccassary,
                        "isDelete": false
                    }


                    modiArr.push(setUpdate);
                    continue;
                }




                if (i === index && addArr[i].isDelete === false) {
                    let setUpdate = {
                        "surveyid": existedSurveyid,
                        "title": addArr[i].title,
                        "selection": addArr[i].selection,
                        "type": addArr[i].type,
                        "neccassary": addArr[i].neccassary,
                        "isDelete": true
                    }
                    modiArr.push(setUpdate);
                    continue;
                }
                modiArr.push(addArr[i]);


                //

                // sessionStorage.clear();
            }
            console.log(modiArr)
            sessionStorage.setItem("addArr", JSON.stringify(modiArr));
            sessionStorage.setItem("surveyid", JSON.stringify(existedSurveyid));




        },
        deIsdelete() { //另外存儲不包含isDelete屬性的JSON資料結構。

            let addArr = JSON.parse(sessionStorage.getItem('addArr'));
            const newData = addArr.map(item => {
                const { isDelete, ...newItem } = item;
                return newItem;
            });
            console.log(newData)


            const List2 = [];

            newData.forEach(item => {
                const question = {
                    surveyId: item.surveyid,
                    surveyQuestionTitle: item.title,
                    surveyQuestionType: item.type,
                    neccessary: item.neccassary,
                    surveySelection: item.selection
                };

                List2.push(question);
            });
            console.log(List2)
            this.insertData = List2;
            console.log(this.insertData)
            sessionStorage.setItem("saveSession", JSON.stringify(this.insertData));
        },
        selectionFetch() {

            let SaveArr = JSON.parse(sessionStorage.getItem('saveSession'));;
            console.log(SaveArr)


            let body = {
                "quesiton_list": JSON.parse(sessionStorage.getItem('saveSession'))
            }

            fetch("http://localhost:8080/create_survey_selection", {
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
                    alert(data.message)
                })



        },



        importSelection() {//新增問卷進入資料庫
            if (confirm("確定要建立問卷問項了嗎?每一題目都要題目跟選項喔")) {
                // 使用者點擊了"確定"
                this.preDataDelete();
                setTimeout(() => {
                    this.deIsdelete();
                    this.selectionFetch();
                }, 1000);
                // setTimeout(() => {
                //     alert(`successed`)
                // }, 5000);


                // this.selectionFetch();

            } else {
                // 使用者點擊了"取消"
                // 跳出拒絕動作或執行其他操作

            }














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

                    // console.log(data);


                    for (let i = 0; i < data.surveyBodyList.length; i++) {
                        let addItemArr = {  //must same as add-structure
                            "surveyid": existedSurveyid,
                            "title": data.surveyBodyList[i].subQuestion,
                            "selection": data.surveyBodyList[i].subQuestionSelection,
                            "type": data.surveyBodyList[i].type,
                            "neccassary": data.surveyBodyList[i].neccessary,
                            "isDelete": false

                        };
                        contentArr.push(addItemArr);
                        console.log(contentArr);
                        sessionStorage.setItem("addArr", JSON.stringify(contentArr));
                        // this.getsession();
                    }

                })

        }






    },

    // 生命週期
    created() {

        if (JSON.parse(sessionStorage.getItem('addArr') === null)) {
            this.getSelectionInfo();
        }
        setTimeout(() => {
            if (JSON.parse(sessionStorage.getItem('addArr') !== null)) {
                this.getsession();
            }
        }, 500);

    },
    mounted() {
        let existedSurveyHead = JSON.parse(sessionStorage.getItem('existedSurveyHead'));
        let surveyStartDay= JSON.parse(sessionStorage.getItem('surveyStartDay'));
        let getToday=this.getToday();
        // console.log(existedSurveyHead.startDay)
        // console.log(getToday)
        // this.surveyTimeStatus = existedSurveyHead.startDay;
        // console.log(this.surveyTimeStatus);
        if(surveyStartDay< getToday){
            this.isDisable=true;
            if(this.isDisable===true){
            this.isEdit = false;
            this.isAdd = false;
            this.isAddSelection=false;
            }
        }
        // if (JSON.parse(sessionStorage.getItem('addArr') !== null)) {


        // setTimeout(() => {
        //     if (JSON.parse(sessionStorage.getItem('addArr') !== null)) {
        //     this.getsession();
        // }
        // }, 500);


    }
}




</script>



<template>
    <div class="about">

        <!-- <button @click="getSelectionInfo()">TEST</button> -->
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link " href="/Add">問卷</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/subQuestion">題目問項</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/feedback">填寫回饋</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/static">統計數據</a>
            </li>

        </ul>
    </div>
    <div class="question-layout">
        <div class="upper-area">
            <div class="left-area">
                <div class="content">
                    <label for="subtitle">子問項題目</label>
                    <input id="subtitle" type="text" placeholder="議題下，想收集的問題" v-model="this.subTitle">
                </div>
                <div class="content">
                    <label for="subSelection">子問項選項</label>
                    <input id="subSelection" type="text" placeholder="問題下，要提供的選項" v-model="this.contentSelect">
                    <h6 class="text-danger">選項之間，請用【ctrl+『;』】分隔</h6>
                </div>

            </div>
            <div class="right-area">

                <select name="" id="tool" v-model="selection">
                    <option value="單選題">單選題</option>
                    <option value="複選題">複選題</option>
                </select>
                <label for="neccessary">必填</label>

                <input type="checkbox" name="" id="neccessary" @click="" v-model="neededchecked">
                <div class="addAndEdit">
                    <button v-if="this.isAdd" type="button" v-on:click="addsession()" 
                        >新增</button>
                    <button v-if="this.isEdit" type="button" v-on:click="changeSelection()"
                        >編輯</button>
                <div class="d-grid gap-2 d-md-block">
                    <button v-if="this.isDisable" type="button" class="btn btn-secondary btn-lg disabled" disabled>Read Only</button>
                </div>
                </div>

            </div>


        </div>
        <div class="table-area">
            <button v-if="this.isAddSelection" type="button" @click="deleteList()"> <i class="fa-solid fa-trash"></i></button>
        </div>


        <table class="table">


            <thead class="table-light">


                <tr>
                    <!-- 表頭 -->

                    <th scope="col">Check</th>
                    <th scope="col">#</th>
                    <th scope="col">子問項</th>
                    <th scope="col">種類</th>
                    <th scope="col">必填</th>
                    <th scope="col">子項目選項修改</th>


                </tr>

            </thead>

            <tbody>

                <tr v-for="(item, index) in showPages" :key="index">
                    <td><input type="checkbox" name="" id="" @click="getCheckIndex(index)" v-model="item.isDelete"></td>
                    <th scope="row">{{ index + 1 }}</th>

                    <td>{{ item.title }}</td>
                    <td>{{ item.type }}</td>
                    <td><input type="checkbox" v-model="item.neccassary"></td>
                    <td><button v-on:click="showSubQuestion(index)">modify</button></td>
                </tr>

            </tbody>
            <!-- {{ this.isDisable }} -->
        </table>

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
                        <a class="page-link" v-on:click="goToPage(index)"> {{ index + 1 }}</a>
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

        <div class="button-area">
            <button type="button" v-on:click="goStatic()">
                取消(回首頁)
            </button>
            <button v-if="isAddSelection" type="button" v-on:click="importSelection()">
                創建問卷問項
            </button>
            <button v-if="this.isDisable" type="button" class="btn btn-secondary btn-lg disabled" disabled>Read Only</button>
                
        </div>

    </div>
</template>

<style lang="scss" scoped>
.about {
    width: 90vw;
    display: flex;
    justify-content: center;
    align-items: center;

}

.upper-area {
    width: 80vw;
    display: flex;
    justify-content: center;
}

.right-area {
    margin-right: 80px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
}

input {
    margin: 10px;
}

.question-layout {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
}

.table-area {
    width: 70vw;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.table {
    margin: 10px;
    width: 80vw;
    text-align: center;



}.noClick { //disable
   pointer-events: none;
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
.button-area{
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn{
    width: 8vw;
    height: 4vh;
    font-size: 10px;
    // text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

 
}
</style>
