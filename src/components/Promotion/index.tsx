import { Box, Typography, Container, Button, Grid } from "@mui/material";
import React, { FC, Fragment, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import PromotionAPI, { PaginatedPromotions } from "../../api/promotions";
import Promotion from "../../models/Promotion/Promotion";
import PromotionCardModal from "./PromotionCardModal";
import { Add } from "@mui/icons-material";

const Promotions: FC = () => {
  const { user } = useAuth();
  const [paginatedPromotions, setPaginatedPromotions] = React.useState({
    data: [],
    count: 0,
    page: 0,
    pageCount: 0,
    total: 0,
  } as PaginatedPromotions);

  useEffect(() => {
    if (user) {
      PromotionAPI.getUserPaginatedPromotions(6, 1, user)
        .then((paginatedPromotions: PaginatedPromotions) => {
          setPaginatedPromotions(paginatedPromotions);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Fragment>
      <Box
        sx={{
          // bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" color="text.primary" gutterBottom>
            Mis promociones
          </Typography>
          {user && user.role === "SELLER" ? (
            <Fragment>
              <Typography variant="body1" color="text.secondary" paragraph>
                Aquí puedes visualizar todas tus promociones registradas en
                EcoESCOM.
              </Typography>
              <Button
                startIcon={<Add />}
                variant="contained"
                href="/promociones/crear"
              >
                Crear una promoción nueva
              </Button>
            </Fragment>
          ) : (
            <Typography variant="body1" color="text.secondary" paragraph>
              Aquí podrás visualizar las promociones disponibles, haz click en
              "Ver más" para conocer los detalles de cada una.
            </Typography>
          )}
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {paginatedPromotions.data &&
            paginatedPromotions.data.map((promotion: Promotion) => (
              <Grid item key={promotion.id} xs={12} sm={6} md={4}>
                <PromotionCardModal promotion={promotion} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Promotions;
