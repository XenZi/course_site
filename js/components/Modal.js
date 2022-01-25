import Login from "./Login.js";
import Register from "./Register.js";
const Modal = () => {
    const modals = document.querySelectorAll(".modal");
    const closeModal = document.querySelectorAll('.js-modal-close');
    const htopRegister = document.querySelector(".js-htop-register");
    const htopLogin = document.querySelector(".js-htop-login");
    const userLogin = document.querySelector(".js-user");
    const redirectToRegister = document.querySelector(".js-redirect-to-register");
    const redirectToLogin = document.querySelector(".js-redirect-to-login");
    const deleteCTA = document.querySelectorAll('.js-cta-delete-button');
    const deleteModal = document.querySelector('.js-modal-delete');
    const deleteAction = document.querySelector('.js-delete-button');

    const removeAllModals = () => {
        modals.forEach((modal) => {
          modal.classList.remove("modal--active");
        });
    };

    const getModalElement = (el) => {
        return el.parentElement.parentElement;
    };

    const showRegisterModal = () => {
        const registerModal = document.querySelector(".js-modal-register");
        registerModal.classList.toggle("modal--active");
    };

    const showLoginModal = () => {
        const loginModal = document.querySelector(".js-modal-login");
        loginModal.classList.toggle("modal--active");
    };

    redirectToRegister.addEventListener("click", () => {
        removeAllModals();
        showRegisterModal();
        Register();
    });

    redirectToLogin.addEventListener("click", () => {
        removeAllModals();
        showLoginModal();
        Login();
    });

    closeModal.forEach((button) => {
        button.addEventListener("click", () => {
          const modal = getModalElement(button);
          modal.classList.remove("modal--active");
        });
    });

    htopRegister.addEventListener("click", () => {
        showRegisterModal();
        Register();
    });

    htopLogin.addEventListener("click", () => {
        showLoginModal();
        Login();
    });

    userLogin.addEventListener("click", () => {
        let data = window.sessionStorage.getItem('user');
        if (!data) {
            showLoginModal();
            Login();
        }

    });

    window.onclick = (e) => {
        if (e.target === modals[0] || e.target === modals[1]) {
          removeAllModals();
        }
    };

    window.onkeydown = (e) => {
        if (e.keyCode === 27) {
          removeAllModals();
        }
    };

    deleteCTA.forEach(CTA => {
        CTA.addEventListener('click', () => {
            deleteModal.classList.add('modal--active');

            deleteAction.parentElement.childNodes.forEach(node => {
                node.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteModal.classList.remove('modal--active');
                });
            });
        });
    });
};

export default Modal