import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState();

  console.log(currency);

  return (
    <NavbarContainer>
      <Navbar className="appbar">
        <Container>
          <h2 className="app_title" onClick={() => navigate("/")}>
            MetaCrypto
          </h2>
          <div style={{ display: "flex" }}>
            <Form.Select
              aria-label="Default select example"
              className="select_section"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value={"INR"}>INR</option>
              <option value={"USD"}>USD</option>
            </Form.Select>
            {user ? <UserSidebar /> : <AuthModal />}
          </div>
        </Container>
      </Navbar>
    </NavbarContainer>
  );
};

export default Header;

const NavbarContainer = styled.div`
.appbar{
  height: 67px;
  background: #9641da78;
  backdrop-filter: blur(11px);
  position: sticky;
  top: 0,
  z-index: 100,
  @media (max-width: 600px) {
    padding: 5px;
  }
}
.app_title{
  flex: 1,
  font-size: 24px;
  color: #fff;
  fontFamily: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif;
  cursor: pointer;
}
.select_section{
  width: 100px;
  height: 40px;
  marginLeft: 15px;
  color: #000;
  border : none;
}
`;
