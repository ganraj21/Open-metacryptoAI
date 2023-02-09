import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import styled from "styled-components";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const fontfs =
  "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif";

// const TestFieldStyles = styled(TextField)(({ theme }) => ({
//   marginBottom: "20px",
//   width: "100%",
// }));
const CoinsTable = () => {
  const [search, setSearch] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

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
    <Typographystyle>
      <div style={{ textAlign: "center" }}>
        <h4>Cryptocurrency Prices by Market Cap</h4>

        <div
          className="textfield"
          id="cryptoinfo"
          label="Search For a Crypto Currency.."
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
        ></div>

        <div className="table_container">
          {loading ? (
            <ProgressBar style={{ backgroundColor: "gold" }} />
          ) : (
            <Table style={{ width: "80%" }}>
              <thead style={{ backgroundColor: "#EEBC1D" }}>
                <tr className="tablecell">
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <th
                      // className="tablecell"
                      style={{
                        color: "black",
                        fontWeight: "700",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ display: "flex", flexDirection: "column" }}>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <tr
                        // className="rowstyle"
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <td
                          component="th"
                          // className="tablecell"
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
                        </td>
                        <td
                          align="right"
                          // className="tablecell"
                        >
                          {symbol}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </td>
                        <td
                          // className="tablecell"
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 600,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </td>
                        <td
                          // className="tablecell"
                          align="right"
                        >
                          {symbol}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          )}
        </div>
        <div
          className="paginationstyle"
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
          shape="rounded"
        />
      </div>
    </Typographystyle>
  );
};

export default CoinsTable;

const Typographystyle = styled.div`
  margin: 18;
  font-family: ${fontfs};
  .rowstyle {
    cursor: pointer;
    &:hover {
      background-color: #131111;
    }
  }

  .table_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  table {
    width: 800px;
    height: 200px;
    border-collapse: collapse;
  }

  th {
    border: none;
    width: 115px;
    @media (max-width: 600px) {
      width: 90%;
    }
  }
  tr {
    display: flex;
    text-align: center;
    justify-content: space-between;
  }
  td {
    gap: 15px;
    fontfamily: ${fontfs};
    color: #fff;
    text-align: center;
    border: none;
    width: 115px;
    @media (max-width: 600px) {
      width: 90%;
    }
  }

  .paginationstyle {
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    color: gold;
    @media (max-width: 600px) {
      padding: 15px 3px 16px 3px;
    }
  }
  .tablecell {
    display: flex;
  }
`;
