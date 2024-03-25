import { Box, Paper, Stack, Typography, styled } from "@mui/material";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import Logo from "../../../../assets/MMNImg/logo.png";
// @ts-ignore
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "var(--text_color)",
  "&:hover": {
    color: "var(--primary_color)",
  },
  textAlign: "center",
  fontSize: "2rem",
  cursor: "pointer",
  boxShadow: "none",
  transition: ".2s",
}));

export default function Banner4() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "var(--backGround_default)",
        color: "var(--text_color)",
        display: "grid",
        placeContent: "center",
        textAlign: "center",
        py: 5,
        px: 2,
      }}
    >
      <img
        style={{
          width: "30%",
          display: "block",
          margin: "0 auto",
        }}
        src={Logo}
        alt=""
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          textAlign: "center",
          fontSize: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          mb: 3,
        }}
      >
        <Item>
          <FaWhatsapp />
        </Item>
        <Item>
          <FaInstagram />
        </Item>
        <Item>
          <FaLinkedin />
        </Item>
        <Item>
          <FaFacebook />
        </Item>
      </Stack>
      <Typography>
        Copyright © 2022 PlayMóvel TELEFONIA MOVEL CELULAR LTDA | Todos os
        direitos reservados
      </Typography>
    </Box>
  );
}
