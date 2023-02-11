import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/data";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import SelectButton from "./SelectButton";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  // const [profit, setProfits] = useState(1);

  const { currency } = CryptoState();

  Chart.register(CategoryScale);
  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
  };
  // console.log("data", historicData);
  useEffect(() => {
    fetchHistoricalData();
    // setProfits(coin.market_data.price_change_24h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days, []]);

  return (
    <>
      <Container>
        {/* chart */}

        {!historicData ? (
          <Spinner
            as="span"
            variant="light"
            role="status"
            aria-hidden="true"
            animation="border"
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Past(Past ${days} Days) in ${currency}`,
                    borderColor:
                      coin.market_data.price_change_24h > 0
                        ? "#16c784"
                        : "#ea3943",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div className="chartbtn">
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}

        {/* buttons */}
      </Container>
    </>
  );
};

export default CoinInfo;

const Container = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  padding: 40px;
  background: #151829;
  @media (max-width: 600px) {
    width: 100%;
    margin-top: 0;
    padding: 20px;
    padding-top: 0;
  }
  .chartbtn {
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
    width: 100%;
    @media (max-width: 600px) {
      display: grid;
      grid-auto-flow: column dense;
      grid-template-rows: 50px 50px;
      gap: 9px;
    }
  }
`;
