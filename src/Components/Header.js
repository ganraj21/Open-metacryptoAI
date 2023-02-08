import { MenuItem, Toolbar, Select } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import { styled } from "@mui/material/styles";

const Appbar = styled(AppBar)(({ theme }) => ({
  height: "67px",
  background: "#9641da78",
  backdropFilter: "blur(11px)",
  position: "sticky",
  top: 0,
  [theme.breakpoints.down("sm")]: {
    padding: "5px",
  },
}));
const AppTitle = styled(Typography)(({ theme }) => ({
  flex: 1,
  fontSize: "24px",
  color: "#fff",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif",

  cursor: "pointer",
}));
const Selecth = styled(Select)(({ theme }) => ({
  width: 100,
  height: 40,
  marginLeft: 15,
  color: "#fff",
}));
const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState();

  console.log(currency);
  const darkTheme = createTheme({ palette: { mode: "dark" } });

  return (
    <ThemeProvider theme={darkTheme}>
      <Appbar color="transparent" position="static">
        <Container>
          <Toolbar>
            <AppTitle onClick={() => navigate("/")} variant="h6">
              MetaCrypto
            </AppTitle>

            <Selecth
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Selecth>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </Appbar>
    </ThemeProvider>
  );
};

export default Header;
