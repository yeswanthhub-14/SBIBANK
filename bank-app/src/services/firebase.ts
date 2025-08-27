import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
      apiKey: "AIzaSyAq-Yxaccz-Ia6o9NSTC4Fm-PM02DbvIt0",
      authDomain: "otp-verification-cb472.firebaseapp.com",
      databaseURL: "https://otp-verification-cb472-default-rtdb.firebaseio.com",
      projectId: "otp-verification-cb472",
      storageBucket: "otp-verification-cb472.appspot.com",
      messagingSenderId: "939280162949",
      appId: "1:939280162949:web:89b969538a7f7f0e54c9ec"
    };
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export const signIn = async (email: string, password: string) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const signOut = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const fetchAccountData = async (userId: string) => {
    try {
        const accountDoc = await db.collection('accounts').doc(userId).get();
        if (accountDoc.exists) {
            return accountDoc.data();
        } else {
            throw new Error('No account data found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
