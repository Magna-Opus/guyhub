
export const GetWithoutToken =(types) => {
   
    // let baseUrl='https://heartover.com/Guyhub/wp-json/api/';	

    let baseUrl='https://guyhub.online/wp-json/api/';	
    console.log(baseUrl+types);
   
    return new Promise((resolve, reject)=>{
        fetch(baseUrl+types,
        {
            method:'GET',
            headers:{
               
                "Content-Type":'application/json'
            },
      
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