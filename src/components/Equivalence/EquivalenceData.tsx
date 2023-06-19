import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Pagination,
  Box,
} from "@mui/material";
import React, { FC, Fragment, useEffect, useState } from "react";
import { EquivalenceAPI, PaginatedEquivalences } from "../../api/equivalences";
import Equivalence from "../../models/Equivalence/Equivalence";

const EquivalenceData: FC = () => {
  const isSmall = window.innerWidth < 600;

  const [paginatedEquivalences, setPaginatedEquivalences] = useState({
    data: [],
    count: 0,
    page: 0,
    pageCount: 0,
    total: 0,
  } as PaginatedEquivalences);

  useEffect(() => {
    // Get the credits from API
    EquivalenceAPI.getEquivalences(4, 1).then(
      (paginatedEquivalence: PaginatedEquivalences) => {
        setPaginatedEquivalences(paginatedEquivalence);
      }
    );
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    EquivalenceAPI.getEquivalences(4, value).then(
      (paginatedEquivalence: PaginatedEquivalences) => {
        setPaginatedEquivalences(paginatedEquivalence);
      }
    );
  };

  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Equivalencias admitidas
      </Typography>
      <Typography variant="body2" gutterBottom>
        Estas son las equivalencias que puedes subir a la plataforma.
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Equivalencia</TableCell>
            <TableCell>Descripción</TableCell>
            {!isSmall && (
              <Fragment>
                <TableCell>Unidad</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Min</TableCell>
                <TableCell>Max</TableCell>
              </Fragment>
            )}{" "}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedEquivalences &&
            paginatedEquivalences.data &&
            paginatedEquivalences.data.map(
              (equivalencia: Equivalence) =>
                equivalencia.enabled && (
                  <TableRow key={equivalencia.id}>
                    <TableCell>{equivalencia.name}</TableCell>
                    {isSmall ? (
                      <TableCell>
                        {equivalencia.description} Se mide en{" "}
                        {equivalencia.unit}
                        (s), con un valor de {equivalencia.value}, con un mínimo
                        de {equivalencia.min} y un máximo de {equivalencia.max}.
                      </TableCell>
                    ) : (
                      <Fragment>
                        <TableCell>{equivalencia.description}</TableCell>
                        <TableCell>{equivalencia.unit}</TableCell>
                        <TableCell>{equivalencia.value}</TableCell>
                        <TableCell>{equivalencia.min}</TableCell>
                        <TableCell>{equivalencia.max}</TableCell>
                      </Fragment>
                    )}
                  </TableRow>
                )
            )}
        </TableBody>
      </Table>
      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
        <Pagination
          count={paginatedEquivalences.pageCount}
          page={paginatedEquivalences.page}
          onChange={handlePageChange}
        />
      </Stack>
    </Box>
  );
};

export default EquivalenceData;
