// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzZ5G23LLVOv-Rs0xQshHuMfvwkdPlDMc",
  authDomain: "jubstaa-home.firebaseapp.com",
  projectId: "jubstaa-home",
  storageBucket: "jubstaa-home.appspot.com",
  messagingSenderId: "1009484786605",
  appId: "1:1009484786605:web:1f13fb367090b841118f24",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();

export const getUsers = async () => {
  const users = [];
  const usersRef = await getDocs(query(collection(db, "users")));
  usersRef.forEach((doc) => {
    users.push({ ...doc?.data(), id: doc.id });
  });
  return users;
};

export const getItems = async () => {
  const items = [];
  const itemsRef = await getDocs(query(collection(db, "items")));
  itemsRef.forEach((doc) => {
    items.push({ ...doc?.data(), id: doc.id });
  });
  return items;
};

export const getLogs = async () => {
  const logs = [];
  const logsRef = await getDocs(query(collection(db, "logs")));
  logsRef.forEach((doc) => {
    logs.push({ ...doc?.data(), id: doc.id });
  });
  return logs;
};

export const setItems = async (name, price) => {
  await addDoc(collection(db, "items"), {
    name,
    price,
    isBought: false,
  });
};

export const setUser = async (name, photoUrl) => {
  await addDoc(collection(db, "users"), {
    name,
    photoUrl,
    month: 0,
    donate: 0,
  });
};

export const updatePayment = async (payment) => {
  await updateDoc(doc(db, "payment", payment.id), {
    isAccepted: true,
  });
};

export const updateUser = async (user, payment) => {
  await updateDoc(doc(db, "users", user.id), {
    month: Number(user.month) + Number(payment.price),
    donate: Number(user.donate) + Number(payment.price),
  });
};

export const updateItem = async (item) => {
  await updateDoc(doc(db, "items", item.id), {
    isBought: true,
  });
};

export const setPayment = async (name, price, type) => {
  await addDoc(collection(db, "payment"), {
    name,
    price: Number(price),
    type,
    isAccepted: false,
  });
};

export const setLogs = async (payment) => {
  await addDoc(collection(db, "logs"), {
    log: `${payment.name} tarafından ${payment.type} yöntemiyle ${payment.price} tutarında bağış yapıldı. Allah razı olsun!`,
    date: new Date(),
  });
};

export const getPayment = async () => {
  const payments = [];
  const paymentsRef = await getDocs(query(collection(db, "payment")));
  paymentsRef.forEach((doc) => {
    payments.push({ ...doc?.data(), id: doc.id });
  });
  return payments;
};

export const login = async (email, password, setAuth) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      setAuth(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const logout = async (setAuth) => {
  signOut(auth)
    .then(() => {
      setAuth(false);
    })
    .catch((error) => {
      // An error happened.
    });
};

export const uploadFile = async (e, setFile, setLoading) => {
  setLoading(true);
  const file = e.target.files[0];
  if (!file) {
    return;
  } else if (!file.type.includes("image")) {
    return false;
  } else {
    const storageRef = ref(
      storage,
      `gs://jubstaa-home.appspot.com/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFile(downloadURL);
          setLoading(false);
        });
      }
    );
  }
};
