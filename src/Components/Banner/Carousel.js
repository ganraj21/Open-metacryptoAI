import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  // const user = useContext(Crypto);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    console.log("You are in the fetchTrendingCoins");
    console.log(data);
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  console.log(trending);

  const classes = useStyles();

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit ? "+" : " "}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <>
      <div className={classes.carousel}></div>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </>
  );
};

export default Carousel;
