const Nav = () => {
    let navBurger = document.querySelector(".js-burger");
    let nav = document.querySelector(".nav");
    let header = document.querySelector(".header");
    let headerLogo = document.querySelector(".header__logo");
    let searchNav = document.querySelector(".js-nav-search");
    const jsUser = document.querySelector('.js-user');

    headerLogo.addEventListener("click", () => {
      window.location.href = "/index.html";
    });

    const getWindowHeight = () => {
        return window.scrollY;
    };



    searchNav.addEventListener('click', () => {
      const searchDiv = document.querySelector('.search');
      searchDiv.classList.toggle('search--active');
    });
    navBurger.addEventListener("click", () => {
        if (getWindowHeight() === 0) {
          header.classList.toggle("header--active");
        }
        nav.classList.toggle("nav--active");
    });

    window.addEventListener("scroll", () => {
        if (getWindowHeight() > 0) {
          header.classList.add("header--active");
        } else {
          header.classList.remove("header--active");
        }
    });

};

export default Nav