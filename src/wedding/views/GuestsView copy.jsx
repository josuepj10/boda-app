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

import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";

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
import { ArrowForward, AddOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditUser from "../pages/EditUser";

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
        `${guest.guest_name} ${guest.guest_last_name}`.toLowerCase();
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
    getGuests();
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

  // Componente de barra de herramientas personalizada para el DataGrid
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <TextField
        label="Buscar"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginLeft: "auto", marginRight: "16px" }}
      />
    </GridToolbarContainer>
  );

  return (
    <>
      <Typography variant="h4" sx={{ margin: "16px" }} align="center">
        Lista de Invitados
      </Typography>
      <Typography sx={{ margin: "3rem" }} variant="h6" align="center">
        Cantidad de Invitados: {guestCount}
      </Typography>

      {/* <Box align="right">
        <TextField
          label="Buscar"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ margin: "16px" }}
        />
      </Box> */}

      {/* Reemplazar la tabla manual con el DataGrid */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={guests}
          columns={[
            { field: "guest_name", headerName: "Nombre", flex: 1 },
            { field: "guest_last_name", headerName: "Apellido", flex: 1 },
            { field: "attend", headerName: "Asistencia", flex: 1 },
            {
              field: "attendants_number",
              headerName: "Número de acompañantes",
              flex: 1,
            },
            {
              field: "actions",
              headerName: "Acciones",
              flex: 1,
              renderCell: (params) => (
                <>
                  <Button onClick={() => openEditModal(params.row)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => openDeleteModal(params.row)}>
                    <DeleteIcon />
                  </Button>
                  <a
                    href={`/public/${params.row.guest_name}/${params.row.guest_last_name}/${params.row.id}`}
                    target="_blank"
                  >
                    <Button color="primary">
                      <OpenInNewIcon />
                    </Button>
                  </a>
                </>
              ),
            },
          ]}
          components={{
            Toolbar: CustomToolbar,
          }}
          filterModel={{
            items: [
              {
                columnField: "guest_name",
                operatorValue: "contains",
                value: searchTerm,
              },
            ],
          }}
        />
      </div>

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
