function attachEvents() {
    let phonebook = document.getElementById('phonebook');
    let baseUrl = ' http://localhost:3030/jsonstore/phonebook/';
    let loadButton = document.getElementById('btnLoad');
    loadButton.addEventListener('click', loadContacts);
    let createButton = document.getElementById('btnCreate');
    createButton.addEventListener('click', createContacts);
    let inputPhone = document.getElementById('phone');
    let inputPerson = document.getElementById('person');


    function loadContacts() {
        phonebook.innerHTML = '';
        fetch(baseUrl)
            .then((res) => res.json())
            .then((data) => {
                for (each of Object.keys(data)) {
                    let delButton = document.createElement('button');
                    delButton.textContent = 'Delete';
                    let newLi = document.createElement('li');
                    newLi.textContent = `${data[each].person}: ${data[each].phone}`;
                    newLi.setAttribute('name', `${data[each]._id}`);
                    phonebook.appendChild(newLi);
                    newLi.appendChild(delButton);
                    delButton.addEventListener('click', deleteContacts);
                }
            });
    }

    function createContacts() {

        let data = {
            person: inputPerson.value,
            phone: inputPhone.value
        };

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        let newLi = document.createElement('li');
        let delButton = document.createElement('button');
        delButton.textContent = 'Delete';
        newLi.textContent = `${data.person}: ${data.phone}`;
        phonebook.appendChild(newLi);
        newLi.appendChild(delButton);
        delButton.addEventListener('click', deleteContacts);


        inputPhone.value = '';
        inputPerson.value = '';
    }

    function deleteContacts(e) {
        let idForDelete = e.target.parentNode.getAttribute('name');
        fetch(baseUrl + idForDelete, {
            method: 'DELETE',
        });

        e.target.parentNode.remove();
    }
}

attachEvents();