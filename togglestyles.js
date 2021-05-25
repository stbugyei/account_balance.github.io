/*
==============================================================
Show/hide input fields
==============================================================
*/

showFields.addEventListener('click', function () {
    fieldset.style.display = 'block'
    showFields.style.display = "none"
})


/*
==============================================================
Show incomes div
==============================================================
*/
let btnIncome = document.querySelector('.btn_income');
btnIncome.addEventListener('click', showIncome);
function showIncome() {
    const div = document.querySelector('.container_first--income')
    if (div.style.display !== 'block') {
        div.style.display = 'block';
        btnIncome.value = 'Hide Incomes Details'

    } else {
        div.style.display = 'none';
        btnIncome.value = 'Show Incomes Details'
    }
    incomeTable.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
}

/*
==============================================================
Show expenses div
==============================================================
*/
let btnExpense = document.querySelector('.btn_expense');
btnExpense.addEventListener('click', showExpense);
function showExpense() {
    const div = document.querySelector('.container_first--expenditure')
    if (div.style.display !== 'block') {
        div.style.display = 'block';
        btnExpense.value = 'Hide Expenses Details'
    } else {
        div.style.display = 'none';
        btnExpense.value = 'Show Expenses Details'
    }
    expenseTable.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
}


/*
==============================================================
hide, save and cancel buttons for incomes and expenses
==============================================================
*/
let btnCancel = document.querySelector('.cancel')

btnSavInc.addEventListener('click', function () {
    if (checkInputs() === true) {
        removeEditBtns();
        inputFields();
    }
})

btnSavExp.addEventListener('click', function () {
    if (checkInputs() === true) {
        removeEditBtns();
        inputFields();
    }
})


btnCancel.addEventListener('click', function () {
    removeEditBtns();
    inputFields();
})


function removeEditBtns() {
    const btnExpE = document.querySelector(".editEx");
    const btnIncE = document.querySelector(".edit");
    const btnSel = document.querySelector(".select");
    const btnCanc = document.querySelector(".cancel");
    btnExpE.style.display = 'none';
    btnIncE.style.display = 'none';
    btnSel.style.display = 'block';
    btnData.style.display = 'block';
    btnCanc.style.display = 'none';
}

/*
==============================================================
generate bar chart for income and expense
==============================================================
*/
btnData.addEventListener('click', chartHeight)
function chartHeight() {
    const expenses = (JSON.parse(window.localStorage.getItem('expenses')));
    const incomes = (JSON.parse(window.localStorage.getItem('income')));
    const incheight = document.querySelector('.income-height');
    const expnheight = document.querySelector('.expense-height');
    const total = incomes + expenses
    if (incomes) {
        let incomePercentageValue = Math.round(Number((incomes / total) * 100)) + '%';
        incheight.textContent = incomePercentageValue;
        incheight.style.height = incomePercentageValue;
        incheight.style.opacity = 1;
        incheight.style.padding = '10px';
    } else {
        incheight.style.opacity = 0;
        incheight.style.height = '0px';
    }
    if (expenses) {
        let expensePercentageValue = Math.round(Number((expenses / total) * 100)) + '%';
        expnheight.textContent = expensePercentageValue;
        expnheight.style.height = expensePercentageValue;
        expnheight.style.opacity = 1;
        expnheight.style.padding = '10px';
    } else {
        expnheight.style.opacity = 0;
        expnheight.style.height = '0px';
    }
    //return {incomePercentageValue, expensePercentageValue}
}
chartHeight();


/*
==============================================================
random color generator function
==============================================================
*/
const generateHexaColor = () => {
    let string = '0123456789abcdef'
    let hexaColor = '#'
    for (let i = 0; i < 6; i++) {
        let index = Math.floor(Math.random() * string.length)
        hexaColor += string[index]
    }
    return hexaColor
}


/*
==============================================================
dougnut generator function
==============================================================
*/

function drawDougnutChart() {
    let dataArr = (JSON.parse(window.localStorage.getItem('incomeData')));
    const canvas = document.getElementById("incomepiechart");
    const context = canvas.getContext("2d");
    let total = 0

    //========= show info when canvas data is not ready =========// 
    if (!dataArr || dataArr.length <= 0) {
        document.querySelector(".show-prelimtext").style.display = "block"
        document.getElementById("incomepiechart").style.display = "none"
    } else {
        document.querySelector(".show-prelimtext").style.display = "none"
        document.getElementById("incomepiechart").style.display = "block"
    }

    //========= calculate total =========//  
    if (dataArr) {
        total = dataArr.reduce(function (prev, curr) {
            return (Number(prev || 0)) + (Number(curr.amount || 0));
        }, 0);
    }
    //== X & Y coordinates for midpoint and radius ==// 
    let x = 130;
    let y = 100;
    let radius = 100;
    //======= starting point (right of circle) =======// 
    let startingPoint = 0;

    if (dataArr) {
        dataArr.forEach(element => {
            //=== calculate total percent for current value ===// 
            let percent = (Number(element.amount)) * 100 / total;

            //=== calculate end point using the percentage (2 is the final point for the chart) ===//
            let endPoint = startingPoint + (2 / 100 * percent);

            //=== draw chart segment for current element ===// 

            context.fillStyle = generateHexaColor();
            context.lineWidth = 2;
            context.strokeStyle = '#fff';
            context.beginPath();
            context.moveTo(x, y);
            context.arc(x, y, radius, startingPoint * Math.PI, endPoint * Math.PI);
            context.lineTo(x, y);
            context.fill();
            context.stroke();
            //=== starting point for next element ===// 
            startingPoint = endPoint;

            //=== labels for corresponding segment ===// 
            let legendHtml = `
            <div style="padding: 2px; font-size: 15px; display: flex; gap:1em">
            <div style="color: ${context.fillStyle}"><i class="fas fa-square"></i></div> 
            <div style="overflow: hidden"><span style="display: block; float: left;">${new Intl.NumberFormat().format(Math.round((Number(element.amount))))}</span><span style="display: block; margin-left: 60px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden">${element.description}</span></div></div>`
            incomeLegend.innerHTML += legendHtml

            //=== creting  dougnut ===// 
            context.fillStyle = "white"
            context.beginPath();
            context.moveTo(x, y);
            context.arc(x, y, 0.8 * radius, 0, 2 * Math.PI);
            context.fill();

            context.fillStyle = "black";
            context.font = "25px Montserrat";
            context.textAlign = "center";
            context.fillText(title = "Income", 130, 250);
            context.fillText(title = `${formatter.format((Math.round(total)))}`, x, 110);

        });
    }
}
drawDougnutChart();

/*
==============================================================
piechart generator function
==============================================================
*/
function drawPieChartExp() {
    let expensesArr = (JSON.parse(window.localStorage.getItem('expensesData')));
    const canvas = document.getElementById("expensepiechart");
    const context = canvas.getContext("2d");
    let total = 0

    //========= show info when canvas data is not ready =========// 
    if (!expensesArr || expensesArr.length <= 0) {
        document.querySelector(".show-prelimtext1").style.display = "block"
        document.getElementById("expensepiechart").style.display = "none"

    } else {
        document.querySelector(".show-prelimtext1").style.display = "none"
        document.getElementById("expensepiechart").style.display = "block"
    }

    //========= calculate total =========//  
    if (expensesArr) {
        total = expensesArr.reduce(function (prev, curr) {
            return (Number(prev || 0)) + (Number(curr.amount || 0));
        }, 0);
    }

    //== X & Y coordinates for midpoint and radius ==// 
    let x = 130;
    let y = 100;
    let radius = 100;

    //========= starting point (right of circle) =========// 
    let startingPoint = 0;

    if (expensesArr) {
        expensesArr.forEach(element => {
            //=== calculate total percent for current value ===// 
            let percent = (Number(element.amount)) * 100 / total;

            //=== calculate end point using the percentage (2 is the final point for the chart) ===//
            let endPoint = startingPoint + (2 / 100 * percent);
            //=== draw chart segment for current element ===// 
            context.fillStyle = generateHexaColor();
            context.strokeStyle = '#fff';
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(x, y);
            context.arc(x, y, radius, startingPoint * Math.PI, endPoint * Math.PI);
            context.lineTo(x, y);
            context.fill();
            context.stroke();
            //=== starting point for next element ===// 
            startingPoint = endPoint;

            //=== labels for corresponding segment ===// 
            let legendHtml = `
            <div style="padding: 2px; font-size: 15px; display: flex; gap:1em">
            <div style="color: ${context.fillStyle}"><i class="fas fa-square"></i></div> 
            <div style="overflow: hidden"><span style="display: block; float: left;">${new Intl.NumberFormat().format(Math.round((Number(element.amount))))}</span><span style="display: block; margin-left: 60px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden">${element.description}</span></div></div>`
            expenseLegend.innerHTML += legendHtml

            context.fillStyle = "black";
            context.font = "25px Montserrat";
            context.textAlign = "center";
            context.fillText(title = "Expenses", x, 250);
        })
    }
}
drawPieChartExp();

/*
==============================================================
Show dashboard and update charts
==============================================================
*/
let btnDashboard = document.querySelector('.btn_dashboard');
let divDashboard = document.querySelector('.chart-wrapper');

btnData.addEventListener('click', function () {
    incomeLegend.innerHTML = "";
    expenseLegend.innerHTML = "";
    drawDougnutChart();
    drawPieChartExp();
});

btnDashboard.addEventListener('click', function () {
    incomeLegend.innerHTML = "";
    expenseLegend.innerHTML = "";
    drawDougnutChart();
    drawPieChartExp();
    if (divDashboard.style.display !== 'block') {
        divDashboard.style.display = 'block';
        btnDashboard.value = 'Hide Dashboard'
    } else {
        divDashboard.style.display = 'none';
        btnDashboard.value = 'Show Dashboard'
    }
    divDashboard.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
})


/*
==============================================================
formating Date
==============================================================
*/
function showTime() {
    let currentDate = new Date();
    let formatedTime = currentDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
    let curTime = formatedTime.slice(0, 5);
    let meridiem = formatedTime.substr(5, 6);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    day = document.querySelector('.day');
    time = document.querySelector('.time');
    month = document.querySelector('.month-day');

    day.innerHTML = `<h4>${days[currentDate.getDay()]},</h4>`
    month.innerHTML = `<h4>${months[currentDate.getMonth()]} ${currentDate.getDate()}</h4>`
    time.innerHTML = `<h3 style="margin: initial; color: #000;">${curTime}<small><sub>${meridiem}</sub></small></h3>`
}

let timeInterval = setInterval(showTime(), 1000);
clearInterval(timeInterval);
timeInterval = setInterval(showTime, 1000);

/*
==============================================================
scroll to top functions 
==============================================================
*/
let scroll = document.querySelector('.scroll')
scroll.addEventListener('click', scrollTotop);

//=== Onclick function to move the page to the top ===//
function scrollTotop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

//= A flag function to show/hide the scroll button =//
function scrollPosition() {
    window.pageYOffset > 400 ? scroll.style.transform = "scale(1)" : scroll.style.transform = "scale(0)"
}

let scrollInterval = setInterval(scrollPosition(), 1000);
clearInterval(scrollInterval);
scrollInterval = setInterval(scrollPosition, 1000);






