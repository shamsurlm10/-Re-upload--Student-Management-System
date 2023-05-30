const main = () => {
    // getting local storage data
    const studentData = JSON.parse(localStorage.getItem('studentData')) || [];

    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href = './src/pages/login.html';
    });
    const form = document.getElementById("student-form")
    document.getElementById('submit').addEventListener('click', (e) => {
        e.preventDefault();

        // grabbing all input field
        const name = document.getElementById('user').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        const parent = document.getElementById('parent').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const sid = document.getElementById('sid').value;
        const birthDate = document.getElementById('bdate').value;
        const enrollDate = document.getElementById('endate').value;

        const maleRadio = document.getElementById('maleRadio');
        const femaleRadio = document.getElementById('femaleRadio');
        const otherRadio = document.getElementById('otherRadio');

        let selectedGender = '';
        if (maleRadio.checked) {
            selectedGender = maleRadio.value;
        } else if (femaleRadio.checked) {
            selectedGender = femaleRadio.value;
        } else if (otherRadio.checked) {
            selectedGender = otherRadio.value;
        }

        const marriedRadio = document.getElementById('marriedRadio');
        const unmarriedRadio = document.getElementById('unmarriedRadio');

        let selectedMarital = '';
        if (marriedRadio.checked) {
            selectedMarital = marriedRadio.value;
        } else if (unmarriedRadio.checked) {
            selectedMarital = unmarriedRadio.value;
        }

        const program = document.getElementById('program').value;
        const major = document.getElementById('major').value;

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const extraCurriculum = [];

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                extraCurriculum.push(checkboxes[i].value);
            }
        }

        const comment = document.getElementById('comment').value;

        // grabbing error div's
        const usernameError = document.getElementById('usernameError');
        const addressError = document.getElementById('addressError');
        const cityError = document.getElementById('cityError');
        const countryError = document.getElementById('countryError');
        const parentError = document.getElementById('parentError');
        const phoneError = document.getElementById('phoneError');
        const emailError = document.getElementById('emailError');
        const sidError = document.getElementById('sidError');
        const bdateError = document.getElementById('bdateError');
        const endateError = document.getElementById('endateError');
        const genderError = document.getElementById('genderError');
        const maritalError = document.getElementById('maritalError');
        const programError = document.getElementById('programError');
        const majorError = document.getElementById('majorError');
        const extraError = document.getElementById('extraError');
        const commentError = document.getElementById('commentError');

        const isValidObj = isValid(
            name,
            address,
            city,
            country,
            parent,
            phone,
            email,
            sid,
            birthDate,
            enrollDate,
            selectedGender,
            selectedMarital,
            program,
            major,
            extraCurriculum,
            comment,
            studentData
        );

        if (isValidObj.validate) {
            const student = {
                id: generateId(),
                userId: getLoggedInUserId(),
                name: name,
                address: address,
                city: city,
                country: country,
                parent: parent,
                phone: phone,
                email: email,
                sid: sid,
                birthDate: birthDate,
                enrollDate: enrollDate,
                selectedGender: selectedGender,
                selectedMarital: selectedMarital,
                program: program,
                major: major,
                extraCurriculum: extraCurriculum,
                comment: comment,
                studentData
            };
            // clear form
            form.reset()
            // saving the student
            const newStudentData = [...studentData];
            newStudentData.push(student);
            // saving to local storage
            localStorage.setItem('studentData', JSON.stringify(newStudentData));

            alert('Student saved successfully');
        } else {
            // TODO: Display error message like login and register
            // TODO: Grab all div (error holder) and change innerText like login and register
            const error = isValidObj.error;

            if (error.name) {
                usernameError.innerText = error.name;
            } else {
                usernameError.innerText = '';
            }

            if (error.address) {
                addressError.innerText = error.address;
            } else {
                addressError.innerText = '';
            }

            if (error.city) {
                cityError.innerText = error.city;
            } else {
                cityError.innerText = '';
            }
            if (error.country) {
                countryError.innerText = error.country;
            } else {
                countryError.innerText = '';
            }

            if (error.parent) {
                parentError.innerText = error.parent;
            } else {
                parentError.innerText = '';
            }

            if (error.phone) {
                phoneError.innerText = error.phone;
            } else {
                phoneError.innerText = '';
            }
            if (error.email) {
                emailError.innerText = error.email;
            } else {
                emailError.innerText = '';
            }

            if (error.sid) {
                sidError.innerText = error.sid;
            } else {
                sidError.innerText = '';
            }

            if (error.birthDate) {
                bdateError.innerText = error.bdate;
            } else {
                bdateError.innerText = '';
            }
            if (error.enrollDate) {
                endateError.innerText = error.enrollDate;
            } else {
                endateError.innerText = '';
            }

            if (error.selectedGender) {
                genderError.innerText = error.selectedGender;
            } else {
                genderError.innerText = '';
            }

            if (error.selectedMarital) {
                maritalError.innerText = error.selectedMarital;
            } else {
                maritalError.innerText = '';
            }
            if (error.program) {
                programError.innerText = error.program;
            } else {
                programError.innerText = '';
            }

            if (error.major) {
                majorError.innerText = error.major;
            } else {
                majorError.innerText = '';
            }
            if (error.extraCurriculum) {
                extraError.innerText = error.extraCurriculum;
            } else {
                extraError.innerText = '';
            }
            if (error.comment) {
                commentError.innerText = error.comment;
            } else {
                commentError.innerText = '';
            }
            console.log(isValidObj.error); // TODO: remove it
        }
    });
};

const isValid = (name, address, city, country, parent, phone, email, sid,
    birthDate, enrollDate, selectedGender, selectedMarital, program, major, extraCurriculum, comment, studentData) => {
    // TODO: Implement this

    const error = {};

    if (!name) {
        error.name = 'Name is required';
    } else if (name.length <= 2) {
        error.name =
            'Length of the Name must be greater than 2 characters';
    } else if (!/^[a-zA-Z.\s]+$/.test(name)) {
        error.name =
            'Name field can only contain alphabetic characters and a dot (.)';
    }
    if (!address) {
        error.address = 'Address is required';
    }
    if (!city) {
        error.city = 'City is required';
    } else if (!/^[a-zA-Z\s]+$/.test(city)) {
        error.city =
            'City field can only contain alphabetic characters';
    }
    if (!country) {
        error.country = 'Country is required';
    } else if (!/^[a-zA-Z\s]+$/.test(country)) {
        error.country =
            'Country field can only contain alphabetic characters';
    }
    if (!parent) {
        error.parent = 'Paparentrent is required';
    } else if (parent.length <= 2) {
        error.parent =
            'Length of the Parent must be greater than 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(parent)) {
        error.parent =
            'Parent field can only contain alphabetic characters.';
    }
    if (!phone) {
        error.phone = 'Phone is required';
    } else if (!/^[0-9+\s]+$/.test(phone)) {
        error.phone =
            'Phone field can only contain Numeric characters and "+".';
    }
    if (!email) {
        error.email = 'Email is required';
    } else if (!email.includes('@')) {
        error.email = 'Email format is not valid';
    } else if (email.length <= 5) {
        error.email = 'Length of the email must be greater than 5 characters';
    }
    if (!sid) {
        error.sid = 'Sid is required';
    } else if (!/^[0-9\s]+$/.test(sid)) {
        error.sid =
            'Student Id field can only contain Numeric characters.';
    }
    if (!birthDate) {
        error.birthDate = 'BirthDate is required';
    }
    if (!enrollDate) {
        error.enrollDate = 'EnrollDate is required';
    }
    if (!selectedGender) {
        error.selectedGender = 'Gender is required';
    }
    if (!selectedMarital) {
        error.selectedMarital = 'Marital status is required';
    }
    if (!program) {
        error.program = 'Program is required';
    }
    if (!major) {
        error.major = 'Major is required';
    }
    if (!extraCurriculum.length) {
        error.extraCurriculum = 'Extra Curriculum is required';
    }
    if (!comment) {
        error.comment = 'Comment is required';
    }
    for (let i = 0; i < studentData.length; i++) {
        if (studentData[i].sid === sid) {
            error.sid = 'Student Id already taken';
        }
        if (studentData[i].email === email) {
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

const getLoggedInUserId = () => {
    const jwtToken = localStorage.getItem('token').split(' ')[1];
    return JSON.parse(atob(jwtToken)).id;
};

window.onload = (_event) => {
    if (!localStorage.getItem('token')) {
        window.location.href = './src/pages/login.html';
    }
    main();
};
