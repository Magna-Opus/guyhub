export const PostVideoData =(types, userData,token) => {
    console.log("User data....",userData);
    console.log("Token....",token)
   // debugger;
   let baseUrl='https://guyhub.online/wp-json/api/';
     //let baseUrl='https://heartover.com/Guyhub/wp-json/api/';	
     console.log(baseUrl+types);
     return new Promise((resolve, reject)=>{
         fetch(baseUrl+types,
         {
             method:'POST',
             headers:{
                'Content-Type': 'multipart/form-data',
                "authtoken":token,
                
            },
             body:userData
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