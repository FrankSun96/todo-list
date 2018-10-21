import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyCHbLtPD3Mxb6q0xlfEqCEyOc8oppUqzOc",
  authDomain: "todos-ddef6.firebaseapp.com",
  databaseURL: "https://todos-ddef6.firebaseio.com",
  projectId: "todos-ddef6",
  storageBucket: "todos-ddef6.appspot.com",
  messagingSenderId: "875290181323"
};
const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default firestore
