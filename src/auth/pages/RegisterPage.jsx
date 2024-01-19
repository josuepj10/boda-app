import { Link as RouterLink } from "react-router-dom";
import { Alert, Grid } from "@mui/material";
import { Typography, TextField, Button, Link } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = { 
  email: "",
  password: "",
  displayName: "",
 }

 const formValidations = { 
  email: [ (value) => value.includes('@'), 'El email debe tener un @' ],
  password: [ (value) => value.length > 5, 'La contraseña debe tener al menos 6 caracteres' ],
  displayName: [ (value) => value.length > 0, 'El nombre es obligatorio' ],
}


export const RegisterPage = () => {

  const dispatch = useDispatch(); //<-- Hook de Redux para despachar acciones
  const [formSubmitted, setFormSubmitted] = useState(false); //<-- Estado para saber si el formulario fue enviado

  const { status, errorMessage } = useSelector( state=> state.auth  ); //<-- 
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] ); //<-- Deshabilitar boton si esta cargando auth
  
  const { formState, displayName, email, password, onInputChange, isFormValid, emailValid, displayNameValid, passwordValid } = useForm( formData, formValidations );

  // console.log( displayNameValid ); //Mostrar en consola el estado de la validacion del campo displayName (Mensajes de error)

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return; 

    dispatch( startCreatingUserWithEmailPassword( formState ) );
  }

  return (

    <AuthLayout title= "Registro"> {/*<-- Maqueta reutilizada de AuthLayout.jsx */}

      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster"> {/*<-- Formulario children de AuthLayout.jsx para el login  */} 
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Tu nombre"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={ !!displayNameValid && formSubmitted}
              helperText= { displayNameValid }
            ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange} 
              error={ !!emailValid && formSubmitted}
              helperText= { emailValid }
            ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={ !!passwordValid && formSubmitted}
              helperText= { passwordValid }
            ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid 
            item 
            xs={12} 
            sm={12}
            display={ !!errorMessage ? '' : 'none' } // <-- Si errorMessage es true, se muestra el componente, sino se oculta 
            >
             <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button 
              variant="contained" 
              fullWidth 
              type="submit"
              disabled={ isCheckingAuthentication } // <-- Deshabilitar boton si esta cargando auth
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
