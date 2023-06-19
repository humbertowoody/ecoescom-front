import {
  Container,
  Grid,
  Stack,
  Pagination,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { CreditAPI, PaginatedCredits } from "../../api/credits";
import Credit from "../../models/Credit/Credit";
import Flag from "@mui/icons-material/Flag";

const CreditPublicGrid: FC = () => {
  const [paginatedCredits, setPaginatedCredits] = useState({
    data: [],
    count: 0,
    page: 0,
    pageCount: 0,
    total: 0,
  } as PaginatedCredits);

  useEffect(() => {
    CreditAPI.getPublicCredits(6, 1).then(
      (paginatedCredit: PaginatedCredits) => {
        setPaginatedCredits(paginatedCredit);
      }
    );
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    CreditAPI.getPublicCredits(6, value).then(
      (paginatedCredit: PaginatedCredits) => {
        setPaginatedCredits(paginatedCredit);
      }
    );
  };

  const handleReport = async (creditId: string) => {
    const userConfirmation: boolean = window.confirm(`
      ¿Estás seguro de que deseas reportar este crédito?
    `);
    if (userConfirmation) {
      try {
        const respuesta = await CreditAPI.reportCredit(creditId);
        console.log(respuesta);
        alert(`El crédito ${creditId} ha sido reportado`);
      } catch (error) {
        alert(`El crédito ${creditId} no ha podido ser reportado`);
      }
    }
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {paginatedCredits &&
          paginatedCredits.data.map((credit: Credit) => (
            <Grid item key={credit.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  //image="https://source.unsplash.com/random?wallpapers"
                  image={credit.photo_url}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {credit.quantity * (credit.equivalence?.value || 0)} crédito
                    {credit.quantity > 1 && "s"}
                  </Typography>
                  <Typography align="center">
                    {credit?.equivalence?.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    size="small"
                    onClick={() => handleReport(credit.id)}
                    color="error"
                  >
                    <Flag sx={{ mr: 1 }} />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
        <Pagination
          count={paginatedCredits.pageCount}
          page={paginatedCredits.page}
          onChange={handlePageChange}
        />
      </Stack>
    </Container>
  );
};

export default CreditPublicGrid;
