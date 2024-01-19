import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { Alert, Grid } from "@mui/material";
import { Typography, TextField, Button, Link } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth); //<-- Maneja el estado de carga de la aplicación.

  const dispatch = useDispatch(); //<-- Maneja el estado global de la aplicación.

  const { email, password, onInputChange } = useForm( formData ); //<-- Maneja los valores de los inputs del formulario de inicio de sesión.

  const isAuthenticating = useMemo( () => status === "checking", [status] ); //<-- Si el estado de carga es "checking" se deshabilitan los botones de inicio de sesión.

  const onSubmit = (event) => { //<-- Maneja el evento de envio del formulario de inicio de sesión con email y password.    
    event.preventDefault();
    dispatch( startLoginWithEmailPassword({ email, password }) ); //<-- Llama al thunk que inicia sesión con email y password.
    // console.log({ email, password });
  };

  const onGoogleSignIn = () => {  //<-- Maneja el evento de inicio de sesión con Google.   
    console.log("OnGoogleSignIn");
    dispatch( startGoogleSignIn() ); //<-- Llama al thunk que inicia sesión con Google.
  };

  return (
    <AuthLayout title="Login">
      {" "}
      {/*<-- Maqueta reutilizada de AuthLayout.jsx */}
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        {" "}
        {/*<-- Formulario children de AuthLayout.jsx para el login  */}
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
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
            ></TextField>
          </Grid>

          <Grid container display={ !!errorMessage ? '': 'none' }>
           <Grid item xs={12} sx={{ mt: 2}}>
              <Alert severity="error">{ errorMessage }</Alert>
              </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button 
              disabled= { isAuthenticating }
               type="submit" 
               variant="contained" 
               fullWidth>
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button 
              disabled= { isAuthenticating }
              variant="contained" 
              fullWidth 
              onClick={onGoogleSignIn}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

          </Grid>
{/* 
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una nueva cuenta
            </Link>
          </Grid> */}

        </Grid>
      </form>
    </AuthLayout>
  );
};
