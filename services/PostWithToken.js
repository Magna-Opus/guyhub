
export const PostWithToken =(types,userData) => {
//  console.log("Userdata ",userData)
//  console.log("Authtoken ",userData.authtoken)
    // let baseUrl='https://heartover.com/Guyhub/wp-json/api/';	

     let baseUrl='https://guyhub.online/wp-json/api/';	
     console.log(baseUrl+types);
    //  console.log("data is: ",userData)
    return new Promise((resolve, reject)=>{
        fetch(baseUrl+types,
        {
            method:'POST',
            headers:{
                "authtoken":userData.authtoken,
                "Content-Type":'application/json'
            },
            body:JSON.stringify(userData)
        })
        .then((response)=>response.json())
        .then((responseJson)=>{            
            resolve(responseJson);
        })
        .catch((error)=>{
            reject(error);
        })
    })
}