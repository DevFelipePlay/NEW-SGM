import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { mask } from "remask";
import { StepsPrimeiroAcessoMMN } from "..";
import { postPlayCadastroPontosPorModalidade } from "../../../../api/ApisPrimeiroAcessoParceiro";
import { Cards } from "../../../../components";
import { useForm } from "../../../../hooks";
import useUser from "../../../../hooks/useUser";
import { errorToast } from "../../../../utils";

export function CadastroPontosModalidadeMMN() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { formData, changeForm } = useForm({
    ativacao: "",
    recarga: "",
    chips: "",
    token: user?.token,
  });

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      await postPlayCadastroPontosPorModalidade(formData);
      toast.success("Cadastro dos pontos realizado com sucesso!");
      navigate(
        `/${user?.companyref}/primeiro-acesso-multinivel-parceiro/cadastro-de-distribuicao-de-valores-por-recarga`
      );
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }

  // breakpoints
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StepsPrimeiroAcessoMMN step={4}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Cards
          title={"Pontos por nível"}
          subTitle={"Defina a quantidade de pontos de cada modalidade"}
          size={smDown ? "90%" : "50%"}
        >
          <TextField
            type="tel"
            label="Ativação"
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
            value={mask(formData.ativacao, ["9999"])}
            onChange={(e) => changeForm("ativacao", e.target.value)}
            required
          />
          <TextField
            type="tel"
            label="Recarga"
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
            value={mask(formData.recarga, ["9999"])}
            onChange={(e) => changeForm("recarga", e.target.value)}
            required
          />
          <TextField
            type="tel"
            label="Chips"
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
            value={mask(formData.chips, ["9999"])}
            onChange={(e) => changeForm("chips", e.target.value)}
            required
          />

          <Box>
            <LoadingButton
              type="submit"
              variant="contained"
              disabled={formData.ativacao === "" || formData.recarga === ""}
              loading={loading}
            >
              Enviar
            </LoadingButton>
          </Box>
        </Cards>
      </Box>
    </StepsPrimeiroAcessoMMN>
  );
}
