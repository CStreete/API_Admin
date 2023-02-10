"use strict";



// Html Element Variables


const choice = document.getElementById('option');
const myCbtn = document.getElementById('myCbtn');
const form = document.getElementById('form');


const viewOrdersOption = document.getElementById('viewOrders');
const deleteUserOption = document.getElementById('deleteUser');
const updateUserOption = document.getElementById('updateUser');



function choiceFunc (){

    switch(choice.value){
        case viewOrdersOption.value:
            viewOrders();
            break;
        case deleteUserOption.value:
            renderDeleteUserHTML();
            break;
        case updateUserOption.value:
            renderUpdateUserHTML();
            break;
    }


    
}

myCbtn.addEventListener('click', choiceFunc);




// Function

function viewOrders (){
    
fetch('https://firestore.googleapis.com/v1/projects/fir-demo-99463/databases/(default)/documents/orders')
.then(res=> res.json())
.then(data => {
    const appData = data.documents;
    
    console.log(appData)

    for (const item of appData) {
        let documentID = item.name;
        let lastString = documentID.substr(documentID.length - 20)
        
        form.innerHTML += ` 
        <article class="text-lg text-black my-5 flex bg-white justify-center w-fit px-14 py-14 shadow-black shadow-md">
        <ul class="">
            <li>
                <span class=" font-semibold"> Order ID: </span>
                ${lastString}
            </li>
            <li>
            <span class=" font-semibold"> Name: </span> 
                ${item.fields.name.stringValue}
            </li>
            <li>
            <span class=" font-semibold"> Email: </span>
            ${item.fields.email.stringValue}
            </li>
            <li>
            <span class=" font-semibold"> Tele: </span>
            ${item.fields.number.stringValue}
            </li>
            <li>
            <span class=" font-semibold"> Shipping Method: </span>
            ${item.fields.shippingMethod.stringValue}
            </li>
            <li>
            <span class=" font-semibold"> Shipping Adress: </span>
            <br>
            <span class=" font-semibold"> Adress: </span>
            ${item.fields.shippingAdress.mapValue.fields.adress.stringValue}
            <br>
            <span class=" font-semibold"> City: </span>
            ${item.fields.shippingAdress.mapValue.fields.city.stringValue}
            <br>
            <span class=" font-semibold"> Postal Code: </span>
            ${item.fields.shippingAdress.mapValue.fields.postalCode.stringValue}
            </li>
        
           
         </ul>
        </article>
    `
    
    }


});
        
   
}


function renderDeleteUserHTML (){
    return form.innerHTML = 
    `
    <form class="flex flex-col items-center">
        
        <input type="text" id="id" placeholder="Enter Id" class="text-white  rounded-md bg-fancyBlack w-96 mt-5 h-9 placeholder: pl-2 placeholder:text-white">
        <input type="button" id="deleteBtn" value="Delete User" onclick="deleteUser()"  class=" w-40 mt-5 h-9 placeholder: pl-2 rounded-md bg-fancyBlack text-white text-center">
    </form>
    `
}


function renderUpdateUserHTML(){
    return form.innerHTML = 
    ` 
    <form class="flex flex-col items-center">
        <input type="text" id="id" placeholder="Enter Id (Requierd)" name="id" class="text-white  rounded-md bg-fancyBlack w-96 mt-5 h-9 placeholder: pl-2 placeholder:text-white">
        <input type="text" id="name" name="name" placeholder="Update Name (Optional)" class="text-white  rounded-md bg-fancyBlack w-96 mt-5 h-9 placeholder: pl-2 placeholder:text-white">
        <input type="number" id="age" name="age" placeholder="Update Age (Optional)" class="text-white  rounded-md bg-fancyBlack w-96 mt-5 h-9 placeholder: pl-2 placeholder:text-white">
        <input type="text" id="level" name="level" placeholder="Update Level (Optional)" class="text-white  rounded-md bg-fancyBlack w-96 mt-5 h-9 placeholder: pl-2 placeholder:text-white">
        <input type="button" id="updateBtn" value="Update User" onclick="updateUser()" class=" w-40 mt-5 h-9 placeholder: pl-2 rounded-md bg-fancyBlack text-white text-center">
    </form>`
}


//Create User Function
function createUser () { 
const nameEl = document.getElementById('name');
const ageEl = document.getElementById('age');
const levelEl = document.getElementById('level');

let userName = nameEl.value;
let age = ageEl.value;
let level = levelEl.value;


    let body = JSON.stringify({

            "name": userName,
            "age": age,
            "level": level
        })
        console.log(body)


    fetch("https://rest-api-users.herokuapp.com/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
    
        },
        body : body
    }) 
        .then(result => result.json())
        .then(data => console.log(data))
        
}

//Delete User Function

function deleteUser(){
    const id = document.getElementById('id');
    fetch("https://firestore.googleapis.com/v1/projects/fir-demo-99463/databases/(default)/documents/orders/" + id.value, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => console.log(data))
    console.log(id.value)
}



//Update User Function 

function updateUser(){
    const id = document.getElementById('id');
    const nameEl = document.getElementById('name');
    const ageEl = document.getElementById('age');
    const levelEl = document.getElementById('level');

    let userName = nameEl.value;
    let age = ageEl.value;
    let level = levelEl.value;

    let body = "";

    if(nameEl.value == "" && levelEl.value == ""){
          body = JSON.stringify(
            {
              age: age,
            }
        )
    } else if (levelEl.value == "" && ageEl.value == ""){
         body = JSON.stringify(
            {
              name: userName
            }
        )
    } else if (ageEl.value == "" && nameEl.value== "" ){
         body = JSON.stringify(
            {
              level: level
            }
        )
    } else if (nameEl.value == ""){
        body = JSON.stringify(
            {
              level: level,
              age: age
            }
        )
    } else if (ageEl.value == ""){
        body = JSON.stringify(
            {
              name: userName,
              level: level
            }
        )
    } else if (levelEl.value == ""){
        body = JSON.stringify(
            {
              name: userName,
              age: age
            }
        )
    } else {
        body = JSON.stringify(
            {
              name: userName,
              age: age,
              level: level
            }
        )

    }

  
    fetch('https://rest-api-users.herokuapp.com/users/' + id.value , {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        }, body: body
    }) .then (result => result.json())
        .then(data => console.log(data))
}


