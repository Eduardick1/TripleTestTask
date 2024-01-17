import React from "react";
import { ICurrency } from "./App";

export default function Table({ data }: { data: ICurrency[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>symbol</th>
          <th>name</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, symbol, name }, index) => (
          <tr
            style={
              symbol === "usdt"
                ? { backgroundColor: "green" }
                : index < 5
                ? { backgroundColor: "blue" }
                : {}
            }
            key={id}
          >
            <td>{id}</td>
            <td>{symbol}</td>
            <td>{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
