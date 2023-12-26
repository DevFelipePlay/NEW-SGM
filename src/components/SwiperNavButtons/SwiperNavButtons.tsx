import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSwiper } from "swiper/react";

export function SwiperNavButtons() {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    // Função para atualizar a visibilidade dos botões
    const updateButtonVisibility = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    // Inicialize a visibilidade dos botões
    updateButtonVisibility();

    // Adicione um ouvinte para o evento 'slideChange'
    swiper.on("slideChange", updateButtonVisibility);

    // Use um efeito secundário para aguardar a inicialização completa do Swiper antes de verificar o número de slides
    const waitForSwiperInitialization = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Aguarda 0,5 segundos

      setTotalSlides(swiper.slides ? swiper.slides.length : 0);
    };

    waitForSwiperInitialization();
  });

  return (
    <>
      <Box
        className="swiper-nav-btns"
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: {
            xs: "10rem",
            md: "8rem",
          },
          paddingBottom: "0.3rem",
        }}
      >
        {totalSlides > 3 && (
          <button
            onClick={() => {
              if (!isBeginning) {
                swiper.slidePrev();
              }
            }}
            disabled={isBeginning}
            style={{
              width: "1.75rem",
              height: "1.75rem",
              borderRadius: "50%",
              background: "var(--backGround-default)",
              color: "var(--primary-color)",
              display: "grid",
              placeContent: "center",
              cursor: "pointer",
              border: "none",
              transition: ".2s",
              opacity: `${isBeginning ? "0.5" : "1"}`,
            }}
          >
            <FaArrowLeft />
          </button>
        )}

        {totalSlides > 3 && (
          <button
            style={{
              width: "1.75rem",
              height: "1.75rem",
              borderRadius: " 50%",
              background: "var(--backGround-default)",
              color: "var(--primary-color)",
              display: "grid",
              placeContent: "center",
              cursor: "pointer",
              border: "none",
              transition: ".3s",
              opacity: `${isEnd ? "0.5" : "1"}`,
            }}
            onClick={() => {
              if (!isEnd) {
                swiper.slideNext();
                console.log(swiper.slides);
              }
            }}
            disabled={isEnd}
          >
            <FaArrowRight />
          </button>
        )}
      </Box>
    </>
  );
}
