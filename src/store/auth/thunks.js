
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"

//checkingAuthentication es un thunk de Redux que se utiliza para verificar las credenciales del usuario.


//Auth con email y password
export const checkingAuthentication = ( email, password) => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() );
  }
}

//Auth con Google
export const startGoogleSignIn = () => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() );

    const result = await signInWithGoogle();
    // console.log({result});

    if( !result.ok ){ return dispatch( logout( result.errorMessage ) );  
    }
    dispatch( login( result ));

  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

  return async( dispatch ) => {

    dispatch( checkingCredentials() ); 

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName }); //

    if( !ok )return dispatch( logout({errorMessage}) ) //<-- Si no es correcto, se dispara el logout con el mensaje de error.

    dispatch( login({ uid, displayName, email, photoURL }) ); //<-- Si es correcto, se dispara el login con los datos del usuario.
    

  //  console.log(resp);

  }

}

export const startLoginWithEmailPassword = ({ email, password }) => { //<-- Se enarga de hacer el login con email y password.

   return async( dispatch ) => {

    dispatch( checkingCredentials() ); 

    const result = await loginWithEmailPassword({ email, password }); 
    console.log(result);

    if( !result.ok )return dispatch( logout( result ) ) //<-- Si no es correcto, se dispara el logout con el mensaje de error.

    dispatch( login( result ) ); //<-- Si es correcto, se dispara el login con los datos del usuario.
   
  }
}

export const startLogout = () => { 
  return async( dispatch ) => {
    await logoutFirebase(); //<-- Se encarga de hacer el logout en Firebase.  

    dispatch( logout() ); //<-- Se dispara el logout en Redux.  
  }
}


