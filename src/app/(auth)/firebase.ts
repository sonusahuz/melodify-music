import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDCahW5As7OhGm4RCngeLIg3f9YdB9NbSc',
  authDomain: 'musicolet-5afab.firebaseapp.com',
  projectId: 'musicolet-5afab',
  storageBucket: 'musicolet-5afab.appspot.com',
  messagingSenderId: '928567062446',
  appId: '1:928567062446:web:f9074d9c7c66601a97223f',
  measurementId: 'G-5KF89KB3FZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
