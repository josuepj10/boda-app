import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages";

export const AuthRoutes = () => {
  return (
  
  <Routes>

  <Route path="login" element={ <LoginPage /> } />
  <Route path="register" element={ <RegisterPage /> } />


  {/* Cualquier ruta que no coincida con las rutas definidas en la aplicación debe redirigirse a la ruta /auth/login.  */}
  <Route path='/*' element={ <Navigate to="/auth/login" /> } />

  </Routes>

  )
}
