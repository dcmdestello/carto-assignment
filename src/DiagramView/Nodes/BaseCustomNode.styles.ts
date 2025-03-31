import { styled } from "@mui/material";

export const BaseNodeContainer = styled("div")(
  ({ selected }: { selected: boolean }) => ({
    border: selected ? "2px solid #777" : "2px solid #eee",
    padding: "10px",
    borderRadius: "5px",
    background: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  })
);

export const BigNodeLabel = styled("div")({
  paddingTop: "10px",
  paddingBottom: "10px",
});
