import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
} from "@mui/material";

const EditUser = ({
  editModalOpen,
  setEditModalOpen,
  editGuest,
  setEditedName,
  setEditedLastName,
  setEditedAttendance,
  setEditedAttendantsNumber,
  saveChanges,
  attendanceOptions,
  editedName,
  editedLastName,
  editedAttendance,
  editedAttendantsNumber,
}) => {
  return (
    <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
      <DialogTitle>Editar Invitado</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ margin: "16px" }}
          label="Nombre"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
        <TextField
          sx={{ margin: "16px" }}
          label="Apellido"
          value={editedLastName}
          onChange={(e) => setEditedLastName(e.target.value)}
        />       

        <FormControl  sx={{ width: "15rem", margin: "16px" }}>
          <InputLabel>Número de Acompañantes</InputLabel>
          <Select
            value={editedAttendantsNumber}
            onChange={(e) => setEditedAttendantsNumber(e.target.value)}
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
          value={editedAttendance}
          onChange={(e) => setEditedAttendance(e.target.value)}
        >
          {attendanceOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditModalOpen(false)}>Cancelar</Button>
        <Button onClick={saveChanges}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUser;
