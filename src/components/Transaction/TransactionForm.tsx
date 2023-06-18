import React, { FC, useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import CreateTransactionDTO from "../../models/Transaction/CreateTransactionDTO";
import Promotion from "../../models/Promotion/Promotion";
import { Undo } from "@mui/icons-material";
import PromotionAPI, { PaginatedPromotions } from "../../api/promotions";
import TransactionAPI from "../../api/transactions";
import { AxiosError } from "axios";

// Esquema de validación para una Transacción.
const validationSchema = yup.object({
  user_email: yup
    .string()
    .email("El correo electrónico debe ser válido")
    .required("El correo electrónico es requerido"),
  promotion_id: yup
    .string()
    .uuid("El ID de la promoción debe ser un UUID válido")
    .required("El ID de la promoción es requerido"),
});

const TransactionForm: FC = () => {
  const { user } = useAuth();
  const [paginatedPromotions, setPaginatedPromotions] = useState({
    data: [],
    count: 0,
    page: 0,
    pageCount: 0,
    total: 0,
  } as PaginatedPromotions);

  useEffect(() => {
    if (user) {
      PromotionAPI.getUserPaginatedPromotions(100, 1, user)
        .then((paginatedPromotions: PaginatedPromotions) => {
          setPaginatedPromotions(paginatedPromotions);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // Formik es una librería que nos permite manejar formularios de una manera más sencilla.
  const formik = useFormik({
    initialValues: {
      seller_id: user?.id || "",
      user_email: "",
      promotion_id: "",
    },
    validationSchema: validationSchema,
    // onSubmit es la función que se ejecuta cuando el usuario presiona el botón de submit.
    onSubmit: async (values: CreateTransactionDTO, { setSubmitting }) => {
      // Deshabilitamos el botón de submit mientras se realiza la petición.
      setSubmitting(true);

      try {
        // Enviamos la petición al backend.
        const transaction = await TransactionAPI.createTransaction(
          values,
          user || undefined
        );
        // Si la petición fue exitosa, redirigimos al usuario a la página de inicio.
        if (transaction) {
          window.location.href = "/transacciones";
        } else {
          // Si la petición no fue exitosa, habilitamos el botón de submit.
          setSubmitting(false);
          alert("Transacción no registrada porque hubo un error");
        }
      } catch (error: any) {
        if (error.response.status === 400) {
          switch (error.response.data.message) {
            case "Promotion does not exist.":
              alert("La promoción no existe.");
              break;

            case "Seller cannot be the student.":
              alert("El vendedor no puede ser el estudiante.");
              break;

            case "Seller does not own this promotion.":
              alert("El vendedor no es dueño de esta promoción.");
              break;

            case "Student does not have enough credits.":
              alert("El estudiante no tiene suficientes créditos.");
              break;

            default:
              alert(error.response.data.message);
              break;
          }
        }
      }
    },
  });

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registrar una nueva transacción
        </Typography>
        <Typography variant="body1" gutterBottom>
          En esta sección podrás registrar una transacción, asociando a un
          usuario con una de tus promociones. Al registrarla, al usuario se le
          descontarán los créditos correspondientes. Esta acción no se puede
          deshacer.
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" gutterBottom>
                Correo Electrónico del usuario.
              </Typography>
              <TextField
                fullWidth
                id="user_email"
                name="user_email"
                label="Correo Electrónico del usuario"
                value={formik.values.user_email}
                onChange={formik.handleChange}
                error={
                  formik.touched.user_email && Boolean(formik.errors.user_email)
                }
                helperText={
                  formik.touched.user_email && formik.errors.user_email
                }
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Promoción</InputLabel>
              <Select
                fullWidth
                id="promotion_id"
                name="promotion_id"
                value={formik.values.promotion_id}
                onChange={formik.handleChange}
                error={
                  formik.touched.promotion_id &&
                  Boolean(formik.errors.promotion_id)
                }
                sx={{ mb: 4 }}
              >
                <MenuItem key={""} value={""} disabled>
                  Selecciona una de tus promociones.
                </MenuItem>
                {paginatedPromotions.data &&
                  paginatedPromotions.data.map((promotion: Promotion) => (
                    <MenuItem key={promotion.id} value={promotion.id}>
                      {promotion.name}
                    </MenuItem>
                  ))}
              </Select>
              {formik.touched.promotion_id && formik.errors.promotion_id && (
                <Typography variant="body2" color="red" gutterBottom>
                  {formik.errors.promotion_id}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button color="primary" variant="outlined" fullWidth type="submit">
            Crear transacción
          </Button>
        </form>
      </Box>
      <Box mb={12}>
        <Button startIcon={<Undo />} href="/transacciones" variant="contained">
          Volver a mis transacciones
        </Button>
      </Box>
    </Container>
  );
};

export default TransactionForm;
