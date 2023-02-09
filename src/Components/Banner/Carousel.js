import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import styled from "styled-components";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Carousel() {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

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

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h;
    return (
      <Link to={`/coins/${coin.id}`} className="carouselitems">
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
              fontWeight: 600,
            }}
          >
            {profit > 0 ? "+" : " "}
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
      <CarouselStyle>
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
      </CarouselStyle>
    </>
  );
}

export default Carousel;

const CarouselStyle = styled.div`
  padding-bottom: 88px;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    margin-top: 48px;
    padding-bottom: 0;
  }

  .carouselitems {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    text-transform: uppercase;
    color: white;
    background: #cecece30;
    backdrop-filter: blur(13px);
    padding: 10px;
    border-radius: 6px;
    width: 250px;
    height: 180px;
    justify-content: center;
    margin-left: 10px;
    text-decoration: none;
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
