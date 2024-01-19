import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});


    useEffect(() => {  //<-- Cada vez que el formState cambie, se ejecuta el createValidators
        createValidators();   
    }, [ formState ])

    useEffect(() => {
        setFormState(initialForm); // <-- Cada vez que el initialForm cambie, se ejecuta el setFormState

    }, [initialForm])
    

    const isFormValid = useMemo( () => { //useMemo es un hook que permite memorizar el resultado de una funcion y solo se ejecuta cuando sus dependencias cambian    

        for (const formValue of Object.keys( formValidation )) { //Recorre el objeto formValidation y valida todas sus llaves
            if ( formValidation[formValue] !== null ) return false; //Si alguna de las llaves es distinta de null, retorna false      
        }

        return true;
    }, [ formValidation ])


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckValues = {};
        for (const formField of Object.keys( formValidations ) ){
           const [ fn, errorMessage ] = formValidations[ formField ]; //Obtiene la funcion FormValidations y el mensaje de error
              formCheckValues[ `${ formField }Valid`] = fn( formState[ formField ] ) ? null : errorMessage; //Ejecuta la funcion de validacion y si es true, retorna null, si es false, retorna el mensaje de error
        }

        setFormValidation( formCheckValues ); //Actualiza el estado de los mensajes de error
        // console.log(formCheckValues)

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}