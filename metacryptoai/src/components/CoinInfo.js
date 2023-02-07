import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/data";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "tss-react/mui";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import SelectButton from "./SelectButton";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
    chart_btns: {
      display: "flex",
      marginTop: 20,
      justifyContent: "space-around",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        display: "grid",
        gridAutoFlow: "column dense",
        gridTemplateRows: "50px 50px",
      },
    },
  }));

  const classes = useStyles();
  Chart.register(CategoryScale);
  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
  };
  console.log("data", historicData);
  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const profit = coin.market_data.price_change_24h > 0;
  console.log(coin.market_data.price_change_24h);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
          {/* chart */}

          {!historicData ? (
            <CircularProgress
              style={{ color: "gold" }}
              size={150}
              thikness={1}
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
                      borderColor: profit ? "#16c784" : "#ea3943",
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
              <div className={classes.chart_btns}>
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
        </div>
      </ThemeProvider>
    </>
  );
};

export default CoinInfo;
