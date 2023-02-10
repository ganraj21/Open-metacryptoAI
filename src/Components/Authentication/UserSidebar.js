import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import defaultprofile from "../Images/defaultavatar.jpg";
const font_fs =
  "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif";

export default function UserSidebar({ handleclose }) {
  const [show, setShow] = useState(false);
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
    <div className="usersidebar">
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <img
            className="avatarstyles"
            onClick={() => setShow(true)}
            src={user.photoURL ? user.photoURL : defaultprofile}
            alt={user.displayName || user.email}
            style={{ width: "36px", borderRadius: "50%" }}
          />
          <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <UserModalStyles>
              <div className="container" onClick={() => handleclose()}>
                <div className="profilediv">
                  <img
                    className="avatarpic"
                    src={user.photoURL ? user.photoURL : defaultprofile}
                    alt={user.displayName || user.email}
                  />
                  <span className="spanstyle">
                    {user.displayName || user.email}
                  </span>
                  <div className="watchlist">
                    <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                      WatchList
                    </span>

                    {/* // console.log(coin.id.price_change_24h); */}
                    {coins.map((coin) => {
                      if (watchlist.includes(coin.id))
                        return (
                          <div className="coinstyle" key={coin.name}>
                            <span>{coin.name}</span>
                            <span className="coinspancolor">
                              {symbol}
                              {coin.current_price.toFixed(2).toLocaleString()}
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
          </Modal>
        </React.Fragment>
      ))}
    </div>
  );
}

const UserModalStyles = styled.div`
  .container {
    width: 350px;
    padding: 25px;
    display: flex;
    position: absolute;
    height: 100vh;
    flex-direction: column;
    font-family: ${font_fs};
    background: #2685d885;
    backdrop-filter: blur(11px);
    z-index: 100px;
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
    border-radius: 50%;
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
    gap: 12px;
    overflow-y: scroll;
    font-family: ${font_fs};
  }
  .coinstyle {
    padding: 10px;
    border-radius: 5px;
    margin: 6px;
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
    gap: 8px;
  }
`;
