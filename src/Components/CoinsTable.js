// import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import {
  Container,
  createTheme,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Pagination } from "@material-ui/lab";

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

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

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

  const useStyles = makeStyles((theme) => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: fontfs,
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
        [theme.breakpoints.down("sm")]: {
          padding: "15px 3px 16px 3px",
        },
      },
    },
    table_cell: {
      fontFamily:
        "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }} id="cryptoinfo">
          <Typography variant="h4" style={{ margin: 18, fontFamily: fontfs }}>
            Cryptocurrency Prices by Market Cap
          </Typography>

          <TextField
            label="Search For a Crypto Currency.."
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          ></TextField>

          <TableContainer>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          className={classes.table_cell}
                          style={{
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
                          className={classes.coin}
                          key={row.name}
                        >
                          <TableCell
                            className={classes.table_cell}
                            component="th"
                            scope="coin"
                            style={{
                              display: "flex",
                              gap: 15,
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell
                            align="right"
                            className={classes.table_cell}
                          >
                            {symbol}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            className={classes.table_cell}
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 600,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            align="right"
                            className={classes.table_cell}
                          >
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
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            classes={{ ul: classes.pagination }}
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
