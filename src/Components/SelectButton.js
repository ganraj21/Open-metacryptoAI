import React from "react";
import styled from "styled-components";

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

const SelectBtn = styled.div`
  border: 1px solid gold;
  border-radius: 5px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-family: Montserrat;
  cursor: pointer;
  &:hover {
    background-color: gold;
    color: #000;
  }
  width: 22%;
  margin: 5px;
  @media (max-width: 600px) {
    width: 100%;
    display: grid;
  }
`;
