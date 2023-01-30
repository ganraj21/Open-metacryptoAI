import { makeStyles } from "@material-ui/core";
import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "#000" : "",
      fontWeight: selected ? 600 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "#000",
      },
      width: "22%",
      margin: 5,
    },
  });

  const classes = useStyles();
  return (
    <span className={classes.selectbutton} onClick={onClick}>
      {children}
    </span>
  );
};

export default SelectButton;
