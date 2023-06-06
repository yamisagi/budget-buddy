// Date Time'ı alıp inputa yazdırıyoruz




// VARIABLES

const addIncomeButton = document.getElementById('add-income');
const whereInput = document.getElementById('where-input');
const timeInput = document.getElementById('time-input');
const expenseInput = document.getElementById('expense-input');
const addExpenseButton = document.getElementById('add-expense');


// EVENT LISTENERS





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
