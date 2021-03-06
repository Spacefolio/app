import axios from "axios";
import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  const [message, setMessage] = useState("im settings");

  return (
    <div>
      <div>{message}</div>
    </div>
  );
};
