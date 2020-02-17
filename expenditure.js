let incomeTable = document.getElementById('table_income');
let expenseTable = document.getElementById('table_expenditure');
const balance = document.querySelector('.balance_output')
const description = document.querySelector('#description')
const amount = document.querySelector('#amount')
const totalIncome = document.querySelector('.container_second--income')
const totalExpense = document.querySelector('.container_second--expenditure')
const incomeInput = document.querySelector('#incomeInput')
const expenInput = document.querySelector('#expenInput')
const hiddenAmount = document.querySelector('.amount_hidden')
const amountCell = document.getElementsByClassName('amount_cell')
const amountCellB = document.getElementsByClassName('amount_cellB')

let sum
let rIndex
let array = new Array();
let array1 = new Array();
addData();
addData1();
// ============== formating Date =======================

let currentDate = new Date()
let dateFormat = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes()


// ============ Formating currency ==============================

const formatter = new Intl.NumberFormat('fi-FI', { style: "currency", currency: "EUR" });

/*new Cleave('#incomeInput', {
    numeral: true,
    numeralIntegerScale: 8,
    prefix: '€',
    signBeforePrefix: true
});*/

// ============ Formating currency ==============================




///$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

function addData() {
    let string = localStorage.getItem('localData');
    //==== convert string to array
    if (string != null)
        array = JSON.parse(string);
}

function addData1() {
    let string = localStorage.getItem('localData');
    //===  convert string to array
    if (string != null)
        array1 = JSON.parse(string);
}

//========== addData to localStorage =======================
function pushIncomesData() {
    addData();

    //======= push data into array and generate table with it =====
    array.push({
        description: description.value,
        amount: amount.value,
    })

    //====== set items on localStorage
    localStorage.setItem('localData', JSON.stringify(array))
    incomeGenerator();
}


function pushExpenses() {
    addData1();

    //======= push data into array1 and generate table with it =====
    array1.push({
            description: description.value,
            amount: amount.value,
        })
        //====== set items on localStorage
    localStorage.setItem('localData', JSON.stringify(array1))
    ExpGenerator();
}


///$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//==================Generator for Income Table =================

function incomeGenerator() {

    let incomeTable = document.getElementById('table_income');
    let rows = incomeTable.insertRow();
    let cell1 = rows.insertCell();
    let cell2 = rows.insertCell();
    let cell3 = rows.insertCell();
    let cell4 = rows.insertCell();
    let button = document.createElement('input')
    let hiddenDiv = document.createElement('div')
    hiddenDiv.setAttribute('type', 'number')
    hiddenDiv.setAttribute('class', 'amount_cell')
    cell1.setAttribute('contentEditable', 'true');
    //cell2.setAttribute('contentEditable', 'true');
    button.setAttribute('type', 'button')
    button.setAttribute('onclick', 'deleteIncomeRow(this)')
    button.setAttribute('class', 'income_del')
    cell4.appendChild(button)
    cell1.innerHTML = description.value
        //cell2.innerHTML = amount.value
    cell2.innerHTML = formatter.format(amount.value)
    amountCell.textContent = amount.value
    cell2.appendChild(hiddenDiv)
    cell3.innerHTML = dateFormat


    //============== Changing field inputs ====================

    /*for (let i = 1; i < incomeTable.rows.length; i++) {
        incomeTable.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            // console.log(rIndex);
            description.value = this.cells[0].innerHTML;
            amount.value = this.cells[1].innerHTML;
            dateFormat = this.cells[2].innerHTML;
        };
    }
    let edit = document.querySelector('.edit')
    edit.addEventListener('click', function() {
        incomeTable.rows[rIndex].cells[0].innerHTML = description.value;
        incomeTable.rows[rIndex].cells[1].innerHTML = amount.value
        incomeTable.rows[rIndex].cells[2].innerHTML = dateFormat;
    })*/

}

//================ deleteIncomeRow() function for Income Table =================

function deleteIncomeRow(row) {
    let income = row.parentNode.parentNode.rowIndex;
    incomeTable.deleteRow(income);
}

//================Generator for Expenses Table =================

function ExpGenerator() {

    let expenseTable = document.getElementById('table_expenditure');
    let rows = expenseTable.insertRow();
    let cella = rows.insertCell();
    let cellb = rows.insertCell();
    let cellc = rows.insertCell();
    let celld = rows.insertCell();
    let btn = document.createElement('input')
    let hiddenDivE = document.createElement('div')
    hiddenDivE.setAttribute('type', 'number')
    hiddenDivE.setAttribute('class', 'amount_cellB')
    cella.setAttribute('contentEditable', 'true');
    // cellb.setAttribute('contentEditable', 'true');
    btn.setAttribute('type', 'button')
    btn.setAttribute('class', 'expense_del')
    btn.setAttribute('onclick', 'deleteExpenseRow(this)')
    celld.appendChild(btn)
    cella.innerHTML = description.value
    cellb.setAttribute('class', 'amount_cellB')
    amountCellB.textContent = amount.value
    cellb.appendChild(hiddenDivE)
    cellb.innerHTML = formatter.format(amount.value)
    cellc.innerHTML = dateFormat
}

//================ deleteIncomeRow() function for Expenses Table =================

function deleteExpenseRow(row) {
    let expense = row.parentNode.parentNode.rowIndex;
    expenseTable.deleteRow(expense);
}

//=====================onclick function for income & expenditure selection =========

const btnData = document.querySelector('.btn_submit')
btnData.addEventListener('click', function() {
    let select = document.getElementById('Income_expenditure').value;
    if (select == 'Income') {
        // incomeGenerator()
        pushIncomesData()
    } else if (select == 'Expenditure') {
        //  ExpGenerator()
        pushExpenses()
    } else {}
})



//======================onclick listener function for summing Income =======================

/*let btnIncome = document.querySelector('.btn_submit')

function totalIncomes() {
    btnIncome.addEventListener('click', function() {
        let tbl = document.getElementById('table_income').getElementsByTagName("td");
        let sum = 0;
        for (let i = 0; i < tbl.length; i++) {
            if (tbl[i].className == "amount_cell") {
                sum += isNaN(tbl[i].innerHTML) ? 0 : parseInt(tbl[i].innerHTML)
            }
        }
        totalIncome.textContent = `Total Incomes are ${sum.toFixed(2)} €`
        incomeInput.textContent = `${sum.toFixed(2)}`
    })
}
totalIncomes()*/


//====================== for Hidden Div (onclick listener function for summing Income) ==============
// ===================== This is an auxilliary function to calculate the sum ========================

let btnIncome = document.querySelector('.btn_submit')

function totalIncomes() {
    btnIncome.addEventListener('click', function() {
        sum = 0;
        for (let i = 0; i < amountCell.length; i++) {
            let index = amountCell.textContent;

            if (index && index.indexOf("totalIncome") < 0) {
                sum += parseInt(index) || 0;
            }
        }
        //totalIncome.textContent = `Total Incomes: ${sum.toFixed(2)} €`
        totalIncome.textContent = `Total Incomes: ${formatter.format(sum)}`
        incomeInput.textContent = `${sum.toFixed(2)}`
    })
}
totalIncomes();







//================onclick listener function for summing Expenses ================================

let btnExp = document.querySelector('.btn_submit')

function totalExpenses() {
    btnExp.addEventListener('click', function() {
        sum = 0;
        for (let i = 0; i < amountCellB.length; i++) {
            let index = amountCellB.textContent;

            if (index && index.indexOf("totalIncome") < 0) {
                sum += parseInt(index) || 0;
            }
        }
        // totalExpense.textContent = `Total Expenses: ${sum.toFixed(2)} €`
        totalExpense.textContent = `Total Expenses: ${formatter.format(sum)}`
        expenInput.textContent = `${sum.toFixed(2)} €`
    })
}
totalExpenses()


/*let btnExp = document.querySelector('.btn_submit')

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
totalExpenses()*/


//======================== Acount Ballance Function =========================
let result
let accBal = document.querySelector('.btn_submit')
accBal.addEventListener('click', accountBalance)

function accountBalance() {

    let incomes = document.querySelector('#incomeInput').textContent
    let expenses = document.querySelector('#expenInput').textContent
    let result = parseInt(incomes) - parseInt(expenses);

    // balance.textContent = `You have ${result} € in your account`
    balance.textContent = `You have ${formatter.format(result)} in your account`

    if (result <= 0 || result == isNaN) {
        balance.style.color = 'red'
    } else {
        balance.style.color = 'blue'
    }
}
accountBalance()
    // ===================== clear localStorage functions ================================

/*function edit() {
    localStorage.clear();
}*/