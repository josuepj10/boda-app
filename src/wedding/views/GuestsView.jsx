import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FirebaseDB } from "../../firebase/config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore/lite";
import { Link } from "react-router-dom";
import { ArrowForward, AddOutlined, ContentCopy } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditUser from "../pages/EditUser";
import clipboardCopy from "clipboard-copy";

export const GuestsView = () => {
  // 1- Configurar hooks
  const [guests, setGuests] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [editGuest, setEditGuest] = useState({});
  const [editedName, setEditedName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedAttendantsNumber, setEditedAttendantsNumber] = useState("");
  const [editedAttendance, setEditedAttendance] = useState("");

  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestLastName, setNewGuestLastName] = useState("");
  const [newGuestAttendantsNumber, setNewGuestAttendantsNumber] = useState("");

  const [attendance, setAttendance] = useState("A la espera"); // Valor por defecto "Asiste"
  const attendanceOptions = ["Asiste", "No asiste", "A la espera"];
  const [guestCount, setGuestCount] = useState(0);

  // 2- Referencia a DB
  const guestsCollection = collection(
    FirebaseDB,
    "jokpCwygoUV5JmlVNAd0TUvGNVp2",
    "wedding",
    "guests"
  );

  // 3- Función para mostrar todos los documentos
  const getGuests = async () => {
    const data = await getDocs(guestsCollection);
    const guestList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    // Filtrar resultados según el término de búsqueda
    const filteredGuests = guestList.filter((guest) => {
      const fullName =
        `${guest.guest_name} ${guest.guest_last_name} ${guest.attend}}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });

    setGuests(filteredGuests);
    setGuestCount(filteredGuests.length);
  };

  // 4- Función para abrir el modal de edición
  const openEditModal = (guest) => {
    setEditGuest(guest);
    setEditedName(guest.guest_name);
    setEditedLastName(guest.guest_last_name);
    setEditedAttendance(guest.attend);
    setEditedAttendantsNumber(guest.attendants_number);
    setEditModalOpen(true);
  };

  // 5- Función para guardar los cambios en el modal de edición
  const saveChanges = async () => {
    const guestDocRef = doc(guestsCollection, editGuest.id);
    await updateDoc(guestDocRef, {
      guest_name: editedName,
      guest_last_name: editedLastName,
      attend: editedAttendance, // Actualizar el valor de asistencia
      attendants_number: editedAttendantsNumber,
    });

    setEditModalOpen(false);
    getGuests();
  };

  // 6- Función para abrir el modal de confirmación antes de borrar
  const openDeleteModal = (guest) => {
    setEditGuest(guest);
    setDeleteModalOpen(true);
  };

  // 7- Función para borrar el invitado
  const deleteGuest = async () => {
    const guestDocRef = doc(guestsCollection, editGuest.id);
    await deleteDoc(guestDocRef);

    setDeleteModalOpen(false);
    getGuests();
  };

  // 8- Función para abrir el modal de creación
  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  // 9- Función para crear un nuevo invitado

  const createGuest = async () => {
    const newGuest = {
      guest_name: newGuestName,
      guest_last_name: newGuestLastName,
      attend: attendance,
      attendants_number: newGuestAttendantsNumber,
    };

    await addDoc(guestsCollection, newGuest);

    setCreateModalOpen(false);
    ClearInputs();
    getGuests();
  };

  // Cleans Inputs of the modal
  const ClearInputs = () => {
    setNewGuestName("");
    setNewGuestLastName("");
    setNewGuestAttendantsNumber("");
    setAttendance("");
  };

  // 10- Uso de useEffect para cargar invitados al montar el componente
  useEffect(() => {
    getGuests();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    getGuests();
  }, [searchTerm]);

  //11-Función para copiar el enlace del invitado al portapapeles
  const copyLink = (guest) => {
    const link = `https://boda-app-2.web.app/public/${guest.guest_name}/${guest.guest_last_name}/${guest.id}/${guest.attendants_number}`;
    clipboardCopy(link);
    alert("Enlace copiado al portapapeles");
  };

  return (
    <>
      <Typography variant="h4" sx={{ margin: "16px" }} align="center">
        Lista de Invitados
      </Typography>
      <Typography sx={{ margin: "3rem" }} variant="h6" align="center">
        Cantidad de Invitados: {guestCount}
      </Typography>

      <Box align="right">
        <TextField
          label="Buscar"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ margin: "16px" }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Apellido</TableCell>
              <TableCell align="center">Asistencia</TableCell>
              <TableCell align="center">Número de compañantes</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guests.map((guest) => (
              <TableRow
                key={guest.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{guest.guest_name}</TableCell>
                <TableCell align="center">{guest.guest_last_name}</TableCell>
                <TableCell align="center">{guest.attend}</TableCell>
                <TableCell align="center">{guest.attendants_number}</TableCell>
                <TableCell align="center">
                  <Button sx={{ p: 0 }} onClick={() => openEditModal(guest)}>
                    <EditIcon />
                  </Button>
                  <Button sx={{ p: 0 }} onClick={() => openDeleteModal(guest)}>
                    <DeleteIcon />
                  </Button>
                  <a sx={{ p: 0 }}
                    href={`/public/${guest.guest_name}/${guest.guest_last_name}/${guest.id}/${guest.attendants_number}`}
                    target="_blank"
                  >
                    <Button color="primary">
                      <OpenInNewIcon />
                    </Button>
                  </a>
                  <Button sx={{ p: 0 }} onClick={() => copyLink(guest)}>
                    <ContentCopyIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Rest of the code, such as modals and buttons, remains the same */}

      <IconButton
        onClick={openCreateModal}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

      <Dialog open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <DialogTitle>Agregar Invitado</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ margin: "16px" }}
            label="Nombre del Invitado"
            value={newGuestName}
            onChange={(e) => setNewGuestName(e.target.value)}
          />
          <TextField
            sx={{ margin: "16px" }}
            label="Apellido del Invitado"
            value={newGuestLastName}
            onChange={(e) => setNewGuestLastName(e.target.value)}
          />

          <FormControl sx={{ width: "15rem", margin: "16px" }}>
            <InputLabel>Número de Acompañantes</InputLabel>
            <Select
              value={newGuestAttendantsNumber}
              onChange={(e) => setNewGuestAttendantsNumber(e.target.value)}
              label="Número de Acompañantes"
            >
              {[0, 1, 2, 3].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Select
            sx={{ margin: "16px" }}
            label="Asistencia"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
          >
            {attendanceOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setCreateModalOpen(false)}>Cancelar</Button>
          <Button onClick={createGuest}>Agregar</Button>
        </DialogActions>
      </Dialog>

      <EditUser
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        editGuest={editGuest}
        setEditedName={setEditedName}
        setEditedLastName={setEditedLastName}
        setEditedAttendantsNumber={setEditedAttendantsNumber}
        setEditedAttendance={setEditedAttendance}
        saveChanges={saveChanges}
        attendanceOptions={attendanceOptions}
        editedName={editedName}
        editedLastName={editedLastName}
        editedAttendance={editedAttendance}
        editedAttendantsNumber={editedAttendantsNumber}
      />

      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Confirmar Borrado</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas borrar a {editGuest.guest_name}{" "}
          {editGuest.guest_last_name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
          <Button onClick={deleteGuest}>Borrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
