import axios from "axios";
import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  const [message, setMessage] = useState("");

  const [products, setProducts] = useState(null);

  const URL = "https://api.pro.coinbase.com";
  const socket_url = "wss://ws-feed.pro.coinbase.com";

  const coinbase = new W3CWebSocket(socket_url);

  useEffect(() => {
    axios
      .get(`${URL}/products`)
      .then((res) => JSON.parse(res.data))
      .then((data) => {
        setProducts(data);
        console.log(products);
      })
      .catch((err) => {
        console.log(err);
      });

    var productIds: any;

    coinbase.onopen = () => {
      productIds = Object.keys(products.prices).map(
        (key) => products.prices[key].id
      );
    };

    coinbase.send(
      JSON.stringify({
        type: "subscribe",
        productIds,
      })
    );

    coinbase.onmessage = (res) => {
      console.log(res);
      // setMessage(JSON.parse(res.data.toString()));

      coinbase.onclose = () => {
        console.log("disconnected");
      };
    };
  }, []);

  return (
    <div>
      <div>{message}</div>;
    </div>
  );
};
