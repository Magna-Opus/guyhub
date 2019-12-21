
export const GetWithToken =(types,userData) => {

    let baseUrl='https://guyhub.online/wp-json/api/';	
    console.log(baseUrl+types);
    console.log("data is: ",userData)

    return new Promise((resolve, reject)=>{
        fetch(baseUrl+types,
        {
            method:'GET',
            headers:{
                "authtoken":userData.authtoken,
                "Content-Type":'application/json'
            }
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