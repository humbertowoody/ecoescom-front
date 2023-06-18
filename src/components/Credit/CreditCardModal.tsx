import React, { Fragment, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import Credit from "../../models/Credit/Credit";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Flag from "@mui/icons-material/Flag";
import { format, parseISO } from "date-fns";

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

export default function CreditCardModal({ credit }: { credit: Credit }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleReported = () => {
    alert(
      `El crédito fue reportado el ${format(
        parseISO(credit.reported_at as unknown as string),
        "dd 'de' MM 'del' yyyy"
      )} y está siendo revisado por un administrador, por ahora este crédito no será utilizable para canjear por promociones. En el caso de que se compruebe un intento de fraude tu cuenta será clausurada.`
    );
  };

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
          image={credit.photo_url}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography align="center" gutterBottom variant="h5" component="h2">
            {credit.quantity} punto{credit.quantity > 1 && "s"}
          </Typography>
          <Typography align="center">{credit.equivalence?.name}</Typography>
        </CardContent>
        <CardActions>
          <Button fullWidth size="small" onClick={openModal}>
            Ver más
          </Button>
          {credit.reported && (
            <Flag sx={{ mr: 1, color: "red" }} onClick={handleReported} />
          )}
        </CardActions>
      </Card>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h3" component="h2">
            {credit.quantity * (credit.equivalence?.value || 1)} crédito
            {credit.quantity > 1 && "s"}
          </Typography>
          <Typography variant="body2" component="p">
            {credit.reported && (
              <b>
                Este crédito fue reportado el{" "}
                {format(
                  parseISO(credit.reported_at as unknown as string),
                  "dd 'de' MM 'del' yyyy"
                )}
                .
              </b>
            )}
          </Typography>

          <Typography variant="h6" component="h2">
            {credit.equivalence?.name}
          </Typography>
          <Typography variant="body2" component="p">
            {credit.equivalence?.description}
          </Typography>
          <Typography variant="body2" component="p">
            Cada {credit.equivalence?.unit} equivale a{" "}
            {credit.equivalence?.value} punto
            {(credit.equivalence?.value || 0) > 1 && "s"}.
          </Typography>
          <Typography variant="body2" component="p">
            Tú registraste{" "}
            <b>
              {credit.quantity} {credit.equivalence?.unit}
              {credit.quantity > 1 && "s"}
            </b>{" "}
            que equivalen a{" "}
            <b>
              {credit.quantity * (credit.equivalence?.value || 1)} crédito
              {credit.quantity > 1 && "s"}
            </b>
            .
          </Typography>

          <Typography variant="body2" component="p">
            Fecha de registro:{" "}
            {format(
              parseISO(credit.created_at as unknown as string),
              "dd 'de' MM 'del' yyyy"
            )}
          </Typography>
          <Typography variant="h6" component="h2">
            Foto del comprobante
          </Typography>
          <img
            src={credit.photo_url}
            alt="credit"
            style={{
              maxWidth: "100%",
              maxHeight: "40vh",
            }}
          />
        </Box>
      </Modal>
    </Fragment>
  );
}
