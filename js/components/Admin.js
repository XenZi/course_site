import Modal from "./Modal.js";
const Admin = (coursesArray, usersArray) => {
  const adminBoxes = document.querySelectorAll(".js-admin-box");
  const adminTable = document.querySelectorAll(".table");
  const showSpecifiedTable = (tableID) => {
    const specifiedTable = document.querySelector(
      `[data-adminTable="${tableID}"]`
    );
    removeAllTables();
    specifiedTable.classList.remove("table--none");
  };

  const removeAllTables = () => {
    const allTables = document.querySelectorAll(".table");
    allTables.forEach((table) => {
      if (!table.classList.contains("table--none")) {
        table.classList.add("table--none");
      }
    });
  };

  const deconstructCourseObject = (courseObject) => {
    let objectForHeading = {};
    const {
      autor: author,
      naziv: name,
      datumIzmene: update,
      cena: price,
      brojLekcija: lectures,
      jezik: language,
      sertifikovan: certified,
    } = courseObject;

    objectForHeading = {
      author,
      name,
      update,
      price,
      lectures,
      language,
      certified,
    };
    return objectForHeading;
  };

  const deconstructUserObject = (userObject) => {
    let objectForHeading = {};
    const {
        ime: firstname,
        prezime: lastname,
        email,
        datumRodjenja: DOB,
        adresa: address,
        telefon: phone,
        korisnickoIme: username
    } = userObject;
    objectForHeading = {
        firstname, lastname, email, DOB, address, phone, username
    }
    return objectForHeading
  };
  
  const tableHeading = (object) => {
    const tableRow = document.createElement("tr");
    if (Object.keys(object).indexOf("autor") !== -1) {
      let tableHeadingList = Object.keys(deconstructCourseObject(object));

      tableRow.classList.add("table__row", "table__row--heading");

      tableHeadingList.forEach((heading) => {
        const tableTitle = document.createElement("th");
        tableTitle.classList.add("table__heading");
        tableTitle.innerText = heading.charAt(0).toUpperCase() + heading.slice(1);

        tableRow.appendChild(tableTitle);
      });

      for (let i = 0; i < 3; i++) {
        const tableTitle = document.createElement("th");
        tableTitle.classList.add("table__heading");
        tableTitle.innerText = "";
        tableRow.appendChild(tableTitle);
      }
    } else {
      let tableHeadingList = Object.keys(deconstructUserObject(object));
      tableRow.classList.add("table__row", "table__row--heading");

      tableHeadingList.forEach((heading) => {
        const tableTitle = document.createElement("th");
        tableTitle.classList.add("table__heading");
        tableTitle.innerText = heading.charAt(0).toUpperCase() + heading.slice(1);

        tableRow.appendChild(tableTitle);
      });
    }
    if (tableRow.childNodes.length > 0) {
      return tableRow;
    }
  };

  const fillTable = (arrayToFillWith, table) => {
    table.innerHTML = "";
    table.appendChild(tableHeading(arrayToFillWith[0]));

    if (Object.keys(arrayToFillWith[0]).indexOf('autor') !== -1) {
        arrayToFillWith.forEach(el => {
            const tableRow = document.createElement('tr');
            tableRow.classList.add('table__row');

            let tableValues = Object.values(deconstructCourseObject(el));
            tableValues.forEach(value => {
                const tableData = document.createElement('td');
                tableData.classList.add('table__data');
                tableData.innerText = value;
                tableRow.appendChild(tableData)
            });
            for(let i=0;i<3;i++) {
                const tableData = document.createElement('td');
                tableData.classList.add('table__data');
                if (i==0) {
                    tableData.innerHTML =
                    `
                    <a class="button table__edit js-edit-course-redirect" href='editcourse.html?id=${el.id}'>
                        Edit
                    </a>
                    `
                }
                else if (i==1) {
                    tableData.innerHTML =
                    `
                    <button class="button table__delete js-cta-delete-button">
                        Delete
                    </button>
                    `
                }
                else if (i==2) {
                    tableData.innerHTML =
                    `
                    <a class="button table__view js-edit-course-redirect" href='course.html?id=${el.id}'>
                        View
                    </a>
                    `
                }
                tableRow.appendChild(tableData)
            }
            table.appendChild(tableRow);
        });
    }
    else {
        arrayToFillWith.forEach(user => {
            const tableRow = document.createElement('tr');
            tableRow.classList.add('table__row');
            tableRow.setAttribute('data-id', user.id);
            let tableValues = Object.values(deconstructUserObject(user));
            tableValues.forEach(value => {
                const tableData = document.createElement('td');
                tableData.classList.add('table__data');
                tableData.innerText = value;
                tableRow.appendChild(tableData)
            });

            table.appendChild(tableRow);
        });
    }
  };

  const attachListenersToTableRows = () => {
      const tableRows = document.querySelectorAll('.table__row');
      tableRows.forEach((row) => {
        row.addEventListener('click', () => {
            window.location.href = `user.html?id=${row.getAttribute('data-id')}`
        });
      });
  }

  adminBoxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      showSpecifiedTable(box.getAttribute("data-tableShow"));
      if (box.getAttribute("data-tableShow") == 0) {
        fillTable(coursesArray, adminTable[1]);
      } else {
        fillTable(usersArray, adminTable[0]);
      }
      Modal();
    });
  });

  fillTable(usersArray, adminTable[0]);
  attachListenersToTableRows();
};

export default Admin;
