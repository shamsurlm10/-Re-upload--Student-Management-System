const main = () => {
    // getting local storage data
    const studentData = JSON.parse(localStorage.getItem('studentData')) || [];

    // grabbing elements

    // showing all students
    const data = studentData.filter(
        (std) => std.userId === getLoggedInUserId()
    );
    const tableBody = document.getElementById('student-table-body');
    const tableSearchBody = document.getElementById(
        'student-table-search-body'
    );

    var rowsPerPage = 4;
    var currentPage = 1;

    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href = './login.html';
    });

    const displayRowsForPage = (pageNumber, data) => {
        const start = (pageNumber - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const rowsToDisplay = data.slice(start, end);

        tableBody.innerHTML = '';

        for (let i = 0; i < rowsToDisplay.length; i++) {
            const studentRow = rowsToDisplay[i];
            const row = document.createElement('tr');

            for (let key in studentRow) {
                if (
                    studentRow.hasOwnProperty(key) &&
                    key !== 'id' &&
                    key !== 'userId' &&
                    key !== 'city' &&
                    key !== 'country' &&
                    key !== 'parent' &&
                    key !== 'birthDate' &&
                    key !== 'selectedMarital' &&
                    key !== 'comment'
                ) {
                    const cell = document.createElement('td');
                    cell.textContent = studentRow[key];
                    row.appendChild(cell);
                }
            }

            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("class", "row-checkbox");
            const updateButtonCell = document.createElement('td');
            const updateButton = document.createElement('button');
            updateButton.classList.add('btn', 'btn-success');
            updateButton.style.padding = '5px';
            updateButton.textContent = 'Update';

            updateButton.addEventListener('click', function () {
                const row = this.parentNode.parentNode;
                const rowIndex = Array.from(tableBody.children).indexOf(row);
                const adjustedIndex =
                    rowIndex + (currentPage - 1) * rowsPerPage;

                const name = document.getElementById('user');
                const address = document.getElementById('address');
                const city = document.getElementById('city');
                const country = document.getElementById('country');
                const parent = document.getElementById('parent');
                const phone = document.getElementById('phone');
                const email = document.getElementById('email');
                const sid = document.getElementById('sid');
                const birthDate = document.getElementById('bdate');
                const enrollDate = document.getElementById('endate');

                const maleRadio = document.getElementById('maleRadio');
                const femaleRadio = document.getElementById('femaleRadio');
                const otherRadio = document.getElementById('otherRadio');
                const gender = studentRow.selectedGender;

                const marriedRadio = document.getElementById('marriedRadio');
                const unmarriedRadio =
                    document.getElementById('unmarriedRadio');
                const marital = studentRow.selectedMarital;

                const program = document.getElementById('program');
                const major = document.getElementById('major');

                const extraCurry = studentRow.extraCurriculum;
                for (let i = 0; i < extraCurry.length; i++) {
                    if (
                        document.getElementById('sports').value ===
                        extraCurry[i]
                    ) {
                        document.getElementById('sports').checked = true;
                    }
                    if (
                        document.getElementById('art').value === extraCurry[i]
                    ) {
                        document.getElementById('art').checked = true;
                    }
                    if (
                        document.getElementById('enter').value === extraCurry[i]
                    ) {
                        document.getElementById('enter').checked = true;
                    }
                }
                const comment = document.getElementById('comment');
                name.value = data[adjustedIndex].name;
                address.value = data[adjustedIndex].address;
                city.value = data[adjustedIndex].city;
                country.value = data[adjustedIndex].country;
                parent.value = data[adjustedIndex].parent;
                phone.value = data[adjustedIndex].phone;
                email.value = data[adjustedIndex].email;
                sid.value = data[adjustedIndex].sid;
                birthDate.value = data[adjustedIndex].birthDate;
                enrollDate.value = data[adjustedIndex].enrollDate;
                program.value = data[adjustedIndex].program;
                major.value = data[adjustedIndex].major;
                comment.value = data[adjustedIndex].comment;

                if (gender === 'Male') {
                    maleRadio.checked = true;
                } else if (gender === 'Female') {
                    femaleRadio.checked = true;
                } else if (gender === 'Other') {
                    otherRadio.checked = true;
                }

                if (marital === 'Married') {
                    marriedRadio.checked = true;
                } else if (marital === 'Unmarried') {
                    unmarriedRadio.checked = true;
                }

                // console.log(new Date(birthDate.value) < new Date('2005-01-01'));

                $('#updateModal').modal('show');

                var updateConfirmButton = document.getElementById(
                    'updateConfirmButton'
                );

                updateConfirmButton.addEventListener('click', function (e) {
                    e.preventDefault();
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
                            id: studentRow.id,
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
                        };
                        const newStudentData = studentData.map((std) => {
                            if (std.id === studentRow.id) {
                                return student;
                            } else {
                                return std;
                            }
                        });

                        localStorage.setItem(
                            'studentData',
                            JSON.stringify(newStudentData)
                        );

                        window.location.reload();

                        $('#updateModal').modal('hide');
                    }
                    else {
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
                        }

                        if (error.selectedMarital) {
                            maritalError.innerText = error.selectedMarital;
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
            });


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

                return {
                    validate: Object.keys(error).length > 0 ? false : true,
                    error,
                };
            };

            updateButtonCell.appendChild(updateButton);
            row.appendChild(updateButtonCell);


            const multiDelete = document.getElementById("multiDelete");
            multiDelete.addEventListener('click', function () {
                const checkboxes = document.querySelectorAll(".row-checkbox:checked");
                checkboxes.forEach(() => {
                    $('#confirmationModal').modal('show');
                    const deleteConfirmButton = document.getElementById('deleteConfirmButton');
                    deleteConfirmButton.addEventListener('click', function(){
                        const newStudentData = studentData.filter(
                            (std) => std.id !== studentRow.id
                        );
                        localStorage.setItem(
                            'studentData',
                            JSON.stringify(newStudentData)
                        );
                        window.location.reload();
                        $('#confirmationModal').modal('hide');
                    })
                });
            });

        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.style.padding = '5px';
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', function () {
            $('#confirmationModal').modal('show');
            const deleteConfirmButton = document.getElementById('deleteConfirmButton');
            deleteConfirmButton.addEventListener('click', function () {
                const newStudentData = studentData.filter(
                    (std) => std.id !== studentRow.id
                );
                localStorage.setItem(
                    'studentData',
                    JSON.stringify(newStudentData)
                );
                window.location.reload();
                $('#confirmationModal').modal('hide');
            });
        });

        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);
        checkboxCell.appendChild(checkbox);
        row.appendChild(checkboxCell)

        tableBody.appendChild(row);
    }
};

function generatePaginationButtons(data) {
    var totalPages = Math.ceil(data.length / rowsPerPage);
    var paginationContainer = document.getElementById(
        'pagination-container'
    );
    paginationContainer.innerHTML = '';

    for (var i = 1; i <= totalPages; i++) {
        var button = document.createElement('button');
        button.style.margin = '5px';
        button.classList.add('btn', 'btn-secondary');
        button.innerHTML = i;
        button.addEventListener('click', function (event) {
            var pageNumber = parseInt(event.target.innerHTML);
            currentPage = pageNumber;
            displayRowsForPage(currentPage, data);
        });
        paginationContainer.appendChild(button);
    }
}

document
    .getElementById('advanceSearch')
    .addEventListener('click', function () {
        var majorSearch = document.getElementById('searchMajor').value;
        var programSearch = document.getElementById('searchProgram').value;

        var maleRadio = document.getElementById('searchMaleRadio');
        var femaleRadio = document.getElementById('searchFemaleRadio');
        var otherRadio = document.getElementById('searchOtherRadio');

        var selectedGenderFilter = '';

        if (maleRadio.checked) {
            selectedGenderFilter = maleRadio.value;
        } else if (femaleRadio.checked) {
            selectedGenderFilter = femaleRadio.value;
        } else if (otherRadio.checked) {
            selectedGenderFilter = otherRadio.value;
        }

        var searchId = document.getElementById('searchId').value;
        var searchUser = document.getElementById('searchUser').value;

        var filteredData = data.filter(function (student) {
            if (
                majorSearch &&
                student.major
                    .toLowerCase()
                    .indexOf(majorSearch.toLowerCase()) === -1
            ) {
                return false;
            }
            if (
                programSearch &&
                student.program
                    .toLowerCase()
                    .indexOf(programSearch.toLowerCase()) === -1
            ) {
                return false;
            }
            if (
                selectedGenderFilter &&
                student.selectedGender !== selectedGenderFilter
            ) {
                return false;
            }
            if (
                searchId &&
                student.sid
                    .toLowerCase()
                    .indexOf(searchId.toLowerCase()) === -1
            ) {
                return false;
            }
            if (
                searchUser &&
                student.name
                    .toLowerCase()
                    .indexOf(searchUser.toLowerCase()) === -1
            ) {
                return false;
            }
            return true;
        });

        generatePaginationButtons(filteredData);
        displayRowsForPage(1, filteredData);

        maleRadio.checked = false;
        femaleRadio.checked = false;
        otherRadio.checked = false;
    });

document.getElementById('cancel').addEventListener('click', function () {
    window.location.reload();
});

// Function to initialize the student table and pagination
function initializeStudentTable() {
    generatePaginationButtons(data);
    displayRowsForPage(currentPage, data);
}

initializeStudentTable();
};

const getLoggedInUserId = () => {
    const jwtToken = localStorage.getItem('token').split(' ')[1];
    return JSON.parse(atob(jwtToken)).id;
};

window.onload = (_event) => {
    if (!localStorage.getItem('token')) {
        window.location.href = './login.html';
    }
    main();
};
