import {getParamValue} from '../helpers.js';
import { loadFromTheApi } from '../models.js';
import {validateURL, validateNumbers, validateString, makeSpecifiedTime} from "./Validation.js";

const EditCourse = async() => {
    const ID = getParamValue("id");
    const courseObject = await loadFromTheApi(`kursevi/${ID}`);
    const formReset = document.querySelector('.js-form-reset');
    const viewCourse = document.querySelector('.js-view-course');
    const submitForm = document.querySelector('.edit-course__submit');
    const fieldInputs = document.querySelectorAll('.edit-course__input');
    const formInputErrors = document.querySelectorAll('.form-text__error');
    const modals = document.querySelectorAll(".modal");
    const modalSuccessfuly = document.querySelector('.js-modal-successfuly');

    makeSpecifiedTime(fieldInputs[7]);
    const clearAllErrors = () => {
        formInputErrors.forEach((error) => {error.innerHTML = '&nbsp;';});
        fieldInputs.forEach(input => input.classList.remove('form__input--error'))
    }
    const removeAllModals = () => {
        modals.forEach((modal) => {
          modal.classList.remove("modal--active");
        });
    };
    const validateForm = () => {
        clearAllErrors();
        const title = fieldInputs[0].value;
        const category = fieldInputs[1].value;
        const lecturesNr = fieldInputs[2].value;
        const price = fieldInputs[3].value;
        const language = fieldInputs[4].value;
        const certification =  fieldInputs[5].value;
        const description = fieldInputs[6].value;
        const date = fieldInputs[7].value;
        const url = fieldInputs[8].value;
        let isAllValid = true;
        if (!validateString(title)) {
            fieldInputs[0].nextElementSibling.innerHTML = "Title isn't valid!"
            fieldInputs[0].classList.add('form__input--error');
            isAllValid = false;
        }

        if (!category) {
            fieldInputs[1].nextElementSibling.innerHTML = "Category isn't valid!"
            fieldInputs[1].classList.add('form__input--error');
            isAllValid = false;
        }

        if (!validateNumbers(lecturesNr) || Number(lecturesNr) <= 0) {
            fieldInputs[2].nextElementSibling.innerHTML = "Lectures number isn't valid! Must be bigger than 0"
            fieldInputs[2].classList.add('form__input--error');
            isAllValid = false;
        }

        if (!validateNumbers(price) || Number(price) <= 0) {
            fieldInputs[3].nextElementSibling.innerHTML = "Price isn't valid! Must be bigger than 0"
            fieldInputs[3].classList.add('form__input--error');
            isAllValid = false;
        }

        if (!validateString(language)) {
            fieldInputs[4].nextElementSibling.innerHTML = "Language isn't valid!"
            fieldInputs[4].classList.add('form__input--error');
            isAllValid = false;
        }

        if (!certification) {
            fieldInputs[5].nextElementSibling.innerHTML = "Certification isn't valid!"
            fieldInputs[5].classList.add('form__input--error');
            isAllValid = false;
        }

        if (description.length <= 0) {
            fieldInputs[6].nextElementSibling.innerHTML = "Description isn't valid!"
            fieldInputs[6].classList.add('form__input--error');
            isAllValid = false;
        }

        if (!date) {
            fieldInputs[7].nextElementSibling.innerHTML = "Date isn't valid!"
            fieldInputs[7].classList.add('form__input--error');
            isAllValid = false;
        }

        if (!validateURL(url)) {
            fieldInputs[8].nextElementSibling.innerHTML = "URL isn't valid!"
            fieldInputs[8].classList.add('form__input--error');
            isAllValid = false;
        }

        return isAllValid;
    };
    const fillCard = () => {
        let cardElements = document.querySelectorAll('.edit-course__item-right');
        let cardImage = document.querySelector('.edit-course__image');
        cardImage.setAttribute('src', courseObject.slika);
        cardElements[0].innerHTML = courseObject.id;
        cardElements[1].innerHTML = courseObject.naziv;
        cardElements[2].innerHTML = courseObject.brojKorisnika;
        cardElements[3].innerHTML = courseObject.prosecnaOcena;
    }


    const deconstructCourseObject = (courseObject) => {
        let objectForHeading = {};
        const {
            naziv: title,
            kategorija: category,
            brojLekcija: lectures,
            cena: price,
            jezik: language,
            sertifikovan: certified,
            opis: description,
            datumIzmene: update,
            slika: link
        } = courseObject;

        objectForHeading = {
            title, category, lectures, price, language, certified, description, update, link
        };
        return objectForHeading;
      };

    const fillInputs = () => {
        let courseValues = Object.values(deconstructCourseObject(courseObject));
        fieldInputs.forEach((_, i) => {
            fieldInputs[i].value = courseValues[i];
        });

        switch(courseValues[1]) {
            case "Web programiranje":
                fieldInputs[1].value = 'webdev';
                break
            case "Objektno programiranje":
                fieldInputs[1].value = 'oop';
                break
            case "Algoritmi":
                fieldInputs[1].value = 'algorithm';
                break
            case "Strukture podataka":
                fieldInputs[1].value = 'structures';
                break
            case "Baze podataka":
                fieldInputs[1].value = 'database';
                break
            default:
                break;
        }
        console.log(fieldInputs[5]);
        switch(courseValues[5]) {
            case "da":
                fieldInputs[5].value = 'yes'
                break
            case "ne":
                fieldInputs[5].value = 'no';
                break
            default:
                break;
        }
    }

    fillCard();
    fillInputs();

    formReset.addEventListener('click', (e) => {
        e.preventDefault();
        let fieldInputs = document.querySelectorAll('.edit-course__input');
        fieldInputs.forEach(input => {
            input.value = '';
        });
    });

    viewCourse.addEventListener('click', () => {
        window.location.href = `course.html?id=${courseObject.id}`
    });

    submitForm.addEventListener('click', (e) => {
        e.preventDefault();
        if(validateForm()) {
            modalSuccessfuly.childNodes[1].childNodes[1].innerHTML = `
            <i class="fas fa-check modal--successfully__icon"></i>
            <h3>You have <span class="modal--successfully__green">successfully</span> edited course informations!</h3>
            `;
            modalSuccessfuly.classList.add('modal--active');
            setTimeout(() => {
                removeAllModals();
            }, 1000);
        }
    });
};

export default EditCourse;