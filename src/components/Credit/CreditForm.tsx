import React, { FC, useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import EquivalenceData from "../Equivalence/EquivalenceData";
import Equivalence from "../../models/Equivalence/Equivalence";
import { EquivalenceAPI } from "../../api/equivalences";
import Loading from "../Loading";
import { CreditAPI } from "../../api/credits";
import Credit from "../../models/Credit/Credit";
import { useNavigate } from "react-router-dom";
import { Undo } from "@mui/icons-material";

const CreditForm: FC = () => {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const [equivalences, setEquivalences] = useState([] as Equivalence[]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the Equivalences from the API
    EquivalenceAPI.getAllEquivalences().then((equivalences: Equivalence[]) => {
      setEquivalences(equivalences);
    });
  }, []);

  // Esquema de validación para cada Artículo en el formulario.
  const validationSchema = yup.object({
    equivalence_id: yup
      .string()
      .oneOf(
        equivalences.map((equivalencia: Equivalence) => equivalencia.id),
        "Debes seleccionar una equivalencia válida"
      )
      .required("La equivalencia es requerida"),
    quantity: yup
      .number()
      .min(1, "La cantidad de unidades de la equivalencia debe ser al menos 1.")
      .required("La cantidad de unidades es requerida")
      .integer("La cantidad de unidades debe ser un entero")
      .typeError("La cantidad de unidades debe ser un número"),
    photo_url: yup.mixed().required("La fotografía es requerida"),
    accept_terms: yup
      .bool()
      .oneOf([true], "Debes aceptar los términos y condiciones"),
    accept_sanctions: yup
      .bool()
      .oneOf([true], "Debes aceptar las sanciones en caso de incumplimiento"),
  });
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
    setImagePreview(URL.createObjectURL(event.target.files[0]) as any);
    formik.setFieldValue(
      "photo_url",
      await convertirABase64(event.target.files[0])
    );
  };

  // Formik es una librería que nos permite manejar formularios de una manera más sencilla.
  const formik = useFormik({
    initialValues: {
      equivalence_id: "",
      quantity: 0,
      photo_url: "",
      accept_terms: false,
      accept_sanctions: false,
    },
    validationSchema: validationSchema,
    // onSubmit es la función que se ejecuta cuando el usuario presiona el botón de submit.
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      CreditAPI.createCredit(
        {
          ...values,
        },
        user || undefined
      )
        .then((response: Credit) => {
          alert(
            `¡Gracias por tu ayuda! Tus créditos han sido registrados con el ID ${response.id}.`
          );
          // Redirect to /creditos usando react-router-dom
          navigate("/creditos");
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Ocurrió un error al registrar tus créditos. Por favor intenta de nuevo."
          );
        });
      setSubmitting(false);
    },
  });

  if (equivalences.length === 0) {
    return <Loading />;
  }

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Obtener créditos
        </Typography>
        <Typography variant="body1" gutterBottom>
          ¡Gracias por tu ayuda! Para obtener tus créditos, por favor llena el
          siguiente formulario. Te recordamos que la imagen que anexes aquí como
          evidencia será publicada en la página principal junto con tu número de
          boleta.
        </Typography>
        <Box mt={4} mb={4}>
          <EquivalenceData />
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h5" component="h2" gutterBottom>
            1) Selecciona una equivalencia
          </Typography>
          <Typography variant="body1" gutterBottom mb={4}>
            Selecciona la equivalencia que deseas usar, es muy importante de que
            uses la categoría correcta para que puedas obtener tus créditos.
          </Typography>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel>Equivalencia</InputLabel>
            <Select
              fullWidth
              id="equivalence_id"
              name="equivalence_id"
              value={formik.values.equivalence_id}
              onChange={formik.handleChange}
              error={
                formik.touched.equivalence_id &&
                Boolean(formik.errors.equivalence_id)
              }
              //helperText={formik.touched.action && formik.errors.action}
              sx={{ mb: 4 }}
            >
              <MenuItem key={""} value={""} disabled>
                Seleccione una equivalencia
              </MenuItem>
              {equivalences.map((equivalencia: Equivalence) => (
                <MenuItem key={equivalencia.id} value={equivalencia.id}>
                  {equivalencia.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.equivalence_id && formik.errors.equivalence_id && (
              <Typography variant="body2" color="red" gutterBottom>
                {formik.errors.equivalence_id}
              </Typography>
            )}
          </FormControl>

          <Typography variant="h5" component="h2" gutterBottom>
            2) Ingresa la cantidad de{" "}
            {formik.values.equivalence_id
              ? equivalences.find(
                  (equivalencia: Equivalence) =>
                    equivalencia.id === formik.values.equivalence_id
                )?.unit + "s."
              : "😮"}
          </Typography>
          <Typography variant="body1" gutterBottom mb={4}>
            Ingresa la cantidad de unidades de la equivalencia que deseas usar.
            Recuerda que las unidades deben ser visibles en la evidencia que
            subirás en el siguiente paso.
          </Typography>
          <TextField
            type="number"
            fullWidth
            id="quantity"
            name="quantity"
            label="Cantidad"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
            sx={{ mb: 4 }}
          />
          <Typography variant="h5" component="h2" gutterBottom>
            3) Sube una fotografía
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sube una fotografía de la equivalencia que elegiste. La fotografía
            debe ser clara y legible, de lo contrario no podremos validar tus
            créditos.
          </Typography>
          <Typography variant="body2" gutterBottom mb={4}>
            <strong>Pst!</strong> Tu fotografía debe mostrar claramente{" "}
            {formik.values.quantity || 0}{" "}
            {formik.values.equivalence_id
              ? equivalences.find(
                  (equivalencia: Equivalence) =>
                    equivalencia.id === formik.values.equivalence_id
                )?.unit
              : "😮"}
            {formik.values.quantity > 1 || formik.values.quantity === 0
              ? "s"
              : ""}
            .
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
              <img src={imagePreview} alt="preview" width={200} height={200} />
            )}
          </FormControl>
          {formik.touched.photo_url && formik.errors.photo_url && (
            <Typography variant="body2" color="red" gutterBottom>
              {formik.errors.photo_url}
            </Typography>
          )}
          <Typography variant="h5" component="h2" gutterBottom>
            4) Acepta los términos y condiciones
          </Typography>
          <Typography variant="body1" gutterBottom mb={4}>
            Para poder obtener tus créditos, debes aceptar los términos y
            condiciones de la plataforma.{" "}
            <Link href="/terminos-y-condiciones">
              Haz click aquí para leerlos.
            </Link>{" "}
            También es importante que sepas que mentir en este formulario es
            causa de cancelación de tu cuenta, así que por favor sé honesto.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                id="accept_sanctions"
                name="accept_sanctions"
                onChange={formik.handleChange}
                checked={formik.values.accept_sanctions}
              />
            }
            label="Entiendo que mentir en este formulario es causa de cancelación de mi cuenta."
          />
          {formik.touched.accept_sanctions &&
            formik.errors.accept_sanctions && (
              <Typography variant="body2" color="red" gutterBottom>
                {formik.errors.accept_sanctions}
              </Typography>
            )}

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
          <Button color="primary" variant="outlined" fullWidth type="submit">
            Obtener créditos
          </Button>
        </form>
      </Box>
      <Box mb={12}>
        <Button startIcon={<Undo />} href="/creditos" variant="contained">
          Volver a mis créditos.
        </Button>
      </Box>
    </Container>
  );
};

export default CreditForm;
