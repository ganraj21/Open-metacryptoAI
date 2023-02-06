import {
  AppBar,
  Container,
  createTheme,
  makeStyles,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const useStyles = makeStyles((theme) => ({
  app_bar: {
    height: "67px",
    background: "#9641da78",
    backdropFilter: "blur(11px)",
    position: "sticky",
    top: 0,
    [theme.breakpoints.down("sm")]: {
      padding: "5px",
    },
  },
  title: {
    flex: 1,
    fontSize: "24px",
    color: "#fff",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif",

    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState();

  console.log(currency);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static" className={classes.app_bar}>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h6"
            >
              MetaCrypto
            </Typography>

            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: 100, height: 40, marginLeft: 15, color: "#fff" }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
