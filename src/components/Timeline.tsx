import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../hooks/useAuth";
import EquivalenceData from "./Equivalence/EquivalenceData";
import CreditPublicGrid from "./Credit/CreditPublicGrid";
import PromotionPublicGrid from "./Promotion/PromotionPublicGrid";

export default function Timeline() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState("promociones");

  const handlePage = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {user
              ? `Gracias, ${user.firstname}.`
              : "¡Recicla, gana créditos y cambia el mundo!"}
          </Typography>

          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            {user
              ? "Tus acciones ayudan a que nuestro medio ambiente pueda recuperar su magia. ¡Sigue reciclando y gana créditos!"
              : "¡Únete a la revolución ecológica! En EcoEscom, transformamos tus acciones en poderosos actos de cambio. ¿Quieres ganar créditos mientras ayudas al medio ambiente? ¡Estás en el lugar indicado! Sube tus fotos reciclando y desbloquea increíbles recompensas."}
          </Typography>

          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              size="small"
              variant={currentPage === "promociones" ? "contained" : "outlined"}
              onClick={() => handlePage("promociones")}
            >
              Promociones
            </Button>
            <Button
              size="small"
              variant={currentPage === "creditos" ? "contained" : "outlined"}
              onClick={() => handlePage("creditos")}
            >
              Créditos
            </Button>
            <Button
              size="small"
              variant={
                currentPage === "equivalencias" ? "contained" : "outlined"
              }
              onClick={() => handlePage("equivalencias")}
            >
              Equivalencias
            </Button>
          </Stack>
        </Container>
      </Box>

      {currentPage === "creditos" && (
        <Fragment>
          <Container sx={{ pt: 2 }} maxWidth="md">
            <Typography variant="h6" align="center">
              Créditos otorgados recientemente
            </Typography>

            <Typography variant="body2" align="center">
              Estos son los créditos que han sido otorgados recientemente por la
              comunidad de EcoEscom. ¡Sigue reciclando y gana créditos! ¿Ves
              algún crédito que no te parece? ¡Reportalo!
            </Typography>
          </Container>

          <CreditPublicGrid />
        </Fragment>
      )}
      {currentPage === "promociones" && (
        <Fragment>
          <Container sx={{ pt: 2 }} maxWidth="md">
            <Typography variant="h6" align="center">
              Promociones disponibles
            </Typography>

            <Typography variant="body2" align="center">
              Estas son las promociones que puedes desbloquear con tus créditos.
              ¿Quieres más información? ¡Contacta al usuario!
            </Typography>
          </Container>
          <PromotionPublicGrid />
        </Fragment>
      )}
      {currentPage === "equivalencias" && <EquivalenceData />}
    </Fragment>
  );
}
