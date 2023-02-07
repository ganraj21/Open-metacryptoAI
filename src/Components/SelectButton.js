import React from "react";
import "./styles/SelectButton.css";
const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      className="selectbutton"
      sx={{
        backgroundColor: selected ? "gold" : "",
        color: selected ? "#000" : "",
        fontWeight: selected ? 600 : 500,
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default SelectButton;
