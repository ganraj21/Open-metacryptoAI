import { LinearProgress, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../Components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../Components/CoinsTable";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { styled } from "@mui/material/styles";

const ContainerCp = styled("div")(({ theme }) => ({
  display: "flex",
  background: "#151829",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const SidebarCp = styled("div")(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));
const HeadingCp = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
}));
const DescriptionCp = styled(Typography)(({ theme }) => ({
  width: "100%",
  fontFamily: "Montserrat",
  textAlign: "left",
  padding: "25px",
}));

const MarketDataCp = styled("div")(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  console.log(coin);

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin.id] : [coin.id],
      });

      setAlert({
        open: true,
        message: `${coin.name} Added to the watchlist`,
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

  const removeFromWatchlist = async () => {
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

  return (
    <ContainerCp>
      <SidebarCp>
        {/* sidebar */}
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="150"
          style={{ marginBottom: 20 }}
        />
        <HeadingCp variant="h3">{coin?.name}</HeadingCp>
        <DescriptionCp variant="subtitle1">
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </DescriptionCp>

        <MarketDataCp>
          <span style={{ display: "flex" }}>
            <HeadingCp variant="h5">Rank:</HeadingCp>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <HeadingCp variant="h5">Current Price:</HeadingCp>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <HeadingCp variant="h5">Market Cap:</HeadingCp>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              sx={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
                color: inWatchlist ? "#fff" : "#000",
                border: "none",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </MarketDataCp>
      </SidebarCp>

      {/* chart */}
      <CoinInfo coin={coin} />
    </ContainerCp>
  );
};

export default CoinPage;
