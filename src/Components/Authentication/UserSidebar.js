import React, { useState } from "react";
import { Drawer, Button, Avatar } from "@mui/material";
import { CryptoState } from "../../CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../CoinsTable";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { styled } from "@mui/system";

const font_fs =
  "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif";

const Containers = styled("div")(({ theme }) => ({
  width: 350,
  padding: 25,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  fontFamily: font_fs,
  background: "#2685d885",
  backdropFilter: "blur(11px)",
}));
const Profile = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  height: "92%",
}));
const SpanStyle = styled("span")(({ theme }) => ({
  width: "100%",
  fontSize: 25,
  textAlign: "center",
  fontWeight: "bolder",
  wordWrap: "break-word",
}));
const AvatarStyles = styled(Avatar)(({ theme }) => ({
  height: 38,
  width: 38,
  marginLeft: 15,
  cursor: "pointer",
  backgroundColor: "#EEBC1D",
}));
const Avatarpic = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  cursor: "pointer",
  backgroundColor: "#EEBC1D",
  objectFit: "contain",
}));

const UserLogout = styled(Button)(({ theme }) => ({
  height: "6%",
  width: "100%",
  backgroundColor: "#EEBC1D",
  marginTop: 20,
  fontFamily: font_fs,
}));

const Watchlist = styled("div")(({ theme }) => ({
  flex: 1,
  width: "100%",
  backgroundColor: "#e2e2e270",
  borderRadius: 10,
  padding: 15,
  paddingTop: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  overflowY: "scroll",
  fontFamily: font_fs,
}));

const CoinStyle = styled("div")(({ theme }) => ({
  padding: 10,
  borderRadius: 5,
  color: "black",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#d3c5a270",
  backdropFilter: "blur(11px)",
}));
const CoinspanColor = styled("span")(({ theme }) => ({
  display: "flex",
  gap: 8,
  // color: coin.id.price_change_24h > 0 ? "#02a100" : "#d8252f",
}));
export default function UserSidebar() {
  const [state, setState] = useState({
    right: false,
  });

  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const logout = () => {
    signOut(auth);

    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });
    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: "true" }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist`,
        typr: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        typr: "error",
      });
    }
  };
  // console.log(coins);
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <AvatarStyles
            onClick={toggleDrawer(anchor, true)}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Containers>
              <Profile>
                <Avatarpic
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <SpanStyle>{user.displayName || user.email}</SpanStyle>
                <Watchlist>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    WatchList
                  </span>
                  {coins.map((coin) => {
                    // console.log(coin.id.price_change_24h);
                    if (watchlist.includes(coin.id)) {
                      console.log(coin.id.price_change_24h);
                      return (
                        <CoinStyle>
                          <span>{coin.name}</span>
                          <CoinspanColor>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <span>
                              <AiFillDelete
                                style={{ cursor: "pointer" }}
                                fontSize="16"
                                onClick={() => removeFromWatchlist(coin)}
                              />
                            </span>
                          </CoinspanColor>
                        </CoinStyle>
                      );
                    }
                  })}
                </Watchlist>
              </Profile>
              <UserLogout variant="contained" onClick={logout}>
                Logout
              </UserLogout>
            </Containers>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
