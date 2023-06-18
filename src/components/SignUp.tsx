import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { AuthAPI } from "../api/auth";
import { PersonAdd, PersonOff, PersonPin } from "@mui/icons-material";

// Esquema de validación para cada Artículo en el formulario.
const validationSchema = yup.object({
  firstname: yup.string().required("El nombre es requerido"),
  lastname_1: yup.string().required("El primer apellido es requerido"),
  lastname_2: yup.string().optional(),
  email: yup
    .string()
    .email("Ingresa tu correo institucional")
    .required("El correo es requerido")
    .matches(
      /@alumno.ipn.mx$/,
      "Ingresa tu correo institucional (@alumno.ipn.mx)"
    ),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  password_confirmation: yup
    .string()
    .required("La confirmación de contraseña es requerida")
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir"),
  accept_terms: yup
    .bool()
    .oneOf([true], "Debes aceptar los términos y condiciones"),
  student_id: yup
    .string()
    .required("El número de boleta es requerido")
    .matches(/^[0-9]{10}$/, "Ingresa tu número de boleta (10 dígitos)"),
});

export default function SignUpSide() {
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname_1: "",
      lastname_2: "",
      email: "",
      password: "",
      password_confirmation: "",
      accept_terms: false,
      student_id: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const newUser = await AuthAPI.signUp(values);

        console.log(newUser);
        alert("¡Gracias por registrarte! Por favor, inicia sesión.");
        setSubmitting(false);
      } catch (error) {
        alert("Ocurrió un error al registrarte. Por favor, intenta de nuevo.");
        setSubmitting(false);
      }
    },
  });

  // Si el usuario ya inició sesión, redirigirlo a la página de perfil.
  if (user) {
    return <Navigate to="/perfil" />;
  }

  return (
    <Grid container mt={4}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5" align="center">
            Regístrate en EcoESCOM
          </Typography>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                label="Nombre(s)"
                autoComplete="name"
                id="firstname"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastname_1"
                label="Apellido Paterno"
                name="lastname_1"
                autoComplete="lastname_1"
                autoFocus
                value={formik.values.lastname_1}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname_1 && Boolean(formik.errors.lastname_1)
                }
                helperText={
                  formik.touched.lastname_1 && formik.errors.lastname_1
                }
              />
              <TextField
                margin="normal"
                fullWidth
                id="lastname_2"
                label="Apellido Materno"
                name="lastname_2"
                autoComplete="lastname_2"
                autoFocus
                value={formik.values.lastname_2}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname_2 && Boolean(formik.errors.lastname_2)
                }
                helperText={
                  formik.touched.lastname_2 && formik.errors.lastname_2
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="student_id"
                label="Número de Boleta"
                name="student_id"
                autoComplete="student_id"
                autoFocus
                value={formik.values.student_id}
                onChange={formik.handleChange}
                error={
                  formik.touched.student_id && Boolean(formik.errors.student_id)
                }
                helperText={
                  formik.touched.student_id && formik.errors.student_id
                }
              />
              <hr />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password_confirmation"
                label="Repite la contraseña"
                type="password"
                id="password_confirmation"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                error={
                  formik.touched.password_confirmation &&
                  Boolean(formik.errors.password_confirmation)
                }
                helperText={
                  formik.touched.password_confirmation &&
                  formik.errors.password_confirmation
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="accept_terms"
                    name="accept_terms"
                    color="primary"
                    onChange={formik.handleChange}
                    checked={formik.values.accept_terms}
                  />
                }
                label="Acepto los Términos y Condiciones de EcoESCOM"
              />
              {formik.touched.accept_terms && (
                <Typography variant="body2" color="red" gutterBottom>
                  {formik.errors.accept_terms}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Regístrate
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/recuperar-contrasena" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/iniciar-sesion" variant="body2">
                    {"¿Ya tienes cuenta? Inicia sesión"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
