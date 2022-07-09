const form = document.querySelector('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmpassword = document.getElementById('confirmpassword')

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small') 
    small.innerText = message
}

// Show success message
function showSuccess(input) {
    const success = input.parentElement
    success.className = 'form-control success'
}

// check email is valid
// function isValidEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
//     return email.match(re);
// }
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    if(re.test(input.value)){
        showSuccess(input)
    }else {
        showError(input, 'Email is not valid')
    }
}
// Check reuqired fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if(input.value === ''){
            showError(input, `${getFieldName(input)} is required`)
        }else {
            showSuccess(input)
        }
    })
}

// Check input Length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} charecters`)
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} charecters`)
    }
}
// Check password
function checkPassword(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Password do not match')
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event Listner
form.addEventListener('submit', function(e){
    e.preventDefault()

    checkRequired([username, email, password, confirmpassword])
    checkLength(username, 3, 15)
    checkLength(password, 6, 25)
    checkEmail(email)
    checkPassword(password, confirmpassword)
})
