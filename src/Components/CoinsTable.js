// import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import Pagination from "@mui/material/Pagination";
import "./styles/CoinTable.css";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [search, setSearch] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const fontfs =
    "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif";

  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  const darkTheme = createTheme({ palette: { mode: "dark" } });

  useEffect(() => {
    fetchCoins();
    // its fetching the coins
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    if (search !== 0) {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    } else {
      return coins;
    }
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ margin: 18, fontFamily: fontfs }}>
            Cryptocurrency Prices by Market Cap
          </Typography>

          <TextField
            id="cryptoinfo"
            label="Search For a Crypto Currency.."
            variant="outlined"
            sx={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          ></TextField>

          <TableContainer>
            {loading ? (
              <LinearProgress sx={{ backgroundColor: "gold" }} />
            ) : (
              <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          className="table_cell"
                          sx={{
                            color: "black",
                            fontWeight: "700",
                          }}
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          onClick={() => navigate(`/coins/${row.id}`)}
                          // className={classes.coin}
                          key={row.name}
                        >
                          <TableCell
                            className="table_cell"
                            component="th"
                            scope="coin"
                            sx={{
                              display: "flex",
                              gap: 15,
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              sx={{ marginBottom: 10 }}
                            />
                            <div
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                sx={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span sx={{ color: "darkgrey" }}>{row.name}</span>
                            </div>
                          </TableCell>
                          <TableCell align="right" className="table_cell">
                            {symbol}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            className="table_cell"
                            align="right"
                            sx={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 600,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right" className="table_cell">
                            {symbol}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            count={(handleSearch()?.length / 10).toFixed(0)}
            sx={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            className=" pagination "
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CoinsTable;
