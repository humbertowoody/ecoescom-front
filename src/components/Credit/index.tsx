import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Stack,
  Pagination,
} from "@mui/material";
import React, { FC, Fragment, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { CreditAPI, PaginatedCredits } from "../../api/credits";
import Credit from "../../models/Credit/Credit";
import CreditCardModal from "./CreditCardModal";
import { Add } from "@mui/icons-material";

const Credits: FC = () => {
  const { user } = useAuth();
  const [userPaginatedCredits, setUserPaginatedCredits] = useState({
    data: [],
    count: 0,
    page: 0,
    pageCount: 0,
    total: 0,
  } as PaginatedCredits);

  useEffect(() => {
    // Get the credits from API
    if (user) {
      CreditAPI.getUserCredits(6, 1, user).then(
        (paginatedCredit: PaginatedCredits) => {
          setUserPaginatedCredits(paginatedCredit);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (user) {
      CreditAPI.getUserCredits(6, value, user).then(
        (paginatedCredit: PaginatedCredits) => {
          setUserPaginatedCredits(paginatedCredit);
        }
      );
    }
  };

  const totalCreditos = () => {
    let total = 0;
    userPaginatedCredits.data.forEach((credit: Credit) => {
      if (!credit.reported) {
        total += credit.quantity * (credit?.equivalence?.value || 0);
      }
    });
    return total;
  };

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
            Mis créditos
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            En esta sección puedes consultar tus créditos otorgados por tus
            actividades ecologistas. Si alguno de tus créditos ha sido reportado
            por un usuario, no podrás utilizarlo hasta que un administrador
            revise el caso.
          </Typography>
          <Box mt={4} mb={4}>
            <Typography variant="h5" component="h2" gutterBottom>
              Créditos disponibles: {totalCreditos()}
            </Typography>
          </Box>
          <Button
            startIcon={<Add />}
            variant="contained"
            href="/creditos/crear"
          >
            Obtener créditos
          </Button>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {userPaginatedCredits &&
            userPaginatedCredits.data.map((credit: Credit) => (
              <Grid item key={credit.id} xs={12} sm={6} md={4}>
                <CreditCardModal credit={credit} />
              </Grid>
            ))}
        </Grid>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Pagination
            count={userPaginatedCredits.pageCount}
            page={userPaginatedCredits.page}
            onChange={handlePageChange}
          />
        </Stack>
      </Container>
    </Fragment>
  );
};

export default Credits;
