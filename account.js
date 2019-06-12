function makeRequest(method, url, body){
    return new Promise(
        function (resolve, reject){
            let req = new XMLHttpRequest();
            
            req.onload = function(){
                const data = JSON.parse(req.responseText);
                if (req.status>=200 && req.status<300) {
                    resolve(data);    
                } else {
                    const reason = new Error('Rejected');
                    reject(reason);
                }        
            };
            
            req.open(method, url);
            if(body==null){
                req.send();
            }
            else {
                req.send(JSON.stringify(body));
            }
        }
    );
}

function getAccount(){
    let id = Number(document.getElementById("anAcc").value);
    makeRequest("GET",`http://localhost:8080/AccountSETemplate/api/account/searchAccounts/${id}`)
        .then((data) => {
            const firstName = data.firstName;
            const lastName = data.lastName;
            document.getElementById("accountFirstName").innerHTML=firstName;
            document.getElementById("accountLastName").innerHTML=lastName;
            console.log(data);
    })
        .catch((error) => {
            console.log(error.message);
    });
    return false;
}

function getAllAccounts(){
    makeRequest("GET","http://localhost:8080/AccountSETemplate/api/account/getAllAccounts")
        .then((data) => {
            let allnames = " ";
            const container = document.getElementById('accountsDiv');
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            for(let i=0; i<data.length;i++){
                let myP = document.createElement('p');
                myP.innerHTML = data[i].firstName;
                myP.setAttribute('name', 'acc-text')
                container.appendChild(myP);
            }
    })
        .catch((error) => {
            console.log(error.message);
        });
     return false;
}

function createAccount(){
    let newAcc = {
        firstName: document.getElementById("accFirstName").value,
        lastName: document.getElementById("accLastName").value,
        accountNumber: document.getElementById("accNumber").value
     };
    makeRequest("POST","http://localhost:8080/AccountSETemplate/api/account/createAccounts",newAcc)
        .then((data) => {
            console.log(data);
    })
        .catch((error) => {
            console.log(error.message);
    });
    
    return false;
}


function deleteAccount(){
    let accountNumber = Number(document.getElementById("deleteAcc").value);
    makeRequest("DELETE",`http://localhost:8080/AccountSETemplate/api/account/deleteAccounts/${accountNumber}`)
        .then((data) => {
            console.log(data);
    })
        .catch((error) => {
            console.log(error.message);
    });
    return false;
}


function updateAccount(){
    let id = Number(document.getElementById("updateId").value);
    let updateAcc = {
    firstName: document.getElementById("updateFirstName").value,
    lastName: document.getElementById("updateLastName").value,
    accountNumber: document.getElementById("updateNumber").value
    };
    makeRequest("PUT",`http://localhost:8080/AccountSETemplate/api/account/updateAccounts/${id}`, updateAcc)
        .then((data) => {
            console.log(data);
    })
        .catch((error) => {
            console.log(error.message);
    });

    return false;
}



