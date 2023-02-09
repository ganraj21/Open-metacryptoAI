import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../CoinsTable";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import styled from "styled-components";
import { Button, Container } from "react-bootstrap";

const font_fs =
  "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif";

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
          <img
            className="avatarstyles"
            onClick={toggleDrawer(anchor, true)}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Container
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <UserModalStyles>
              <div className="container">
                <div className="profilediv">
                  <img
                    className="avatarpic"
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                  />
                  <span className="spanstyle">
                    {user.displayName || user.email}
                  </span>
                  <div className="watchlist">
                    <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                      WatchList
                    </span>
                    {coins.map((coin) => {
                      // console.log(coin.id.price_change_24h);
                      if (watchlist.includes(coin.id)) {
                        console.log(coin.id.price_change_24h);
                        return (
                          <div className="coinstyle">
                            <span>{coin.name}</span>
                            <span className="coinspancolor">
                              {symbol}
                              {numberWithCommas(coin.current_price.toFixed(2))}
                              <span>
                                <AiFillDelete
                                  style={{ cursor: "pointer" }}
                                  fontSize="16"
                                  onClick={() => removeFromWatchlist(coin)}
                                />
                              </span>
                            </span>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                <Button
                  className="logoutbtn"
                  variant="contained"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </UserModalStyles>
          </Container>
        </React.Fragment>
      ))}
    </div>
  );
}

const UserModalStyles = styled.div`
  .containers {
    width: 350ps;
    padding: 25px;
    height: 100%;
    display: flex;
    flex-direction: column;
    fontfamily: ${font_fs};
    background: #2685d885;
    backdrop-filter: blur(11px);
  }
  .avatarstyles {
    height: 38px;
    width: 38px;
    margin-left: 15px;
    cursor: pointer;
    background-color: #eebc1d;
  }
  .avatarpic {
    width: 100px;
    height: 100px;
    cursor: pointer;
    background-color: #eebc1d;
    object-fit: contain;
  }
  .profilediv {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    height: 92%;
  }
  .spanstyle {
    width: 100%;
    font-size: 25px;
    text-align: center;
    font-weight: bolder;
    word-wrap: break-word;
  }
  .logoutbtn {
    height: 6%;
    width: 100%;
    background-color: #eebc1d;
    margin-top: 20px;
    font-family: ${font_fs};
  }
  .watchlist {
    flex: 1;
    width: 100%;
    background-color: #e2e2e270;
    border-radius: 10px;
    padding: 15px;
    padding-top: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12;
    overflow-y: scroll;
    font-family: ${font_fs};
  }
  .coinstyle {
    padding: 10px;
    border-radius: 5px;
    color: black;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #d3c5a270;
    backdrop-filter: blur(11px);
  }
  .coinspancolor {
    display: flex;
    gap: 8;
  }
`;
