import React from "react";
import { styled } from "@mui/material/styles";

const SelectBtn = styled("span")(({ theme }) => ({
  border: "1px solid gold",
  borderRadius: 5,
  padding: 10,
  paddingLeft: 20,
  paddingRight: 20,
  fontFamily: "Montserrat",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "gold",
    color: "#000",
  },
  width: "22%",
  margin: 5,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    display: "grid",
  },
}));
const SelectButton = ({ children, selected, onClick }) => {
  return (
    <SelectBtn
      style={{
        backgroundColor: selected ? "gold" : "",
        color: selected ? "#000" : "",
        fontWeight: selected ? 600 : 500,
      }}
      onClick={onClick}
    >
      {children}
    </SelectBtn>
  );
};

export default SelectButton;
