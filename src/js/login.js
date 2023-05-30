const main = () => {
    // getting local storage data
    const userData = JSON.parse(localStorage.getItem('userData')) || [];

    // grabbing input elements
    const emailInputField = document.getElementById('email');
    const passwordInputField = document.getElementById('password');

    // grabbing error div's
    const emailErrorHolder = document.getElementById('emailError');
    const passwordErrorHolder = document.getElementById('passwordError');

    document
        .getElementById('submitLoginButton')
        .addEventListener('click', (e) => {
            e.preventDefault();

            const email = emailInputField.value;
            const password = passwordInputField.value;

            const isValidObj = isValid(email, password, userData);

            if (isValidObj.validate) {
                const user = userData.filter((u) => u.email === email)[0];
                if (user.password !== password) {
                    emailErrorHolder.innerText = 'Invalid credentials';
                    passwordErrorHolder.innerText = 'Invalid credentials';
                    return;
                }
                // generate a jwt token
                const token = generateJWT(user.id);
                // saving the token into the local storage
                localStorage.setItem('token', `bearer ${token}`);
                // success
                window.location.href = '../../index.html';
            } else {
                const error = isValidObj.error;

                if (error.email) {
                    emailErrorHolder.innerText = error.email;
                } else {
                    emailErrorHolder.innerText = '';
                }

                if (error.password) {
                    passwordErrorHolder.innerText = error.password;
                } else {
                    passwordErrorHolder.innerText = '';
                }
            }
        });
};

const isValid = (email, password, userData) => {
    // const emailEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const error = {};

    if (!email) {
        error.email = 'Email is required';
    } else if (!email.includes('@')) {
        error.email = 'Email format is not valid';
    } else if (email.length <= 5) {
        error.email =
            'Length of the email must be greater than 5 characters';
    }

    if (!password) {
        error.password = 'Password is required';
    }

    // checks if email exists
    let flag = true;
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === email) {
            flag = false;
            break;
        }
    }
    if (flag) {
        error.email = 'Invalid credentials';
        error.password = 'Invalid credentials';
    }

    return {
        validate: Object.keys(error).length > 0 ? false : true,
        error,
    };
};

const generateJWT = (id) => {
    const payload = { id };
    const token = btoa(JSON.stringify(payload));
    return token;
};

const decodeJWT = (jwtToken) => {
    return JSON.parse(atob(jwtToken));
};

window.onload = (_event) => {
    if (localStorage.getItem('token')) {
        window.location.href = '../../index.html';
    }
    main();
};
