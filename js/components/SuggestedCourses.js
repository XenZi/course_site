import {RECOMMENDED_COURSE_NUMBER} from '../config.js'

export const suggestedCourse = (courseArray) => {
    let parentElement = document.querySelector(".course__recommended");
    parentElement.innerHTML = '<h4>Recommended Courses</h4>'
    let template;
    for(let i=0;i<RECOMMENDED_COURSE_NUMBER;i++) {
        let index = Math.floor(Math.random() * courseArray.length);
        template =
        `
            <a class="card--recommended" href='./course.html?id=${courseArray[index].id}'>
            <img
            src="${courseArray[index].slika}"
            alt=""
            class="card--recommended__image"
            />
            <div class="card--recommended__info">
            <h3 class="card--recommend__title">
                ${courseArray[index].naziv.substring(0, 30)}
            </h3>
            <p class="card--recommended__price">${courseArray[index].cena}.00 RSD</p>
            </div>
        </a>
        `;
        parentElement.innerHTML += template
    }
};

