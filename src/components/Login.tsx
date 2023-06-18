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
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { AuthAPI } from "../api/auth";

// Esquema de validación para cada Artículo en el formulario.
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Ingresa tu correo institucional")
    .required("El correo es requerido")
    .matches(
      /@alumno.ipn.mx$/,
      "Ingresa tu correo institucional (@alumno.ipn.mx)"
    ),
  password: yup.string().required("La contraseña es requerida"),
});

export default function SignInSide() {
  const { user, login } = useAuth();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await AuthAPI.login(values.email, values.password);
        console.log(response);
        alert(`¡Hola de nuevo ${response.data.user.firstname}!`);
        setSubmitting(false);
        login({
          jwt: response.data.accessToken,
          ...response.data.user,
        });
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: 1 }}>
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
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesión
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/recuperar-contrasena" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/registro" variant="body2">
                    {"¿No tienes una cuenta? Regístrate"}
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
