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
  TextField,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import PromotionAPI, { PaginatedPromotions } from "../../api/promotions";
import Promotion from "../../models/Promotion/Promotion";
import { Person } from "@mui/icons-material";

const PromotionPublicGrid: FC = () => {
  const [paginatedPromotions, setPaginatedPromotions] = useState({
    data: [],
    count: 0,
    page: 0,
    pageCount: 0,
    total: 0,
  } as PaginatedPromotions);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    PromotionAPI.getPublicPromotions(1, 6, searchString).then(
      (paginatedPromotion: PaginatedPromotions) => {
        setPaginatedPromotions(paginatedPromotion);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (search: string) => {
    setSearchString(search);
    PromotionAPI.getPublicPromotions(1, 6, search).then(
      (paginatedPromotion: PaginatedPromotions) => {
        setPaginatedPromotions(paginatedPromotion);
      }
    );
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    PromotionAPI.getPublicPromotions(value, 6, searchString).then(
      (paginatedPromotion: PaginatedPromotions) => {
        setPaginatedPromotions(paginatedPromotion);
      }
    );
  };

  const handleContact = (promotion: Promotion) => {
    alert(`Información de contacto de ${promotion.name}:\n
    ${promotion.user?.firstname} ${promotion.user?.lastname_1} ${promotion.user?.lastname_2}\n 
    ${promotion.user?.email}
`);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <TextField
        id="search"
        label="Buscar promoción"
        variant="outlined"
        onChange={(event) => handleSearch(event.target.value)}
        fullWidth
        value={searchString}
        sx={{ pb: 4 }}
      />
      <Grid container spacing={4}>
        {paginatedPromotions &&
          paginatedPromotions.data &&
          paginatedPromotions.data.map((promotion: Promotion) => (
            <Grid item key={promotion.id} xs={12} sm={6} md={4}>
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
                  image={promotion.photo_url}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {promotion.name} ({promotion.amount} créditos)
                  </Typography>
                  <Typography align="center">
                    {promotion.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    size="small"
                    startIcon={<Person />}
                    onClick={() => handleContact(promotion)}
                  >
                    Contacto
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
        <Pagination
          count={paginatedPromotions.pageCount}
          page={paginatedPromotions.page}
          onChange={handlePageChange}
        />
      </Stack>
    </Container>
  );
};

export default PromotionPublicGrid;
