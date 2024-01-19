import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";



// Este custom hook se encarga de verificar si hay un usuario logueado o no

export const useCheckAuth = () => { 

    const { status } = useSelector(state => state.auth); //<-- Obtenemos el estado de la autenticacion
    const dispatch = useDispatch();

    useEffect(() => {

        onAuthStateChanged(FirebaseAuth, async (user) => { //<-- onAuthStateChanged es un metodo de firebase que se ejecuta cada vez que el estado de la autenticacion cambia
            if (!user) return dispatch(logout());  //<-- Si no hay usuario se ejecuta el dispatch de logout
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL })); //<-- Si hay usuario se ejecuta el dispatch de login
        })
    }, [])

    return status; //<-- Retornamos el estado de la autenticacion

}
