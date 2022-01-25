import { checkValueExisting } from "../helpers.js";
import { ROW_COURSE_NUMBER } from '../config.js';
import singleCard from "./SingleCard.js";


const TopCourses = function(sortedArray) {
  const _parentElement = document.querySelectorAll(".js-row-courses");

  const removeAllElements = () => {
    _parentElement.forEach(el => el.innerHTML = '');
  }

  const displayTopCourses = () => {
    removeAllElements();
    sortedArray.then(allCourses => {
      allCourses.forEach((course,i) => {
        if (i < ROW_COURSE_NUMBER) {
           _parentElement[0].innerHTML += singleCard(course);
        }
        else if (i > ROW_COURSE_NUMBER && i <= ROW_COURSE_NUMBER * 2) {
            _parentElement[1].innerHTML += singleCard(course);
          }
      });
    });
  }

  const attachListenerToCard = () => {
    let cardCourse = document.querySelectorAll('.card--course');
    cardCourse.forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = `course.html?id=${card.getAttribute('data-id')}`
        });
    });
  }

  displayTopCourses();
  setTimeout(() => {
    attachListenerToCard();
  }, 1000)

};


export default TopCourses