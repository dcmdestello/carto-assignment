import { Paper, styled } from "@mui/material";

export const SidebarContainer = styled("aside")({
  borderRight: "1px solid #eee",
  padding: "15px 10px",
  fontSize: "12px",
  background: "#fcfcfc",
  width: "20vw",
  maxWidth: "325px",
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  height: "auto",
  overflowY: "auto",
});

export const SidebarTitleWrapper = styled("div")({
  textAlign: "center",
});

export const SidebarDescription = styled("div")({
  marginTop: "10px",
  textAlign: "center",
  fontSize: "14px",
});

export const DnDItem = styled(Paper)({
  border: "1px solid rgba(25, 118, 210, 0.5)",
  background: "rgba(25, 118, 210, 0.1)",
  borderRadius: "2px",
  marginBottom: "10px",
  margin: "10px",
  paddingTop: "10px",
  paddingBottom: "10px",
  cursor: "grab",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",

  fontSize: "14px",
});

export const DnDItemImage = styled("img")({
  maxWidth: "80%",
});
