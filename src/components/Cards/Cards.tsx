import { Avatar, Box, Stack, Typography } from "@mui/material";
import { CSSProperties } from "@mui/styled-engine-sc";
import { ReactNode } from "react";
import useWindowSize from "../../hooks/useWindowSize";

interface ICards {
  title: string;
  subTitle: string;
  isNumber?: boolean;
  number?: string;
  size: string;
  children?: ReactNode | JSX.Element;
  showIcon?: boolean;
  icon?: ReactNode;
  bgColorIcon?: string;
}

export function Cards({
  title,
  subTitle,
  number,
  size,
  isNumber,
  children,
  showIcon,
  icon,
  bgColorIcon,
}: ICards) {
  const { isMobile } = useWindowSize();

  const displayDefault: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const stylesContainer: CSSProperties = {
    ...displayDefault,
    flexDirection: "column",
    width: `${isMobile ? "auto" : size}`,
    height: "auto",
    boxShadow:
      " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    borderRadius: "10px",
    padding: "1rem",
    textAlign: "center",
    margin: `${isMobile ? "1rem 0.5rem" : "2rem 1rem 2rem 1rem"}`,
  };

  return (
    <Stack spacing={1} sx={stylesContainer}>
      <Typography variant="h5">{title}</Typography>
      <div
        style={{
          width: "90%",
          height: "1px",
          backgroundColor: "var(--primary_color)",
        }}
      />
      <Typography variant="subtitle1" color={"var(--sub_text_color)"}>
        {subTitle}
      </Typography>
      {showIcon && (
        <Avatar sx={{ backgroundColor: `${bgColorIcon}` }}>{icon}</Avatar>
      )}
      {isNumber && <Typography variant="h5">{number}</Typography>}
      <Box
        id="content"
        sx={{
          ...displayDefault,
          flexDirection: "column",
          textAlign: "center",
          width: `${size}`,
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}
