import ImagePicker from 'react-native-image-picker';
// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
    title: 'Select Avatar',
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


  let pick=(cb)=>ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
  
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };
     cb(source, response.data,response.fileName,);
      
    }
  });

  module.exports=pick;