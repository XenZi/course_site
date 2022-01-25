import {getParamValue} from '../helpers.js';
import { loadFromTheApi } from '../models.js';
import { validateMail, validateString, validateNumbers, makeSpecifiedTime } from './Validation.js';
const EditUser = async() => {
    const ID = getParamValue("id");
    const userObject = await loadFromTheApi(`korisnici/${ID}`);
    const userInputs = document.querySelectorAll('.edit-user__input');
    const editUserButton = document.querySelectorAll('.edit-user__button');
    const formInputErrors = document.querySelectorAll('.form-text__error');
    const modals = document.querySelectorAll(".modal");
    const modalSuccessfuly = document.querySelector('.js-modal-successfuly');

    makeSpecifiedTime(userInputs[5]);

    const removeAllModals = () => {
        modals.forEach((modal) => {
          modal.classList.remove("modal--active");
        });
    };

    const clearAllErrors = () => {
        formInputErrors.forEach((error) => {error.innerHTML = '&nbsp;';});
        userInputs.forEach(input => input.classList.remove('form__input--error'))
    }
    const validateForm = () => {
        clearAllErrors();
        const name = userInputs[0].value;
        const lastName = userInputs[1].value;
        const email = userInputs[2].value;
        const phNumber = userInputs[3].value;
        const address = userInputs[4].value;
        const dateOfBirth = userInputs[5].value;
        const password = userInputs[6].value;
        const confirmedPassword = userInputs[7].value;
        let isAllValid = true;
        if(!validateString(name)) {
            userInputs[0].nextElementSibling.innerHTML = "Name isn't valid!"
            userInputs[0].classList.add('form__input--error');
            isAllValid = false;
        }
        if(!validateString(lastName)) {
            userInputs[1].nextElementSibling.innerHTML = "Last name isn't valid!"
            userInputs[1].classList.add('form__input--error');
            isAllValid = false;
        }
        if(!validateMail(email)) {
            userInputs[2].nextElementSibling.innerHTML = "Mail isn't valid!"
            userInputs[2].classList.add('form__input--error');
            isAllValid = false;
        }
        if(!validateNumbers(phNumber) || phNumber.length < 5) {
            userInputs[3].nextElementSibling.innerHTML = "Phone isn't valid! Length must be bigger than 5"
            userInputs[3].classList.add('form__input--error');
            isAllValid = false;
        }
        if(address.trim() == "" || address.length < 3) {
            userInputs[4].nextElementSibling.innerHTML = "Address isn't valid!"
            userInputs[4].classList.add('form__input--error');
            isAllValid = false;
        }
        if(!dateOfBirth || dateOfBirth == "") {
            userInputs[5].nextElementSibling.innerHTML = "Name isn't valid!"
            userInputs[5].classList.add('form__input--error');
            isAllValid = false;
        }
        if(password.trim() == "" || password.length < 6) {
            userInputs[6].nextElementSibling.innerHTML = "Password isn't valid! Min. len. 6"
            userInputs[6].classList.add('form__input--error');
            isAllValid = false;
        }
        if(confirmedPassword.trim() == "" || password !== confirmedPassword) {
            userInputs[7].nextElementSibling.innerHTML = "Confirm your password again!"
            userInputs[7].classList.add('form__input--error');
            userInputs[6].classList.add('form__input--error');
            isAllValid = false;
        }

        return isAllValid;
    };
    const deconstructUserObject = (userObject) => {
        let objectForHeading = {};
        const {
            ime: firstname,
            prezime: lastname,
            email,
            telefon: phone,
            datumRodjenja: DOB,
            adresa: address,
            lozinka: password
        } = userObject;
        objectForHeading = {
            firstname, lastname, email, phone, address, DOB, password
        }
        return objectForHeading
      };

    const fillForms = () => {
        const usernameFill = document.querySelector('.user-edit__name');
        usernameFill.textContent = userObject.korisnickoIme;
        const objectKeys = Object.values(deconstructUserObject(userObject));
        userInputs.forEach((userInput, index) => {
            if (index == 7 || index == 8) {
                userInput.value = objectKeys[objectKeys.length - 1];
            }
            else {
                userInput.value = objectKeys[index];
            }
        });
    }

    editUserButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    editUserButton[0].addEventListener('click', () => {
        if(validateForm()) {
            modalSuccessfuly.childNodes[1].childNodes[1].innerHTML = `
            <i class="fas fa-check modal--successfully__icon"></i>
            <h3>You have <span class="modal--successfully__green">successfully</span> edited user profile!</h3>
            `;
            modalSuccessfuly.classList.add('modal--active');
            setTimeout(() => {
                removeAllModals();
            }, 1000);
        }
    });

    fillForms();
};

export default EditUser;