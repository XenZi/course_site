import { validateMail, validateString, validateNumbers, validateURL, validateUsername, makeSpecifiedTime } from "./Validation.js";

const Register = () => {
    const formRegisterButton = document.querySelector('.form--register__button');
    const formInputs = document.querySelectorAll('.js-form-register-input');
    const formInputErrors = document.querySelectorAll('.form-text__error');
    makeSpecifiedTime(formInputs[5]);
    const clearAllErrors = () => {
        formInputErrors.forEach((error) => {error.innerHTML = '&nbsp;';});
        formInputs.forEach(input => input.classList.remove('form__input--error'))
    }
    const validateForm = () => {
        clearAllErrors();
        const name = formInputs[0].value;
        const lastName = formInputs[1].value;
        const username = formInputs[2].value;
        const email = formInputs[3].value;
        const password = formInputs[4].value;
        const dateOfBirth = formInputs[5].value;
        const address = formInputs[6].value;
        const phoneNumber = formInputs[7].value;
        const checkBox = formInputs[8].checked;

        if (!validateString(name)) {
            formInputs[0].nextElementSibling.innerHTML = "Name isn't valid!"
            formInputs[0].classList.add('form__input--error');
        }

        if (!validateString(lastName)) {
            formInputs[1].nextElementSibling.innerHTML = "Last name isn't valid!"
            formInputs[1].classList.add('form__input--error');
        }

        if (!validateUsername(username)) {
            formInputs[2].nextElementSibling.innerHTML = "Username isn't valid!"
            formInputs[2].classList.add('form__input--error');
        }

        if (!validateMail(email)) {
            formInputs[3].nextElementSibling.innerHTML = "Mail isn't valid!"
            formInputs[3].classList.add('form__input--error');
        }

        if (password.trim() == "" || password.length < 6) {
            formInputs[4].nextElementSibling.innerHTML = "Password isn't valid!"
            formInputs[4].classList.add('form__input--error');
        }

        if (dateOfBirth.trim() == "") {
            formInputs[5].nextElementSibling.innerHTML = "DOB isn't valid!"
            formInputs[5].classList.add('form__input--error');
        }

        if (address.trim() == "") {
            formInputs[6].nextElementSibling.innerHTML = "Address isn't valid!"
            formInputs[6].classList.add('form__input--error');
        }

        if (!validateNumbers(phoneNumber) || phoneNumber.length < 5) {
            formInputs[7].nextElementSibling.innerHTML = "Number isn't valid! Ph. number length must be bigger than 5"
            formInputs[7].classList.add('form__input--error');
        }

        if(!checkBox) {
            formInputs[8].nextElementSibling.nextElementSibling.innerHTML = "Checkbox isn't checked!"
            formInputs[8].classList.add('form__input--error');
        }
    };

    formRegisterButton.addEventListener('click', (e) => {
        e.preventDefault();
        validateForm();
    });
};

export default Register