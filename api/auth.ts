import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,  } from 'firebase/auth';
import { app } from '../config/auth';

export function login(email: string, password: string) {
  const authInstance = getAuth(app);

  return signInWithEmailAndPassword(authInstance, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Login successful", user);
      return user;
    })
    .catch((error) => {
      console.error("Login failed", error);
      throw error;
    });
}

export function createAccount(email: string, password: string) {
  const authInstance = getAuth(app);

  return createUserWithEmailAndPassword(authInstance, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Account created successfully", user);
      return user;
    })
    .catch((error) => {
      console.error("Account creation failed", error);
      throw error;
    });
}



