const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error msg
function showError(input, msg) {
    const formControl = input.parentElement;
    formControl.classList.remove('success');
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = msg;
}

//Show success outline
function showSuccess(input,) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input.value.trim()).toLowerCase())) {
        showSuccess(input);
        return true;
    } else {
        showError(input, `${getFieldName(input)} is not valid`);
        return false;
    }

}

// Check required fields
function checkRequired(inputs) {
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    });
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max + 1} characters`);
        return false;
    }
    return true;
}

// Check if passwords match
function checkMatch(input1, input2) {
    if (input1.value.trim() === input2.value.trim()) {
        showSuccess(input2);
        return true;
    } else {
        showError(input2, `Passwords don't match`);
        return false;
    }
}

// Get fieldname
function getFieldName(input) {
    let inputName = input.id;
    if (inputName === 'password2') {
        inputName = 'Password confirmation'
    }
    return inputName[0].toUpperCase() + inputName.slice(1);
}

// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkEmail(email);
    checkLength(username, 3, 15);
    let isValidPassword = checkLength(password, 6, 24);

    if (isValidPassword && password2.value !== '') {
        checkMatch(password, password2);
    }

    let formControls = [...document.querySelectorAll('.form-control')];
    if (formValid()) {
        form.reset();
        formControls
            .forEach(control => control.classList.remove('success'));
        alert('Email submitted')
    }

    function formValid() {
        return formControls.every(control => control.classList.contains('success'))
    }
})
