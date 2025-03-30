import { styled } from "@mui/material";

export const SidebarContainer = styled("aside")({
  borderRight: "1px solid #eee",
  padding: "15px 10px",
  fontSize: "12px",
  background: "#fcfcfc",
  width: "20vw",
  maxWidth: "250px",
});

export const SidebarDescription = styled("div")({
  marginBottom: "10px",
  textAlign: "center",
  fontWeight: "bold",
});

export const DnDItem = styled("div")({
  height: "20px",
  padding: "4px",
  border: "1px solid #1976d2",
  borderRadius: "2px",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "grab",
});
