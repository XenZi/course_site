import singleCard  from "./SingleCard.js";
import {arrayWithDefinedLength} from "../models.js";

const Courses = function (coursesArr) {
    const _parentElement = document.querySelector('.courses__bottom');
    const _loadMore = document.querySelector('.js-load-more');
    let coursesNumberPerLoad = 6;

    const createRows = (courses) => {
        _parentElement.innerHTML = '';
        for(let i=0;i<Math.ceil(courses.length / 3); i++) { //
            const createRow = document.createElement('div');
            createRow.classList.add('row', 'js-courses-row');
            _parentElement.appendChild(createRow)
        }
    }

    const fillRows = (courses) => {
        createRows(courses);
        let coursesRow = document.querySelectorAll('.js-courses-row');
        for(let i=0;i<coursesRow.length;i++) {
            for(let j=i*3;j<i*3+3;j++) {
                if(courses[j]) {
                    coursesRow[i].innerHTML += singleCard(courses[j]);
                }
            }
        }
    }

    const attachListenerToCard = () => {
        let cardCourse = document.querySelectorAll('.card--course');
        cardCourse.forEach(card => {
            card.addEventListener('click', () => {
                window.location.href = `course.html?id=${card.getAttribute('data-id')}`
            });
        });
    }

    fillRows(arrayWithDefinedLength(coursesNumberPerLoad, coursesArr));
    attachListenerToCard();

    _loadMore.addEventListener('click', () => {
        if (coursesNumberPerLoad + 3 > coursesArr.length) {
            let temp = coursesArr.length - coursesNumberPerLoad;
            coursesNumberPerLoad += temp;
            fillRows(arrayWithDefinedLength(coursesNumberPerLoad, coursesArr))
        }
        else {
            fillRows(arrayWithDefinedLength(coursesNumberPerLoad += 3, coursesArr))
        }
        attachListenerToCard();
    })
};


export default Courses;