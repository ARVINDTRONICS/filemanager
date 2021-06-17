import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./config/firebase.config";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
export async function getFileList(userId) {
  if (userId) {
    return db
      .collection("filesbyuser")
      .doc(userId)
      .get()
      .then((doc) => {
        return {
          status: 200,
          data: doc.data().files
        };
      })
      .catch(() => {
        return {
          status: 400
        };
      });
  } else {
    return {
      status: 400
    };
  }
}
export async function updateFilebyUsertoDB(userId, fileList) {
  return db
    .collection("filesbyuser")
    .doc(userId)
    .set({ files: fileList })
    .then(() => {
      return {
        status: 200
      };
    })
    .catch(() => {
      return {
        status: 400
      };
    });
}

export async function authService({ email, password }) {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      // Signed in
      localStorage.setItem("userToken", Math.random().toString());
      return { status: 200 };
    })
    .catch(() => {
      return { status: 401 };
    });
}

export async function signUpService({ email, password }) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      localStorage.setItem("userToken", Math.random().toString());
      return { status: 200 };
    })
    .catch(() => {
      return { status: 401 };
    });
}
