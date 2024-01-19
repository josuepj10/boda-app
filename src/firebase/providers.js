import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";     
import { FirebaseAuth } from "./config";

//Proveedores de autenticacion

export const googleProvider = new GoogleAuthProvider(); //Provee autenticacion con google


export const signInWithGoogle = async() => {

    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult(result);

        const { displayName, email, photoURL, uid } = result.user;

        // const user = result.user;
        // console.log({user});
        // console.log(credentials);

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }  

    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        }
    }
}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => { 

    try {
        console.log({ email, password, displayName });

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        //TODO: actualizar el displayName en firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName} ); //<--Obtiene el usuario actualmente autenticado y utiliza la variable `displayName` para actualizar el nombre de usuario en el perfil del usuario.
        // console.log(resp);


        return {
            ok: true,
            uid,
            displayName,
            email,
            photoURL
        }
        
    } catch(error) {
    //  console.log(error);
     return { ok: false, errorMessage: error.message }
    }

}

export const loginWithEmailPassword = async({ email, password }) => { //<-- Se encarga de hacer el login con email y password.

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { displayName, photoURL, uid } = resp.user;
        // console.log(resp);
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }  
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }

}

export const logoutFirebase = async() => { 
    return await FirebaseAuth.signOut();
}