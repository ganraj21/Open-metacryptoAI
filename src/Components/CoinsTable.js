import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const fontfs =
  "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif";

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
      <div style={{ textAlign: "center", width: "100%" }}>
        <h4 className="headinghf">Cryptocurrency Prices by Market Cap</h4>
        <div className="input_div">
          <input
            placeholder="Search For a Crypto Currency.."
            className="textfield "
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>

        <div className="table_container" id="cryptoinfo">
          {loading ? (
            <ProgressBar style={{ backgroundColor: "gold" }} />
          ) : (
            <Table responsive>
              <thead style={{ backgroundColor: "#EEBC1D" }}>
                <tr className="tablecell">
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <th className="tablecell headtable" key={head}>
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
                        className="rowstyle"
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <td component="th" className="tablecell">
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
                        <td className="tablecell">
                          {symbol}
                          {row.current_price.toFixed(2).toLocaleString()}
                        </td>
                        <td
                          className="tablecell"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 600,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </td>
                        <td className="tablecell">
                          {symbol}
                          {row.market_cap.toLocaleString().slice(0, -6)} M
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          )}
        </div>
        <div className="pagination_container">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((head) => {
            return (
              <Button
                onClick={(e) => {
                  setPage(head);
                  (handleSearch()?.length / 10).toFixed(0);
                  console.log(page);
                  window.scroll(0, 450);
                }}
              >
                {head}
              </Button>
            );
          })}
        </div>
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

  .headinghf {
    font-size: 27px;
    padding: 20px;
    margin: 15px 0;
  }
  .input_div {
    width: 100%;
    padding: 0px 16px;
  }
  .textfield {
    margin-bottom: 20px;
    width: 80%;
    height: 60px;
    background: transparent;
    outline: none;
    border: 1px solid #898989;
    color: #fff;
    padding-left: 20px;
    font-size: 18px;
    border-radius: 5px;
    @media (max-width: 1024px) {
      width: 100%;
    }
  }
  .table_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  table {
    width: 1200px;
    height: 200px;
    border-collapse: collapse;
    @media (max-width: 600px) {
      width: 100%;
    }
  }

  .headtable {
    color: black;
    font-weight: 700;
    width: 100%;
    height: 60px;
    align-items: center;
    @media (max-width: 600px) {
      width: 200px;
    }
  }
  th {
    border: none;
    width: 100%;
    @media (max-width: 600px) {
      width: 200px;
    }
  }
  tr {
    display: flex;
    text-align: center;
    justify-content: space-between;
  }
  td {
    gap: 15px;
    font-family: ${fontfs};
    color: #fff;
    border: none;
    width: 100%;
    height: 110px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 600px) {
      width: 200px;
    }
  }
  .pagination_container {
    padding: 12px;
    width: 100%;
    gap: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    justify-content: center;
  }
`;
