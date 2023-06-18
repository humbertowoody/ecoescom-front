import { Box, Typography, Container, Button, Grid } from "@mui/material";
import React, { FC, Fragment, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Add } from "@mui/icons-material";
import TransactionCardModal from "./TransactionCardModal";
import TransactionAPI, { PaginatedTransactions } from "../../api/transactions";
import Transaction from "../../models/Transaction/Transaction";

const Transactions: FC = () => {
  const { user } = useAuth();
  const [paginatedTransactions, setPaginatedTransactions] = React.useState({
    data: [],
    count: 0,
    page: 0,
    pageCount: 0,
    total: 0,
  } as PaginatedTransactions);

  useEffect(() => {
    if (user) {
      TransactionAPI.getUserPaginatedTransactions(1, 6, user)
        .then((paginatedTransactions: PaginatedTransactions) => {
          setPaginatedTransactions(paginatedTransactions);
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
            Transacciones
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            En esta sección puedes visualizar las promociones que has canjeado y
            por cuántos puntos.
          </Typography>
          {user && user.role === "SELLER" && (
            <Button
              startIcon={<Add />}
              variant="contained"
              href="/transacciones/crear"
            >
              Registrar transacción
            </Button>
          )}
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {paginatedTransactions.data &&
            paginatedTransactions.data.map((transaction: Transaction) => (
              <Grid item key={transaction.id} xs={12} sm={6} md={4}>
                <TransactionCardModal transaction={transaction} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Transactions;
