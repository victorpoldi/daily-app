import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,  } from 'firebase/auth';
import { app } from '../../config/auth';

export async function login(email: string, password: string) {
  const authInstance = getAuth(app);

  return await signInWithEmailAndPassword(authInstance, email, password)
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

export async function createAccount(email: string, password: string) {
  const authInstance = getAuth(app);

  return await createUserWithEmailAndPassword(authInstance, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Account created successfully", user);
      return user;
    })
    .catch((error) => {
      console.error("Account creation failed", error);
      throw error;
    });
}

export async function signInWithGoogle() {
  const authInstance = getAuth(app);
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(authInstance, provider).then((userCredential) => {
    const user = userCredential.user;
    console.log("Account created successfully", user);
    return user;
  })
  .catch((error) => {
    console.error("Account creation failed", error);
    throw error;
  });
};


