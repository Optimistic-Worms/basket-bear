
import firebase from 'firebase';

let firebaseConfig = {
  apiKey: "AIzaSyAR2V9PUTzmZxj0u-0FvnQqlg06VRlnHSc",
  authDomain: "bbasket-9e24a.firebaseapp.com",
  databaseURL: "https:\//bbasket-9e24a.firebaseio.com",
  projectId: "bbasket-9e24a",
  storageBucket: "bbasket-9e24a.appspot.com",
  messagingSenderId: "872393919907"
};


firebase.initializeApp(firebaseConfig);



export default firebase;