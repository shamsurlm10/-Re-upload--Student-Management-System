const main = () => {
    // getting local storage data
    const userData = JSON.parse(localStorage.getItem('userData')) || [];

    // grabbing input elements
    const usernameInputField = document.getElementById('username');
    const emailInputField = document.getElementById('email');
    const passwordInputField = document.getElementById('password');
    const confirmPasswordInputField =
        document.getElementById('confirmPassword');

    // grabbing error div's
    const usernameErrorHolder = document.getElementById('usernameError');
    const emailErrorHolder = document.getElementById('emailError');
    const passwordErrorHolder = document.getElementById('passwordError');
    const confirmPasswordErrorHolder = document.getElementById('confirmPasswordError');
    const agreeCheckboxError = document.getElementById('agreeCheckboxError');

    document
        .getElementById('submitRegisterButton')
        .addEventListener('click', (e) => {
            e.preventDefault();

            const username = usernameInputField.value;
            const email = emailInputField.value;
            const password = passwordInputField.value;
            const confirmPassword = confirmPasswordInputField.value;
            const agreeCheckbox = document.getElementById("agree").checked;

            const isValidObj = isValid(
                username,
                email,
                password,
                confirmPassword,
                agreeCheckbox,
                userData
            );

            if (isValidObj.validate) {
                const user = {
                    id: generateId(),
                    username,
                    email,
                    password,
                };

                const newUserData = [...userData];
                newUserData.push(user);
                // saving to local storage
                localStorage.setItem('userData', JSON.stringify(newUserData));
                // success
                window.location.href = '../pages/login.html';
            } else {
                const error = isValidObj.error;

                if (error.username) {
                    usernameErrorHolder.innerText = error.username;
                } else {
                    usernameErrorHolder.innerText = '';
                }

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

                if (error.confirmPassword) {
                    confirmPasswordErrorHolder.innerText =
                        error.confirmPassword;
                } else {
                    confirmPasswordErrorHolder.innerText = '';
                }
                if (error.agreeCheckbox) {
                    agreeCheckboxError.innerText = error.agreeCheckbox;
                  }
            }
        });
};

const isValid = (username, email, password, confirmPassword, agreeCheckbox, userData) => {
    // const usernameEx = /^[a-zA-Z0-9]+$/;
    // const emailEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const error = {};

    if (!username) {
        error.username = 'Username is required';
    } else if (username.length <= 2) {
        error.username =
            'Length of the username must be greater than 2 characters';
    } else if (!/^[a-zA-Z.\s]+$/.test(username)) {
        error.username =
            'Name field can only contain alphabetic characters and a dot (.)';
    }

    if (!email) {
        error.email = 'Email is required';
    } else if (!email.includes('@') || !email.endsWith('.com')) {
        error.email = 'Email format is not valid (example@example.com)';
    } else if (email.length <= 5) {
        error.email = 'Length of the email must be greater than 5 characters';
    }
    if (!password) {
        error.password = 'Password is required';
    } else if (password.length <= 5) {
        error.password =
            'Length of the password must be greater than 5 characters';
    }

    if (!confirmPassword) {
        error.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword !== password) {
        error.confirmPassword = 'Confirm password did not matched';
    }

    if (!agreeCheckbox) {
        error.agreeCheckbox = "You must agree to the terms and conditions";
      }
    // uniqueness of username and email
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].username === username) {
            error.username = 'Username already taken';
        }
        if (userData[i].email === email) {
            error.email = 'Email already taken';
        }
    }


    return {
        validate: Object.keys(error).length > 0 ? false : true,
        error,
    };
};

const generateId = () => {
    const factor1 = Math.floor(Math.random() * 100);
    const factor2 = Date.now();
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }

    return factor1 + result + factor2;
};

window.onload = (_event) => {
    if (localStorage.getItem('token')) {
        window.location.href = '../../index.html';
    }
    main();
};
