const balance = document.querySelector('.balance_output')
const description = document.querySelector('#description')
const amount = document.querySelector('#amount')
const totalIncome = document.querySelector('.container_second--income')
const totalExpense = document.querySelector('.container_second--expenditure')
const incomeInput = document.querySelector('#incomeInput')
const expenInput = document.querySelector('#expenInput')

let sum
    //letarray = new Array();
    //let array = new Array();
let array = new Array()
addData()
    // ============== formating Date =======================

let currentDate = new Date()
let dateFormat = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes()

//======================= getData
function addData() {
    let string = localStorage.getItem('localData');
    // convert string to array
    if (string != null)
        array = JSON.parse(string);
}


//======================= addData
/*function pushIncomesData() {
    addData();

    // create the tables by pushing all cells into the array
    array.push({
            description: description.value,
            amount: amount.value,

        })
        // set items on localStorage
    localStorage.setItem('localData', JSON.stringify(array))
    displayIncomeGenerator();


}*/

function pushIncomesDataa() {
    addData();

    // create the tables by pushing all cells into the array
    array.push({
            description: description.value,
            amount: amount.value,

        })
        // set items on localStorage
    localStorage.setItem('localData', JSON.stringify(array))
    displayExpensesGenerator();

}


//================onclick listener function for pushIncomesData ============

//let getdata = document.querySelector('.btn_submit')
//getdata.addEventListener('click', pushIncomesData)


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//======================= getData
/*function getarrayData() {
    let str = localStorage.getItem('localData');
    // convert string to array
    if (str != null)
        array = JSON.parse(str);
}


//======================= addData
function pusharrayData() {

    getarrayData();

    // create the tables by pushing all cells into the array
    array.push({
            description: description.value,
            amount: amount.value,
            cell3: dateFormat,
        })
        // set items on localStorage
    localStorage.setItem('localData', JSON.stringify(array))
    displayarrayGenerator();

}*/

//================onclick listener function for pusharrayData ============

//let getsdata = document.querySelector('.btn_submit')
//getsdata.addEventListener('click', pusharrayData)


//================Generator for array Table =================
function displayExpensesGenerator() {

    addData();

    let table2 = document.getElementById('table_expenditure');
    // preventing table from duplication
    let x = table2.rows.length;
    while (--x) {
        table2.deleteRow(x)
    }

    for (let j = 0; j < array.length; j++) {
        let rows = table2.insertRow();
        let cell1 = rows.insertCell();
        let cell2 = rows.insertCell();
        let cell3 = rows.insertCell();
        cell1.textContent = array[j].description;
        cell2.setAttribute('class', 'amount_cell');
        cell2.textContent = array[j].amount;
        cell3.textContent = array[j].dateFormat;


    }
}


//=====================onclick function for income & expenditure selection ==========

const btnData = document.querySelector('.btn_submit')
btnData.addEventListener('click', function() {
    let select = document.getElementById('Income_expenditure').value;
    if (select == 'Income') {
        pushIncomesData();
        // } else if (select == 'Expenditure') {
        //   pushIncomesDataa();
    } else {}

})


//======================onclick listener function for income =======================

let btnIncome = document.querySelector('.btn_submit')

function totalIncomes() {
    btnIncome.addEventListener('click', function() {
        let tbl = document.getElementById('table_income').getElementsByTagName("td");
        let sum = 0;
        for (let i = 0; i < tbl.length; i++) {
            if (tbl[i].className == "amount_cell") {
                sum += isNaN(tbl[i].innerHTML) ? 0 : parseInt(tbl[i].innerHTML);
            }
        }
        totalIncome.textContent = `Total Incomes are ${sum.toFixed(2)} €`
        incomeInput.textContent = `${sum.toFixed(2)}`
    })
}
totalIncomes()

//================onclick listener function for Expenses ============

let btnExp = document.querySelector('.btn_submit')

function totalExpenses() {
    btnExp.addEventListener('click', function() {
        let tbl = document.getElementById('table_expenditure').getElementsByTagName("td");
        let sum = 0;
        for (let i = 0; i < tbl.length; i++) {
            if (tbl[i].className == "amount_cell") {
                sum += isNaN(tbl[i].textContent) ? 0 : parseInt(tbl[i].textContent);
            }
        }
        totalExpense.textContent = `Total Expenses are ${sum.toFixed(2)} €`
        expenInput.textContent = `${sum.toFixed(2)} €`

    })
}
totalExpenses()


//======================== Acount Ballance Function =========================
let result
let accBal = document.querySelector('.btn_submit')
accBal.addEventListener('click', accountBalance)

function accountBalance() {

    let incomes = document.querySelector('#incomeInput').textContent
    let expenses = document.querySelector('#expenInput').textContent
    let result = parseInt(incomes) - parseInt(expenses);

    balance.textContent = `You have ${result} € in your account`

    if (result <= 0 || result == isNaN) {
        balance.style.color = 'red'

    } else {
        balance.style.color = 'blue'
    }
}

function clearStorage() {
    localStorage.clear();
}
clearStorage();