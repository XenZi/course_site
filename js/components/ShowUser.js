import {getParamValue} from '../helpers.js';
import { loadFromTheApi } from '../models.js';
const ShowUser = async() => {
    const ID = getParamValue('id');
    const userObject = await loadFromTheApi(`korisnici/${ID}`)
    let userRight = document.querySelector('.user__right');
    userRight.innerHTML ='';
    const loadUserInfo = () => {
        const template = `
        <div class="user__topinfo">
            <img src="./img/avatar.png" alt="Avatar" />
            <h2 class="user__topinfo-title">${userObject.ime + " " + userObject.prezime}</h2>
        </div>
        <ul class="user__info">
            <li class="user__item">
                <p class="user__above-desc">E-Mail:</p>
                <p class="user__description">${userObject.email}</p>
            </li>
            <li class="user__item">
                <p class="user__above-desc">Username:</p>
                <p class="user__description">${userObject.korisnickoIme}</p>
            </li>
            <li class="user__item">
                <p class="user__above-desc">Date of birth:</p>
                <p class="user__description">${userObject.datumRodjenja}</p>
            </li>
            <li class="user__item">
                <p class="user__above-desc">Address:</p>
                <p class="user__description">${userObject.adresa}</p>
            </li>
            <li class="user__item">
                <p class="user__above-desc">Phone number:</p>
                <p class="user__description">${userObject.telefon}</p>
            </li>
        </ul>
      <div class="user__buttons">
        <button class="button button--edit js-user-edit" data-id=${userObject.id}>Edit</button>
      </div>
        `
        return template
    }

    userRight.innerHTML += loadUserInfo()
    let userEditButton = loadUserInfo() ? document.querySelector('.js-user-edit') : null
    if (userEditButton) userEditButton.addEventListener('click', () => {window.location.href = `useredit.html?id=${userObject.id}`})
};

export default ShowUser