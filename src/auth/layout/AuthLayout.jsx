import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

//Maqueta que puede ser reutilizada con formularios de login, registro, etc.

export const AuthLayout = ({ children, title = "" }) => {
  return (
    
    
    <Grid  //<--Grid con el diseño y tema del fondo      
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid    //<--Grid con el diseño y tema del formulario
        item
        className="box-shadow"
        xs={3}
        sx={{ 
            width: { sm:450 },
            backgroundColor: "white", 
            padding: 3, 
            borderRadius: 2 
        }}>
        
        <Typography variant="h5" sx={{ mb: 1 }}> {/*<-- Tipografía con el título del formulario */}
          {title}
        </Typography>

        {children} {/* Contenido (formulario) que tendra el hijo */}
        
      </Grid>
    </Grid>
  );
};
