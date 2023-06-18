import React, { FC, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import CreatePromotionDTO from "../../models/Promotion/CreatePromotionDTO";
import EquivalenceData from "../Equivalence/EquivalenceData";
import PromotionAPI from "../../api/promotions";
import Promotion from "../../models/Promotion/Promotion";
import { Add, Undo } from "@mui/icons-material";

// Esquema de validación para una promoción.
const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  description: yup.string().required("La descripción es requerida"),
  photo_url: yup.mixed().required("La fotografía es requerida"),
  amount: yup
    .number()
    .min(1, "El monto debe ser al menos 1.")
    .required("El monto es requerido")
    .integer("El monto debe ser un entero")
    .typeError("El monto debe ser un número"),
  accept_terms: yup
    .bool()
    .oneOf([true], "Debes aceptar los términos y condiciones"),
  accept_sanctions: yup
    .bool()
    .oneOf([true], "Debes aceptar las sanciones en caso de incumplimiento"),
});

const PromotionForm: FC = () => {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);

  // Función para convertir un archivo a base64.
  const convertirABase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (event: any) => {
    console.log("Archivo");
    setImagePreview(URL.createObjectURL(event.target.files[0]) as any);
    formik.setFieldValue(
      "photo_url",
      await convertirABase64(event.target.files[0])
    );
  };

  // Formik es una librería que nos permite manejar formularios de una manera más sencilla.
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      photo_url: "",
      amount: 0,
      accept_terms: false,
    },
    validationSchema: validationSchema,
    // onSubmit es la función que se ejecuta cuando el usuario presiona el botón de submit.
    onSubmit: async (values: CreatePromotionDTO, { setSubmitting }) => {
      const newPromotion = PromotionAPI.createPromotion(values);
      console.log(newPromotion);
      alert("Promoción creada");
      setSubmitting(false);
    },
  });

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crear una nueva promoción para {user?.firstname || "😮"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Las promociones son la forma en que nuestros usuarios son
          recompensados por realizar acciones ecológicas. Para que tu promoción
          sea un éxito, te recomendamos que sigas los siguientes pasos:
        </Typography>
        <ol>
          <li>
            <Typography variant="body1" gutterBottom>
              Ingresa la <strong>cantidad de créditos</strong> que solicitarás a
              cambio de tu promoción. Recuerda que los créditos son la moneda de
              cambio de la aplicación. Si no sabes cuántos créditos solicitar,
              puedes consultar la sección de equivalencias.
            </Typography>
          </li>
          <EquivalenceData />
          <li>
            <Typography variant="body1" gutterBottom>
              Ingresa una <strong>fotografía</strong> que represente tu
              promoción. Recuerda que la fotografía es la primera impresión que
              tendrán los usuarios de tu promoción, por lo que es muy importante
              que sea de buena calidad.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom>
              <strong>Acepta los términos y condiciones</strong>. Recuerda que
              es muy importante que leas los términos y condiciones para que
              sepas cómo se manejarán tus promociones.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom>
              <strong>Acepta las sanciones en caso de incumplimiento.</strong>{" "}
              Recuerda que es muy importante que leas las sanciones en caso de
              incumplimiento para que sepas qué pasará si no cumples con tu
              promoción.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom>
              Presiona el botón de crear promoción. Recuerda que una vez que
              crees tu promoción, <strong>no podrás modificarla</strong>. Si
              deseas modificarla, tendrás que eliminarla y crear una nueva. Si
              tienes dudas, puedes consultar la sección de preguntas frecuentes.
            </Typography>
          </li>
        </ol>

        <hr />
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Nombre de la promoción"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Descripción de la promoción"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                fullWidth
                id="amount"
                name="amount"
                label="Cantidad de créditos"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
                sx={{ mb: 4 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="h2" gutterBottom>
                Fotografía de promoción.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Sube una fotografía que muestre los beneficios o el producto que
                estás ofreciendo.
              </Typography>
              <FormControl fullWidth>
                <input
                  id="foto"
                  name="foto"
                  type="file"
                  style={{
                    padding: "30px",
                    marginBottom: 10,
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                  }}
                  onChange={handleFileChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="preview"
                    width={200}
                    height={200}
                  />
                )}
              </FormControl>
              {formik.touched.photo_url && formik.errors.photo_url && (
                <Typography variant="body2" color="red" gutterBottom>
                  {formik.errors.photo_url}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" gutterBottom>
                Términos y condiciones
              </Typography>
              <Typography variant="body1" gutterBottom mb={4}>
                Para registrar una promoción debes leer y aceptar nuestros
                términos y condiciones.
                <Link href="/terminos-y-condiciones">
                  Haz click aquí para leerlos.
                </Link>{" "}
              </Typography>
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
                label="Acepto los términos y condiciones de EcoESCOM."
              />
              {formik.touched.accept_terms && formik.errors.accept_terms && (
                <Typography variant="body2" color="red" gutterBottom>
                  {formik.errors.accept_terms}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Button color="primary" variant="outlined" fullWidth type="submit">
            Registrar promoción nueva
          </Button>
        </form>
      </Box>
      <Box mb={12}>
        <Button startIcon={<Undo />} href="/promociones" variant="contained">
          Volver a mis promociones
        </Button>
      </Box>
    </Container>
  );
};

export default PromotionForm;
