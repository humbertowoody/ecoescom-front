import React, { Fragment, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import Transaction from "../../models/Transaction/Transaction";
import { useAuth } from "../../hooks/useAuth";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "#F7F7F7",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransactionCardModal({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const isBuy = user && transaction.user && transaction.user.id === user.id;

  const openModal = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Fragment>
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
          image={transaction?.promotion?.photo_url}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography align="center" gutterBottom variant="h5" component="h2">
            {transaction?.promotion?.name}
          </Typography>
          <Typography align="center">
            {isBuy
              ? `Compra por ${transaction.promotion?.amount} créditos`
              : `Venta a ${transaction.user?.firstname} (Boleta: ${transaction?.user?.student_id})`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button fullWidth size="small" onClick={openModal}>
            Ver más
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isBuy ? (
            <Fragment>
              <Typography variant="h3" component="h2">
                {transaction?.promotion?.name}
              </Typography>
              <Typography variant="body2" component="p">
                {transaction?.promotion?.description}
              </Typography>

              <Typography variant="body2" component="p">
                Fecha de registro:{" "}
                {format(
                  parseISO(transaction.created_at as unknown as string),
                  "dd 'de' MM 'del' yyyy"
                )}
              </Typography>

              <Typography variant="h6" component="h2">
                Fotografía de la promoción
              </Typography>
              <img
                src={transaction?.promotion?.photo_url}
                alt="credit"
                style={{
                  maxWidth: "100%",
                  maxHeight: "40vh",
                }}
              />
            </Fragment>
          ) : (
            <Fragment>
              <Typography variant="h3" component="h2">
                Venta
              </Typography>
              <Typography variant="body2" component="p">
                {transaction?.promotion?.name}
              </Typography>
              <Typography variant="body2" component="p">
                {transaction?.promotion?.description}
              </Typography>
              <Typography variant="body2" component="p">
                Fecha de registro:{" "}
                {format(
                  parseISO(transaction.created_at as unknown as string),
                  "dd 'de' MM 'del' yyyy"
                )}
              </Typography>
              <Typography variant="h6" component="h2">
                Fotografía de la promoción
              </Typography>
              <img
                src={transaction?.promotion?.photo_url}
                alt="credit"
                style={{
                  maxWidth: "100%",
                  maxHeight: "40vh",
                }}
              />

              <hr />
              <Typography variant="body2" component="p">
                Datos del alumno:
                <ul>
                  <li>
                    <b>Nombre:</b>
                    {transaction?.user?.firstname}{" "}
                    {transaction?.user?.lastname_1}{" "}
                    {transaction?.user?.lastname_2}
                  </li>
                  <li>
                    <b>Correo electrónico:</b>
                    {transaction?.user?.email}
                  </li>
                  <li>
                    <b>Boleta:</b>
                    {transaction?.user?.student_id}
                  </li>
                </ul>
              </Typography>
            </Fragment>
          )}
        </Box>
      </Modal>
    </Fragment>
  );
}
