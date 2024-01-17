import React, { useEffect, useState } from "react";
import Table from "./Table";

export interface ICurrency {
  id: string;
  symbol: string;
  name: string;
}

export default function App() {
  const [data, setData] = useState<ICurrency[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1 "
      )
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => {
          console.error(err);
          setError(true);
        })
        .finally(() => setLoading(false));
    }
    fetchData();
  }, []);
  return (
    <main className="App">
      {isError ? (
        <h1>OOPS... SOME ERROR, RELOAD THE PAGE OR TRY LATER</h1>
      ) : isLoading ? (
        <h1>Loading...</h1>
      ) : data ? (
        <Table data={data} />
      ) : null}
    </main>
  );
}
