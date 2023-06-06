// VARIABLES

const addIncomeButton = document.getElementById('add-income');
const whereInput = document.getElementById('where-input');
const timeInput = document.getElementById('time-input');
const expenseInput = document.getElementById('expense-input');
const addExpenseButton = document.getElementById('add-expense');
const incomeValue = document.getElementById('income-value');

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

const add = addIncomeButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (incomeValue.value === '' || incomeValue.value == null || incomeValue.value == 0 || incomeValue.value < 0 || incomeValue.value == NaN) {
        alert('Lütfen geçerli bir gelir giriniz');
    }
    else {
        incomeObject.income = incomeValue.value;
        incomeValue.value = '';
        console.log(incomeObject.income);
    }

});

const addExpense = addExpenseButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (whereInput.value === '' || whereInput.value == null || whereInput.value == 0 || whereInput.value < 0 || whereInput.value == NaN || timeInput.value === '' || timeInput.value == null || timeInput.value == 0 || timeInput.value < 0 || timeInput.value == NaN || expenseInput.value === '' || expenseInput.value == null || expenseInput.value == 0 || expenseInput.value < 0 || expenseInput.value == NaN) {
        alert('Lütfen geçerli değer giriniz');

    }
    else {
        expenseObject.where = whereInput.value;
        expenseObject.time = timeInput.value;
        expenseObject.expense = expenseInput.value;
        incomeObject.expenses.push(expenseObject);
        whereInput.value = '';
        timeInput.value = getDateTime();
        expenseInput.value = '';
        console.log(incomeObject.expenses);
    }
});



console.log(incomeObject.income);

/// FUNCTIONS ///
timeInput.value = getDateTime();

function getDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    // PadStart fonksiyonu ile 2 basamaklı olması sağlanıyor 
    // Eğer 2 basamaklı değilse başına 0 ekleniyor
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${minute}`;
}
