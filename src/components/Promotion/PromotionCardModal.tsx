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
import Promotion from "../../models/Promotion/Promotion";

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

export default function PromotionCardModal({
  promotion,
}: {
  promotion: Promotion;
}) {
  const [isOpen, setIsOpen] = useState(false);

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
          image={promotion.photo_url}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography align="center" gutterBottom variant="h5" component="h2">
            {promotion.name}
          </Typography>
          <Typography align="center">{promotion.description}</Typography>
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
          <Typography variant="h3" component="h2">
            {promotion.name}
          </Typography>
          <Typography variant="body2" component="p">
            {promotion.description}
          </Typography>

          <Typography variant="body2" component="p">
            Fecha de registro:{" "}
            {format(
              parseISO(promotion.created_at as unknown as string),
              "dd 'de' MM 'del' yyyy"
            )}
          </Typography>
          <Typography variant="body2" component="p">
            Fecha de última modificación:{" "}
            {format(
              parseISO(promotion.updated_at as unknown as string),
              "dd 'de' MM 'del' yyyy"
            )}
          </Typography>

          <Typography variant="h6" component="h2">
            Fotografía de la promoción
          </Typography>
          <img
            src={promotion.photo_url}
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
