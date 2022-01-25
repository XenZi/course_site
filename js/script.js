import { API_URL } from "./config.js";
import { seperateObjectToArray, sortCouresArray } from "./helpers.js";
import { loadFromTheApi } from "./models.js";

import Search from "./components/Search.js";
import TopCourses from "./components/TopCourses.js";
import Courses from "./components/Courses.js";
import SpecifiedCourse from './components/SpecifiedCourse.js';
import FooterLinks  from './components/FooterLinks.js';
import Modal from "./components/Modal.js";
import Admin from "./components/Admin.js";
import Slider from './components/Slider.js';
import Nav from "./components/Nav.js";
import ShowUser from "./components/ShowUser.js";
import EditUser from "./components/EditUser.js";
import EditCourse from './components/EditCourse.js';
import Login from "./components/Login.js";
import Basket from "./components/Basket.js";
let loaderContainer = document.querySelector(".loader__container");

// LISTENER ZA LOADER

window.addEventListener("load", () => {
  setTimeout(() => {
    loaderContainer.classList.add("loader__container--none");
  }, 1000);
});


/*
                RUTIRANJE

*/

window.addEventListener('load', async() => {

  const course = await loadFromTheApi("/kursevi");
  const coursesArray = seperateObjectToArray(course);
  const user = await loadFromTheApi('/korisnici');
  const usersArray = seperateObjectToArray(user);

  if (window.location.pathname == '/' || window.location.pathname == '/index.html' || window.location.pathname == '/index.html#topCourses') {
    TopCourses(sortCouresArray(coursesArray));
    Slider();
  }
  else if (window.location.pathname == '/courses.html') {
    Courses(coursesArray)
  }
  else if (window.location.pathname.includes('/course.html')) {
  SpecifiedCourse(coursesArray)
  }
  else if (window.location.pathname.includes('/admin.html')) {
    Admin(coursesArray, usersArray)
  }
  else if (window.location.pathname.includes('/user.html')) {
    ShowUser();
  }
  else if (window.location.pathname.includes('/useredit.html')) {
    EditUser();
  }
  else if (window.location.pathname.includes('/editcourse.html')) {
    EditCourse();
  }
  Nav();
  FooterLinks(sortCouresArray(coursesArray));
  Modal();
  Search(coursesArray);
  Login();
  Basket();
});

