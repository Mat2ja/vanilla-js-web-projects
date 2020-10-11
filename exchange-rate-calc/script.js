const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate')
const swap = document.getElementById('swap')

// Fetch exchange rate and update the DOM
async function calculate(e) {
    // Currencies of each input
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    let targetEl = amountEl_one;
    let otherEl = amountEl_two;
    let targetCurrency = currency_one;
    let otherCurrency = currency_two;

    if (e) {
        // If we clicked on second input
        if (e.target.id === 'amount-two') {
            amountEl_two.value = obtainNumber(amountEl_two)
            targetEl = e.target;
            otherEl = amountEl_one;
            targetCurrency = currency_two;
            otherCurrency = currency_one;
        } else {
            amountEl_one.value = obtainNumber(amountEl_one)
        }
    }

    const url = `https://v6.exchangerate-api.com/v6/ee1f71618415f92cc14f70dd/latest/${targetCurrency}`;
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.conversion_rates[otherCurrency];

    displayRate(currency_one, currency_two, rate);

    // Calculate, display and format result in other input 
    otherEl.value = formatNumber(targetEl.value * rate);
}

function displayRate(curr1, curr2, rate) {
    rateEl.querySelector('.value-one').innerHTML = 1;
    rateEl.querySelector('.unit-one').innerHTML = curr1;
    rateEl.querySelector('.value-two').innerHTML = rate;
    rateEl.querySelector('.unit-two').innerHTML = curr2;
}

// Accept only numbers in input, with optional 1 (.)
function obtainNumber(amountEl) {
    let amount = amountEl.value;

    const firstOccuranceIndex = amount.search(/\./) + 1;
    amount = amount.substr(0, firstOccuranceIndex) + amount.slice(firstOccuranceIndex).replace(/\./g, '');
    return amount.replace(/[^0-9\.]+/g, '');
}

// Format number with commas
function formatNumber(number) {
    return Number(Math.abs(number).toFixed(2)).toLocaleString();
}

// Remove commas from number
function unformatNumber(number) {
    return number.replaceAll(',', '');
}


// Event Listeners 
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', () => {
    [currencyEl_two.value, currencyEl_one.value] = [currencyEl_one.value, currencyEl_two.value]
    calculate();
})

// Remove number formating on input focus
amountEl_one.addEventListener('focus', () => amountEl_one.value = unformatNumber(amountEl_one.value));
amountEl_two.addEventListener('focus', () => amountEl_two.value = unformatNumber(amountEl_two.value));


calculate();

