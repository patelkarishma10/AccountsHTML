function getAccount(){
    let id = Number(document.getElementById("anAcc").value);
    let req = new XMLHttpRequest();
    req.onload= function(){

        const data = JSON.parse(req.responseText);
        const firstName = data.firstName;
        const lastName = data.lastName;
        document.getElementById("accountFirstName").innerHTML=firstName;
        document.getElementById("accountLastName").innerHTML=lastName;
    };
req.open("GET",`http://localhost:8080/AccountSETemplate/api/account/searchAccounts/${id}`);
req.send();
    
    return false;
}


function getAllAccounts(){
    let req = new XMLHttpRequest();
    req.onload= function(){
 
        console.log(req.responseText);
        const data = JSON.parse(req.responseText);
        
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
    }
 req.open("GET","http://localhost:8080/AccountSETemplate/api/account/getAllAccounts");
    req.send();

     return false;
}

function createAccount(){
    let req = new XMLHttpRequest();
    let newAcc = {
    firstName: document.getElementById("accFirstName").value,
    lastName: document.getElementById("accLastName").value,
    accountNumber: document.getElementById("accNumber").value
};
    
    req.onload= function(){
        console.log(req.responseText);
        const data = JSON.parse(req.responseText);
        
    }
     req.open("POST","http://localhost:8080/AccountSETemplate/api/account/createAccounts");
    req.send(JSON.stringify(newAcc));
    
    return false;
}



function deleteAccount(){
    let accountNumber = Number(document.getElementById("deleteAcc").value);
    let req = new XMLHttpRequest();
    req.onload= function(){
        console.log(req.responseText);
        const data = JSON.parse(req.responseText);

    };
req.open("DELETE",`http://localhost:8080/AccountSETemplate/api/account/deleteAccounts/${accountNumber}`);
req.send();
    return false;
}


function updateAccount(){
    let id = Number(document.getElementById("updateId").value);
    let req = new XMLHttpRequest();
    
    let updateAcc = {
    firstName: document.getElementById("updateFirstName").value,
    lastName: document.getElementById("updateLastName").value,
    accountNumber: document.getElementById("updateNumber").value
};
    
    req.onload= function(){

        const data = JSON.parse(req.responseText);

    };
req.open("PUT",`http://localhost:8080/AccountSETemplate/api/account/updateAccounts/${id}`);
req.send(JSON.stringify(updateAcc));
    return false;
}