import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Typography,
  LinearProgress,
  TextField,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import Pagination from "@mui/material/Pagination";

import { styled } from "@mui/material/styles";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const fontfs =
  "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif";

const RowStyle = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#131111",
  },
  fontFamily: fontfs,
}));
const PaginationStyle = styled(Pagination)(({ theme }) => ({
  padding: 20,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  "& .MuiPaginationItem-root": {
    color: "gold",
    [theme.breakpoints.down("sm")]: {
      padding: "15px 3px 16px 3px",
    },
  },
}));
const TableCellS = styled(TableCell)(({ theme }) => ({
  display: "flex",
  gap: 15,
  fontFamily: fontfs,
}));
const TableCellStyle = styled(TableCell)(({ theme }) => ({
  fontFamily: fontfs,
}));
const Typographystyle = styled(Typography)(({ theme }) => ({
  margin: 18,
  fontFamily: fontfs,
}));
const TestFieldStyles = styled(TextField)(({ theme }) => ({
  marginBottom: "20px",
  width: "100%",
}));
const CoinsTable = () => {
  const [search, setSearch] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
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
          <Typographystyle variant="h4">
            Cryptocurrency Prices by Market Cap
          </Typographystyle>

          <TestFieldStyles
            id="cryptoinfo"
            label="Search For a Crypto Currency.."
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          ></TestFieldStyles>

          <TableContainer>
            {loading ? (
              <LinearProgress sx={{ backgroundColor: "gold" }} />
            ) : (
              <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCellStyle
                          sx={{
                            color: "black",
                            fontWeight: "700",
                          }}
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCellStyle>
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
                        <RowStyle
                          onClick={() => navigate(`/coins/${row.id}`)}
                          key={row.name}
                        >
                          <TableCellS component="th" scope="coin">
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
                          </TableCellS>
                          <TableCellStyle align="right">
                            {symbol}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCellStyle>
                          <TableCellStyle
                            align="right"
                            sx={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 600,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCellStyle>
                          <TableCellStyle align="right">
                            {symbol}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCellStyle>
                        </RowStyle>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <PaginationStyle
            count={(handleSearch()?.length / 10).toFixed(0)}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
            shape="rounded"
          />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CoinsTable;
