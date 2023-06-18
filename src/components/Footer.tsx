import { Box, Link, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://ecoes.com/">
        EcoESCOM
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer: React.FC = () => {
  return (
    <Box
      sx={{ bgcolor: "#f7f7f7", p: 2, mt: 3, borderTop: "1px double black" }}
      component="footer"
    >
      <Typography variant="h6" align="center" gutterBottom>
        ♻️ EcoESCOM 🌎
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        En EcoESCOM creemos que tenemos la responsabilidad de cuidar nuestro
        planeta, por eso te invitamos a que te unas a nuestra comunidad y juntos
        hagamos un cambio.
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
