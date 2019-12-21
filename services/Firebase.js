import firebase from 'firebase'; // 4.8.1

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  // init = () => {
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp({
  //       apiKey: "AIzaSyBHeg1Wj6SlybZzhJJdFnIib2slF_B9MIQ",
  //       authDomain: "guyhub-22a40.firebaseapp.com",
  //       databaseURL: "https://guyhub-22a40.firebaseio.com",
  //       projectId: "guyhub-22a40",
  //       storageBucket: "",
  //       messagingSenderId: "635614060547",
  //       appId: "1:635614060547:web:950e00b14b4ddcc4"
  //     });
  //   }
  // };
 
  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
    apiKey: "AIzaSyD1vYpHO5HLmDu5su0G52KOj1RxWgX2vaM",
    authDomain: "guyhub-d37d0.firebaseapp.com",
    databaseURL: "https://guyhub-d37d0.firebaseio.com",
    projectId: "guyhub-d37d0",
    storageBucket: "guyhub-d37d0.appspot.com",
    messagingSenderId: "834475278595",
    appId: "1:834475278595:web:cafed69e37c22019e52936"
  });
}
};


  
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user,image,seen,video } = snapshot.val();
    console.log("user is", seen)
    const { key: _id } = snapshot;
    const createdAt = new Date(numberStamp);
    const message = {
      _id,
      createdAt,
      text,
      image,
      video,
      user,
      seen
    };
    console.log(message,"All messages")
    return message;
  };

  on = callback =>
  {
    this.ref
      .on('child_added', snapshot => {callback(this.parse(snapshot))});
      
  }
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  
  
  // send the message to the Backend
  send = messages => {
    var seen=0;
    for (let i = 0; i < messages.length; i++) {
      const { text, user,image ,video} = messages[i];
      if(messages[i].image===undefined)
      {
        image=''
      }
      if(messages[i].video===undefined)
      {
        video=''
      }
      const message = {
        
        text,
        user,
        image,
        video,
        timestamp: this.timestamp,
        seen
      };
      console.log("message is: ",message)
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
