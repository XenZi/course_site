const Search = async(coursesArrayDev) => {
    let searchInput = document.querySelector(".form--nav__input");
    let searchResults = document.querySelector('.search__results');

    searchInput.addEventListener('input', async(e) => {
            if (e.target.value != "") {
                const filteredCourses = coursesArrayDev.filter((course) => {
                    return (course.naziv.toLowerCase().includes(e.target.value.toLowerCase()))
                });
                displayCourses(filteredCourses);
                filteredCourses.forEach(course => {
                    markText(e.target.value);
                });
            }
            else {
                searchResults.innerHTML = '';
            }
    });

    const displayCourses = (courses) => {
        const template = courses.map((course) => {
                return `
                <a class="search__card" href='./course.html?id=${course.id}'>
                    <div class="search__card-left">
                        <img src="${course.slika}" class="search__card-image" alt="">
                    </div>
                    <div class="search__card-right">
                        <h3 class="search__card-title">${course.naziv}</h3>
                        <p class="search__card-category">${course.kategorija}</p>
                        <p class="search__card-author">${course.autor}</p>
                        <p class="search__card-price">${course.cena},00 RSD</p>
                    </div>
                </a>
                `
            });
            searchResults.innerHTML = template

    };

    const markText = (searchString) => {
        if (searchString !== "" && searchResults.childNodes.length > 0) {
            let cardTitle = document.querySelectorAll('.search__card-title');
            cardTitle.forEach((_, i) => {
                let pattern = new RegExp(`${searchString}`,"gi");
                cardTitle[i].innerHTML = cardTitle[i].textContent.replace(pattern, match => `<mark>${match}</mark>`);
            })
        }
    };
};

export default Search;