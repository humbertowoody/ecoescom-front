import React, { FC } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../hooks/useAuth";
import EditUserDTO from "../models/User/EditUser";
import { UserAPI } from "../api/users";
import User from "../models/User/User";

// Esquema de validación para cada Artículo en el formulario.
const validationSchema = yup.object({
  lastname_1: yup
    .string()
    .required("El apellido paterno es requerido")
    .max(50, "El apellido paterno debe tener máximo 50 caracteres"),
  lastname_2: yup
    .string()
    .optional()
    .max(50, "El apellido materno debe tener máximo 50 caracteres"),
});

const Profile: FC = () => {
  const { user, login } = useAuth();

  // Formik es una librería que nos permite manejar formularios de una manera más sencilla.
  const formik = useFormik({
    initialValues: {
      lastname_1: user?.lastname_1 || "",
      lastname_2: user?.lastname_2 || "",
    },
    validationSchema: validationSchema,
    // onSubmit es la función que se ejecuta cuando el usuario presiona el botón de submit.
    onSubmit: async (values: EditUserDTO, { setSubmitting }) => {
      setSubmitting(true);
      // Validamos que se hayan hecho cambios.
      if (
        values.lastname_1 === user?.lastname_1 &&
        values.lastname_2 === user?.lastname_2
      ) {
        alert("No se realizaron cambios");
        return;
      }

      // Llamamos a la API para actualizar los datos del usuario.
      const updatedUser: User = await UserAPI.updateUser(values);

      // Colocamos el JWT en el usuario actualizado.
      updatedUser.jwt = user?.jwt || "";

      // Actualizamos el usuario en el contexto.
      login(updatedUser);

      // Mostramos un mensaje de éxito.
      alert("¡Datos actualizados!");

      // Deshabilitamos el botón de submit.
      setSubmitting(false);
    },
  });

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          ¡Hola {user?.firstname}!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Nos da mucho gusto verte aquí de nuevo. Estos son los datos que
          tenemos registrados de ti, puedes actualizarlos si es necesario.
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h6" component="h2" gutterBottom>
            Edita tu información
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="student_id"
                name="student_id"
                label="Número de Boleta"
                value={user?.student_id}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Correo electrónico"
                value={user?.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="role"
                name="role"
                label="Tipo de Cuenta"
                value={user?.role === "STUDENT" ? "Estudiante" : "Vendedor"}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Nombre"
                value={user?.firstname}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                //type="number"
                fullWidth
                id="lastname_1"
                name="lastname_1"
                label="Apellido paterno"
                value={formik.values.lastname_1}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname_1 && Boolean(formik.errors.lastname_1)
                }
                helperText={
                  formik.touched.lastname_1 && formik.errors.lastname_1
                }
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                //type="number"
                fullWidth
                id="lastname_2"
                name="lastname_2"
                label="Apellido materno"
                value={formik.values.lastname_2}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname_2 && Boolean(formik.errors.lastname_2)
                }
                helperText={
                  formik.touched.lastname_2 && formik.errors.lastname_2
                }
                sx={{ mb: 4 }}
              />
            </Grid>
          </Grid>

          <Button color="primary" variant="outlined" fullWidth type="submit">
            Actualizar mis datos
          </Button>
        </form>
      </Box>
      <Box mt={4} mb={4}>
        <Typography variant="body2" gutterBottom>
          Si deseas solicitar que tu cuenta sea de vendedor, porfavor envia un
          correo a: <br />
          <a href="mailto:contacto@ecoescom.lat">contacto@ecoescom.lat</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Profile;
