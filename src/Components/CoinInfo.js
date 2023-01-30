import axios from "axios";
import React, { useEffect, useState } from "react";
import CryptoState from "../CryptoContext";
import { HistoricalChart } from "../config/api";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState();

  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>CoinInfo</div>;
};

export default CoinInfo;
