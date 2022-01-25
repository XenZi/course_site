export const validateMail = (mailInput) => {
    const mailRegEx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'g');
    if (mailRegEx.test(mailInput)) {
        return true
    }
    else {
        return false
    }
};

export const validateString = (stringInput) => {
    const stringRegEx = new RegExp( /([^\u0000-\u0040\u005B-\u0060\u007B-\u00BF\u02B0-\u036F\u00D7\u00F7\u2000-\u2BFF])+$/, 'g');
    if (stringRegEx.test(stringInput)) {
        return true
    }
    else {
        return false
    }
}

export const validateNumbers = (numbersInput) => {
    const numbersRegEx = new RegExp(/[\d\|]/, 'g');
    if (numbersRegEx.test(numbersInput)) {
        return true;
    }
    else {
        return false;
    }
};

export const validateURL = (urlInput) => {
    const urlRegEx = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,'g');

    if (urlRegEx.test(urlInput)) {
        return true
    }
    else {
        return false
    }
}



export const validateUsername = (username) => {
    const usernameRegEx = new RegExp(/[a-zA-Z]/, 'g');
    if (usernameRegEx.test(username)) {
        return true;
    }
    else {
        return false;
    }
}

export const makeSpecifiedTime = (element) => {
    const today = new Date().toISOString().split('T')[0];
    element.setAttribute('max', today);
}