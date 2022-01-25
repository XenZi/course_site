const footerLinks = async(sortedArray) => {
    const definedArray = await sortedArray;
    const footerList = document.querySelectorAll(".footer__list");
    footerList[1].innerHTML = '';
    for(let i=0;i<6;i++) {
        footerList[1].innerHTML += `
            <li class="footer__item">
                <a href='./course.html?id=${definedArray[i].id}' class='footer__link'>${definedArray[i].naziv.substring(0,30)}...</a>
            </li>
        `
    }
}


export default footerLinks