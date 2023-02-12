"use strict";



// Html Element Variables


const choice = document.getElementById('option');
const myCbtn = document.getElementById('myCbtn');
const form = document.getElementById('form');


const viewOrdersOption = document.getElementById('viewOrders');
const deleteUserOption = document.getElementById('deleteUser');
const updateUserOption = document.getElementById('updateUser');



window.onload = ()=>{
    viewOrders();
}




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
        <article  id="article" class="text-lg text-black my-5 flex flex-col  bg-white justify-center w-fit px-14 py-14 shadow-black shadow-md">
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
            <span class=" font-semibold"> Order Items: </span>
            ${item.fields.orderItems.stringValue}
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
         <div class=" pl-8 flex w-full">
         <input type="button" id="deleteBtn" value="Delete Order" onclick="deleteUser('${lastString}')"  class=" w-40 mt-5 mr-5 h-9 placeholder: pl-2 rounded-md bg-fancyBlack text-white text-center">
         <input type="button" id="updateBtn" value="Update Order" onclick="renderUpdateUserHTML('${lastString}')" class=" w-40 mt-5 h-9 placeholder: pl-2 rounded-md bg-fancyBlack text-white text-center">
         <div>
        </article>
    `
        
    }


});
        
   
}



function renderUpdateUserHTML(orderID){

    fetch("https://firestore.googleapis.com/v1/projects/fir-demo-99463/databases/(default)/documents/orders/" + orderID)
            .then(res=> res.json())
            .then(data=> {
                const appData = data;
                const article = document.getElementById('article');

                article.innerHTML = ` 
                
                   
                    <span class=" font-semibold"> Order ID: ${orderID} </span>
                    <form class="flex flex-col items-center">
                        <input type="text" id="name" name="name" placeholder="${appData.fields.name.stringValue}" class="text-white  rounded-md bg-fancyBlack w-96 mt-5 h-9 placeholder: pl-2 placeholder:text-white">
                        <input type="text" id="email" name="email" placeholder="${appData.fields.email.stringValue}" class="text-white  rounded-md bg-fancyBlack w-96 mt-5 h-9 placeholder: pl-2 placeholder:text-white">
                        <input type="text" id="tele" name="tele" placeholder="${appData.fields.number.stringValue}" class="text-white  rounded-md bg-fancyBlack w-96 mt-5 h-9 placeholder: pl-2 placeholder:text-white">
                        <input type="text" id="orderItems" name="orderItems" placeholder="${appData.fields.orderItems.stringValue}" class="text-white  rounded-md bg-fancyBlack w-96 mt-5 h-9 placeholder: pl-2 placeholder:text-white">
                        <input type="text" id="shipping-method" name="shipping-method" placeholder="${appData.fields.shippingMethod.stringValue}" class="text-white  rounded-md bg-fancyBlack w-96 mt-5 h-9 placeholder: pl-2 placeholder:text-white">
                        <input type="text" id="adress" name="adress" placeholder="${appData.fields.shippingAdress.mapValue.fields.adress.stringValue}" class="text-white  rounded-md bg-fancyBlack w-96 mt-5 h-9 placeholder: pl-2 placeholder:text-white">
                        <input type="text" id="city" name="city" placeholder="${appData.fields.shippingAdress.mapValue.fields.city.stringValue}" class="text-white  rounded-md bg-fancyBlack w-96 mt-5 h-9 placeholder: pl-2 placeholder:text-white">
                        <input type="text" id="postal-code" name="postal-code" placeholder="${appData.fields.shippingAdress.mapValue.fields.postalCode.stringValue}" class="text-white  rounded-md bg-fancyBlack w-96 mt-5 h-9 placeholder: pl-2 placeholder:text-white">
                        <input type="button" id="updateBtn" value="Update User" onclick="updateUser('${orderID}')" class=" w-40 mt-5 h-9 placeholder: pl-2 rounded-md bg-fancyBlack text-white text-center">
                        <input type="button" id="cancelBtn" value="Cancel" onclick="location.reload()" class=" w-40 mt-5 h-9 placeholder: pl-2 rounded-md bg-fancyBlack text-white text-center">
                     </form>               
              `
             
            })
}



//Reaload Page



//Delete User Function

function deleteUser(orderID){
    fetch("https://firestore.googleapis.com/v1/projects/fir-demo-99463/databases/(default)/documents/orders/" + orderID, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => console.log(data))
    console.log(orderID)

}






//Update User Function 

function updateUser(orderID){
    const id = document.getElementById('id');
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email'); 
    const teleEl = document.getElementById('tele');
    const shippingMethodEl = document.getElementById('shipping-method');
    const adressEl = document.getElementById('adress');
    const cityEl = document.getElementById('city');
    const postalCodeEl = document.getElementById('postal-code');
    const orderItemsEl = document.getElementById('orderItems');
    
    let userName = "";
    let email = "";
    let tele = "";
    let shippingMethod = "";
    let adress = "";
    let city = "";
    let postalCode = "";
    let orderItems = "";
   
    if(nameEl.value == ""){
        let placeHolderValue = nameEl.getAttribute('placeholder')
        userName = placeHolderValue
       } else{
         userName = nameEl.value 
       }

    if(emailEl.value == ""){
        let placeHolderValue = emailEl.getAttribute('placeholder')
        email = placeHolderValue
    } else{
        email = emailEl.value
    }

    if(teleEl.value == ""){
        let placeHolderValue = teleEl.getAttribute('placeholder')
        tele = placeHolderValue
    } else{
        tele = teleEl.value
    }

    if(shippingMethodEl.value == ""){
        let placeHolderValue = shippingMethodEl.getAttribute('placeholder')
        shippingMethod = placeHolderValue
    } else{
        shippingMethod = emailEl.value
    }

    if(adressEl.value == ""){
        let placeHolderValue = adressEl.getAttribute('placeholder')
        adress = placeHolderValue;
    } else{
        adress = adressEl.value;
    }

    if(cityEl.value == ""){
        let placeHolderValue = cityEl.getAttribute('placeholder')
        city = placeHolderValue;
    } else{
        city = cityEl.value;
    }

    if(postalCodeEl.value == ""){
        let placeHolderValue = postalCodeEl.getAttribute('placeholder')
        postalCode = placeHolderValue
    } else{
        postalCode = postalCodeEl.value
    }
    
    if(orderItemsEl.value == ""){
        let placeHolderValue = orderItemsEl.getAttribute('placeholder')
        orderItems = placeHolderValue
    } else{
        orderItems = orderItemsEl.value
    }




    const body = JSON.stringify(
        {
          "fields":{
              "name":{
                "stringValue": userName
              } , 
              "email":{
                "stringValue": email
              },
              "number":{
                "stringValue": tele
              },
              "orderItems":{
                "stringValue": "[" + orderItems + "]"
              },

              "shippingMethod":{
                "stringValue": shippingMethod
              },
              "shippingAdress": {
                "mapValue":{
                    "fields": {
                        "adress": { 
                            "stringValue": adress,
                        },
                        "postalCode":{
                            "stringValue": postalCode,
                        },
                        "city":{
                            "stringValue": city,
                        }
                    }
                }
            },
             



          }
          
          
          
        }
    )

  
    fetch("https://firestore.googleapis.com/v1/projects/fir-demo-99463/databases/(default)/documents/orders/" + orderID , {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        }, body: body
    }) 
    
    .then (result => result.json())
        .then(data => console.log(data))


        location.reload();
      
}


