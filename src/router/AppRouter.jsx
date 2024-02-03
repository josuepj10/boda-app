import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { WeddingRoutes } from "../wedding/routes/WeddingRoutes";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";
import PublicGuestPage from "../wedding/pages/PublicGuestPage";

export const AppRouter = () => {

  const status = useCheckAuth(); //<-- Se obtiene el estado de la autenticación

  if( status === 'checking' ) { //<-- Si el estado es 'checking' se muestra el componente CheckingAuth
    return <CheckingAuth/>
  }

  return (
    <Routes>

      {
        (status === 'authenticated')
        ? <Route path="/*" element={ < WeddingRoutes /> } /> //<-- Si el estado es 'authenticated' se muestra el componente WeddingRoutes
        : <Route path="/auth/*" element={ < AuthRoutes /> } /> //<-- Si el estado es 'unauthenticated' se muestra el componente AuthRoutes
      }

       {/* Ruta para notas públicas */}
       {/* <Route path="/public/:guestName/:guestLastName" element={<PublicGuestPage />} /> */}
       <Route path="/public/:guestName/:guestLastName/:userId/:attendants_number"element={<PublicGuestPage />} />

      <Route path="/*" element={ <Navigate to= '/auth/login' />} /> 
      
      {/* Login and registration */}
      {/* <Route path="/auth/*" element={ < AuthRoutes /> } /> */}

      {/* WeddingApp */}
      {/* // <Route path="/*" element={ < WeddingRoutes /> } /> */}

    </Routes>
  );
};

