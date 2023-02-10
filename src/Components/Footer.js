import React from "react";

const Footer = () => {
  return (
    <>
      <hr
        style={{
          height: "2px",
          borderWidth: 0,
          color: "gray",
          background: "gray",
          width: "100%",
          margin: 0,
        }}
      ></hr>
      <div
        style={{
          display: "flex",
          height: "72px",
          alignItems: "center",
          padding: "27px",
          flexDirection: "row",
        }}
      >
        <div
          className="contain"
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <p style={{ margin: 0 }}>Created by Ganesh Ghadge</p>
          <p style={{ margin: 0 }}>© 2023 MetaCrypto.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
