import * as firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCgX41srAgNZaFyNdkO7RJpVtkbB5HTfo4',
  authDomain: 'mobile-c3c75.firebaseapp.com',
  projectId: 'mobile-c3c75',
  storageBucket: 'mobile-c3c75.appspot.com',
  messagingSenderId: '438736663256',
  appId: '1:438736663256:web:6dc24d300a0bb335fd9dad',
};

firebase.initializeApp(firebaseConfig);

export const db = getFirestore();
