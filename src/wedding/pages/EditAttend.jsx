import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { useParams } from "react-router-dom";
import {
  Select,
  MenuItem,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Grid,
} from "@mui/material";

const PublicGuestPage = () => {
  const { guestName, guestLastName, userId, attendants_number } = useParams();
  const [attend, setAttend] = useState("");
  const [attendanceOptions, setAttendanceOptions] = useState([
    "Asiste",
    "No asiste",
    "A la espera",
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const getGuestInfo = async () => {
      try {
        const guestDocRef = doc(
          FirebaseDB,
          "jokpCwygoUV5JmlVNAd0TUvGNVp2",
          "wedding",
          "guests",
          userId
        );

        const guestDocSnapshot = await getDoc(guestDocRef);

        if (guestDocSnapshot.exists()) {
          const guestData = guestDocSnapshot.data();
          setAttend(guestData.attend || "A la espera");
        } else {
          setAttend("A la espera");
        }
      } catch (error) {
        console.error("Error al obtener información del invitado:", error);
      }
    };

    getGuestInfo();
  }, [userId]);

  const handleAttendChange = (event) => {
    setAttend(event.target.value);
  };

  const handleUpdateAttend = async () => {
    try {
      // Solo actualiza la asistencia si el usuario no ha confirmado previamente
      if (attend !== "Asiste") {
        const guestDocRef = doc(
          FirebaseDB,
          "jokpCwygoUV5JmlVNAd0TUvGNVp2",
          "wedding",
          "guests",
          userId
        );

        await updateDoc(guestDocRef, {
          attend: "Asiste",
        });
        // Actualiza el estado después de confirmar la asistencia
        setAttend("Asiste");

        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error al actualizar la asistencia:", error);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const [isVisible, setIsVisible] = useState(false);

  return (
    <Box sx={{ backgroundColor: "#fdf4ef" }}>
      {/* ... Resto del código ... */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography
          variant="h2"
          sx={{ marginTop: "3rem", fontFamily: "Herr Von Muellerhoff" }}
        >
          {guestName} {guestLastName}
        </Typography>

        <Typography align="center" sx={{ fontFamily: "Aboreto" }}>
          {attendants_number == 0
            ? "HEMOS RESERVADO UN ESPACIO PARA TI"
            : attendants_number == 1
            ? "HEMOS RESERVADO UN ESPACIO PARA TI Y UN ACOMPAÑANTE"
            : `HEMOS RESERVADO UN ESPACIO PARA TI Y ${attendants_number} ACOMPAÑANTES`}
        </Typography>

        <Grid
          sx={{
            borderRight: "2px solid #ccc",
            height: "50px",
            margin: "0.5rem",
          }}
        />

        <Typography
          align="center"
          sx={{ fontFamily: "Aboreto", fontWeight: "bold" }}
        >
          CONFIRMA TU ASISTENCIA
        </Typography>

        <Typography
          align="center"
          sx={{
            fontFamily: "Aboreto",
            fontSize: "0.9rem"
          }}
        >
          ANTES DEL 20 DE FEBRERO, PRESIONANDO EL SIGUIENTE BOTÓN:
        </Typography>

        {isVisible && (
          <Select
            value={attend}
            onChange={handleAttendChange}
            sx={{ marginTop: "1rem", fontFamily: "Aboreto" }}
          >
            {attendanceOptions.map((option) => (
              <MenuItem
                key={option}
                value={option}
                disabled={attend === "Asiste"}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
        <Button
          variant="contained"
          onClick={handleUpdateAttend}
          sx={{
            marginTop: "1rem",
            marginBottom: "4rem",
            fontFamily: "Aboreto",
            backgroundColor: "#809072",
            ":hover": { backgroundColor: "#718065" },
          }}
        >
          {attend === "Asiste"
            ? "Haz confirmado tu asistencia"
            : "Confirmar Asistencia"}
        </Button>

        {/* Diálogo para mostrar el mensaje de confirmación */}
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Confirmación de Asistencia</DialogTitle>
          <DialogContent>
            <Typography>
              ¡Gracias {guestName} por confirmar tu asistencia a la boda!
              Estamos emocionados de celebrar este día especial contigo.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cerrar</Button>
          </DialogActions>
        </Dialog>

        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

        <img
          alt="Imagen"
          // src="/src/img/informacion.png"
          src="https://boda-app-2.web.app/informacion.png"
          style={{ maxWidth: "100%", height: "auto", marginTop: "2rem" }}
        />
        
      </Box>
    </Box>
  );
};

export default PublicGuestPage;
