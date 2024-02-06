import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { doc, getDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import EditAttend from "../pages/EditAttend";

const PublicGuestPage = () => {
  const { guestName, guestLastName, userId } = useParams();

  const [countdown, setCountdown] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  return (
    <Box sx={{ backgroundColor: "#fdf4ef" ,  display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center", }}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          // height: 420,
          // backgroundColor: "#809072"
          // height: "auto",  // Set the desired height
          // maxWidth: 683,
          backgroundImage: 'url("https://boda-app-2.web.app/sombrero1.png")',
          // backgroundImage: 'url("/src/img/sombrero1.png")',
          backgroundColor: "#fdf4ef",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%", 
          boxShadow: "none",
          height: 700, // Altura predeterminada para dispositivos que no sean móviles
          maxWidth: 683,
          "@media (max-width: 500px)": { // Media query para dispositivos móviles
            height: 500, // Cambiar la altura a 'auto' para dispositivos móviles para que se ajuste según el contenido
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          {/* <Typography
            variant="h3"
            align="center"
            sx={{ color: "#1d1f1b", width: "100%", fontFamily: "Aboreto" }}
          >
            Laura y Alonso
          </Typography> */}
          <img
            alt="Imagen couple"
            // src="/src/img/letras.png"
            src="https://boda-app-2.web.app/letras.png"
            style={{ width: "200px", height: "auto" }}
          />

          <Typography
            variant="h7"
            align="center"
            sx={{
              color: "#1d1f1b",
              // color: "#fdf4ef",
              width: "75%",
              fontFamily: "Aboreto",
              fontStyle: "italic",
              fontWeight: "bold",
              textShadow: "2px 2px 4px #fdf4ef",   
              marginTop: "1rem",        
            }}
          >
            "Y sobre todas estas cosas vestíos de amor, que es el vínculo
            perfecto"
          </Typography>

          <Typography
            variant="h3"
            align="center"
            sx={{
              color: "#1d1f1b",
              // color: "#fdf4ef",
              width: "50%",
              fontFamily: "Herr Von Muellerhoff",
              fontStyle: "italic",
              textShadow: "2px 2px 4px #fdf4ef",
              marginTop: "3rem",
            }}
          >
            Colosenses 3:14
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />{" "}
      {/* Añade un espacio para evitar que los elementos se superpongan con el encabezado */}
      {/* <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h6">{guestName}</Typography>
        <Typography variant="body1">
          Faltan {countdown.months} meses, {countdown.days} días,{" "}
          {countdown.hours} horas, {countdown.minutes} minutos,{" "}
          {countdown.seconds} segundos para el 23 marzo de 2024.
        </Typography>
      </Box> */}
      <Box
        sx={{ fontFamily: "Aboreto" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        //minHeight="100vh" // Usa minHeight en lugar de height
        // justifyContent="center"
        // height="100vh"
        // width="100vw"
        // sx={{ backgroundColor: "#809072" }}
      >
        <Typography variant="h7">¡NOS CASAMOS!</Typography>
        <Typography variant="h7" align="center">
          Y QUEREMOS COMPARTIR ESTE DÍA CONTIGO
        </Typography>

        <img
          alt="Imagen"
          src="https://boda-app-2.web.app/floresNombres.png"
          // src="/src/img/floresNombres.png"
          style={{ maxWidth: "100%", height: "auto" }}
        />

        <Typography
          align="center"
          variant="h5"
          sx={{ fontFamily: "Aboreto", fontWeight: "bold" }}
        >
          MARZO{" "}
          <Box
            component="span"
            sx={{ fontSize: "1.5em", marginLeft: "2rem", marginRight: "2rem" }}
          >
            23
          </Box>{" "}
          2024
        </Typography>

        <Typography align="center" variant="h7" sx={{ marginTop: "3rem" }}>
          A LAS 2:00 DE LA TARDE EN LA IGLESIA DE ZARAGOZA, PALMARES
        </Typography>

        <Button
          sx={{
            fontFamily: "Aboreto",
            backgroundColor: "#B6AACB",
            marginTop: "1rem",
            ":hover": { backgroundColor: "#9F95B0" },
          }}
          variant="contained" // Puedes ajustar el estilo según tus necesidades
          startIcon={<LocationOnIcon />} // Icono de ubicación
          href="https://waze.com/ul/hd1gcnu14x"
          target="_blank"
        >
          Ir a ubicación de Iglesia Zaragoza
        </Button>

        <Typography align="center" variant="h7" sx={{ marginTop: "3rem" }}>
          DESPUÉS, LE INVITAMOS A CELEBRAR EN EL SALÓN DE EVENTOS TERRAZAS
          LINDAVISTA
        </Typography>

        <Button
          sx={{
            fontFamily: "Aboreto",
            backgroundColor: "#B6AACB",
            marginTop: "1rem",
            ":hover": { backgroundColor: "#9F95B0" },
          }}
          variant="contained" // Puedes ajustar el estilo según tus necesidades
          startIcon={<LocationOnIcon />} // Icono de ubicación
          href="https://waze.com/ul/hd1gcm43ks"
          target="_blank"
        >
          Ir a ubicación de Terrazas Lindavista
        </Button>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh" // Usa minHeight en lugar de height
        sx={{ marginTop: { xs: 0, md: "3rem", fontFamily: "Aboreto" } }}
        // justifyContent="center"
        // height="100vh"
      >
        <img
          alt="Imagen couple"
          // src="/src/img/lau1.png"
          src="https://boda-app-2.web.app/lau1.png"
          style={{ maxWidth: "100%", height: "auto", margin: "2rem" }}
        />

        <EditAttend
          guestName={guestName}
          guestLastName={guestLastName}
          userId={userId}
        />
      </Box>
    </Box>
  );
};

export default PublicGuestPage;
