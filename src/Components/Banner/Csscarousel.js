import React from "react";
import styled from "styled-components";
const itemsgrid = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
];
const Csscarousel = () => {
  return (
    <Carouselcssstyle>
      {itemsgrid.map((value, id) => {
        return <div key={id} className="carouselitems"></div>;
      })}
    </Carouselcssstyle>
  );
};

export default Csscarousel;

const Carouselcssstyle = styled.div`
  padding-bottom: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    margin-top: 48px;
    padding-bottom: 0;
  }
  .carouselitems {
    @keyframes backgroundColorPalette {
      0% {
        background: #707070;
      }

      50% {
        background: #3f3f3f;
      }

      100% {
        background: #201e1cs;
      }
    }
    animation-name: backgroundColorPalette;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    text-transform: uppercase;
    color: white;
    // background: #cecece30;
    backdrop-filter: blur(13px);
    padding: 10px;
    border-radius: 6px;
    width: 250px;
    height: 180px;
    justify-content: center;
    margin-left: 10px;
    text-decoration: none;
    @media (max-width: 800px) {
      width: 123px;
      height: 205px;
    }
    @media (max-width: 600px) {
      width: 90%;
      height: 200px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
