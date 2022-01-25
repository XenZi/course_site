import { seperateObjectToArray } from "../helpers.js";
import { loadFromTheApi } from "../models.js";
const Login = async() => {
    const usersObject = await loadFromTheApi(`korisnici`);
    const allUsers = seperateObjectToArray(usersObject);
    const loginInputs = document.querySelectorAll('.form--login__input');
    const loginSubmit = document.querySelector('.form--login__submit');
    const modals = document.querySelectorAll(".modal");
    const modalSuccessfuly = document.querySelector('.js-modal-successfuly');
    let logout;
    const getLoginValues = () => {
        return  {'email': loginInputs[0].value, 'lozinka':loginInputs[1].value }
    };

    const validateUserInfo = (triedUser) => {
        let isUserLogged = false;

        for (let i=0;i<allUsers.length;i++) {
            if (triedUser.email == allUsers[i].email && triedUser.lozinka == allUsers[i].lozinka) {
                showLoggedUser(allUsers[i]);
                removeAllModals();
                console.log(modalSuccessfuly.childNodes[1].childNodes);
                modalSuccessfuly.childNodes[1].childNodes[1].innerHTML = `
                <i class="fas fa-check modal--successfully__icon"></i>
                <h3>Hello again ${allUsers[i].korisnickoIme}!</h3>
                <h3>You are <span class="modal--successfully__green">successfully</span> logged in!</h3>
                `;
                modalSuccessfuly.classList.add('modal--active');
                isUserLogged = true;
                setTimeout(() => {
                    removeAllModals();
                }, 1000);
                break;
            };
        }
        if (!isUserLogged) {
             showInputError();
        };
    };
    const storeUserInTheStorage = (user) => {
        const myStorage = window.sessionStorage;
        myStorage.setItem('user', JSON.stringify(user));
    };

    const showInputError = () => {
        loginInputs.forEach(input => {
            input.classList.add('form__input--error');
            input.nextElementSibling.innerHTML = 'Error! Wrong info!'
        });
    };

    const logoutUser = () => {
        logout = document.querySelector('.htop__logout');
        logout.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.replace("/");
        });
    }

    const removeAllModals = () => {
        modals.forEach((modal) => {
          modal.classList.remove("modal--active");
        });
    };

    const showLoggedUser = (user) => {

        storeUserInTheStorage(user);
        const htopRight = document.querySelector('.htop__right');
        const jsUser = document.querySelector('.js-user');
        jsUser.addEventListener('click', () => {
            window.location.href = `user.html?id=${user.id}`
        });

        htopRight.innerHTML = `
            <div class="htop__block--column">
            <a href="user.html?id=${user.id}" class="htop__user-profile">${user.korisnickoIme}</a>
            <a href="#" class="htop__logout">Logout</a>
          </div>
          <div class="htop__block">
            <a href="user.html?id=${user.id}" class="htop__user-profile-image">
              <img src="./img/avatar.png" class="htop__user-avatar">
            </a>
          </div>
        `;

        logoutUser();
        logout = document.querySelector('.htop__logout');
    };

    loginSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        validateUserInfo(getLoginValues());
    });

    const checkIfUserIsLogged = () => {
        let data = sessionStorage.getItem('user');
        if (data) {
            data = JSON.parse(data);
            showLoggedUser(data);
        }
    };

    checkIfUserIsLogged();

    // if(logout) {
    //     logout.addEventListener('click', () => {
    //         sessionStorage.clear();
    //         window.location.replace('/');
    //     });
    // }


};


export default Login;