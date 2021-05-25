
/*
==============================================================
declaring global variables
==============================================================
*/
const incomeTable = document.getElementById('table_income');
const expenseTable = document.getElementById('table_expenditure');
const balance = document.querySelector('.balance_output');
const curbalance = document.querySelector('.curbalance');
const curincome = document.querySelector('.curincome');
const curiexpense = document.querySelector('.curiexpense');
const description = document.querySelector('#description');
const amount = document.querySelector('#amount');
const dateItm = document.querySelector('#date');
const totalIncome = document.querySelector('.container_first--ivalue');
const totalExpense = document.querySelector('.container_first--evalue');
const fieldset = document.querySelector('.fieldset')
const showFields = document.querySelector('.btn_trans')
const btnSavInc = document.querySelector('.edit');
const btnSavExp = document.querySelector('.editEx');
const incomeLegend = document.getElementById("income-legend");
const expenseLegend = document.getElementById("expense-legend");

let rIndex
let rIndex2
let income_array = new Array();
let expenses_array = new Array();
getIncomeData();
getExpenseData();


/*
==============================================================
formating Date
==============================================================
*/
function getTime() {
    let currentDate = new Date()
    let dateFormat = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes()
    return dateFormat;
}

/*
==============================================================
reset all input values to initial
==============================================================
*/
function inputFields() {
    description.value = "";
    amount.value = "";
    dateItm.value = "";
}

/*
==============================================================
Formating currency
==============================================================
*/
const formatter = new Intl.NumberFormat('de-DE', { style: "currency", currency: "EUR" });

/*
==============================================================
get incomes data from localStorage
==============================================================
*/
function getIncomeData() {
    let income_string = localStorage.getItem('incomeData');
    if (income_string != null)
        income_array = JSON.parse(income_string);
}

/*
==============================================================
get expenses data from localStorage
==============================================================
*/
function getExpenseData() {
    let expenses_string = localStorage.getItem('expensesData');
    if (expenses_string != null)
        expenses_array = JSON.parse(expenses_string);
}

/*
==============================================================
 Update income_array and add data to localStorage 
==============================================================
*/
function pushIncomesData() {
    getIncomeData();
    //= push data into income_array and generate table with it =
    income_array.push({
        description: description.value,
        amount: (amount.value).replace(/\,/g, ''),
        dateItm: getTime(),
    })
    //====== set items on localStorage
    localStorage.setItem('incomeData', JSON.stringify(income_array))
    incomeGenerator();
    chartHeight();
}


/*
==============================================================
 Update expenses_array and addData to localStorage 
==============================================================
*/
function pushExpenses() {
    getExpenseData();
    //= push data into expenses_array and generate table with it =
    expenses_array.push({
        description: description.value,
        amount: (amount.value).replace(/\,/g, ''),
        dateItm: getTime(),
    })
    //====== set items on localStorage
    localStorage.setItem('expensesData', JSON.stringify(expenses_array))
    ExpGenerator();
    chartHeight();
}


/*
==============================================================
Generator for Income Table 
==============================================================
*/
function incomeGenerator() {
    getIncomeData();

    //======== delete duplicate table row if it exist ========
    let tableLength = incomeTable.rows.length;
    while (--tableLength) {
        incomeTable.deleteRow(tableLength)
    }

    for (i = 0; i < income_array.length; i++) {
        let rows = `<tr>
        <th>${'0' + (i + 1)}</th>
        <th class="desc-ths">${income_array[i].description}</th>
        <th>${new Intl.NumberFormat().format(Math.round(income_array[i].amount))}</th>       
        <th>${income_array[i].dateItm}</th>
        <th class="btn-ths"><button class="edit-icon" onclick="populateIncomeInput(this)"><i class="far fa-edit"></i></button>
        <button class="delete-icon" onclick="deleteIncomeRow(this)"><i class="far fa-trash-alt"></i></button></th>
     </tr>`
        incomeTable.innerHTML += rows
    }
}
incomeGenerator();

/*
==============================================================
EditIncomeData function for Income Table 
==============================================================
*/

function populateIncomeInput(td) {
    rIndex = td.parentElement.parentElement
    const btnSel = document.querySelector(".select");
    const btnCanc = document.querySelector(".cancel");

    description.value = rIndex.cells[1].innerHTML;
    amount.value = rIndex.cells[2].innerHTML;

    btnSavExp.style.display = 'none';
    btnSavInc.style.display = 'block';
    btnSel.style.display = 'none';
    btnData.style.display = 'none';
    btnCanc.style.display = 'block';
    fieldset.style.display = 'block';
    showFields.style.display = "none";
    fieldset.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
}

//=========== save edited data ========//
btnSavInc.addEventListener('click', function () {
    if (rIndex.rowIndex) {
        let curIndex = rIndex.rowIndex - 1
        if (checkInputs() === true) {
            income_array[curIndex].description = description.value;
            income_array[curIndex].amount = (amount.value).replace(/\,/g, '');
            incomeTable.rows[rIndex.rowIndex].cells[1].innerHTML = description.value;
            incomeTable.rows[rIndex.rowIndex].cells[2].innerHTML = `${new Intl.NumberFormat().format(Math.round((amount.value).replace(/\,/g, '')))}`
        }
    }
    //====== set income_array to localStorage ======
    localStorage.setItem('incomeData', JSON.stringify(income_array));
    totalIncomes();
    accountBalance();
    chartHeight();
    incomeLegend.innerHTML = "";
    expenseLegend.innerHTML = "";
    drawDougnutChart();
    drawPieChartExp();
})


/*
==============================================================
deleteIncomeRow function for Income Table
==============================================================
*/
function deleteIncomeRow(row) {

    if (confirm('Please Confirm Data Deletion')) {
        let curRowIndex = row.parentNode.parentNode.rowIndex;
        for (i = 0; i < income_array.length; i++) {
            if (curRowIndex - 1 === i) {
                income_array[i].description = "";
                income_array[i].amount = "";
                income_array[i].dateItm = "";
                income_array.splice(i, 1);
            }
        }
        //====== set income_array to localStorage ======
        localStorage.setItem('incomeData', JSON.stringify(income_array))
        incomeTable.deleteRow(curRowIndex)
        totalIncomes();
        accountBalance();
        chartHeight();
        incomeLegend.innerHTML = "";
        expenseLegend.innerHTML = "";
        drawDougnutChart();
        drawPieChartExp();
    }
}

/*
==============================================================
Generator for Expenses Table
==============================================================
*/
function ExpGenerator() {
    getExpenseData();
    //=========== delete duplicate table row if it exist ========
    let tableLength = expenseTable.rows.length;
    while (--tableLength) {
        expenseTable.deleteRow(tableLength)
    }

    for (i = 0; i < expenses_array.length; i++) {
        let row = `<tr>
        <th>${'0' + (i + 1)}</th>
        <th class="desc-ths">${expenses_array[i].description}</th>
        <th>${new Intl.NumberFormat().format(Math.round(expenses_array[i].amount))}</th>     
        <th>${expenses_array[i].dateItm}</th>
        <th class="btn-ths"><button class="edit-icon1" onclick="populateExpenseInput(this)"><i class="far fa-edit"></i></button>
        <button class="delete-icon1" onclick= "deleteExpenseRow(this)"><i class="far fa-trash-alt"></i></button></th>
     </tr>`
        expenseTable.innerHTML += row
    }
}
ExpGenerator();

/*
==============================================================
EditExpenseData function for Expense Table
==============================================================
*/
function populateExpenseInput(td) {
    rIndex2 = td.parentElement.parentElement
    const btnSel = document.querySelector(".select");
    const btnCanc = document.querySelector(".cancel");

    description.value = rIndex2.cells[1].innerHTML;
    amount.value = rIndex2.cells[2].innerHTML;

    btnSavExp.style.display = 'block';
    btnSavInc.style.display = 'none';
    btnSel.style.display = 'none';
    btnData.style.display = 'none';
    btnCanc.style.display = 'block';
    fieldset.style.display = 'block';
    showFields.style.display = "none";
    fieldset.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
}

//=========== save edited data ========//
btnSavExp.addEventListener('click', function () {
    if (rIndex2.rowIndex) {
        let curIndex = rIndex2.rowIndex - 1
        expenses_array[curIndex].description = description.value;
        expenses_array[curIndex].amount = (amount.value).replace(/\,/g, '');
        expenseTable.rows[rIndex2.rowIndex].cells[1].innerHTML = description.value;
        expenseTable.rows[rIndex2.rowIndex].cells[2].innerHTML = `${new Intl.NumberFormat().format(Math.round((amount.value).replace(/\,/g, '')))}`
    }
    //====== set expenses_array to localStorage ======
    localStorage.setItem('expensesData', JSON.stringify(expenses_array))
    totalExpenses();
    accountBalance();
    chartHeight();
    incomeLegend.innerHTML = "";
    expenseLegend.innerHTML = "";
    drawDougnutChart();
    drawPieChartExp();
})


/*
==============================================================
deleteExpenseRow function for Expenses Table 
==============================================================
*/
function deleteExpenseRow(row) {
    if (confirm('Please Confirm Data Deletion')) {
        let curRowIndex = row.parentNode.parentNode.rowIndex;
        for (i = 0; i < expenses_array.length; i++) {
            if (curRowIndex - 1 === i) {
                expenses_array[i].description = "";
                expenses_array[i].amount = "";
                expenses_array[i].dateItm = "";
                expenses_array.splice(i, 1);
            }
        }
        //====== set expenses_array to localStorage ======
        localStorage.setItem('expensesData', JSON.stringify(expenses_array));
        expenseTable.deleteRow(curRowIndex);
        totalExpenses();
        accountBalance();
        chartHeight();
        incomeLegend.innerHTML = "";
        expenseLegend.innerHTML = "";
        drawDougnutChart();
        drawPieChartExp();
    }
}


/*
==============================================================
input fields validation functions
==============================================================
*/
function setErrorStyle(input, span, msg) {
    input.style.borderColor = 'red'
    document.querySelector(span).innerHTML = msg;
    document.querySelector(span).style.display = 'block';
}

function setSuccessStyle(input, span) {
    input.style.borderColor = 'green'
    document.querySelector(span).style.display = 'none';
}


function checkInputs() {
    let isValid = true;
    let message = ['Description is required', 'Amount is required', 'Please enter valid number']
    const regex = /^[0-9, ,,.]+$/;

    if (description.value.trim() === "" || description.value.trim() === null) {
        setErrorStyle(description, '.error-msgdesc', message[0])
        isValid = false
    } else {
        setSuccessStyle(description, '.error-msgdesc');
    }

    if (!amount.value.match(regex)) {
        setErrorStyle(amount, '.error-msgamt', message[2])
        isValid = false
    } else {
        setSuccessStyle(amount, '.error-msgamt');
    }

    return isValid
}


/*
==============================================================
function to select income & expenditure 
==============================================================
*/
const btnData = document.querySelector('.btn_submit')
btnData.addEventListener('click', selectCategory)

function selectCategory() {
    const select = document.querySelector('input[name="select"]:checked').value;
    if (checkInputs() === true) {
        if (select == 'income') {
            pushIncomesData();

        } else if (select == 'expenses') {
            pushExpenses();

        } else { }
        inputFields()
        fieldset.style.display = "none"
        showFields.style.display = "block"
    }
}

/*
==============================================================
function to sum up Income
==============================================================
*/
btnData.addEventListener('click', totalIncomes)
function totalIncomes() {

    let incomeAmt = (JSON.parse(window.localStorage.getItem('incomeData')));

    if (incomeAmt) {
        let icomeSummary = incomeAmt.map((total => ((total.amount).replace(/\,/g, ''))))
        let reducer = icomeSummary.reduce(function (prev, curr) {
            return (Number(prev || 0)) + (Number(curr || 0));
        }, 0);

        totalIncome.textContent = `Total Incomes: ${formatter.format(reducer)}`
        localStorage.setItem('income', reducer);

        curincome.textContent = `${formatter.format((JSON.parse(window.localStorage.getItem('income'))))}`
    }
}
totalIncomes();
totalIncome.textContent = `Total Incomes: ${formatter.format((JSON.parse(window.localStorage.getItem('income'))))}`
curincome.textContent = `${formatter.format((JSON.parse(window.localStorage.getItem('income'))))}`


/*
==============================================================
function to sum up Expenses
==============================================================
*/
btnData.addEventListener('click', totalExpenses)

function totalExpenses() {

    let expensesAmt = (JSON.parse(window.localStorage.getItem('expensesData')));

    if (expensesAmt) {
        let expenseSummary = expensesAmt.map((total => ((total.amount).replace(/\,/g, ''))))
        let reducer = expenseSummary.reduce(function (prev, curr) {
            return (Number(prev || 0)) + (Number(curr || 0));
        }, 0);
        totalExpense.textContent = `Total Expenses: ${formatter.format(reducer)}`
        localStorage.setItem('expenses', reducer);

        curiexpense.textContent = `${formatter.format((JSON.parse(window.localStorage.getItem('expenses'))))}`
    }
}
totalExpenses();
totalExpense.textContent = `Total Expenses: ${formatter.format((JSON.parse(window.localStorage.getItem('expenses'))))}`
curiexpense.textContent = `${formatter.format((JSON.parse(window.localStorage.getItem('expenses'))))}`


/*
==============================================================
Acount Ballance Function
==============================================================
*/
btnData.addEventListener('click', accountBalance);

function accountBalance() {

    const incomes = (JSON.parse(window.localStorage.getItem('income')));
    const expenses = (JSON.parse(window.localStorage.getItem('expenses')));
    let result = (Number(incomes)) - (Number(expenses));
    localStorage.setItem('accBalance', result)

    if (result <= 0 || result == isNaN) {
        balance.style.color = 'red'
        curbalance.style.color = 'red'
    } else {
        balance.style.color = 'blue'
        curbalance.style.color = 'blue'
    }
    balance.textContent = `You have ${formatter.format(result)} in your account`
    curbalance.textContent = `Current Balance: ${formatter.format(result)}`
}
accountBalance();
balance.textContent = `You have: ${formatter.format((JSON.parse(window.localStorage.getItem('accBalance'))))}`
curbalance.textContent = `Current Balance: ${formatter.format((JSON.parse(window.localStorage.getItem('accBalance'))))}`
