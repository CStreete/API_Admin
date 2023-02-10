

    "use strict";



    //Fetch Api
    fetch('https://rest-api-users.herokuapp.com/users')
            .then(result => result.json())
            .then(data => console.log(data));


    //User Variable
    /*const body = JSON.stringify(
        {
            name: "Cameron Från JS",
            age: 99,
            level: "noob"
        }
    )*/
    // Create New User
    /*fetch('https://rest-api-users.herokuapp.com/users', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: body
    }) .then (result => result.json())
        .then(data => console.log(data))*/



   /* --------------------------------------------------------------------------------*/     

    /*
    //Update User
    //User Variable
        const body = JSON.stringify(
            {
             age: 1999
            }
        )

        fetch('https://rest-api-users.herokuapp.com/users/63cfcbee20645d737d14364c' , {
            method: 'PATCH',
           headers: {
                'Content-Type' : 'application/json'
            }, body: body
        }) .then (result => result.json())
            .then(data => console.log(data))*/

     /* --------------------------------------------------------------------------------*/    




     

    //Delete User    
        /*
        fetch('https://rest-api-users.herokuapp.com/users/63cfcbee20645d737d14364c' , {
                 method: 'DELETE',

        }) .then(res => res.json())
            .then(data => console.log(data))*/