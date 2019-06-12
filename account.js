function makeRequest(method, url, body) {
    return new Promise(
        function (resolve, reject) {
            let req = new XMLHttpRequest();

            req.onload = function () {
                const data = JSON.parse(req.responseText);
                if (req.status >= 200 && req.status < 300) {
                    resolve(data);
                } else {
                    const reason = new Error('Rejected');
                    reject(reason);
                }
            };

            req.open(method, url);
            req.send(JSON.stringify(body));
        }
    );
}

function getAccount() {
    let id = Number(document.getElementById("anAcc").value);
    makeRequest("GET", `http://localhost:8080/AccountSETemplate/api/account/searchAccounts/${id}`)
        .then((data) => {
            const firstName = data.firstName;
            const lastName = data.lastName;
            document.getElementById("accountFirstName").innerHTML = firstName;
            document.getElementById("accountLastName").innerHTML = lastName;
            console.log(data);
        })
        .catch((error) => console.log(error.message));
    return false;
}

function getAllAccounts() {
    makeRequest("GET", "http://localhost:8080/AccountSETemplate/api/account/getAllAccounts")
        .then((data) => {
            const container2 = document.getElementById('accountsTable');
        console.log(data);

            for (let i = 0; i < data.length; i++) {
            if (document.contains(document.getElementById("row" + data[i].id))){
            container2.removeChild(document.getElementById("row" + data[i].id));
        }
                
                let myRow = document.createElement('tr');
                myRow.id ="row" + data[i].id;
                container2.appendChild(myRow);
                let myFirstName = document.createElement('td');
                myFirstName.innerHTML = data[i].firstName;
                let myLastName = document.createElement('td');
                myLastName.innerHTML = data[i].lastName;
                let myAccNum = document.createElement('td');
                myAccNum.innerHTML = data[i].accountNumber;
                
                myRow.appendChild(myFirstName);
                myRow.appendChild(myLastName);
                myRow.appendChild(myAccNum);
                
            }
        })
        .catch((error) => console.log(error.message));
    return false;
}

function createAccount() {
    let newAcc = {
        firstName: document.getElementById("accFirstName").value,
        lastName: document.getElementById("accLastName").value,
        accountNumber: document.getElementById("accNumber").value
    };
    makeRequest("POST", "http://localhost:8080/AccountSETemplate/api/account/createAccounts", newAcc)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.log(error.message));

    return false;
}


function deleteAccount() {
    let accountNumber = Number(document.getElementById("deleteAcc").value);
    makeRequest("DELETE", `http://localhost:8080/AccountSETemplate/api/account/deleteAccounts/${accountNumber}`)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.log(error.message));
    return false;
}


function updateAccount() {
    let id = Number(document.getElementById("updateId").value);
    let updateAcc = {
        firstName: document.getElementById("updateFirstName").value,
        lastName: document.getElementById("updateLastName").value,
        accountNumber: document.getElementById("updateNumber").value
    };
    makeRequest("PUT", `http://localhost:8080/AccountSETemplate/api/account/updateAccounts/${id}`, updateAcc)
        .then((data) => {
            console.log(data);
        }).catch((error) => console.log(error.message));

    return false;
}



