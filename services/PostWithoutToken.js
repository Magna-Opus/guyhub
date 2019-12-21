export const PostWithoutToken =(types, userData) => {
   
    // let baseUrl='https://heartover.com/Guyhub/wp-json/api/';	

    let baseUrl='https://guyhub.online/wp-json/api/';	
    console.log(baseUrl+types);
    return new Promise((resolve, reject)=>{
        fetch(baseUrl+types,
        {
            method:'POST',
            headers:{
                
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