import { Box, CircularProgress, Divider } from "@mui/material";

import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postPlayValidaIdIndicacao } from "../../api/ApisUtils/ValidaIdIndicacao";
import { Error401Image } from "../../assets/svg/Error401Image";
import useWindowSize from "../../hooks/useWindowSize";
import Banner1 from "./HomeIndicacao/banner1";
import Banner2 from "./HomeIndicacao/banner2";
import Banner3 from "./HomeIndicacao/banner3";
import Banner4 from "./HomeIndicacao/banner4";

export function LandingPageMultinivel() {
  const { isMobile } = useWindowSize();
  const [loading, setLoading] = useState(false);
  const { idIndicacao } = useParams();
  const [validateIdIndicacao, setValidateIdIndicacao] = useState(true);

  async function handleValidateIdIndicacao() {
    setLoading(true);

    try {
      let payload = {
        id_indicacao: idIndicacao ? idIndicacao : "",
      };

      await postPlayValidaIdIndicacao(payload);
      setValidateIdIndicacao(true);
    } catch (error: any) {
      setValidateIdIndicacao(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleValidateIdIndicacao();
  }, []);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : validateIdIndicacao ? (
        <>
          <Banner1 />
          <Banner2 />
          <Divider
            sx={{
              mx: 6,
              background: "var(--primary-color)",
            }}
          />
          <Banner3 />
          <Banner4 />
        </>
      ) : (
        <Box
          height={isMobile ? "100vh" : "100vh"}
          display="flex"
          justifyContent="center"
          flexDirection={isMobile ? "column" : "row"}
          sx={{
            background: `${isMobile ? "var(--backGround-default)" : "#fff"}`,
          }}
        >
          <Box
            flex={1}
            width="225px"
            display="flex"
            alignSelf="center"
            justifyContent="center"
            order={isMobile ? "2" : "1"}
            sx={{
              background: `${isMobile ? "var(--backGround-default)" : "#fff"}`,
            }}
          >
            <Error401Image />
          </Box>
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            color="#fff"
            sx={{ background: "var(--backGround-default)" }}
            gap={1}
            order={isMobile ? "1" : "2"}
            textAlign="center"
          >
            <Typography
              variant="h3"
              color="var(--primary-color)"
              fontWeight="900"
              letterSpacing={isMobile ? 3 : 8}
              sx={{
                fontSize: `${isMobile ? "5rem" : "8.75rem"}`,
              }}
            >
              401
            </Typography>
            <Typography variant="h6" fontWeight="700">
              ID de indicação inválido!
            </Typography>
            <Typography variant="subtitle1">
              Entre em contato com o administrador.
            </Typography>
            <Button
              sx={{ color: "var(--white)", fontWeight: "700", p: 1.25 }}
              variant="contained"
            >
              Entrar em Contato
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
