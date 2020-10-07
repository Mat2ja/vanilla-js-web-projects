const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');
const clearBtn = document.querySelector('#clear');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Update total and count
function updateSelectedCountAndTotal() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    // Get indexes of selected seats for Local Storage
    const seatIndex = [...selectedSeats]
        .map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
}

// Get data from LocalStorage and populate UI
function populateUI() {
    // indexes of selected seats in localStorage
    let selectedSeats;
    if (localStorage.getItem('selectedSeats')) {
        selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    }

    // check if any seats are selected in localStorage
    if (selectedSeats !== null && selectedSeats) {
        seats.forEach((seat, index) => {
            // check if index of seat in one of indexes in selectedSeats array
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    } else {
        seats.forEach(seat => seat.classList.remove('selected'))
    }


    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCountAndTotal();
})

// Seat click event
container.addEventListener('click', e => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');
        updateSelectedCountAndTotal();
    }
})
// not performant enough
// seats.forEach(seat => seat.addEventListener('click', () => {
//     seat.classList.toggle('selected');
// }))

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    populateUI();
    updateSelectedCountAndTotal();
})

// Initial count and total set
updateSelectedCountAndTotal();