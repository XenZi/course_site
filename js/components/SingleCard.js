import { checkValueExisting } from "../helpers.js";
const singleCard = function(singleCourse) {
    let _renderingData = {};

    const deconstructCourseObject = () => {
        const {
                id:id,
                slika:picture,
                naziv:title,
                kategorija:category,
                prosecnaOcena: avgRating,
                brojKorisnika: enrolledPeople,
                cena: price
            } = singleCourse

        _renderingData = {id, picture, title, category, avgRating, enrolledPeople, price}
    }

    const singleCardTemplate = function() {
        if (checkValueExisting(singleCourse)) {
            deconstructCourseObject();

            let template = `
            <div class="card--course" data-id="${_renderingData.id}">
            <img
              src="${_renderingData.picture}"
              class="card--course__image"
              alt=""
            />
            <div class="card--course__body">
              <h4 class="card--course__category">${_renderingData.category}</h4>
              <h3 class="card--course__title">
                ${_renderingData.title}
              </h3>
              <div class="card--course__stars">
                <div class="card--course__staricons">
                  <i class="fas fa-star card--course__star"></i>
                  <i class="fas fa-star card--course__star"></i>
                  <i class="fas fa-star card--course__star"></i>
                  <i
                    class="fas fa-star-half-alt card--course__star"
                  ></i>
                  <i class="far fa-star card--course__star"></i>
                </div>
                <span class="card--course__ratings">
                  ${_renderingData.avgRating}(${_renderingData.enrolledPeople})
                </span>
              </div>
            </div>
            <div class="card--course__footer">
              <div class="card--course__left">
                <div class="card--course__info">
                  <i class="fas fa-video card--course__footericon"></i>
                  <p class="card--course__desc">5 lessons</p>
                </div>
                <div class="card--course__info">
                  <i class="far fa-clock card--course__footericon"></i>
                  <p class="card--course__desc">8h:12min</p>
                </div>
              </div>
              <div class="card--course__price">
                <h3 class="card--course__price">${_renderingData.price}RSD</h3>
              </div>
            </div>
          </div>
            `

            if (template) return template
            else console.error("💥 Shocking Error: Template is not rendered!");
        }
    }
    let finalTemplate = singleCardTemplate();
    return finalTemplate
}

export default singleCard