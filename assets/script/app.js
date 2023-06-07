// VARIABLES

const addIncomeButton = document.getElementById('add-income');
const whereInput = document.getElementById('where-input');
const timeInput = document.getElementById('time-input');
const expenseInput = document.getElementById('expense-input');
const addExpenseButton = document.getElementById('add-expense');
const incomeValue = document.getElementById('income-value');
const tableBody = document.getElementById('table-body');
const saveExpenseButton = document.getElementById('save-expense');
const calculateTable = document.getElementById('calculate-table');
const expenseTable = document.getElementById('expenses-table');

// OBJECTS

const incomeObject = {
    income: 0,
    expenses: [],
}

const expenseObject = {
    where: '',
    time: '',
    expense: 0,
}



// EVENT LISTENERS

const addIncome = addIncomeButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (incomeValue.value === '' || incomeValue.value === null || incomeValue.value === 0 || incomeValue.value < 0) {
        alert('Lütfen geçerli bir gelir giriniz');
    }
    else if (isNaN(Number(incomeValue.value))) {
        alert('Lütfen geçerli bir gelir giriniz');
        incomeValue.value = '';
    }
    else {
        incomeObject.income += Number(incomeValue.value);
        incomeValue.value = '';
        console.log(incomeObject.income);
    }
    calculate();

});

const addExpense = addExpenseButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (whereInput.value === '' || whereInput.value == null || whereInput.value == 0 || whereInput.value < 0 || whereInput.value == NaN || timeInput.value === '' || timeInput.value == null || timeInput.value == 0 || timeInput.value < 0 || timeInput.value == NaN || expenseInput.value === '' || expenseInput.value == null || expenseInput.value == 0 || expenseInput.value < 0 || expenseInput.value == NaN) {
        alert('Lütfen geçerli değer giriniz');

    }
    else {
        expenseObject.where = whereInput.value.slice(0, 1).toUpperCase() + whereInput.value.slice(1).toLowerCase();
        // We should use slice method to get rid of the time zone
        // And turn time stamp to dd.mm.yyyy format
        expenseObject.time = timeInput.value.slice(0, 10).split('-').reverse().join('.');
        expenseObject.expense = expenseInput.value;
        incomeObject.expenses.push(expenseObject);
        whereInput.value = '';
        timeInput.value = getDateTime();
        expenseInput.value = '';
        console.log(incomeObject.expenses);
    }
    calculate();
});


const saveExpense = saveExpenseButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (incomeObject.expenses.length == 0) {
        alert('Lütfen en az bir gider ekleyiniz');
    } else {
        calculate();

        const newExpenses = []; // Create a new expenses array

        incomeObject.expenses.forEach(function (expense) {
            const newExpense = Object.assign({}, expense); // Create a new expense object
            newExpenses.push(newExpense); // Push the new expense object to the newExpenses array
        });

        tableBody.innerHTML = ''; // Clear the table body before adding new rows
                                  // If we don't clear the table body, 
                                  // The new rows will be added to the end of the table

        newExpenses.forEach(function (expense) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
            <tbody id="table-body">
            <tbody id="table-body">
             <tr>
              <td class="text-break">${expense.where}</td>
              <td class="text-break">${expense.time}</td>
              <td class="text-break">${expense.expense + '₺'}</td>
              <td class="d-flex justify-content-center align-items-center">
              <div class="btn-group d-flex justify-content-center">
               <button class="btn btn-sm btn-danger"><i class="fas fa-trash-alt"></i></button>
              </div>
              </td>
              </tr>
             </tbody>

        `;
            tableBody.appendChild(newRow);
        });

        incomeObject.expenses = newExpenses; // Update the incomeObject.expenses array with the 
                                            // newExpenses array
    }
});



const removeExpense = expenseTable.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('fa-trash-alt')) {
        // Using closest method to get the parent element of the trash icon
        // And remove it from the DOM
        e.target.closest('tr').remove();
        // We should get the expense value from the DOM
        // And Update the incomeObject.expenses array
        const expense = e.target.closest('tr').children[2].textContent.slice(0, -1);
        const expenseIndex = incomeObject.expenses.findIndex(function (expenseObject) {
            return expenseObject.expense == expense;
        }
        );
        incomeObject.expenses.splice(expenseIndex, 1);
        calculate();

    }



});

const resetButton = document.getElementById('reset-button').addEventListener('click', function (e) {
    e.preventDefault();
    reset();
});


// We should create a function to calculate the total expense

function calculate() {
    const totalExpense = incomeObject.expenses.reduce(function (acc, expense) {
        return acc + Number(expense.expense);
    }
        , 0);

    const totalIncome = incomeObject.income;
    const totalBalance = totalIncome - totalExpense;
    const totalExpenseElement = document.getElementById('total-expense');
    const totalBalanceElement = document.getElementById('total-balance');
    const totalIncomeElement = document.getElementById('total-income');

    totalExpenseElement.textContent = totalExpense + '₺';
    totalBalanceElement.textContent = totalBalance + '₺';
    totalIncomeElement.textContent = totalIncome + '₺';

}


console.log(incomeObject.income);

/// FUNCTIONS ///

function reset() {
    incomeObject.income = 0;
    incomeObject.expenses = [];
    incomeValue.value = '';
    whereInput.value = '';
    timeInput.value = getDateTime();
    expenseInput.value = '';
    tableBody.innerHTML = '';
    calculate();
}

function totalIncome() {
    const totalIncome = incomeObject.income;
    return totalIncome;
}
function getDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    // PadStart method adds 0 to the beginning of the string 
    // If the string length is less than 2
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${minute}`;
}
timeInput.value = getDateTime();