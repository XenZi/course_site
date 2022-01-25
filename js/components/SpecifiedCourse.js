import { getParamValue, checkValueExisting } from "../helpers.js"
import { loadFromTheApi } from "../models.js";
import { suggestedCourse } from "./SuggestedCourses.js";
import Basket from "./Basket.js";

const SpecifiedCourse = async (courseArray) => {
    const parentElement = document.querySelector('.course__container');
    const courseID = getParamValue('id');
    const awaitedCourse = await loadFromTheApi(`/kursevi/${courseID}`);

    const courseTemplate = function() {
      if (checkValueExisting(awaitedCourse)) {
        let half = Math.ceil(awaitedCourse.opis.length / 2);
        let templateLeft = `
        <div class="course__left">
        <h2 class="course__title">
            ${awaitedCourse.naziv}
        </h2>
        <div class="row course__row">
          <div class="course__box--first">
            <img src="./img/avatar.png" class="course__avatar" alt="" />
            <div class="course__creation">
              <h4 class="course__box-title">Created by</h4>
              <p class="course__box-desc">${awaitedCourse.autor}</p>
            </div>
          </div>
          <div class="course__box">
            <h4 class="course__box-title">Categories</h4>
            <p class="course__box-desc">${awaitedCourse.kategorija}</p>
          </div>
          <div class="course__box">
            <h4 class="course__box-title">Review</h4>
            <div class="course__stars">
              <i class="fas fa-star course__star"></i>
              <i class="fas fa-star course__star"></i>
              <i class="fas fa-star course__star"></i>
              <i class="fas fa-star-half-alt course__star"></i>
              <i class="far fa-star course__star"></i>
              <span class="course__rate-number">(${awaitedCourse.brojKorisnika} rates)</span>
            </div>
          </div>
        </div>
        <div class="row course__overview">
          <h3 class="course__overview-title">Course overview</h3>
          <p class="course__description">
            ${awaitedCourse.opis.substr(0, half)}
          </p>
          <p class="course__description">
            ${awaitedCourse.opis.substr(-half)}
          </p>
        </div>
      </div>
        `

        let templateRight =
        `
        <div class="course__right">
        <div class="course__course">
          <div class="course__card">
            <img src="${awaitedCourse.slika}" alt="" class="course__image" />
            <h3 class="course__price">${awaitedCourse.cena},00 RSD</h3>
            <button class="button course__buy" data-id="${awaitedCourse.id}">Buy now</button>
            <ul class="course__info">
              <li class="course__item">
                <p class="course__item-left">
                  <i class="far fa-clock course__item-icon"></i>
                  <span class="course__span"> Duration </span>
                </p>
                <p class="course__item-right">8h 20min</p>
              </li>
              <li class="course__item">
                <p class="course__item-left">
                  <i class="fas fa-video course__item-icon"></i>
                  <span class="course__span"> Lectures </span>
                </p>
                <p class="course__item-right">${awaitedCourse.brojLekcija}</p>
              </li>
              <li class="course__item">
                <p class="course__item-left">
                  <i class="fas fa-school course__item-icon"></i>
                  <span class="course__span"> Enrolled </span>
                </p>
                <p class="course__item-right">${awaitedCourse.brojKorisnika}</p>
              </li>
              <li class="course__item">
                <p class="course__item-left">
                  <i class="fas fa-globe-europe course__item-icon"></i>
                  <span class="course__span"> Language </span>
                </p>
                <p class="course__item-right">${awaitedCourse.jezik}</p>
              </li>
              <li class="course__item">
                <p class="course__item-left">
                  <i class="far fa-edit course__item-icon"></i>
                  <span class="course__span"> Update </span>
                </p>
                <p class="course__item-right">${awaitedCourse.datumIzmene}</p>
              </li>
              <li class="course__item">
                <p class="course__item-left">
                  <i
                    class="fas fa-graduation-cap course__item-icon"
                  ></i>
                  <span class="course__span"> Certified </span>
                </p>
                <p class="course__item-right">${awaitedCourse.sertifikovan}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="course__recommended">
        </div>
      </div>
        `

        let template = templateLeft + templateRight;
        return template
      }
    }

    const addCourseToLocalStorage = () => {
      let myStorage = window.localStorage;
      let localStorageItems = myStorage.getItem('basket') ? JSON.parse(myStorage.getItem('basket')) : [];
      localStorageItems = [...localStorageItems, awaitedCourse];
      myStorage.setItem('basket', JSON.stringify(localStorageItems));
    };

    const successfullyAddedToTheBasket = () => {
      courseBuy.classList.add('button--successfuly-bought');
      courseBuy.innerHTML = 'Added to the basket!';
      setTimeout(() => {
        courseBuy.classList.remove('button--successfuly-bought');
        courseBuy.innerHTML = 'Buy now';
      }, 1500);
    }

    parentElement.innerHTML = ''
    parentElement.innerHTML = courseTemplate();
    suggestedCourse(courseArray);
    const courseBuy = document.querySelector('.course__buy');

    courseBuy.addEventListener('click', () => {
      addCourseToLocalStorage();
      Basket();
      successfullyAddedToTheBasket();
    });


}

export default SpecifiedCourse;